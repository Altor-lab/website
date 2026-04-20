import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
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
  strong: 'Strong fit',
  good: 'Good fit',
  moderate: 'Moderate fit',
  low: 'Low fit',
}

function ToolBadge({ tool }) {
  const colorClass = TIER_COLORS[tool.tier] ?? 'bg-zinc-100 text-zinc-700 border-zinc-200'
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded border ${colorClass}`}>
      {tool.confidence === 'high' && (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 flex-shrink-0" />
      )}
      {tool.vendor}
    </span>
  )
}

function CompanyCard({ company }) {
  const [expanded, setExpanded] = useState(false)
  const topTools = company.ai_tools.slice(0, 4)
  const remaining = company.ai_tools.length - topTools.length

  return (
    <article className="rounded-xl border border-border-default bg-surface-1 p-5 hover:border-accent-muted transition-colors">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-fg-default truncate">{company.name}</h2>
          <a
            href={`https://${company.domain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-fg-muted hover:text-accent-default transition-colors"
          >
            {company.domain} ↗
          </a>
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded border flex-shrink-0 ${FIT_STYLES[company.altor_fit]}`}>
          {FIT_LABELS[company.altor_fit]}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {topTools.map((tool, i) => (
          <ToolBadge key={i} tool={tool} />
        ))}
        {!expanded && remaining > 0 && (
          <button
            onClick={() => setExpanded(true)}
            className="text-xs text-fg-muted hover:text-fg-default transition-colors px-2 py-0.5 rounded border border-border-default"
          >
            +{remaining} more
          </button>
        )}
        {expanded && company.ai_tools.slice(4).map((tool, i) => (
          <ToolBadge key={i + 4} tool={tool} />
        ))}
      </div>

      <div className="flex items-center justify-between mt-1">
        <p className="text-xs text-fg-muted">
          {company.tool_count} tool{company.tool_count !== 1 ? 's' : ''} detected
          {' · '}
          Updated {new Date(company.last_crawled).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </p>
        <Link
          to={`/ai-stack/${company.domain}`}
          className="text-xs text-accent-default hover:opacity-75 transition-opacity flex-shrink-0"
        >
          Details →
        </Link>
      </div>
    </article>
  )
}

function FilterBar({ filter, setFilter, search, setSearch, totalCount }) {
  const fitOptions = ['all', 'strong', 'good', 'moderate']
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-8">
      <input
        type="search"
        placeholder="Search company..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="flex-1 px-3 py-2 text-sm rounded-lg border border-border-default bg-surface-0 text-fg-default placeholder-fg-muted focus:outline-none focus:border-accent-default transition-colors"
      />
      <div className="flex gap-1.5 flex-shrink-0">
        {fitOptions.map(opt => (
          <button
            key={opt}
            onClick={() => setFilter(opt)}
            className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors capitalize ${
              filter === opt
                ? 'bg-accent-default text-white border-accent-default'
                : 'bg-surface-0 text-fg-muted border-border-default hover:border-accent-muted hover:text-fg-default'
            }`}
          >
            {opt === 'all' ? `All (${totalCount})` : opt}
          </button>
        ))}
      </div>
    </div>
  )
}

function TierLegend() {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {Object.entries(TIER_LABELS).map(([tier, label]) => (
        <span key={tier} className={`text-xs px-2 py-0.5 rounded border ${TIER_COLORS[tier]}`}>
          {label}
        </span>
      ))}
      <span className="text-xs text-fg-muted self-center ml-1">
        · Filled dot = high confidence
      </span>
    </div>
  )
}

