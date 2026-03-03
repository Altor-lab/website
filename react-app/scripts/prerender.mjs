/**
 * Post-build prerender script.
 * Starts vite preview, renders each route in headless Chromium,
 * and writes the full HTML back to dist/ so crawlers see real content.
 */

import { execSync, spawn } from 'child_process'
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIST = join(ROOT, 'dist')

const ROUTES = [
  '/',
  '/compare/altor-vs-doc-chatbots',
  '/compare/altor-vs-support-platform-ai',
  '/use-case/api-error-investigation',
]

const PORT = 4173
const BASE_URL = `http://localhost:${PORT}`

async function prerender() {
  console.log('[prerender] Starting vite preview server...')

  const preview = spawn('npx', ['vite', 'preview', '--port', String(PORT)], {
    cwd: ROOT,
    stdio: 'pipe',
    env: { ...process.env },
  })

  // Wait for server to be ready
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Preview server timeout')), 15000)
    preview.stdout.on('data', (data) => {
      if (data.toString().includes(String(PORT))) {
        clearTimeout(timeout)
        resolve()
      }
    })
    preview.stderr.on('data', (data) => {
      const msg = data.toString()
      if (msg.includes(String(PORT))) {
        clearTimeout(timeout)
        resolve()
      }
    })
  })

  // Brief additional wait for server stability
  await new Promise((r) => setTimeout(r, 1000))

  console.log('[prerender] Server ready. Launching browser...')

  let puppeteer
  try {
    puppeteer = await import('puppeteer')
  } catch {
    console.error('[prerender] puppeteer not installed. Run: npm install -D puppeteer')
    preview.kill()
    process.exit(1)
  }

  const browser = await puppeteer.default.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
  })

  try {
    for (const route of ROUTES) {
      console.log(`[prerender] Rendering ${route}...`)
      const page = await browser.newPage()
      await page.setViewport({ width: 1280, height: 800 })

      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle0', timeout: 30000 })

      // Scroll to bottom to trigger all IntersectionObserver-based animations
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let total = 0
          const step = 400
          const timer = setInterval(() => {
            window.scrollBy(0, step)
            total += step
            if (total >= document.body.scrollHeight) {
              clearInterval(timer)
              resolve()
            }
          }, 50)
        })
      })

      // Wait for Framer Motion animations to complete
      await new Promise((r) => setTimeout(r, 2000))

      // Scroll back to top
      await page.evaluate(() => window.scrollTo(0, 0))
      await new Promise((r) => setTimeout(r, 500))

      // Get the full rendered HTML
      let html = await page.content()

      // Strip Framer Motion opacity:0 inline styles that linger from initial="hidden"
      html = html.replace(/style="[^"]*opacity:\s*0[^"]*"/g, (match) => {
        // Remove opacity:0 from inline styles, keep other properties
        const cleaned = match
          .replace(/opacity:\s*0;?\s*/g, '')
          .replace(/;\s*"/g, '"')
          .replace(/style="\s*"/g, '')
        return cleaned || ''
      })

      // Also strip transform translateY styles from Framer Motion
      html = html.replace(/transform:\s*translateY\(\d+px\);?\s*/g, '')

      // Determine output path
      const outDir = route === '/'
        ? DIST
        : join(DIST, ...route.split('/').filter(Boolean))

      if (!existsSync(outDir)) {
        mkdirSync(outDir, { recursive: true })
      }

      const outFile = join(outDir, 'index.html')
      writeFileSync(outFile, html, 'utf-8')
      console.log(`[prerender] Wrote ${outFile}`)

      await page.close()
    }
  } finally {
    await browser.close()
    preview.kill()
  }

  // Verify the homepage has actual content
  const homeHtml = readFileSync(join(DIST, 'index.html'), 'utf-8')
  if (!homeHtml.includes('investigation')) {
    console.error('[prerender] FAILED: Homepage does not contain expected content.')
    process.exit(1)
  }

  console.log('[prerender] Done. All routes pre-rendered successfully.')
}

prerender().catch((err) => {
  console.error('[prerender] Fatal error:', err)
  process.exit(1)
})
