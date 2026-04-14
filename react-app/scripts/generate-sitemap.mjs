/**
 * Generates sitemap.xml from the route list.
 * Runs before vite build so the sitemap is included in dist/.
 */

import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = join(__dirname, '..', 'public')

const BASE_URL = 'https://altorlab.com'
const TODAY = new Date().toISOString().split('T')[0]

const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/work/support-investigation', priority: '0.95', changefreq: 'monthly' },
  { path: '/platform', priority: '0.9', changefreq: 'monthly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/customers/portkey', priority: '0.9', changefreq: 'monthly' },
  { path: '/compare/altor-vs-doc-chatbots', priority: '0.8', changefreq: 'monthly' },
  { path: '/compare/altor-vs-support-platform-ai', priority: '0.8', changefreq: 'monthly' },
  { path: '/compare/altor-vs-copilot-for-support', priority: '0.8', changefreq: 'monthly' },
  { path: '/use-case/api-error-investigation', priority: '0.8', changefreq: 'monthly' },
  { path: '/use-case/webhook-failure-investigation', priority: '0.8', changefreq: 'monthly' },
  { path: '/use-case/billing-escalation-debugging', priority: '0.8', changefreq: 'monthly' },
  { path: '/for/ai-infrastructure-companies', priority: '0.8', changefreq: 'monthly' },
  { path: '/for/api-first-developer-tools', priority: '0.8', changefreq: 'monthly' },
  { path: '/for/zendesk-teams', priority: '0.8', changefreq: 'monthly' },
  { path: '/for/intercom-teams', priority: '0.8', changefreq: 'monthly' },
  { path: '/for/freshdesk-teams', priority: '0.8', changefreq: 'monthly' },
  { path: '/for/fintech-companies', priority: '0.8', changefreq: 'monthly' },
  { path: '/for/devtools-companies', priority: '0.8', changefreq: 'monthly' },
  { path: '/for/data-infrastructure-companies', priority: '0.8', changefreq: 'monthly' },
  { path: '/for/ecommerce-platforms', priority: '0.8', changefreq: 'monthly' },
  { path: '/for/observability-companies', priority: '0.8', changefreq: 'monthly' },
  { path: '/for/clickhouse-teams', priority: '0.8', changefreq: 'monthly' },
  { path: '/for/stripe-billing-teams', priority: '0.8', changefreq: 'monthly' },
  { path: '/glossary', priority: '0.7', changefreq: 'weekly' },
  { path: '/blog', priority: '0.7', changefreq: 'weekly' },
  { path: '/blog/support-ticket-investigation-workflow', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/support-investigation-cost', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/clickhouse-support-diagnosis', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/ai-support-agent-vs-chatbot', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/reduce-support-escalations', priority: '0.7', changefreq: 'monthly' },
]

// Dynamically add glossary terms
import { glossaryTerms } from '../src/content/glossary.js'
for (const slug of Object.keys(glossaryTerms)) {
  routes.push({ path: `/glossary/${slug}`, priority: '0.6', changefreq: 'monthly' })
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(r => `  <url>
    <loc>${BASE_URL}${r.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>
`

writeFileSync(join(PUBLIC, 'sitemap.xml'), xml, 'utf-8')
console.log(`[sitemap] Generated sitemap.xml with ${routes.length} URLs`)
