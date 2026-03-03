import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import PageHead from './PageHead'
import Button from './Button'
import EmailCapture from './EmailCapture'

const ease = [0.25, 0.4, 0.25, 1]

const Reveal = ({ children, delay = 0 }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

const BlogPost = ({ post }) => {
  const { slug, title, description, datePublished, dateModified, readTime, headline, opening, sections, relatedPosts } = post

  return (
    <>
      <PageHead
        title={title}
        description={description}
        slug={slug}
        datePublished={datePublished}
        dateModified={dateModified || datePublished}
      />

      {/* Breadcrumb */}
      <div className="max-w-[720px] mx-auto px-6 pt-28 md:pt-32">
        <nav className="text-[0.8125rem] text-fg-muted flex items-center gap-1.5">
          <Link to="/" className="hover:text-fg transition-colors duration-200">Home</Link>
          <span className="text-fg-faint">/</span>
          <Link to="/blog" className="hover:text-fg transition-colors duration-200">Blog</Link>
          <span className="text-fg-faint">/</span>
          <span className="text-fg-secondary truncate max-w-[200px]">{headline.split(':')[0]}</span>
        </nav>
      </div>

      {/* Hero */}
      <header className="pt-8 pb-12 md:pb-16">
        <div className="max-w-[720px] mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 text-[0.8125rem] text-fg-muted mb-6">
              <time dateTime={datePublished}>{new Date(datePublished).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
              {readTime && <><span className="text-fg-faint">·</span><span>{readTime}</span></>}
            </div>
            <h1 className="font-display text-[2rem] md:text-[2.5rem] font-bold text-fg tracking-[-0.03em] leading-[1.1]" style={{ textWrap: 'balance' }}>
              {headline}
            </h1>
          </Reveal>

          {/* Opening paragraph — self-contained for GEO citation */}
          <Reveal delay={0.1}>
            <p className="text-fg-secondary text-[1.0625rem] mt-6 leading-[1.75] max-w-[64ch]" style={{ textWrap: 'pretty' }}>
              {opening}
            </p>
          </Reveal>
        </div>
      </header>

      {/* Article body */}
      <article className="pb-16">
        <div className="max-w-[720px] mx-auto px-6">
          {sections.map((section, i) => (
            <Reveal key={i} delay={0}>
              <section className="mt-12 first:mt-0">
                {section.heading && (
                  <h2 className="font-display text-[1.375rem] md:text-[1.5rem] font-bold text-fg tracking-[-0.02em] leading-[1.2] mb-5">
                    {section.heading}
                  </h2>
                )}

                {section.paragraphs && section.paragraphs.map((p, j) => (
                  <p key={j} className="text-fg-secondary text-[0.9375rem] leading-[1.75] mt-4 first:mt-0" style={{ textWrap: 'pretty' }}>
                    {p}
                  </p>
                ))}

                {section.bullets && (
                  <ul className="mt-4 space-y-2">
                    {section.bullets.map((item, j) => (
                      <li key={j} className="text-fg-secondary text-[0.9375rem] leading-[1.75] flex gap-2">
                        <span className="text-accent mt-1 shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.steps && (
                  <ol className="mt-4 space-y-3 list-decimal list-outside pl-5">
                    {section.steps.map((step, j) => (
                      <li key={j} className="text-fg-secondary text-[0.9375rem] leading-[1.75] pl-1">
                        {step}
                      </li>
                    ))}
                  </ol>
                )}

                {section.quote && (
                  <blockquote className="mt-6 border-l-2 border-accent/30 pl-5">
                    <p className="text-fg text-[1.0625rem] font-display leading-[1.5] tracking-[-0.01em]" style={{ textWrap: 'pretty' }}>
                      "{section.quote.text}"
                    </p>
                    <footer className="mt-2 text-[0.8125rem] text-fg-muted">
                      — {section.quote.author}, {section.quote.company}
                    </footer>
                  </blockquote>
                )}

                {section.table && (
                  <div className="mt-6 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-edge">
                          {section.table.headers.map((h, j) => (
                            <th key={j} className="py-3 px-4 text-[0.75rem] font-mono uppercase tracking-[0.05em] text-fg-muted first:pl-0">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, j) => (
                          <tr key={j} className="border-b border-edge-subtle">
                            {row.map((cell, k) => (
                              <td key={k} className="py-3 px-4 text-[0.8125rem] text-fg-secondary leading-relaxed first:pl-0 first:text-fg first:font-medium">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {section.callout && (
                  <div className="mt-6 rounded-xl bg-surface-1 border border-edge-subtle p-5">
                    <p className="text-[0.875rem] font-medium text-fg mb-1">{section.callout.title}</p>
                    <p className="text-[0.8125rem] text-fg-secondary leading-relaxed">{section.callout.text}</p>
                  </div>
                )}
              </section>
            </Reveal>
          ))}
        </div>
      </article>

      {/* Related posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="py-12 border-t border-edge-subtle">
          <div className="max-w-[720px] mx-auto px-6">
            <Reveal>
              <p className="text-fg-muted font-mono text-[0.6875rem] tracking-[0.05em] uppercase mb-5">Related</p>
              <div className="flex flex-col sm:flex-row gap-4">
                {relatedPosts.map(({ label, path }) => (
                  <Link
                    key={path}
                    to={path}
                    className="group flex-1 border border-edge rounded-xl px-5 py-4 hover:border-edge-hover hover:bg-surface-1 transition-all duration-200"
                  >
                    <span className="text-[0.875rem] text-fg font-medium group-hover:-translate-y-px inline-block transition-transform duration-200">
                      {label}
                    </span>
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-[720px] mx-auto px-6">
          <Reveal>
            <div className="max-w-[520px]">
              <h2 className="font-display text-[1.75rem] md:text-[2rem] font-bold text-fg tracking-[-0.03em] leading-[1.15]">
                See Altor investigate a real ticket
              </h2>
              <p className="text-fg-secondary text-[0.9375rem] mt-4 leading-relaxed" style={{ textWrap: 'pretty' }}>
                We'll connect to your systems and run a live investigation on a ticket from your queue. Your data, 2 minutes, real diagnosis.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="https://calendly.com/founders-altorlab/30min" size="lg">Book a demo</Button>
                <Button variant="secondary" size="lg" href="mailto:anshul@altorlab.com">Email us instead</Button>
              </div>
              <EmailCapture className="mt-10" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default BlogPost
