/**
 * Post-build prerender script.
 * Starts vite preview, renders each route in headless Chromium,
 * and writes the full HTML back to dist/ so crawlers see real content.
 */

import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import http from 'node:http'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { glossaryTerms } from '../src/content/glossary.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIST = join(ROOT, 'dist')

const ROUTES = [
  '/',
  '/nyc',
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
  '/integrations/clickhouse',
  '/integrations/linear',
  '/integrations/stripe',
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
  '/blog/ai-agent-services-guide',
  '/blog/ai-agent-cost-pricing-guide',
  '/blog/what-is-an-ai-agent',
]

// Glossary terms
for (const slug of Object.keys(glossaryTerms)) {
  ROUTES.push(`/glossary/${slug}`)
}

// Static programmatic index pages
ROUTES.push('/ai-stack', '/mcp-servers', '/automate')

// Automation detail pages from data file
const automationsDataPath = join(ROOT, 'public', 'data', 'automations.json')
if (existsSync(automationsDataPath)) {
  try {
    const automations = JSON.parse(readFileSync(automationsDataPath, 'utf-8'))
    for (const page of automations.pages || []) {
      ROUTES.push(page.slug)
    }
  } catch { /* skip if data not yet populated */ }
}

// Top MCP server detail pages — only highest-star servers to stay within budget
const mcpDataPath = join(ROOT, 'public', 'data', 'mcp-servers.json')
if (existsSync(mcpDataPath)) {
  try {
    const mcpData = JSON.parse(readFileSync(mcpDataPath, 'utf-8'))
    const top = (mcpData.servers || [])
      .filter(s => s.owner && s.repo && s.stars > 500)
      .slice(0, 50)
    for (const s of top) {
      ROUTES.push(`/mcp-servers/${s.owner}/${s.repo}`)
    }
  } catch { /* skip if data not yet populated */ }
}

// AI company detail pages — only strong/good fit for prerender budget
const aiDataPath = join(ROOT, 'public', 'data', 'ai-companies.json')
if (existsSync(aiDataPath)) {
  try {
    const aiData = JSON.parse(readFileSync(aiDataPath, 'utf-8'))
    const priority = (aiData.companies || []).filter(
      c => c.tool_count > 0 && (c.altor_fit === 'strong' || c.altor_fit === 'good')
    )
    for (const c of priority) {
      ROUTES.push(`/ai-stack/${c.domain.replace(/\./g, '-')}`)
    }
  } catch { /* skip if data not yet populated */ }
}

const PORT = 4173
const BASE_URL = `http://localhost:${PORT}`

// Hard timeout — glossary growth makes full prerender take longer than 3 minutes
setTimeout(() => {
  console.error('[prerender] TIMEOUT: Script exceeded 10 minutes. Exiting.')
  process.exit(1)
}, 600_000)

function httpGet(url) {
  return new Promise((resolve) => {
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

      const isDataPage = route.startsWith('/ai-stack/') || route.startsWith('/mcp-servers/') || route.startsWith('/automate/')
      const waitStrategy = isDataPage ? 'domcontentloaded' : 'networkidle0'
      const pageTimeout = isDataPage ? 15000 : 30000

      try {
        await page.goto(`${BASE_URL}${route}`, { waitUntil: waitStrategy, timeout: pageTimeout })
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
        await new Promise((r) => setTimeout(r, isDataPage ? 300 : 750))
        // Scroll back to top
        await page.evaluate(() => window.scrollTo(0, 0))
        await new Promise((r) => setTimeout(r, 200))
      } catch (e) {
        console.warn(`[prerender] Warning: ${route} — ${e.message?.slice(0, 80)}`)
      }

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
