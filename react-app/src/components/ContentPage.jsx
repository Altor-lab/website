import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import PageHead from './PageHead'
import Button from './Button'

const ease = [0.25, 0.4, 0.25, 1]

const Reveal = ({ children, className, delay = 0 }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const ComparisonTable = ({ title, subtitle, rows }) => (
  <section className="py-20 md:py-28">
    <div className="max-w-[1120px] mx-auto px-6">
      <Reveal>
        <h2 className="font-display text-[1.75rem] md:text-[2rem] font-bold text-fg tracking-[-0.03em] leading-[1.15]">
          {title}
        </h2>
        {subtitle && (
          <p className="text-fg-secondary text-[1rem] mt-4 max-w-[56ch] leading-relaxed" style={{ textWrap: 'pretty' }}>
            {subtitle}
          </p>
        )}
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-edge">
                <th className="py-3 pr-6 text-[0.75rem] font-mono uppercase tracking-[0.05em] text-fg-muted w-[160px]"></th>
                <th className="py-3 px-6 text-[0.75rem] font-mono uppercase tracking-[0.05em] text-fg-muted">Doc chatbot / Platform AI</th>
                <th className="py-3 pl-6 text-[0.75rem] font-mono uppercase tracking-[0.05em] text-accent">Altor</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-edge-subtle">
                  <td className="py-4 pr-6 text-[0.8125rem] font-medium text-fg">{row.dimension}</td>
                  <td className="py-4 px-6 text-[0.8125rem] text-fg-secondary leading-relaxed">{row.chatbot}</td>
                  <td className="py-4 pl-6 text-[0.8125rem] text-fg leading-relaxed font-medium">{row.altor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </div>
  </section>
)

const StatsBlock = ({ items }) => (
  <section className="py-16 md:py-20 border-y border-edge-subtle bg-surface-1">
    <div className="max-w-[1120px] mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
        {items.map((item, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div>
              <div className="font-display text-[1.75rem] md:text-[2rem] font-bold text-fg tracking-[-0.03em]">
                {item.value}
              </div>
              <p className="text-fg-secondary text-[0.8125rem] mt-1 leading-relaxed max-w-[24ch]" style={{ textWrap: 'pretty' }}>
                {item.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

const QuoteBlock = ({ text, author, company }) => (
  <section className="py-16 md:py-24">
    <div className="max-w-[1120px] mx-auto px-6">
      <Reveal>
        <blockquote className="max-w-[640px]">
          <p className="text-[1.25rem] md:text-[1.5rem] text-fg font-display leading-[1.4] tracking-[-0.02em]" style={{ textWrap: 'pretty' }}>
            "{text}"
          </p>
          <footer className="mt-4 text-[0.875rem] text-fg-muted">
            — {author}, {company}
          </footer>
        </blockquote>
      </Reveal>
    </div>
  </section>
)

const BodySection = ({ title, paragraphs, steps, bullets }) => (
  <section className="py-16 md:py-20">
    <div className="max-w-[1120px] mx-auto px-6">
      <Reveal>
        <div className="max-w-[680px]">
          <h2 className="font-display text-[1.5rem] md:text-[1.75rem] font-bold text-fg tracking-[-0.02em] leading-[1.2]">
            {title}
          </h2>
          {paragraphs.map((p, i) => (
            <p key={i} className="text-fg-secondary text-[0.9375rem] mt-5 leading-[1.7]" style={{ textWrap: 'pretty' }}>
              {p}
            </p>
          ))}
          {steps && (
            <ol className="mt-6 space-y-3 list-decimal list-outside pl-5">
              {steps.map((step, i) => (
                <li key={i} className="text-fg-secondary text-[0.9375rem] leading-[1.7] pl-1">
                  {step}
                </li>
              ))}
            </ol>
          )}
          {bullets && (
            <ul className="mt-6 space-y-2">
              {bullets.map((item, i) => (
                <li key={i} className="text-fg-secondary text-[0.9375rem] leading-[1.7] flex gap-2">
                  <span className="text-accent mt-1 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Reveal>
    </div>
  </section>
)

const CTASection = ({ title, body, buttonText, buttonUrl }) => (
  <section className="py-20 md:py-28">
    <div className="max-w-[1120px] mx-auto px-6">
      <Reveal>
        <div className="max-w-[520px]">
          <h2 className="font-display text-[1.75rem] md:text-[2rem] font-bold text-fg tracking-[-0.03em] leading-[1.15]">
            {title}
          </h2>
          <p className="text-fg-secondary text-[0.9375rem] mt-4 leading-relaxed" style={{ textWrap: 'pretty' }}>
            {body}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={buttonUrl} size="lg">{buttonText}</Button>
            <Button variant="secondary" size="lg" href="mailto:anshul@altorlab.com">
              Email us instead
            </Button>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
)

const ContentPage = ({ page }) => {
  const { title, description, slug, datePublished, dateModified, hero, sections, cta } = page

  return (
    <>
      <PageHead
        title={title}
        description={description}
        slug={slug}
        datePublished={datePublished}
        dateModified={dateModified}
      />

      {/* Breadcrumb */}
      <div className="max-w-[1120px] mx-auto px-6 pt-28 md:pt-32">
        <nav className="text-[0.8125rem] text-fg-muted flex items-center gap-1.5">
          <Link to="/" className="hover:text-fg transition-colors duration-200">Home</Link>
          <span className="text-fg-faint">/</span>
          <span className="text-fg-secondary">{title.split(' — ')[0]}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="pt-8 pb-16 md:pb-24">
        <div className="max-w-[1120px] mx-auto px-6">
          <Reveal>
            <h1 className="font-display text-[2rem] md:text-[2.75rem] font-bold text-fg tracking-[-0.03em] leading-[1.1] max-w-[18ch]" style={{ textWrap: 'balance' }}>
              {hero.headline}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-fg-secondary text-[1.0625rem] md:text-[1.125rem] mt-6 max-w-[64ch] leading-[1.7]" style={{ textWrap: 'pretty' }}>
              {hero.subhead}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Dynamic sections */}
      {sections.map((section, i) => {
        switch (section.type) {
          case 'comparison':
            return <ComparisonTable key={i} {...section} />
          case 'stats':
            return <StatsBlock key={i} items={section.items} />
          case 'quote':
            return <QuoteBlock key={i} {...section} />
          case 'body':
            return <BodySection key={i} {...section} />
          default:
            return null
        }
      })}

      {/* CTA */}
      <CTASection {...cta} />
    </>
  )
}

export default ContentPage
