import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import PageHead from '../components/PageHead'

const ease = [0.25, 0.4, 0.25, 1]
const up = { hidden: { opacity: 0, y: 24 }, show: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: d * 0.08, ease } }) }

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

const INVESTIGATIONS = [
  {
    label: 'Rate limit regression',
    ticket: '"My API calls are returning 429s"',
    customer: 'acme-corp',
    steps: [
      { sys: 'clickhouse', finding: '429s spiked 12% → 43% (2h ago)', status: 'alert' },
      { sys: 'linear', finding: 'LIN-482 "rate limit regression" — open, urgent', status: 'warn' },
      { sys: 'stripe', finding: 'Plan active, usage within limits', status: 'ok' },
      { sys: 'github', finding: 'fix/rate-limit PR #891 — in review, ETA 3 days', status: 'ok' },
    ],
    diagnosis: 'Known bug LIN-482 causing elevated 429s. Patch in PR #891, shipping in 3 days.',
    draft: 'Hi — this is a known issue (LIN-482) causing intermittent\n429 errors. Fix shipping in ~3 days. Workaround: add retry\nlogic with backoff. See docs.portkey.ai/rate-limits',
    time: '94s',
  },
  {
    label: 'Latency spike',
    ticket: '"Dashboard is slow since this morning"',
    customer: 'series-b-co',
    steps: [
      { sys: 'clickhouse', finding: 'p95 latency jumped 340ms → 1.2s at 09:14 UTC', status: 'alert' },
      { sys: 'github', finding: 'Deploy #447 shipped at 09:12 UTC — new query in /analytics', status: 'warn' },
      { sys: 'linear', finding: 'No related bugs filed yet', status: 'ok' },
      { sys: 'statuspage', finding: 'All providers green. No upstream incidents.', status: 'ok' },
    ],
    diagnosis: 'Deploy #447 introduced an unindexed query in /analytics. Rollback or add index.',
    draft: 'Hi — we\'ve traced the slowdown to a deployment this morning\nthat introduced a heavier database query. Our team is pushing\na fix now and you should see latency return within the hour.',
    time: '78s',
  },
  {
    label: 'Webhook failure',
    ticket: '"Webhooks stopped delivering events"',
    customer: 'webhook-user',
    steps: [
      { sys: 'clickhouse', finding: 'Webhook delivery: 98% → 12% success (last 4h)', status: 'alert' },
      { sys: 'clickhouse', finding: 'Endpoint returning 503 — customer server unreachable', status: 'warn' },
      { sys: 'stripe', finding: 'Subscription active, quota not exceeded', status: 'ok' },
      { sys: 'statuspage', finding: 'AWS us-east-1 degraded — matches customer region', status: 'warn' },
    ],
    diagnosis: 'Customer endpoint down due to AWS us-east-1 degradation. Events queued for retry.',
    draft: 'Hi — your endpoint is returning 503 errors, which coincides\nwith ongoing AWS us-east-1 degradation. All failed events are\nqueued and will retry automatically once your endpoint recovers.',
    time: '112s',
  },
]

const statusColor = { alert: 'text-red-400', warn: 'text-amber-400', ok: 'text-emerald-400' }
const statusIcon = { alert: '!', warn: '~', ok: '✓' }

