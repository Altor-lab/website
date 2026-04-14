import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import PageHead from '../components/PageHead'
import { blogPosts } from '../content/blog'

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

const posts = Object.values(blogPosts).sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished))

const CATEGORIES = {
  investigation: { label: 'Investigation', description: 'How production AI investigation works — systems, patterns, and findings from real deployments.' },
  operations: { label: 'Support Operations', description: 'Metrics, workflows, and benchmarks for B2B technical support teams.' },
  'ai-services': { label: 'Production AI', description: 'What it takes to move AI from demo to production — and why most projects fail.' },
}

const getCategory = (post) => {
  const slug = post.slug || ''
  if (slug.includes('investigation') || slug.includes('diagnosis') || slug.includes('clickhouse')) return 'investigation'
  if (slug.includes('support') || slug.includes('ticket') || slug.includes('escalation') || slug.includes('cost')) return 'operations'
  return 'ai-services'
}

const Blog = () => {
  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <>
      <PageHead
        title="Field Notes — Altor"
        description="Field notes on production AI systems, support investigation, and what we learn deploying AI at B2B SaaS companies. By the Altor team."
        slug="/blog"
        datePublished="2026-03-03"
      />

      <div className="max-w-[1080px] mx-auto px-6 pt-28 md:pt-36">
        <Reveal>
          <div className="mb-12">
            <span className="font-mono text-fg-muted text-[0.75rem] tracking-[0.05em] uppercase mb-3 block">
              From Altor
            </span>
            <h1
              className="font-display font-black text-fg tracking-[-0.04em] leading-[1.04] mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Field Notes.
            </h1>
            <p className="text-fg-secondary text-[1.0625rem] max-w-[44ch] leading-relaxed" style={{ textWrap: 'pretty' }}>
              What we learn deploying production AI systems — support investigation, workflow automation,
              and why most enterprise AI never ships.
            </p>
          </div>
        </Reveal>

        {featured && (
          <Reveal delay={0.1}>
            <Link
              to={featured.slug}
              className="group block mb-12 rounded-2xl border border-edge bg-surface-1 p-7 sm:p-10 hover:border-edge-hover transition-colors duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-[0.75rem] text-accent tracking-[0.04em]">
                  {CATEGORIES[getCategory(featured)]?.label ?? 'Field Note'}
                </span>
                <span className="w-px h-3 bg-edge" />
                <time className="font-mono text-[0.75rem] text-fg-muted" dateTime={featured.datePublished}>
                  {new Date(featured.datePublished).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </time>
                {featured.readTime && (
                  <>
                    <span className="w-px h-3 bg-edge" />
                    <span className="font-mono text-[0.75rem] text-fg-muted">{featured.readTime}</span>
                  </>
                )}
              </div>
              <h2
                className="font-display font-bold text-fg tracking-[-0.03em] leading-[1.15] mb-3 group-hover:text-accent transition-colors duration-200"
                style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)' }}
              >
                {featured.headline}
              </h2>
              <p className="text-fg-secondary leading-relaxed max-w-[60ch]" style={{ textWrap: 'pretty' }}>
                {featured.description}
              </p>
              <div className="mt-6 flex items-center gap-2 text-[0.875rem] text-fg-muted group-hover:text-accent transition-colors duration-200">
                <span>Read field note</span>
                <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
              </div>
            </Link>
          </Reveal>
        )}

        {rest.length > 0 && (
          <div className="mb-16">
            <Reveal>
              <h2 className="font-mono text-fg-muted text-[0.75rem] tracking-[0.05em] uppercase mb-5 pb-4 border-b border-edge-subtle">
                All field notes
              </h2>
            </Reveal>
            <div className="flex flex-col gap-0">
              {rest.map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.05}>
                  <Link
                    to={post.slug}
                    className="group flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 py-5 border-b border-edge-subtle hover:bg-surface-1 -mx-4 px-4 rounded-lg transition-colors duration-150"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span className="font-mono text-[0.6875rem] text-accent tracking-[0.04em]">
                          {CATEGORIES[getCategory(post)]?.label ?? 'Field Note'}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-fg text-[1rem] tracking-[-0.02em] leading-[1.3] group-hover:text-accent transition-colors duration-200 max-w-[52ch]">
                        {post.headline}
                      </h3>
                      <p className="text-fg-secondary text-[0.8125rem] mt-1.5 leading-relaxed max-w-[56ch]" style={{ textWrap: 'pretty' }}>
                        {post.description}
                      </p>
                    </div>
                    <div className="sm:text-right shrink-0 sm:ml-8 sm:pt-1">
                      <time className="font-mono text-[0.75rem] text-fg-muted" dateTime={post.datePublished}>
                        {new Date(post.datePublished).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </time>
                      {post.readTime && (
                        <p className="font-mono text-[0.6875rem] text-fg-faint mt-0.5">{post.readTime}</p>
                      )}
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        <Reveal delay={0.1}>
          <div className="mb-16 rounded-2xl border border-edge bg-surface-1 p-7 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="max-w-[38rem]">
                <span className="font-mono text-accent text-[0.75rem] tracking-[0.04em] mb-3 block">Subscribe</span>
                <h2 className="font-display font-bold text-fg text-[1.25rem] tracking-[-0.02em] mb-2">
                  Get new field notes in your inbox.
                </h2>
                <p className="text-fg-secondary text-[0.875rem] leading-relaxed">
                  When we publish something new — an investigation pattern, a deployment lesson,
                  a benchmark — it goes here first.
                </p>
              </div>
              <a
                href="mailto:anshul@altorlab.com?subject=Subscribe%20to%20Altor%20Field%20Notes"
                className="inline-flex items-center gap-2 rounded-lg border border-edge bg-surface-0 px-5 py-3 text-[0.875rem] font-medium text-fg hover:border-edge-hover hover:text-accent transition-colors duration-200 shrink-0"
              >
                Subscribe via email →
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  )
}

export default Blog
