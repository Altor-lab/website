import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import PageHead from '../components/PageHead'

const ease = [0.25, 0.4, 0.25, 1]
const up = { hidden: { opacity: 0, y: 20 }, show: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: d * 0.08, ease } }) }

const Reveal = ({ children, className }) => {
  const ref = useRef(null)
  const vis = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div ref={ref} className={className}>
      <motion.div variants={up} initial="hidden" animate={vis ? 'show' : 'hidden'}>{children}</motion.div>
    </div>
  )
}

const W = ({ children, className = '' }) => (
  <div className={`max-w-[1080px] mx-auto px-6 ${className}`}>{children}</div>
)

export default function Team() {
  return (
    <>
      <PageHead
        title="Our Team — Altor"
        description="Altor was founded by engineers from Microsoft AI Research and IIT Delhi who spent years watching brilliant support teams waste hours per ticket on manual investigation. We built the system they needed."
        slug="/team"
        datePublished="2026-04-14"
        dateModified="2026-04-14"
      />

      <section className="pt-32 pb-20 md:pt-44 md:pb-24">
        <W>
          <motion.div initial="hidden" animate="show">
            <motion.p variants={up} custom={0} className="font-mono text-fg-muted text-[0.75rem] tracking-[0.05em] uppercase mb-5">
              Our team
            </motion.p>
            <motion.h1
              variants={up} custom={1}
              className="font-display font-black text-fg leading-[1.04] tracking-[-0.04em] mb-6 max-w-[16ch]"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Built by engineers who lived the problem.
            </motion.h1>
            <motion.p
              variants={up} custom={2}
              className="text-fg-secondary text-[1.0625rem] leading-[1.7] max-w-[50ch]"
              style={{ textWrap: 'pretty' }}
            >
              Every production AI project we ran showed the same bottleneck: engineers spending 20–45 minutes
              per ticket manually copying data between systems that machines could query in seconds.
              We built Altor to automate that investigation — not as a product idea, but as a necessity we felt firsthand.
            </motion.p>
          </motion.div>
        </W>
      </section>

      <section className="py-16 md:py-24 bg-surface-1 border-y border-edge-subtle">
        <W>
          <div className="grid md:grid-cols-[1fr_1fr] gap-10 lg:gap-20">
            <Reveal>
              <div>
                <div className="w-16 h-16 rounded-2xl bg-accent/[0.08] border border-accent/20 flex items-center justify-center mb-6">
                  <span className="font-mono text-accent text-[1.25rem] font-bold">A</span>
                </div>
                <h2 className="font-display font-bold text-fg text-[1.375rem] tracking-[-0.02em] mb-1">Founder</h2>
                <p className="font-mono text-accent text-[0.8125rem] mb-5">ex-Microsoft AI Research · IIT Delhi CS</p>

                <div className="space-y-4 text-fg-secondary text-[0.9375rem] leading-[1.7]">
                  <p>
                    Started in AI research at Microsoft — building and shipping production AI systems across enterprise environments.
                    Spent years watching brilliant support teams at B2B companies waste hours per ticket on what machines could do in seconds.
                  </p>
                  <p>
                    Every company had the same pattern: a customer reports a production issue, an engineer opens 4–6 browser tabs,
                    manually queries ClickHouse, checks Linear for known bugs, verifies Stripe billing, and cross-references recent
                    GitHub deploys. Twenty to forty-five minutes. Every ticket. Every time.
                  </p>
                  <p>
                    The data existed. The APIs existed. The bottleneck was purely that no system was connecting them automatically.
                    Altor is that system.
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-2.5 text-[0.8125rem]">
                  <div className="flex items-center gap-2.5">
                    <span className="text-fg-faint font-mono">—</span>
                    <span className="text-fg-secondary">IIT Delhi, B.Tech Computer Science</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-fg-faint font-mono">—</span>
                    <span className="text-fg-secondary">Microsoft AI Research</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-fg-faint font-mono">—</span>
                    <span className="text-fg-secondary">Production AI systems across enterprise environments</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="space-y-6">
                <div className="rounded-xl border border-edge bg-surface-0 p-6">
                  <p className="font-mono text-fg-muted text-[0.6875rem] tracking-[0.05em] uppercase mb-3">The founding proof</p>
                  <blockquote className="text-fg text-[1.0625rem] leading-[1.65] font-medium tracking-[-0.01em]" style={{ textWrap: 'balance' }}>
                    "Altor diagnosed in 2 minutes what used to take our engineers 45 minutes of copying data between tabs.
                    Nobody else could even attempt to answer them automatically."
                  </blockquote>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-fg-secondary text-[0.8125rem]">Engineering Lead</span>
                    <span className="text-fg-faint">·</span>
                    <Link to="/customers/portkey" className="text-accent text-[0.8125rem] font-medium hover:opacity-75 transition-opacity">Portkey</Link>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: '200+', label: 'tickets diagnosed in production' },
                    { value: '45→2', label: 'minutes per investigation' },
                    { value: '3 wks', label: 'from kickoff to live system' },
                    { value: '6+', label: 'production systems connected' },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-edge bg-surface-0 p-4">
                      <div className="font-display font-black text-fg text-[1.5rem] tracking-[-0.03em] leading-none mb-1 tabular-nums">
                        {s.value}
                      </div>
                      <div className="text-fg-muted text-[0.75rem] leading-snug">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </W>
      </section>

      <section className="py-20 md:py-28">
        <W>
          <Reveal>
            <div className="max-w-[640px]">
              <h2 className="font-display font-bold text-fg text-[1.5rem] tracking-[-0.02em] mb-5">
                We're hiring.
              </h2>
              <p className="text-fg-secondary text-[1rem] leading-[1.7] mb-8" style={{ textWrap: 'pretty' }}>
                If you have experience deploying AI systems in production environments — not just building models,
                but shipping systems that handle real data and real edge cases — we want to talk.
                We're a small team doing serious work.
              </p>
              <Button href="mailto:anshul@altorlab.com?subject=Joining%20Altor" size="lg">
                Email us about roles →
              </Button>
            </div>
          </Reveal>
        </W>
      </section>
    </>
  )
}