function InvestigationDemo() {
  const [active, setActive] = useState(0)
  const inv = INVESTIGATIONS[active]

  return (
    <div>
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1 no-scrollbar">
        {INVESTIGATIONS.map((inv, i) => (
          <button
            key={inv.label}
            type="button"
            onClick={() => setActive(i)}
            className="relative px-3 py-1.5 rounded-full text-[0.75rem] font-medium transition-colors duration-200 text-fg-secondary hover:text-fg whitespace-nowrap"
          >
            {active === i && (
              <motion.span
                layoutId="inv-pill"
                className="absolute inset-0 bg-fg rounded-full"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <span className={`relative z-10 ${active === i ? 'text-white' : ''}`}>{inv.label}</span>
          </button>
        ))}
      </div>

      <div className="terminal">
        <div className="terminal-bar">
          <div className="terminal-dot" /><div className="terminal-dot" /><div className="terminal-dot" />
          <span className="text-[0.6875rem] text-[#6b6c82] ml-2 font-mono">altor investigate</span>
          <span className="ml-auto text-[0.6875rem] text-[#34d399] font-mono">{inv.time}</span>
        </div>
        <div className="terminal-body">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.12, ease } }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } } }}
            >
              <motion.div
                variants={{ hidden: { opacity: 0, x: -6 }, show: { opacity: 1, x: 0, transition: { duration: 0.3, ease } } }}
                className="flex gap-3 mb-4"
              >
                <span className="t-dim shrink-0">$</span>
                <div>
                  <span className="t-white">{inv.ticket}</span>
                  <span className="t-dim"> · </span>
                  <span className="t-dim">{inv.customer}</span>
                </div>
              </motion.div>

              <div className="space-y-1.5 mb-4">
                {inv.steps.map((s) => (
                  <motion.div
                    key={`${s.sys}-${s.finding}`}
                    variants={{ hidden: { opacity: 0, x: -6 }, show: { opacity: 1, x: 0, transition: { duration: 0.3, ease } } }}
                    className="terminal-row"
                  >
                    <span className={`shrink-0 font-mono text-[0.75rem] ${statusColor[s.status]}`}>{statusIcon[s.status]}</span>
                    <span className="t-green shrink-0">{s.sys}</span>
                    <span className="t-dim">{s.finding}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                variants={{ hidden: { opacity: 0, x: -6 }, show: { opacity: 1, x: 0, transition: { duration: 0.3, ease } } }}
                className="pt-4 border-t border-[rgba(255,255,255,0.06)]"
              >
                <div><span className="t-green">✓ diagnosis</span></div>
                <div className="mt-1"><span className="t-white">{inv.diagnosis}</span></div>
              </motion.div>

              <motion.div
                variants={{ hidden: { opacity: 0, x: -6 }, show: { opacity: 1, x: 0, transition: { duration: 0.3, ease } } }}
                className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)]"
              >
                <div><span className="text-[#5cb8a5]">✉ draft reply</span></div>
                <div className="mt-1 text-[#9a9bb0] leading-relaxed whitespace-pre-wrap">{inv.draft}<span className="terminal-cursor" /></div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default function WorkSupportInvestigation() {
  return (
    <>
      <PageHead
        title="Support Investigation — Portkey Case Study | Altor"
        description="Portkey's support team spent 45 minutes per ticket manually investigating across ClickHouse, Linear, Stripe, and GitHub. After deploying Altor: 2 minutes. 200+ tickets. Zero workflow changes."
        slug="/work/support-investigation"
        datePublished="2026-04-14"
        dateModified="2026-04-14"
      />

      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] to-transparent pointer-events-none" />
        <W>
          <motion.div initial="hidden" animate="show">
            <motion.div variants={up} custom={0} className="flex items-center gap-3 mb-5">
              <Link to="/" className="font-mono text-[0.75rem] text-fg-muted tracking-[0.04em] hover:text-fg transition-colors">Altor</Link>
              <span className="text-fg-faint font-mono text-[0.75rem]">/</span>
              <span className="font-mono text-[0.75rem] text-fg-muted tracking-[0.04em]">Case Study · 2026</span>
              <span className="w-px h-3 bg-edge" />
              <span className="font-mono text-[0.75rem] text-accent tracking-[0.04em]">Support Intelligence</span>
            </motion.div>

            <motion.h1
              variants={up} custom={1}
              className="font-display font-black text-fg leading-[1.04] tracking-[-0.04em] mb-6"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
            >
              45 minutes to 2.
            </motion.h1>

            <motion.p
              variants={up} custom={2}
              className="text-fg-secondary text-[1rem] sm:text-[1.0625rem] leading-[1.7] max-w-[52ch] mb-5"
              style={{ textWrap: 'pretty' }}
            >
              Portkey's support team spent 45 minutes per ticket manually querying ClickHouse, Linear, Stripe,
              and GitHub to investigate production issues. After deploying Altor: 2 minutes.
              Across 200+ tickets. Zero changes to existing workflows.
            </motion.p>

            <motion.div variants={up} custom={3} className="flex flex-wrap gap-6 mb-12">
              {[
                { value: '45→2', label: 'minutes per investigation' },
                { value: '200+', label: 'tickets diagnosed' },
                { value: '2 wks', label: 'to first live investigation' },
                { value: '6', label: 'production systems' },
              ].map((s) => (
                <div key={s.label} className="flex items-baseline gap-2">
                  <span className="font-display font-black text-fg text-[1.75rem] tracking-[-0.03em] leading-none tabular-nums">{s.value}</span>
                  <span className="text-fg-muted text-[0.75rem]">{s.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={up} custom={4} className="max-w-[700px]">
              <p className="font-mono text-fg-muted text-[0.75rem] tracking-[0.05em] uppercase mb-4">Live investigation demo</p>
              <InvestigationDemo />
              <p className="text-fg-faint text-[0.75rem] font-mono mt-3">
                Real investigation types from Portkey's support queue. Times shown are actual medians.
              </p>
            </motion.div>
          </motion.div>
        </W>
      </section>

      <div className="border-y border-edge-subtle bg-surface-1 py-8">
        <W>
          <blockquote className="text-fg text-[1.0625rem] sm:text-[1.125rem] leading-[1.6] font-medium tracking-[-0.01em] max-w-[56ch]" style={{ textWrap: 'balance' }}>
            "Altor diagnosed in 2 minutes what used to take our engineers 45 minutes of copying data between tabs.
            Our tickets are investigations, not FAQs — nobody else could even attempt to answer them automatically."
          </blockquote>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-fg-secondary text-[0.8125rem]">Engineering Lead</span>
            <span className="text-fg-faint">·</span>
            <span className="text-accent text-[0.8125rem] font-medium">Portkey</span>
          </div>
        </W>
      </div>

      <section className="py-20 md:py-28">
        <W>
          <div className="grid lg:grid-cols-[1fr_1fr] gap-14 lg:gap-20">
            <Reveal>
              <h2 className="font-display font-bold text-fg text-[1.5rem] tracking-[-0.02em] leading-[1.15] mb-5">
                The problem: every ticket was a 45-minute debugging session.
              </h2>
              <div className="space-y-4 text-fg-secondary text-[0.9375rem] leading-[1.7]">
                <p>
                  Portkey is an AI gateway platform handling billions of API requests from AI-first companies.
                  Their customers are engineers — they don't file vague tickets. They report exact symptoms:
                  "my p95 latency jumped 200ms," "my Llama 3 fallback stopped firing," "I'm getting 429s from the gateway."
                </p>
                <p>
                  These tickets cannot be answered from a knowledge base. Every one required Portkey's team to open ClickHouse,
                  run queries against the customer's API logs, check Linear for known bugs, look at recent GitHub deploys,
                  and verify billing in Stripe. One ticket. Six browser tabs. 20–45 minutes. Every time.
                </p>
                <p>
                  At Portkey's scale, investigation time was the single largest bottleneck in their support operation.
                  Not response time. Not ticket routing. The investigation itself.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <h2 className="font-display font-bold text-fg text-[1.5rem] tracking-[-0.02em] leading-[1.15] mb-5">
                The deployment: 2 weeks from kickoff to production.
              </h2>
              <div className="space-y-3">
                {[
                  { week: 'Week 1', label: 'Stack audit', detail: 'Mapped Portkey\'s ClickHouse schema, Linear project structure, Stripe billing setup, and GitHub deploy cadence. Identified the top 5 ticket types by volume.' },
                  { week: 'Week 2', label: 'Integrations live', detail: 'Read-only connections established to all 6 systems. First investigations running on real tickets from Portkey\'s active queue.' },
                  { week: 'Weeks 3–4', label: 'Playbooks tuned', detail: 'Investigation logic refined against actual ticket patterns. By week 4, 80% of ticket types had reusable investigation playbooks. Median time: 2 minutes.' },
                ].map((s) => (
                  <div key={s.week} className="rounded-xl border border-edge bg-surface-1 p-5">
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="font-mono text-accent text-[0.75rem]">{s.week}</span>
                      <span className="font-display font-semibold text-fg text-[0.9375rem]">{s.label}</span>
                    </div>
                    <p className="text-fg-secondary text-[0.8125rem] leading-[1.65] pl-[0.1rem]">{s.detail}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </W>
      </section>

      <section className="py-16 md:py-20 bg-surface-1 border-y border-edge-subtle">
        <W>
          <Reveal>
            <div className="max-w-[680px]">
              <p className="font-mono text-fg-muted text-[0.75rem] tracking-[0.05em] uppercase mb-5">A real investigation</p>
              <h2 className="font-display font-bold text-fg text-[1.5rem] tracking-[-0.02em] leading-[1.15] mb-4">
                Rate limit regression. Diagnosed in 94 seconds.
              </h2>
              <p className="text-fg-secondary text-[0.9375rem] leading-[1.7] mb-6">
                Customer reports: "My API calls are returning 429s. This started about 2 hours ago."
                Altor receives the ticket and the customer's account ID. It runs the following in parallel:
              </p>
              <div className="space-y-2.5">
                {[
                  ['ClickHouse', '429 error rate for this customer spiked from 12% to 43% at 09:14 UTC. Spike on a specific endpoint.'],
                  ['Linear', 'LIN-482 "rate limit regression on /v1/chat" — open, priority urgent, assigned.'],
                  ['Stripe', 'Plan active, usage within limits. Not a billing-related rate limit.'],
                  ['GitHub', 'PR #891 "fix/rate-limit" — currently in review, expected merge in 3 days.'],
                ].map(([sys, finding]) => (
                  <div key={sys} className="flex gap-3.5 p-4 rounded-xl border border-edge bg-surface-0">
                    <span className="font-mono text-accent text-[0.8125rem] shrink-0 w-20">{sys}</span>
                    <p className="text-fg-secondary text-[0.8125rem] leading-relaxed">{finding}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 rounded-xl border border-accent/20 bg-accent/[0.03]">
                <p className="font-mono text-accent text-[0.75rem] tracking-[0.04em] mb-1.5">Diagnosis — 94 seconds</p>
                <p className="text-fg text-[0.875rem] leading-relaxed">
                  Known regression LIN-482 causing elevated 429s on /v1/chat since 09:14 UTC.
                  Patch in PR #891, ETA 3 days. Workaround: reduce concurrency or add exponential backoff. No billing issue involved.
                </p>
              </div>
            </div>
          </Reveal>
        </W>
      </section>

      <section className="py-20 md:py-28">
        <W>
          <Reveal>
            <div className="max-w-[640px] mb-12">
              <h2 className="font-display font-bold text-fg text-[1.5rem] tracking-[-0.02em] mb-4">The result.</h2>
              <p className="text-fg-secondary text-[0.9375rem] leading-[1.7]">
                After 200+ tickets diagnosed across all major ticket types, the investigation phase stopped being a bottleneck.
                Support agents receive a structured diagnosis before they finish reading the ticket.
                Engineers are no longer pulled in for routine investigations.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { value: '2 min', label: 'median investigation time', sub: 'down from 45 min' },
                { value: '200+', label: 'tickets diagnosed', sub: 'in production' },
                { value: '80%', label: 'investigation logic reusable', sub: 'across ticket types' },
                { value: 'zero', label: 'workflow changes', sub: 'at Portkey' },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-edge bg-surface-1 p-5">
                  <div className="font-display font-black text-fg text-[2rem] tracking-[-0.03em] leading-none mb-1.5 tabular-nums">{s.value}</div>
                  <div className="text-fg-secondary text-[0.8125rem] leading-snug">{s.label}</div>
                  <div className="text-fg-faint text-[0.75rem] mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </W>
      </section>

      <section className="py-16 md:py-20 border-t border-edge-subtle">
        <W>
          <Reveal>
            <div className="relative rounded-2xl border border-edge bg-surface-1 p-8 sm:p-12 overflow-hidden max-w-[680px]">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent pointer-events-none" />
              <div className="relative">
                <p className="font-mono text-accent text-[0.75rem] tracking-[0.05em] uppercase mb-4">Your stack looks like Portkey's.</p>
                <h2 className="font-display font-bold text-fg text-[1.5rem] tracking-[-0.02em] mb-4">
                  See what Altor finds in your queue.
                </h2>
                <p className="text-fg-secondary text-[0.9375rem] leading-[1.7] mb-8" style={{ textWrap: 'pretty' }}>
                  We'll connect to your systems and run a live investigation on a real ticket during the call.
                  Your data. Your stack. Diagnosed in real time.
                </p>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Button href="https://calendly.com/founders-altorlab/30min" size="lg">
                    Book a Demo — EST/PST
                  </Button>
                  <Link
                    to="/platform"
                    className="inline-flex items-center gap-1 text-[0.9375rem] text-fg-secondary hover:text-fg transition-colors link-underline"
                  >
                    How the platform works →
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </W>
      </section>
    </>
  )
}
