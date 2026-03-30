import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Button from '../components/Button'
import EmailCapture from '../components/EmailCapture'
import FAQ from '../components/FAQ'
import { NumberTicker } from '../components/magicui/number-ticker'
import { content } from '../content'
import { cn } from '../lib/utils'

const ease = [0.25, 0.4, 0.25, 1]
const up = {
  hidden: { opacity: 0, y: 24 },
  show: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: d * 0.08, ease } }),
}

function Reveal({ children, className, id }) {
  const ref = useRef(null)
  const vis = useInView(ref, { once: true, margin: '-60px' })
  return (
    <section ref={ref} id={id} className={className}>
      <motion.div variants={up} initial="hidden" animate={vis ? 'show' : 'hidden'}>{children}</motion.div>
    </section>
  )
}

const W = ({ children, className }) => (
  <div className={cn('max-w-[1080px] mx-auto px-6', className)}>{children}</div>
)

const statusColor = {
  alert: 'text-red-400',
  warn: 'text-amber-400',
  ok: 'text-emerald-400',
}
const statusIcon = {
  alert: '!',
  warn: '~',
  ok: '✓',
}

export default function Home() {
  const [activeTab, setActiveTab] = useState(0)
  const demoRequestHref = 'mailto:anshul@altorlab.com?subject=Demo%20Request%20%E2%80%94%20Altor%20Support%20Investigation'
  const go = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const tab = content.investigation.tabs[activeTab]

  return (
    <>
      {/* ━━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] to-transparent pointer-events-none" />

        <W>
          <motion.div initial="hidden" animate="show">
            <motion.div variants={up} custom={0} className="mb-4">
              <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/[0.06] px-3 py-1 text-[0.75rem] font-mono uppercase tracking-[0.05em] text-accent">
                {content.hero.marketLabel}
              </span>
            </motion.div>

            <motion.div variants={up} custom={1} className="flex items-center gap-2.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[0.8125rem] text-fg-secondary">{content.hero.proof}</span>
            </motion.div>

            <motion.h1
              variants={up} custom={2}
              className="font-display font-black text-fg leading-[1.04] tracking-[-0.04em] mb-6"
              style={{ fontSize: 'clamp(2rem, 5.5vw, 4rem)', textWrap: 'balance' }}
            >
              {content.hero.headline[0]}{' '}
              <br className="hidden md:block" />
              <span className="text-accent">{content.hero.headline[1]}</span>
            </motion.h1>

            <motion.p
              variants={up} custom={3}
              className="text-[0.9375rem] sm:text-[1.0625rem] text-fg-secondary leading-[1.7] max-w-[52ch] mb-10"
              style={{ textWrap: 'pretty' }}
            >
              {content.hero.subhead}
            </motion.p>

            <motion.div variants={up} custom={4} className="mb-14 sm:mb-20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
                <Button href={demoRequestHref} size="lg">{content.hero.primaryCTA.text}</Button>
                <button type="button" onClick={go('how-it-works')} className="text-fg-secondary hover:text-fg text-[0.9375rem] transition-colors link-underline">
                  {content.hero.secondaryCTA.text}
                </button>
              </div>
              <p className="mt-4 text-[0.8125rem] text-fg-muted">{content.hero.supportHours}</p>
            </motion.div>

            {/* ── animated terminal ── */}
            <motion.div variants={up} custom={5} className="relative max-w-[720px]">
              <div className="hero-glow" />
              <div className="terminal relative z-10">
                <div className="terminal-bar">
                  <div className="terminal-dot" /><div className="terminal-dot" /><div className="terminal-dot" />
                  <span className="text-[0.6875rem] text-[#6b6c82] ml-2 font-mono">altor investigate</span>
                </div>
                <div className="terminal-body">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0, duration: 0.4, ease }}>
                    <div className="flex gap-3">
                      <span className="t-dim shrink-0">$</span>
                      <div>
                        <span className="t-white">ticket SUP-2847</span>
                        <span className="t-dim"> · </span>
                        <span className="t-dim">acme-corp</span>
                        <span className="t-dim"> · </span>
                        <span className="text-[#9a9bb0]">"my API calls are returning 429s"</span>
                      </div>
                    </div>
                  </motion.div>

                  <div className="mt-4 space-y-1">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.4, ease }}>
                      <div className="terminal-row"><span className="t-dim">→</span> <span className="t-green">clickhouse</span> <span className="t-dim ml-1">429s spiked 12% → 43% (2h ago)</span></div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0, duration: 0.4, ease }}>
                      <div className="terminal-row"><span className="t-dim">→</span> <span className="t-green">linear</span> <span className="t-dim ml-1">LIN-482 "rate limit bug" —</span> <span className="t-yellow">open</span></div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3, duration: 0.4, ease }}>
                      <div className="terminal-row"><span className="t-dim">→</span> <span className="t-green">stripe</span> <span className="t-dim ml-1">plan active, no billing issues</span></div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6, duration: 0.4, ease }}>
                      <div className="terminal-row"><span className="t-dim">→</span> <span className="t-green">github</span> <span className="t-dim ml-1">fix/rate-limit PR #891 — in review</span></div>
                    </motion.div>
                  </div>

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2, duration: 0.4, ease }}>
                    <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                      <div><span className="t-green">✓ diagnosis</span></div>
                      <div className="mt-1"><span className="t-white">Known bug LIN-482 causing 429 spike.</span></div>
                      <div><span className="text-[#9a9bb0]">Workaround in docs. Patch in PR #891, ETA 3 days.</span></div>
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.8, duration: 0.4, ease }}>
                    <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)]">
                      <div><span className="text-[#5cb8a5]">✉ draft reply</span></div>
                      <div className="mt-1 text-[#9a9bb0] leading-relaxed">
                        <span>Hi — this is a known issue (LIN-482) causing intermittent</span><br />
                        <span>429 errors. Fix shipping in ~3 days. Workaround: add retry</span><br />
                        <span>logic with backoff. See docs.portkey.ai/rate-limits</span>
                        <span className="terminal-cursor" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </W>
      </section>

      {/* ━━━ METRICS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="border-y border-edge-subtle bg-surface-1 py-10">
        <W>
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-0 sm:justify-between">
            {content.metrics.map((m) => (
              <div key={`${m.label}-${m.value}`} className="flex items-baseline gap-3 sm:flex-col sm:gap-1.5">
                <span className="font-display font-black text-[2rem] sm:text-[2.5rem] text-fg tracking-[-0.03em] tabular-nums leading-none">
                  <NumberTicker value={m.value} />{m.suffix}
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[0.8125rem] text-fg-muted">{m.label}</span>
                  {m.note && <span className="text-[0.6875rem] text-fg-faint">{m.note}</span>}
                </div>
              </div>
            ))}
          </div>
        </W>
      </div>

      {/* ━━━ SOCIAL PROOF ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Reveal className="py-16 md:py-20">
        <W>
          <motion.div variants={up} custom={0} className="max-w-[640px] mx-auto text-center">
            <blockquote className="text-[1.125rem] md:text-[1.25rem] text-fg leading-[1.6] tracking-[-0.01em] font-medium mb-5" style={{ textWrap: 'balance' }}>
              "{content.socialProof.quote}"
            </blockquote>
            <div className="flex items-center justify-center gap-2">
              <span className="text-[0.8125rem] text-fg-secondary">{content.socialProof.author}</span>
              <span className="text-fg-faint">·</span>
              <span className="text-[0.8125rem] text-accent font-medium">{content.socialProof.company}</span>
            </div>
          </motion.div>
        </W>
      </Reveal>

      {/* ━━━ THE GAP ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Reveal className="py-24 md:py-36 bg-surface-1" id="the-gap">
        <W>
          <motion.p variants={up} custom={0} className="text-fg-muted font-mono text-[0.75rem] tracking-[0.05em] uppercase mb-4">
            The problem
          </motion.p>

          <motion.h2
            variants={up} custom={1}
            className="font-display font-bold text-fg leading-[1.08] tracking-[-0.03em] mb-6 max-w-[600px]"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', textWrap: 'balance' }}
          >
            {content.gap.title}
          </motion.h2>

          <motion.p variants={up} custom={2} className="text-fg-secondary text-[1rem] leading-[1.7] max-w-[52ch] mb-12" style={{ textWrap: 'pretty' }}>
            {content.gap.body}
          </motion.p>

          {/* 80/20 bar */}
          <motion.div variants={up} custom={3} className="max-w-[480px] mb-12">
            <div className="flex h-1.5 rounded-full overflow-hidden">
              <div className="w-[80%] bg-accent/25 rounded-l-full" />
              <div className="w-[20%] bg-surface-3 rounded-r-full" />
            </div>
            <div className="flex justify-between mt-2.5">
              <span className="text-[0.75rem] text-accent font-medium">80% need live investigation</span>
              <span className="text-[0.75rem] text-fg-muted">20% answered by docs</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-[700px] mb-12">
            {content.gap.comparison.map((c) => (
              <motion.div
                key={c.label}
                variants={up}
                custom={content.gap.comparison.findIndex((item) => item.label === c.label) + 4}
                className={c.variant === 'dim' ? 'card p-5 md:p-6 opacity-50' : 'card-accent p-5 md:p-6'}
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <span className={`w-2 h-2 rounded-full ${c.variant === 'dim' ? 'bg-fg-muted' : 'bg-accent'}`} />
                  <h3 className="font-semibold text-[0.9375rem] text-fg tracking-[-0.01em]">{c.label}</h3>
                </div>
                <p className="text-fg-secondary text-[0.8125rem] leading-relaxed">{c.detail}</p>
              </motion.div>
            ))}
          </div>

          <motion.p variants={up} custom={6} className="text-accent font-semibold text-[1.125rem] tracking-[-0.01em] max-w-[52ch]">
            {content.gap.punchline}
          </motion.p>
        </W>
      </Reveal>

      {/* ━━━ HOW IT WORKS — TABBED INVESTIGATIONS ━━━━━━━━━━━━━━━ */}
      <Reveal className="py-24 md:py-36" id="how-it-works">
        <W>
          <motion.p variants={up} custom={0} className="text-fg-muted font-mono text-[0.75rem] tracking-[0.05em] uppercase mb-4">
            Investigation flow
          </motion.p>
          <motion.h2
            variants={up} custom={1}
            className="font-display font-bold text-fg leading-[1.08] tracking-[-0.03em] mb-5"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', textWrap: 'balance' }}
          >
            {content.investigation.title}
          </motion.h2>
          <motion.p variants={up} custom={2} className="text-fg-secondary text-[1rem] leading-[1.65] max-w-[52ch] mb-10" style={{ textWrap: 'pretty' }}>
            {content.investigation.subtitle}
          </motion.p>

          {/* Tabs */}
          <motion.div variants={up} custom={3} className="flex gap-2 mb-8 overflow-x-auto pb-2 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 no-scrollbar">
            {content.investigation.tabs.map((t, i) => (
              <button
                type="button"
                key={t.label}
                onClick={() => setActiveTab(i)}
                className="relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[0.75rem] sm:text-[0.8125rem] font-medium transition-colors duration-200 text-fg-secondary hover:text-fg whitespace-nowrap"
              >
                {activeTab === i && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 bg-fg rounded-full shadow-sm"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${activeTab === i ? 'text-white' : ''}`}>{t.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Investigation card — shell stays static, content animates */}
          <div className="terminal">
            <div className="terminal-bar">
              <div className="terminal-dot" /><div className="terminal-dot" /><div className="terminal-dot" />
              <span className="text-[0.6875rem] text-[#6b6c82] ml-2 font-mono">altor investigate</span>
            </div>
            <div className="terminal-body">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
                    exit: { opacity: 0, transition: { duration: 0.15, ease } },
                  }}
                >
                  {/* Ticket */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: -6 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.35, ease } },
                    }}
                    className="flex gap-3 mb-4"
                  >
                    <span className="t-dim shrink-0">$</span>
                    <div>
                      <span className="t-white">{tab.ticket}</span>
                      <span className="t-dim"> · </span>
                      <span className="t-dim">{tab.customer}</span>
                    </div>
                  </motion.div>

                  {/* Investigation steps */}
                  <div className="space-y-1.5">
                    {tab.steps.map((s) => (
                      <motion.div
                        key={`${s.system}-${s.finding}`}
                        variants={{
                          hidden: { opacity: 0, x: -6 },
                          show: { opacity: 1, x: 0, transition: { duration: 0.35, ease } },
                        }}
                        className="terminal-row"
                      >
                        <span className={`shrink-0 font-mono text-[0.75rem] ${statusColor[s.status]}`}>{statusIcon[s.status]}</span>
                        <span className="t-green shrink-0">{s.system}</span>
                        <span className="t-dim">{s.finding}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Diagnosis */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: -6 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.35, ease } },
                    }}
                    className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]"
                  >
                    <div><span className="t-green">✓ diagnosis</span></div>
                    <div className="mt-1"><span className="t-white">{tab.diagnosis}</span></div>
                  </motion.div>

                  {/* Draft reply */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: -6 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.35, ease } },
                    }}
                    className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)]"
                  >
                    <div><span className="text-[#5cb8a5]">✉ draft reply</span></div>
                    <div className="mt-1 text-[#9a9bb0] leading-relaxed whitespace-pre-wrap">{tab.draft}</div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <motion.div variants={up} custom={4} className="mt-8 md:mt-10 rounded-2xl border border-edge bg-surface-1 p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="max-w-[32rem]">
                <p className="text-fg-muted font-mono text-[0.75rem] tracking-[0.05em] uppercase mb-3">
                  Weekly insights
                </p>
                <h3 className="font-display font-bold text-fg tracking-[-0.02em] text-[1.375rem] mb-2">
                  Get weekly support engineering insights
                </h3>
                <p className="text-fg-secondary text-[0.9375rem] leading-[1.7]">
                  Short notes on ticket investigations, support automation, and what US technical teams are operationalizing now.
                </p>
              </div>

              <EmailCapture
                className="w-full max-w-[520px]"
                headline=""
                emailAddress="anshul@altorlab.com"
                subject="Altor Newsletter Signup"
                buttonLabel="Subscribe"
                placeholder="Your work email"
              />
            </div>
          </motion.div>
        </W>
      </Reveal>

      {/* ━━━ THE STACK ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Reveal className="py-24 md:py-36 bg-surface-1" id="the-stack">
        <W>
          <div className="grid lg:grid-cols-[360px_1fr] gap-12 lg:gap-24">
            <div>
              <motion.p variants={up} custom={0} className="text-fg-muted font-mono text-[0.75rem] tracking-[0.05em] uppercase mb-4">
                Integrations
              </motion.p>
              <motion.h2
                variants={up} custom={1}
                className="font-display font-bold text-fg leading-[1.08] tracking-[-0.03em] mb-5"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', textWrap: 'balance' }}
              >
                {content.stack.title}
              </motion.h2>
              <motion.p variants={up} custom={2} className="text-fg-secondary leading-[1.65] max-w-[52ch] mb-6" style={{ textWrap: 'pretty' }}>
                {content.stack.subtitle}
              </motion.p>
              <motion.p variants={up} custom={3} className="text-[0.8125rem] text-fg-muted leading-relaxed">
                {content.stack.footnote}
              </motion.p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {content.stack.integrations.map((int, i) => (
                <motion.div key={int.name} variants={up} custom={i + 3} className="card p-5 group">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent transition-colors duration-200" />
                    <h3 className="font-mono text-accent text-[0.875rem] font-medium">{int.name}</h3>
                  </div>
                  <p className="text-fg-secondary text-[0.8125rem] leading-relaxed pl-4">{int.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </W>
      </Reveal>

      {/* ━━━ TRUST MODEL ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Reveal className="py-24 md:py-36 bg-surface-1" id="trust">
        <W>
          <div className="grid lg:grid-cols-[1fr_1fr] gap-14 lg:gap-24 items-start">
            <div>
              <motion.p variants={up} custom={0} className="text-fg-muted font-mono text-[0.75rem] tracking-[0.05em] uppercase mb-4">
                Trust &amp; safety
              </motion.p>
              <motion.h2
                variants={up} custom={1}
                className="font-display font-bold text-fg leading-[1.08] tracking-[-0.03em] mb-6"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', textWrap: 'balance' }}
              >
                {content.trust.title}
              </motion.h2>
              <motion.p variants={up} custom={2} className="text-fg-secondary text-[1rem] leading-[1.7] max-w-[52ch] mb-5" style={{ textWrap: 'pretty' }}>
                {content.trust.body}
              </motion.p>
              <motion.p variants={up} custom={3} className="text-[0.8125rem] text-fg-muted leading-relaxed border-l-2 border-edge pl-4 max-lg:border-l-0 max-lg:border-t max-lg:border-edge max-lg:pt-4 max-lg:pl-0">
                {content.trust.security}
              </motion.p>
            </div>

            <motion.div variants={up} custom={3} className="space-y-3">
              {content.trust.levels.map((l) => (
                <div
                  key={l.label}
                  className={`rounded-xl p-4 sm:p-5 border transition-colors duration-200 ${
                    l.accent
                      ? 'border-accent/25 bg-accent/[0.04]'
                      : 'border-edge bg-surface-2 hover:border-edge-hover'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className={`text-[0.8125rem] ${l.accent ? 'text-accent' : 'text-fg-faint'}`}>
                      {l.label === 'Read' ? '◉' : l.label === 'Write' ? '◎' : '○'}
                    </span>
                    <span className={`text-[0.9375rem] font-mono font-medium ${l.accent ? 'text-accent' : 'text-fg-secondary'}`}>
                      {l.label}
                    </span>
                  </div>
                  <p className="text-fg-secondary text-[0.8125rem] leading-relaxed pl-[1.625rem]">{l.detail}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </W>
      </Reveal>

      {/* ━━━ ONBOARDING ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Reveal className="py-24 md:py-36 bg-surface-1" id="onboarding">
        <W>
          <motion.p variants={up} custom={0} className="text-fg-muted font-mono text-[0.75rem] tracking-[0.05em] uppercase mb-4">
            Getting started
          </motion.p>
          <motion.h2
            variants={up} custom={1}
            className="font-display font-bold text-fg leading-[1.08] tracking-[-0.03em] mb-5"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', textWrap: 'balance' }}
          >
            {content.onboarding.title}
          </motion.h2>
          <motion.p variants={up} custom={2} className="text-fg-secondary text-[1rem] leading-[1.65] max-w-[52ch] mb-14" style={{ textWrap: 'pretty' }}>
            {content.onboarding.body}
          </motion.p>

          <div className="grid md:grid-cols-3 gap-px bg-edge rounded-xl overflow-hidden">
            {content.onboarding.steps.map((s, i) => (
              <motion.div key={s.week} variants={up} custom={i + 3} className="bg-surface-0 p-5 sm:p-8">
                <span className="font-mono text-accent text-[0.75rem] mb-2 block">{s.week}</span>
                <h3 className="text-fg font-semibold text-[1rem] tracking-[-0.01em] mb-3">{s.label}</h3>
                <p className="text-fg-secondary text-[0.875rem] leading-[1.7]">{s.detail}</p>
              </motion.div>
            ))}
          </div>
        </W>
      </Reveal>

      {/* ━━━ AUDIENCE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Reveal className="py-24 md:py-36" id="who-its-for">
        <W>
          <motion.h2
            variants={up} custom={0}
            className="font-display font-bold text-fg leading-[1.08] tracking-[-0.03em] mb-14"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', textWrap: 'balance' }}
          >
            {content.audience.title}
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-edge rounded-xl overflow-hidden">
            {content.audience.groups.map((g, i) => (
              <motion.div key={g.name} variants={up} custom={i + 1} className="bg-surface-1 p-5 sm:p-7">
                <span className="font-mono text-accent text-[0.75rem] mb-3 block">0{i + 1}</span>
                <h3 className="text-fg font-semibold text-[0.9375rem] tracking-[-0.01em] mb-3">{g.name}</h3>
                <p className="text-fg-secondary text-[0.8125rem] leading-[1.7]">{g.description}</p>
              </motion.div>
            ))}
          </div>
        </W>
      </Reveal>

      {/* ━━━ FAQ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Reveal className="py-24 md:py-36 bg-surface-1" id="faq">
        <W>
          <div className="grid lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">
            <div>
              <motion.h2
                variants={up} custom={0}
                className="font-display font-bold text-fg leading-[1.08] tracking-[-0.03em]"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', textWrap: 'balance' }}
              >
                Common questions
              </motion.h2>
            </div>
            <motion.div variants={up} custom={1}>
              <FAQ items={content.faq} />
            </motion.div>
          </div>
        </W>
      </Reveal>

      {/* ━━━ CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Reveal className="py-24 md:py-36">
        <W>
          <div className="relative rounded-2xl border border-edge bg-surface-1 p-6 sm:p-10 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent pointer-events-none" />
            <div className="relative">
              <motion.h2
                variants={up} custom={0}
                className="font-display font-bold text-fg leading-[1.08] tracking-[-0.03em] mb-5"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', textWrap: 'balance' }}
              >
                {content.cta.title}
              </motion.h2>
              <motion.p variants={up} custom={1} className="text-fg-secondary text-[1rem] leading-[1.65] max-w-[52ch] mb-10" style={{ textWrap: 'pretty' }}>
                {content.cta.body}
              </motion.p>
              <motion.div variants={up} custom={2} className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <Button href={demoRequestHref} size="lg">{content.cta.buttonText}</Button>
                <a href={`mailto:${content.cta.email}`} className="text-fg-secondary hover:text-fg text-[0.9375rem] transition-colors link-underline">
                  or email us
                </a>
              </motion.div>
              <motion.div variants={up} custom={3} className="mt-8">
                <EmailCapture
                  headline="Get weekly support engineering insights"
                  emailAddress="anshul@altorlab.com"
                  subject="Altor Newsletter Signup"
                  buttonLabel="Subscribe"
                  placeholder="Your work email"
                />
              </motion.div>
            </div>
          </div>
        </W>
      </Reveal>

      <a
        href="mailto:anshul@altorlab.com?subject=Demo%20Request"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-edge bg-surface-0/95 px-4 py-3 text-[0.875rem] font-medium text-fg shadow-[0_12px_32px_rgba(0,0,0,0.14)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-px hover:border-edge-hover hover:text-accent sm:bottom-6 sm:right-6"
      >
        <span aria-hidden="true">📧</span>
        <span>Book Demo</span>
      </a>
    </>
  )
}
