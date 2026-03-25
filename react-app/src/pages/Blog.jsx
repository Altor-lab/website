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

const Blog = () => (
  <>
    <PageHead
      title="Blog — Altor"
      description="Insights on B2B technical support investigation, automation, and reducing ticket resolution time."
      slug="/blog"
      datePublished="2026-03-03"
    />

    <div className="max-w-[720px] mx-auto px-6 pt-28 md:pt-32">
      <Reveal>
        <h1 className="font-display text-[2rem] md:text-[2.5rem] font-bold text-fg tracking-[-0.03em] leading-[1.1]">
          Blog
        </h1>
        <p className="text-fg-secondary text-[1.0625rem] mt-4 max-w-[48ch] leading-relaxed">
          How B2B support teams are replacing manual investigation with automated diagnosis.
        </p>
      </Reveal>
    </div>

    <div className="max-w-[720px] mx-auto px-6 py-16">
      <div className="flex flex-col gap-1">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.06}>
            <Link
              to={post.slug}
              className="group block py-6 border-b border-edge-subtle first:border-t"
            >
              <div className="flex items-center gap-3 text-[0.75rem] text-fg-muted mb-2">
                <time dateTime={post.datePublished}>
                  {new Date(post.datePublished).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </time>
                {post.readTime && <><span className="text-fg-faint">·</span><span>{post.readTime}</span></>}
              </div>
              <h2 className="font-display text-[1.125rem] md:text-[1.25rem] font-bold text-fg tracking-[-0.02em] leading-[1.25] group-hover:text-accent transition-colors duration-200">
                {post.headline}
              </h2>
              <p className="text-fg-secondary text-[0.875rem] mt-2 leading-relaxed max-w-[56ch]" style={{ textWrap: 'pretty' }}>
                {post.description}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-12 rounded-xl border border-edge-subtle bg-surface-1 px-5 py-4">
          <p className="text-fg-muted font-mono text-[0.6875rem] tracking-[0.05em] uppercase mb-2">From the Altor ecosystem</p>
          <p className="text-[0.875rem] text-fg-secondary leading-relaxed" style={{ textWrap: 'pretty' }}>
            <a href="https://altorlab.dev" target="_blank" rel="noopener noreferrer" className="text-fg hover:text-accent transition-colors duration-200">altorlab.dev</a>
            {' '}— Client-side vector search {' | '}
            <a href="https://altorlab.app" target="_blank" rel="noopener noreferrer" className="text-fg hover:text-accent transition-colors duration-200">altorlab.app</a>
            {' '}— ADA compliance for D2C
          </p>
        </div>
      </Reveal>
    </div>
  </>
)

export default Blog
