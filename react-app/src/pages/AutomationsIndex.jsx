import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import PageHead from '../components/PageHead'

const TOOL_COLORS = {
  claude: 'bg-orange-50 text-orange-800 border-orange-200',
  chatgpt: 'bg-green-50 text-green-800 border-green-200',
  n8n: 'bg-red-50 text-red-800 border-red-200',
  zapier: 'bg-amber-50 text-amber-800 border-amber-200',
  make: 'bg-violet-50 text-violet-800 border-violet-200',
  langchain: 'bg-blue-50 text-blue-800 border-blue-200',
  gemini: 'bg-sky-50 text-sky-800 border-sky-200',
  bedrock: 'bg-zinc-100 text-zinc-700 border-zinc-200',
}

function WorkflowCard({ workflow, tools }) {
  const relevantTools = tools.filter(t => workflow.related_tools?.includes(t.slug))
  return (
    <article className="rounded-xl border border-border-default bg-surface-1 p-5 hover:border-accent-muted transition-colors">
      <h2 className="text-base font-semibold text-fg-default mb-2">{workflow.label}</h2>
      <p className="text-sm text-fg-muted leading-relaxed mb-4 line-clamp-2">{workflow.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {relevantTools.slice(0, 4).map(t => (
          <Link
            key={t.slug}
            to={`/automate/${workflow.slug}/with/${t.slug}`}
            className={`text-xs font-medium px-2 py-0.5 rounded border transition-opacity hover:opacity-80 ${TOOL_COLORS[t.slug] ?? 'bg-zinc-50 text-zinc-600 border-zinc-200'}`}
          >
            {t.label.split(' ')[0]}
          </Link>
        ))}
      </div>
      <Link
        to={`/automate/${workflow.slug}/with/claude`}
        className="text-xs text-accent-default hover:opacity-80 transition-opacity"
      >
        View automation guides →
      </Link>
    </article>
  )
}

export default function AutomationsIndex() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/data/automations.json')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const workflows = useMemo(() => {
    if (!data) return []
    if (!search) return data.workflows || []
    const q = search.toLowerCase()
    return (data.workflows || []).filter(w =>
      w.label.toLowerCase().includes(q) || w.description.toLowerCase().includes(q)
    )
  }, [data, search])

  return (
    <>
      <PageHead
        title="How to Automate Business Workflows with AI Tools | Altor"
        description="Step-by-step guides on automating business workflows with AI tools — Claude, ChatGPT, n8n, Zapier, Make, LangChain. From customer support to invoice processing."
        slug="/automate"
        datePublished="2026-04-16"
        dateModified={data?.meta?.generated_at?.slice(0, 10) ?? '2026-04-16'}
        schemaType="WebPage"
        breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Automation Guides', url: null }]}
        extraSchema={data ? {
          '@type': 'CollectionPage',
          '@id': 'https://altorlab.com/automate#collection',
          name: 'Business Workflow Automation Guides',
          description: `${data.meta.total_pages} step-by-step automation guides covering ${data.meta.workflows} workflows and ${data.meta.tools} AI tools.`,
          url: 'https://altorlab.com/automate',
          numberOfItems: data.meta.total_pages,
          creator: { '@type': 'Organization', name: 'Altor', url: 'https://altorlab.com' },
        } : undefined}
      />

      <section className="max-w-6xl mx-auto px-4 py-12">
        <nav className="text-sm text-fg-muted mb-8">
          <Link to="/" className="hover:text-fg-default">Home</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-fg-default">Automate</span>
        </nav>

        <header className="mb-10 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.12em] text-accent-default mb-3">Workflow automation guides</p>
          <h1 className="text-3xl md:text-5xl font-bold text-fg-default tracking-[-0.03em] mb-4 text-balance">
            How to automate business workflows with AI
          </h1>
          <p className="text-lg text-fg-muted leading-relaxed text-pretty">
            Step-by-step automation guides for every major business workflow.
            Pick your workflow, pick your tool, and get a production-ready implementation plan.
          </p>
          {data && (
            <div className="flex flex-wrap gap-6 mt-6">
              <div>
                <p className="text-2xl font-bold text-fg-default tracking-tight">{data.meta.workflows}</p>
                <p className="text-xs text-fg-muted mt-0.5">Workflows covered</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-fg-default tracking-tight">{data.meta.tools}</p>
                <p className="text-xs text-fg-muted mt-0.5">AI tools compared</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-fg-default tracking-tight">{data.meta.total_pages}</p>
                <p className="text-xs text-fg-muted mt-0.5">Detailed guides</p>
              </div>
            </div>
          )}
        </header>

        {loading && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-border-default bg-surface-1 p-5 animate-pulse">
                <div className="h-4 bg-border-default rounded w-1/2 mb-3" />
                <div className="h-3 bg-border-default rounded w-full mb-2" />
                <div className="h-3 bg-border-default rounded w-4/5" />
              </div>
            ))}
          </div>
        )}

        {data && (
          <>
            <input
              type="search"
              placeholder="Search workflows..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full max-w-md px-3 py-2 text-sm rounded-lg border border-border-default bg-surface-0 text-fg-default placeholder-fg-muted focus:outline-none focus:border-accent-default transition-colors mb-8"
            />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {workflows.map(w => (
                <WorkflowCard
                  key={w.slug}
                  workflow={{ ...w, related_tools: (data.pages || []).filter(p => p.workflow_slug === w.slug).map(p => p.tool_slug) }}
                  tools={data.tools || []}
                />
              ))}
            </div>

            <div className="mt-16 rounded-xl border border-border-default bg-surface-1 p-6 md:p-8 max-w-2xl">
              <p className="text-sm uppercase tracking-[0.12em] text-accent-default mb-3">Not a DIY project?</p>
              <h2 className="text-xl font-bold text-fg-default mb-3 tracking-tight">
                Altor builds these systems in production for US B2B companies.
              </h2>
              <p className="text-sm text-fg-muted leading-relaxed mb-5">
                Every workflow on this page can be deployed in 3 weeks. We scope the right problem,
                build against your live data, and stay until it's in production — not demo.
              </p>
              <a
                href="https://calendly.com/founders-altorlab/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-accent-default hover:opacity-80 transition-opacity"
              >
                Talk to Altor about your workflow →
              </a>
            </div>
          </>
        )}
      </section>
    </>
  )
}
