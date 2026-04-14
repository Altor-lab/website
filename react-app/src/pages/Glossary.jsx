import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageHead from '../components/PageHead'
import { glossaryTerms } from '../content/glossary'

const entries = Object.entries(glossaryTerms)
  .map(([key, value]) => ({ key, ...value }))
  .sort((a, b) => a.term.localeCompare(b.term))

const Glossary = () => {
  useEffect(() => {
    const definedTermSetSchema = {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      name: 'Support Operations Glossary',
      description: 'Definitions for B2B support operations metrics, workflows, and investigation terms.',
      url: 'https://altorlab.com/glossary',
      hasDefinedTerm: entries.map((entry) => ({
        '@type': 'DefinedTerm',
        name: entry.term,
        description: entry.definition,
        url: `https://altorlab.com${entry.slug}`,
      })),
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'glossary-index-jsonld'
    script.textContent = JSON.stringify(definedTermSetSchema)

    const existing = document.getElementById('glossary-index-jsonld')
    if (existing) existing.remove()

    document.head.appendChild(script)

    return () => {
      const el = document.getElementById('glossary-index-jsonld')
      if (el) el.remove()
    }
  }, [])

  return (
    <>
      <PageHead
        title="Support Operations Glossary | Altor"
        description="Definitions for B2B support operations metrics, workflows, and investigation terms used by technical support teams."
        slug="/glossary"
        datePublished="2026-04-14"
        dateModified="2026-04-14"
      />

      <section className="max-w-5xl mx-auto px-4 py-12">
        <nav className="text-sm text-fg-muted mb-8">
          <Link to="/" className="hover:text-fg-default">Home</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-fg-default">Glossary</span>
        </nav>

        <header className="mb-10 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.12em] text-accent-default mb-3">Support operations glossary</p>
          <h1 className="text-3xl md:text-5xl font-bold text-fg-default tracking-[-0.03em] mb-4">Support Operations Glossary</h1>
          <p className="text-lg text-fg-muted leading-relaxed">
            Definitions for the metrics, workflows, and investigation concepts B2B support teams use to measure speed, quality, escalation load, and technical diagnosis.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {entries.map((entry) => (
            <article key={entry.key} className="rounded-xl border border-border-default p-5 hover:border-accent-muted transition-colors">
              <h2 className="text-xl font-semibold text-fg-default mb-2">
                <Link to={entry.slug} className="hover:text-accent-default transition-colors">{entry.term}</Link>
              </h2>
              <p className="text-sm text-fg-muted leading-relaxed mb-4">{entry.definition}</p>
              <Link to={entry.slug} className="text-sm text-accent-default hover:opacity-80 transition-opacity">
                Read definition →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default Glossary
