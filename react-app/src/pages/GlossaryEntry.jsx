import { useParams, Navigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import PageHead from '../components/PageHead'
import { glossaryTerms } from '../content/glossary'

const GlossaryEntry = () => {
  const { term } = useParams()
  const entry = glossaryTerms[term]

  useEffect(() => {
    if (!entry) return
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: entry.faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'glossary-faq-jsonld'
    script.textContent = JSON.stringify(faqSchema)
    const existing = document.getElementById('glossary-faq-jsonld')
    if (existing) existing.remove()
    document.head.appendChild(script)
    return () => {
      const el = document.getElementById('glossary-faq-jsonld')
      if (el) el.remove()
    }
  }, [entry])

  if (!entry) return <Navigate to="/" replace />

  const related = (entry.relatedTerms || [])
    .filter(slug => glossaryTerms[slug])
    .map(slug => glossaryTerms[slug])

  return (
    <>
      <PageHead
        title={`${entry.term} — Support Glossary | Altor`}
        description={entry.definition.slice(0, 155)}
        slug={entry.slug}
        datePublished="2026-04-09"
        dateModified="2026-04-09"
      />

      <article className="max-w-3xl mx-auto px-4 py-12">
        <nav className="text-sm text-fg-muted mb-8">
          <Link to="/" className="hover:text-fg-default">Home</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-fg-default">{entry.term}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-fg-default mb-6">{entry.term}</h1>

        <section className="mb-8">
          <p className="text-lg text-fg-muted leading-relaxed">{entry.definition}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-fg-default mb-3">Why it matters for B2B support</h2>
          <p className="text-fg-muted leading-relaxed">{entry.context}</p>
        </section>

        <section className="mb-8 p-5 rounded-xl border border-accent-muted/30 bg-accent-muted/5">
          <h2 className="text-xl font-semibold text-fg-default mb-3">How Altor helps</h2>
          <p className="text-fg-muted leading-relaxed">{entry.howAltorHelps}</p>
        </section>

        {entry.faqs && entry.faqs.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-fg-default mb-4">FAQ</h2>
            <div className="space-y-4">
              {entry.faqs.map((faq, i) => (
                <div key={faq.q} className="p-4 rounded-lg border border-border-default">
                  <h3 className="font-medium text-fg-default mb-2">{faq.q}</h3>
                  <p className="text-fg-muted text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-fg-default mb-3">Related terms</h2>
            <div className="flex flex-wrap gap-2">
              {related.map(r => (
                <Link key={r.slug} to={r.slug} className="px-3 py-1.5 text-sm rounded-full border border-border-default hover:border-accent-muted hover:text-accent-default transition-colors">
                  {r.term}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-12 p-6 rounded-xl border border-accent-muted/30 bg-accent-muted/5 text-center">
          <h2 className="text-lg font-semibold text-fg-default mb-2">See Altor investigate a real ticket</h2>
          <p className="text-fg-muted mb-4 text-sm">We connect to your systems and diagnose a real ticket in 2 minutes during US hours.</p>
          <a href="https://calendly.com/founders-altorlab/30min" className="inline-block px-5 py-2.5 rounded-lg bg-accent-default text-white text-sm font-medium hover:opacity-90 transition-opacity">
            Book a Demo
          </a>
        </section>
      </article>
    </>
  )
}

export default GlossaryEntry
