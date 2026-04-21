import { useEffect, useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import PageHead from '../components/PageHead'

const TIER_LABELS = {
  model_api: 'Model API',
  orchestration: 'Orchestration',
  app_layer: 'Customer-facing AI',
  infra: 'Vector / Infra',
  internal_tool: 'Internal Tool',
}

const TIER_COLORS = {
  model_api: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  orchestration: 'bg-blue-50 text-blue-800 border-blue-200',
  app_layer: 'bg-violet-50 text-violet-800 border-violet-200',
  infra: 'bg-amber-50 text-amber-800 border-amber-200',
  internal_tool: 'bg-zinc-100 text-zinc-700 border-zinc-200',
}

const FIT_STYLES = {
  strong: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  good: 'text-blue-700 bg-blue-50 border-blue-200',
  moderate: 'text-zinc-600 bg-zinc-50 border-zinc-200',
  low: 'text-zinc-400 bg-zinc-50 border-zinc-100',
}

const FIT_LABELS = {
  strong: 'Strong Altor fit',
  good: 'Good Altor fit',
  moderate: 'Moderate fit',
  low: 'Low fit',
}

const SOURCE_LABELS = {
  web: 'Detected in website source',
  jobs: 'Found in job postings',
  vendor: 'Named in vendor case study',
}

function ToolRow({ tool }) {
  const tierClass = TIER_COLORS[tool.tier] ?? 'bg-zinc-50 text-zinc-600 border-zinc-200'
  const confidenceLabel = tool.confidence === 'high' ? 'High confidence' : 'Medium confidence'
  const confidenceDot = tool.confidence === 'high' ? 'bg-emerald-500' : 'bg-amber-400'

  return (
    <div className="flex items-start gap-4 p-4 rounded-xl border border-border-default bg-surface-0 hover:border-accent-muted transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="text-sm font-semibold text-fg-default">{tool.vendor}</span>
          <span className="text-xs text-fg-muted">·</span>
          <span className="text-xs text-fg-muted">{tool.tool}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span className={`text-xs px-2 py-0.5 rounded border ${tierClass}`}>
            {TIER_LABELS[tool.tier] ?? tool.tier}
          </span>
          {(tool.sources || []).map(src => (
            <span key={src} className="text-xs px-2 py-0.5 rounded border bg-zinc-50 text-zinc-600 border-zinc-200">
              {SOURCE_LABELS[src] ?? src}
            </span>
          ))}
          {(tool.evidence_urls || []).slice(0, 1).map((url, i) => (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-2 py-0.5 rounded border bg-zinc-50 text-accent-default border-zinc-200 hover:opacity-80"
            >
              View evidence ↗
            </a>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <span className={`w-2 h-2 rounded-full ${confidenceDot}`} />
        <span className="text-xs text-fg-muted">{confidenceLabel}</span>
      </div>
    </div>
  )
}

function slugToDomain(slug) {
  return slug.replace(/-/g, '.')
}

function domainToSlug(domain) {
  return domain.replace(/\./g, '-')
}

export default function AIStackEntry() {
  const { domainSlug } = useParams()
  const domain = slugToDomain(domainSlug)
  const [company, setCompany] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/ai-companies.json')
      .then(r => r.json())
      .then(data => {
        const found = data.companies.find(c => c.domain === domain)
        setCompany(found || null)
        if (found) {
          const sameTools = new Set(found.ai_tools.map(t => t.vendor))
          setRelated(
            data.companies
              .filter(c =>
                c.domain !== domain &&
                c.tool_count > 0 &&
                c.ai_tools.some(t => sameTools.has(t.vendor))
              )
              .slice(0, 6)
          )
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [domain])

  if (loading) {
    return (
      <section className="max-w-4xl mx-auto px-4 pt-28 pb-12 md:pt-36">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-border-default rounded w-1/4" />
          <div className="h-8 bg-border-default rounded w-1/2" />
          <div className="h-4 bg-border-default rounded w-3/4" />
        </div>
      </section>
    )
  }

  if (!company) return <Navigate to="/ai-stack" replace />

  const slug = `/ai-stack/${domainToSlug(domain)}`
  const vendors = company.ai_tools.map(t => t.vendor).join(', ')
  const updatedDate = new Date(company.last_crawled).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })
  const updatedShort = new Date(company.last_crawled).toISOString().slice(0, 10)

  const toolsByTier = company.ai_tools.reduce((acc, t) => {
    acc[t.tier] = acc[t.tier] || []
    acc[t.tier].push(t)
    return acc
  }, {})

  const faqSchema = {
    '@type': 'FAQPage',
    '@id': `https://altorlab.com${slug}#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: `What AI tools does ${company.name} use?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${company.name} uses ${vendors}. These tools were detected from public signals including ${company.ai_tools.flatMap(t => t.sources || []).filter((v, i, a) => a.indexOf(v) === i).map(s => SOURCE_LABELS[s] || s).join(' and ')}.`,
        },
      },
      {
        '@type': 'Question',
        name: `How was ${company.name}'s AI stack detected?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Altor's daily crawler detects AI tool usage from public signals: website HTML and Content Security Policy headers, JavaScript bundle strings, privacy policy subprocessor disclosures, and public job postings on Greenhouse and Lever. All detections are evidence-linked.`,
        },
      },
      {
        '@type': 'Question',
        name: `Is ${company.name} a good fit for AI services?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${company.name} is rated a ${FIT_LABELS[company.altor_fit] || company.altor_fit} for Altor's AI services. Companies that already use model APIs and orchestration frameworks have the infrastructure foundation needed to benefit most from Altor's production AI systems.`,
        },
      },
    ],
  }

  const datasetSchema = {
    '@type': 'Dataset',
    '@id': `https://altorlab.com${slug}#dataset`,
    name: `${company.name} AI Stack Intelligence`,
    description: `AI tool adoption data for ${company.name} (${domain}). ${company.tool_count} AI tools detected including ${vendors}.`,
    url: `https://altorlab.com${slug}`,
    creator: { '@type': 'Organization', name: 'Altor', url: 'https://altorlab.com' },
    dateModified: company.last_crawled,
    variableMeasured: 'AI tool adoption',
    measurementTechnique: 'Automated crawling of public web surfaces and ATS job postings',
  }

  return (
    <>
      <PageHead
        title={`${company.name} AI Stack — Which AI Tools Does ${company.name} Use? | Altor`}
        description={`${company.name} uses ${vendors}. ${company.tool_count} AI tool${company.tool_count !== 1 ? 's' : ''} detected from public signals. Updated ${updatedDate}.`}
        slug={slug}
        datePublished={company.first_seen?.slice(0, 10) ?? '2026-04-16'}
        dateModified={updatedShort}
        schemaType="WebPage"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'AI Stack Tracker', url: '/ai-stack' },
          { name: company.name, url: null },
        ]}
        extraSchema={[faqSchema, datasetSchema]}
      />

      <article className="max-w-4xl mx-auto px-4 pt-28 pb-12 md:pt-36">
        <nav className="text-sm text-fg-muted mb-8">
          <Link to="/" className="hover:text-fg-default">Home</Link>
          <span className="mx-2">&gt;</span>
          <Link to="/ai-stack" className="hover:text-fg-default">AI Stack Tracker</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-fg-default">{company.name}</span>
        </nav>

        <header className="mb-10">
          <p className="text-sm uppercase tracking-[0.12em] text-accent-default mb-3">
            AI stack intelligence
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-fg-default tracking-[-0.03em] mb-3 text-balance">
            What AI tools does {company.name} use?
          </h1>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <a
              href={`https://${domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-fg-muted hover:text-accent-default transition-colors"
            >
              {domain} ↗
            </a>
            <span className="text-fg-muted text-xs">·</span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded border ${FIT_STYLES[company.altor_fit]}`}>
              {FIT_LABELS[company.altor_fit]}
            </span>
          </div>
          <p className="text-lg text-fg-muted leading-relaxed">
            {company.tool_count} AI tool{company.tool_count !== 1 ? 's' : ''} detected — {vendors}.
            Last updated {updatedDate}.
          </p>
        </header>

        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Tools detected', value: company.tool_count },
            { label: 'Detection sources', value: [...new Set(company.ai_tools.flatMap(t => t.sources || []))].length },
            { label: 'High confidence', value: company.ai_tools.filter(t => t.confidence === 'high').length },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl border border-border-default bg-surface-1 p-4 text-center">
              <p className="text-2xl font-bold text-fg-default tracking-tight">{value}</p>
              <p className="text-xs text-fg-muted mt-1">{label}</p>
            </div>
          ))}
        </div>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-fg-default mb-5 tracking-tight">
            AI tools detected at {company.name}
          </h2>
          <div className="space-y-3">
            {Object.entries(toolsByTier)
              .sort(([a], [b]) => {
                const order = { model_api: 0, orchestration: 1, app_layer: 2, infra: 3, internal_tool: 4 }
                return (order[a] ?? 9) - (order[b] ?? 9)
              })
              .map(([tier, tools]) => (
                <div key={tier}>
                  <p className="text-xs uppercase tracking-[0.1em] text-fg-muted mb-2">
                    {TIER_LABELS[tier] ?? tier}
                  </p>
                  <div className="space-y-2">
                    {tools.map((tool, i) => (
                      <ToolRow key={i} tool={tool} />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </section>

        <section className="mb-10 rounded-xl border border-border-default bg-surface-1 p-5">
          <h2 className="text-base font-bold text-fg-default mb-3 tracking-tight">How we detect this</h2>
          <p className="text-sm text-fg-muted leading-relaxed">
            Altor's crawler runs daily and checks public signals: homepage HTML, Content Security
            Policy headers (which list every API domain a site connects to), JavaScript bundle
            strings, privacy policy subprocessor disclosures (legally required to list AI vendors),
            and public job postings via Greenhouse and Lever APIs. Every detection is evidence-linked
            — no guessing.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {['Web surfaces', 'CSP headers', 'Privacy policy', 'Job postings'].map(s => (
              <span key={s} className="text-xs px-2 py-0.5 rounded border bg-zinc-50 text-zinc-600 border-zinc-200">
                {s}
              </span>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-bold text-fg-default mb-4 tracking-tight">
              Companies using similar AI tools
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {related.map(c => (
                <Link
                  key={c.domain}
                  to={`/ai-stack/${domainToSlug(c.domain)}`}
                  className="rounded-lg border border-border-default p-4 hover:border-accent-muted transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-medium text-fg-default">{c.name}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded border ${FIT_STYLES[c.altor_fit]}`}>
                      {c.altor_fit}
                    </span>
                  </div>
                  <p className="text-xs text-fg-muted">
                    {c.ai_tools.map(t => t.vendor).slice(0, 3).join(', ')}
                    {c.tool_count > 3 ? ` +${c.tool_count - 3} more` : ''}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="rounded-xl border border-border-default bg-surface-1 p-6 md:p-8">
          <p className="text-sm uppercase tracking-[0.12em] text-accent-default mb-3">
            For Altor
          </p>
          <h2 className="text-xl font-bold text-fg-default mb-3 tracking-tight">
            {company.name} is already using AI. We help teams like this ship it to production.
          </h2>
          <p className="text-sm text-fg-muted leading-relaxed mb-5">
            Companies already running {vendors.split(', ')[0]} have the infrastructure foundation.
            Altor identifies the highest-cost manual workflow, builds the AI system, and deploys it
            in 3 weeks — not demo.
          </p>
          <a
            href={`mailto:anshul@altorlab.com?subject=${encodeURIComponent(`AI Services — ${company.name} context`)}&body=${encodeURIComponent(`Hi,\n\nI noticed you track ${company.name}'s AI stack. We're interested in discussing how Altor could help us ship production AI systems.\n\nWorkflow:\nSystems involved:\nTimeline:`)}`}
            className="text-sm font-medium text-accent-default hover:opacity-80 transition-opacity"
          >
            Email us about your workflow →
          </a>
        </div>

        <p className="mt-8 text-xs text-fg-muted max-w-2xl leading-relaxed">
          Data sourced from public signals only. Updated {updatedDate}.
          <Link to="/ai-stack" className="underline ml-1 hover:text-fg-default">
            View all companies →
          </Link>
        </p>
      </article>
    </>
  )
}
