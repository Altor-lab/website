import { useEffect, useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import PageHead from '../components/PageHead'

export default function AutomationPage() {
  const { workflow, tool } = useParams()
  const [data, setData] = useState(null)
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/automations.json')
      .then(r => r.json())
      .then(d => {
        setData(d)
        const found = (d.pages || []).find(
          p => p.workflow_slug === workflow && p.tool_slug === tool
        )
        setPage(found || null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [workflow, tool])

  if (loading) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-border-default rounded w-1/3" />
          <div className="h-10 bg-border-default rounded w-2/3" />
          <div className="h-4 bg-border-default rounded w-full" />
          <div className="h-4 bg-border-default rounded w-5/6" />
        </div>
      </section>
    )
  }

  if (!page && !loading) return <Navigate to="/automate" replace />

  const wf = page?.workflow
  const toolData = page?.tool
  const todayStr = new Date().toISOString().slice(0, 10)

  const howToSchema = page ? {
    '@type': 'HowTo',
    '@id': `https://altorlab.com${page.slug}#howto`,
    name: `How to Automate ${wf?.label} with ${toolData?.label}`,
    description: wf?.description,
    totalTime: 'P3W',
    step: (wf?.steps || []).map((text, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: text.split(' ').slice(0, 6).join(' '),
      text,
    })),
  } : null

  const faqSchema = page ? {
    '@type': 'FAQPage',
    '@id': `https://altorlab.com${page.slug}#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: `How do I automate ${wf?.label?.toLowerCase()} with ${toolData?.label}?`,
        acceptedAnswer: { '@type': 'Answer', text: `${wf?.description} ${wf?.outcome}` },
      },
      {
        '@type': 'Question',
        name: `What are the steps to automate ${wf?.label?.toLowerCase()}?`,
        acceptedAnswer: { '@type': 'Answer', text: (wf?.steps || []).join(' ') },
      },
      {
        '@type': 'Question',
        name: `How long does ${wf?.label?.toLowerCase()} automation take to set up?`,
        acceptedAnswer: { '@type': 'Answer', text: 'With Altor, most workflows go from audit to live production in 3 weeks. DIY with n8n or Make typically takes 2–6 weeks depending on integration complexity.' },
      },
      {
        '@type': 'Question',
        name: `What does ${toolData?.label} cost for ${wf?.label?.toLowerCase()} automation?`,
        acceptedAnswer: { '@type': 'Answer', text: toolData?.pricing_model || 'See the tool documentation for current pricing.' },
      },
    ],
  } : null

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Automate', url: '/automate' },
    { name: wf?.label || 'Workflow', url: null },
  ]

  return (
    <>
      {page && (
        <PageHead
          title={`${page.title} | Altor`}
          description={page.description}
          slug={page.slug}
          datePublished="2026-04-16"
          dateModified={todayStr}
          schemaType="WebPage"
          breadcrumbs={breadcrumbs}
          extraSchema={[howToSchema, faqSchema].filter(Boolean)}
        />
      )}

      <article className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-fg-muted mb-8">
          <Link to="/" className="hover:text-fg-default">Home</Link>
          <span className="mx-2">&gt;</span>
          <Link to="/automate" className="hover:text-fg-default">Automate</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-fg-default">{wf?.label}</span>
        </nav>

        <header className="mb-10">
          <p className="text-sm uppercase tracking-[0.12em] text-accent-default mb-3">
            Automation guide
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-fg-default tracking-[-0.03em] mb-4 text-balance">
            How to Automate {wf?.label} with {toolData?.label}
          </h1>
          <p className="text-lg text-fg-muted leading-relaxed text-pretty max-w-2xl">
            {wf?.description}
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'The problem', text: wf?.pain },
            { label: 'The outcome', text: wf?.outcome },
            { label: 'The tool', text: `${toolData?.label} — ${toolData?.description?.split('.')[0]}.` },
          ].map(({ label, text }) => (
            <div key={label} className="rounded-xl border border-border-default bg-surface-1 p-5">
              <p className="text-xs uppercase tracking-[0.1em] text-accent-default mb-2">{label}</p>
              <p className="text-sm text-fg-default leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-fg-default mb-6 tracking-tight">
            How it works — step by step
          </h2>
          <ol className="space-y-4">
            {(wf?.steps || []).map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full border border-accent-default text-accent-default text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-sm text-fg-default leading-relaxed pt-0.5">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {toolData && (
          <section className="mb-12 rounded-xl border border-border-default bg-surface-1 p-6">
            <h2 className="text-lg font-bold text-fg-default mb-4 tracking-tight">
              About {toolData.label}
            </h2>
            <p className="text-sm text-fg-muted leading-relaxed mb-4">{toolData.description}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.1em] text-accent-default mb-2">Strengths</p>
                <ul className="space-y-1">
                  {(toolData.strengths || []).map(s => (
                    <li key={s} className="text-xs text-fg-muted flex gap-2">
                      <span className="text-accent-default flex-shrink-0">✓</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.1em] text-accent-default mb-2">Pricing</p>
                <p className="text-xs text-fg-muted">{toolData.pricing_model}</p>
                {toolData.docs_url && (
                  <a
                    href={toolData.docs_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-accent-default hover:opacity-80 mt-2 block"
                  >
                    Documentation ↗
                  </a>
                )}
              </div>
            </div>
          </section>
        )}

        {page?.n8n_templates?.length > 0 && (
          <section className="mb-12">
            <h2 className="text-lg font-bold text-fg-default mb-4 tracking-tight">
              Ready-made n8n templates
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {page.n8n_templates.map(t => (
                <a
                  key={t.id}
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-border-default p-4 hover:border-accent-muted transition-colors flex items-center justify-between gap-3"
                >
                  <span className="text-sm text-fg-default line-clamp-2">{t.title}</span>
                  <span className="text-accent-default flex-shrink-0 text-sm">↗</span>
                </a>
              ))}
            </div>
          </section>
        )}

        {(page?.related_tools?.length > 0 || page?.related_workflows?.length > 0) && data && (
          <section className="mb-12">
            <h2 className="text-lg font-bold text-fg-default mb-4 tracking-tight">Related guides</h2>
            <div className="flex flex-wrap gap-2">
              {(page.related_tools || []).map(slug => {
                const t = (data.tools || []).find(t => t.slug === slug)
                return t ? (
                  <Link
                    key={slug}
                    to={`/automate/${workflow}/with/${slug}`}
                    className="text-sm px-3 py-1.5 rounded-lg border border-border-default text-fg-muted hover:border-accent-muted hover:text-fg-default transition-colors"
                  >
                    {wf?.label} with {t.label.split(' ')[0]}
                  </Link>
                ) : null
              })}
              {(page.related_workflows || []).map(slug => {
                const w = (data.workflows || []).find(w => w.slug === slug)
                return w ? (
                  <Link
                    key={slug}
                    to={`/automate/${slug}/with/${tool}`}
                    className="text-sm px-3 py-1.5 rounded-lg border border-border-default text-fg-muted hover:border-accent-muted hover:text-fg-default transition-colors"
                  >
                    {w.label} with {toolData?.label?.split(' ')[0]}
                  </Link>
                ) : null
              })}
            </div>
          </section>
        )}

        <div className="rounded-xl border border-border-default bg-surface-1 p-6 md:p-8">
          <p className="text-sm uppercase tracking-[0.12em] text-accent-default mb-3">
            Want this in production?
          </p>
          <h2 className="text-xl font-bold text-fg-default mb-3 tracking-tight">
            Altor builds {wf?.label?.toLowerCase()} automation for US B2B companies.
          </h2>
          <p className="text-sm text-fg-muted leading-relaxed mb-5">
            We don't hand off code and disappear. We connect to your live systems, ship to production
            in 3 weeks, and stay until the system delivers measurable impact.
            {wf?.outcome && ` ${wf.outcome}`}
          </p>
          <a
            href={`mailto:anshul@altorlab.com?subject=${encodeURIComponent(`${wf?.label} Automation — Altor Engagement`)}&body=${encodeURIComponent(`Workflow: ${wf?.label}\n\nSample cases:\n\nTimeline:`)}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-accent-default hover:opacity-80 transition-opacity"
          >
            Email us your workflow →
          </a>
        </div>
      </article>
    </>
  )
}
