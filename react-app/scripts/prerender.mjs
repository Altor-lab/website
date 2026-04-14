/**
 * Post-build prerender script.
 * Starts vite preview, renders each route in headless Chromium,
 * and writes the full HTML back to dist/ so crawlers see real content.
 */

import { spawn } from 'child_process'
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import http from 'http'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIST = join(ROOT, 'dist')

const ROUTES = [
  '/',
  '/work/support-investigation',
  '/platform',
  '/pricing',
  '/team',
  '/security',
  '/about',
  '/compare/altor-vs-doc-chatbots',
  '/compare/altor-vs-support-platform-ai',
  '/compare/altor-vs-copilot-for-support',
  '/use-case/api-error-investigation',
  '/use-case/webhook-failure-investigation',
  '/use-case/billing-escalation-debugging',
  '/for/ai-infrastructure-companies',
  '/for/api-first-developer-tools',
  '/for/zendesk-teams',
  '/for/intercom-teams',
  '/for/freshdesk-teams',
  '/for/fintech-companies',
  '/for/devtools-companies',
  '/for/data-infrastructure-companies',
  '/for/ecommerce-platforms',
  '/for/observability-companies',
  '/for/clickhouse-teams',
  '/for/stripe-billing-teams',
  '/customers/portkey',
  '/glossary',
  '/blog',
  '/blog/support-ticket-investigation-workflow',
  '/blog/support-investigation-cost',
  '/blog/clickhouse-support-diagnosis',
  '/blog/ai-support-agent-vs-chatbot',
  '/blog/reduce-support-escalations',
  '/blog/why-enterprise-ai-fails-in-production',
  '/blog/production-ai-complete-guide',
  '/blog/ai-services-vs-ai-consulting-vs-ai-implementation',
]

// Dynamically add glossary terms
import { glossaryTerms } from '../src/content/glossary.js'
for (const slug of Object.keys(glossaryTerms)) {
  ROUTES.push(`/glossary/${slug}`)
}

const PORT = 4173
const BASE_URL = `http://localhost:${PORT}`

// Hard timeout — glossary growth makes full prerender take longer than 3 minutes
setTimeout(() => {
  console.error('[prerender] TIMEOUT: Script exceeded 10 minutes. Exiting.')
  process.exit(1)
}, 600_000)

function httpGet(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => resolve(res.statusCode))
    req.on('error', () => resolve(null))
    req.setTimeout(2000, () => { req.destroy(); resolve(null) })
  })
}

async function waitForServer(url, maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    const status = await httpGet(url)
    if (status === 200) return true
    await new Promise((r) => setTimeout(r, 500))
  }
  return false
}

async function prerender() {
  console.log('[prerender] Starting vite preview server...')

  // Use the local vite binary directly instead of npx
  const viteBin = join(ROOT, 'node_modules', '.bin', 'vite')
  const preview = spawn(viteBin, ['preview', '--port', String(PORT)], {
    cwd: ROOT,
    stdio: 'pipe',
    env: { ...process.env },
  })

  preview.stdout.on('data', (d) => process.stdout.write(`  [vite] ${d}`))
  preview.stderr.on('data', (d) => process.stderr.write(`  [vite] ${d}`))

  const ready = await waitForServer(BASE_URL)
  if (!ready) {
    console.error('[prerender] FAILED: Vite preview server did not start within 15s.')
    preview.kill()
    process.exit(1)
  }

  console.log('[prerender] Server ready. Launching browser...')

  const puppeteer = await import('puppeteer')

  const browser = await puppeteer.default.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
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

      // Wait for Framer Motion animations to settle
      await new Promise((r) => setTimeout(r, 750))

      // Scroll back to top
      await page.evaluate(() => window.scrollTo(0, 0))
      await new Promise((r) => setTimeout(r, 200))

      // Get the full rendered HTML
      let html = await page.content()

      // Strip Framer Motion opacity:0 inline styles that linger from initial="hidden"
      html = html.replace(/style="[^"]*opacity:\s*0[^"]*"/g, (match) => {
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
  process.exit(0)
}

prerender().catch((err) => {
  console.error('[prerender] Fatal error:', err)
  process.exit(1)
})