export default function AIStackTracker() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/data/ai-companies.json')
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then(d => { setData(d); setLoading(false) })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [])

  const companies = useMemo(() => {
    if (!data) return []
    return data.companies
      .filter(c => filter === 'all' || c.altor_fit === filter)
      .filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.domain.toLowerCase().includes(search.toLowerCase()))
  }, [data, filter, search])

  const stats = useMemo(() => {
    if (!data) return null
    const all = data.companies
    return {
      companies: all.length,
      detections: data.meta.total_detections,
      strongFit: all.filter(c => c.altor_fit === 'strong').length,
      updatedAt: new Date(data.meta.generated_at).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
      }),
    }
  }, [data])

  return (
    <>
      <PageHead
        title="AI Stack Intelligence — Which B2B Companies Use Which AI Tools | Altor"
        description="Real-time intelligence on AI tool adoption across B2B SaaS companies. Track which companies use OpenAI, Claude, LangChain, n8n, and more. Updated daily."
        slug="/ai-stack"
        datePublished="2026-04-16"
        dateModified={data?.meta?.generated_at?.slice(0, 10) ?? '2026-04-16'}
        schemaType="WebPage"
        breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'AI Stack Tracker', url: null }]}
        extraSchema={data ? {
          '@type': 'Dataset',
          '@id': 'https://altorlab.com/ai-stack#dataset',
          name: 'AI Stack Intelligence — B2B Company AI Tool Adoption',
          description: `Real-time dataset tracking AI tool adoption across ${data.meta.company_count} B2B SaaS companies. Signals sourced from public web surfaces, ATS job postings, and vendor customer pages.`,
          url: 'https://altorlab.com/ai-stack',
          creator: { '@type': 'Organization', name: 'Altor', url: 'https://altorlab.com' },
          dateModified: data.meta.generated_at,
          temporalCoverage: '2026/..',
          variableMeasured: 'AI tool adoption by B2B company',
          measurementTechnique: 'Automated crawling of public web surfaces and ATS job postings',
        } : undefined}
      />

      <section className="max-w-6xl mx-auto px-4 py-12">
        <nav className="text-sm text-fg-muted mb-8">
          <Link to="/" className="hover:text-fg-default">Home</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-fg-default">AI Stack Tracker</span>
        </nav>

        <header className="mb-10 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.12em] text-accent-default mb-3">
            AI adoption intelligence
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-fg-default tracking-[-0.03em] mb-4 text-balance">
            Which B2B companies use which AI tools
          </h1>
          <p className="text-lg text-fg-muted leading-relaxed text-pretty">
            Daily-crawled intelligence on AI tool adoption across B2B SaaS and developer tool companies.
            Signals sourced from public web surfaces, ATS job postings, and vendor customer pages.
            No guessing — every detection has evidence.
          </p>
          {stats && (
            <div className="flex flex-wrap gap-6 mt-6">
              {[
                { label: 'Companies tracked', value: stats.companies },
                { label: 'Tool detections', value: stats.detections },
                { label: 'Strong Altor fits', value: stats.strongFit },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-2xl font-bold text-fg-default tracking-tight">{value}</p>
                  <p className="text-xs text-fg-muted mt-0.5">{label}</p>
                </div>
              ))}
              <div className="self-end">
                <p className="text-xs text-fg-muted">Updated {stats.updatedAt}</p>
              </div>
            </div>
          )}
        </header>

        {loading && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-border-default bg-surface-1 p-5 animate-pulse">
                <div className="h-4 bg-border-default rounded w-2/3 mb-2" />
                <div className="h-3 bg-border-default rounded w-1/3 mb-4" />
                <div className="flex gap-2">
                  <div className="h-5 bg-border-default rounded w-20" />
                  <div className="h-5 bg-border-default rounded w-16" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            Failed to load data: {error}. The crawler may still be running its first pass.
          </div>
        )}

        {data && (
          <>
            <TierLegend />
            <FilterBar
              filter={filter}
              setFilter={setFilter}
              search={search}
              setSearch={setSearch}
              totalCount={data.companies.length}
            />

            {companies.length === 0 ? (
              <p className="text-fg-muted text-sm">No companies match your filters.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {companies.map(company => (
                  <CompanyCard key={company.domain} company={company} />
                ))}
              </div>
            )}

            <div className="mt-16 rounded-xl border border-border-default bg-surface-1 p-6 md:p-8 max-w-2xl">
              <p className="text-sm uppercase tracking-[0.12em] text-accent-default mb-3">
                For Altor
              </p>
              <h2 className="text-xl font-bold text-fg-default mb-3 tracking-tight">
                Companies already using AI are your best customers.
              </h2>
              <p className="text-sm text-fg-muted leading-relaxed mb-5">
                Every company on this list has shipped AI — which means they have the infrastructure,
                the data, and the workflows that Altor connects to. They're not asking "should we use AI?"
                They're asking "how do we make it work in production?"
              </p>
              <a
                href="https://calendly.com/founders-altorlab/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent-default hover:opacity-80 transition-opacity"
              >
                Talk to Altor about production AI systems →
              </a>
            </div>

            <p className="mt-8 text-xs text-fg-muted max-w-2xl leading-relaxed">
              Data sourced from public signals only: company web surfaces, public ATS job postings
              (Greenhouse, Lever), and vendor customer pages. Updated daily via automated crawler.
              Confidence ratings reflect number of corroborating signals.
              <Link to="/security" className="underline ml-1 hover:text-fg-default">Privacy policy →</Link>
            </p>
          </>
        )}
      </section>
    </>
  )
}
