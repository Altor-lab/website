import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import TrustBar from '../components/TrustBar'
import { cn } from '../lib/utils'
import PageHead from '../components/PageHead'

const ease = [0.25, 0.4, 0.25, 1]
const up = {
  hidden: { opacity: 0, y: 24 },
  show: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: d * 0.09, ease } }),
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

const work = [
  {
    label: 'Case study — 2026',
    category: 'Support Intelligence',
    headline: '45 minutes to 2.',
    sub: 'Portkey\'s support team spent 45 minutes per ticket manually querying ClickHouse, Linear, Stripe, and GitHub. We built an AI investigation engine that does it in 2 minutes \u2014 deployed read-only across 6 production systems in 3 weeks.',
    metrics: [
      { value: '45→2', unit: 'min', label: 'per investigation' },
      { value: '200+', unit: '', label: 'tickets diagnosed' },
      { value: '3 wks', unit: '', label: 'to production' },
    ],
    tag: 'Portkey · AI Gateway',
    path: '/work/support-investigation',
    available: true,
  },
]

const capabilities = [
  {
    num: '01',
    title: 'Production AI Systems',
    body: 'We build AI systems that connect to your existing infrastructure and reason over live data — not systems that search docs or generate generic answers. Every system we deploy is in production, not demo.',
  },
  {
    num: '02',
    title: 'Forward Deployment',
    body: 'We don\'t hand off code and disappear. We embed alongside your team — mapping your stack, connecting your systems, building the playbooks. You own the outcome. We own the path to get there.',
  },
  {
    num: '03',
    title: 'Weeks to Production',
    body: 'Most AI projects take months to reach production. We scope the right problem first, then move from audit to live system in 3 weeks. Portkey\'s investigation engine was live in 14 days.',
  },
  {
    num: '04',
    title: 'Self-Improving Systems',
    body: 'The systems we build get smarter with use. Investigation playbooks refine against real data. After 200 tickets at Portkey, 80% of investigation logic was reusable across ticket types — without retraining.',
  },
]

const problems = [
  'Your engineers spend hours per ticket manually querying systems that machines can query in seconds',
  'Your AI pilots are in demo environments, not production — 95% of enterprise AI projects never ship',
  'Your team lacks the time to identify which workflows AI can actually transform, let alone build them',
  'Your existing vendors build around your current processes instead of redesigning them',
]

export default function Home() {
  const demoHref = 'https://calendly.com/founders-altorlab/30min'
  const emailWorkflowHref = 'mailto:anshul@altorlab.com?subject=AI%20Services%20Inquiry&body=Workflow%3A%20%0A%0ASample%20cases%3A%20%0A%0ATimeline%3A%20'

  return (
    <>
      <PageHead
        title="Altor — AI Systems Built and Deployed in 3 Weeks | US-Based"
        description="We identify your highest-cost manual workflow, build the AI investigation system, and deploy it to production in 3 weeks. Ex-Microsoft AI Research. US-based."
        slug="/"
        schemaType="WebPage"
      />
      {/* ━━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] to-transparent pointer-events-none" />
        <W>
          <motion.div initial="hidden" animate="show">
            <motion.div variants={up} custom={0} className="mb-6">
              <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/[0.06] px-3 py-1 text-[0.75rem] font-mono uppercase tracking-[0.05em] text-accent">
                AI Services · US-Based
              </span>
            </motion.div>

            <motion.h1
              variants={up} custom={1}
              className="font-display font-black text-fg leading-[1.04] tracking-[-0.04em] mb-7 max-w-[16ch]"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', textWrap: 'balance' }}
            >
              AI systems that{' '}
              <span className="text-accent">rearchitect</span>{' '}
              how you operate.
            </motion.h1>

            <motion.p
              variants={up} custom={2}
              className="text-[1rem] sm:text-[1.125rem] text-fg-secondary leading-[1.7] max-w-[48ch] mb-6"
              style={{ textWrap: 'pretty' }}
            >
              We identify your highest-cost manual workflow, build the AI system, and deploy it to production in 3 weeks — not demo.
            </motion.p>

            <motion.div variants={up} custom={3} className="flex items-center gap-2.5 mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
              <span className="text-[0.8125rem] text-fg-muted">
                Founded by ex-Microsoft AI Research · IIT Delhi Computer Science
              </span>
            </motion.div>

            <motion.div variants={up} custom={4} className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                to="/work/support-investigation"
                className="inline-flex items-center gap-2 rounded-xl bg-accent text-surface-0 font-semibold text-[0.9375rem] px-5 py-3 hover:opacity-90 transition-opacity"
              >
                See how we diagnosed Portkey →
              </Link>
              <Button href={emailWorkflowHref} size="lg" variant="ghost">Email your workflow</Button>
            </motion.div>
            <motion.p variants={up} custom={5} className="text-fg-muted text-[0.8125rem] mt-2">
              No sales call. Describe your workflow → get a 1-page automation plan back within 24 hours.
            </motion.p>
          </motion.div>
        </W>
      </section>

      <TrustBar />

      {/* ━━━ THE CLAIM ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="border-y border-edge-subtle bg-surface-1 py-10">
        <W>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-0 sm:justify-between sm:items-center">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[0.875rem] text-fg-secondary">
                  Every system we build is in production. Not demo.
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
                {[
                  { value: '100%', label: 'production success rate' },
                  { value: '3 wks', label: 'typical time to production' },
                  { value: '45→2 min', label: 'impact at Portkey' },
                ].map((s) => (
                  <div key={s.label} className="flex items-baseline gap-2.5">
                    <span className="font-display font-black text-fg text-[1.5rem] tracking-[-0.03em] leading-none">{s.value}</span>
                    <span className="text-[0.75rem] text-fg-muted">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-edge-subtle">
              <div>
                <p className="text-[0.75rem] font-mono text-fg-muted tracking-[0.04em] uppercase mb-2.5">Systems we connect to</p>
                <div className="flex flex-wrap gap-2">
                  {['ClickHouse', 'Linear', 'Stripe', 'GitHub', 'StatusPage', 'PagerDuty', 'Mintlify', 'Zendesk'].map((sys) => (
                    <span key={sys} className="inline-flex items-center rounded-full border border-edge bg-surface-0 px-3 py-1 text-[0.75rem] font-mono text-fg-secondary">
                      {sys}
                    </span>
                  ))}
                  <span className="inline-flex items-center rounded-full border border-edge-subtle px-3 py-1 text-[0.75rem] font-mono text-fg-faint">
                    + custom API
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 shrink-0">
                {['Read-only by default', 'Encrypted in transit', 'No model training'].map((t) => (
                  <div key={t} className="flex items-center gap-1.5">
                    <span className="text-accent text-[0.75rem]">✓</span>
                    <span className="text-[0.75rem] text-fg-muted">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </W>
      </div>

      {/* ━━━ THE PROBLEM ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Reveal className="py-24 md:py-36 bg-surface-1" id="the-problem">
        <W>
          <div className="grid lg:grid-cols-[1fr_1fr] gap-14 lg:gap-20 items-start">
            <div>
              <motion.p variants={up} custom={0} className="font-mono text-fg-muted text-[0.75rem] tracking-[0.05em] uppercase mb-5">
                The problem
              </motion.p>
              <motion.h2
                variants={up} custom={1}
                className="font-display font-bold text-fg leading-[1.08] tracking-[-0.03em] mb-6"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', textWrap: 'balance' }}
              >
                Most AI never reaches production. We build systems that do.
              </motion.h2>
              <motion.p variants={up} custom={2} className="text-fg-secondary text-[1rem] leading-[1.7]" style={{ textWrap: 'pretty' }}>
                The industry AI failure rate is 95%. Not because the models are bad — because
                the systems around them are wrong. Point solutions layered on broken processes.
                Demos that never ship. Vendors who hand off code and disappear.
              </motion.p>
              <motion.p variants={up} custom={3} className="text-fg-secondary text-[1rem] leading-[1.7] mt-4" style={{ textWrap: 'pretty' }}>
                We don't layer AI on existing processes. We rearchitect the processes themselves —
                then stay until the system is in production, delivering measurable impact.
              </motion.p>
            </div>

            <motion.div variants={up} custom={4} className="space-y-2.5">
              {problems.map((p) => (
                <div
                  key={p}
                  className="flex gap-3.5 p-4 rounded-xl border border-edge bg-surface-0 hover:border-edge-hover transition-colors duration-200"
                >
                  <span className="text-fg-faint font-mono text-[0.75rem] shrink-0 mt-[2px]">—</span>
                  <p className="text-fg-secondary text-[0.875rem] leading-[1.65]">{p}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </W>
      </Reveal>

      {/* ━━━ OUR WORK ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Reveal className="py-24 md:py-36" id="our-work">
        <W>
          <motion.p variants={up} custom={0} className="font-mono text-fg-muted text-[0.75rem] tracking-[0.05em] uppercase mb-5">
            Our work
          </motion.p>
          <motion.h2
            variants={up} custom={1}
            className="font-display font-bold text-fg leading-[1.08] tracking-[-0.03em] mb-14"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', textWrap: 'balance' }}
          >
            One system in production. More in progress.
          </motion.h2>

          {work.map((w, i) => (
            <motion.div key={w.headline} variants={up} custom={i + 2}>
              <Link to={w.path} className="group block rounded-2xl border border-edge bg-surface-1 p-7 sm:p-10 hover:border-edge-hover transition-colors duration-200">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="font-mono text-[0.75rem] text-fg-muted tracking-[0.04em]">{w.label}</span>
                      <span className="w-px h-3 bg-edge" />
                      <span className="font-mono text-[0.75rem] text-accent tracking-[0.04em]">{w.category}</span>
                    </div>
                    <h3
                      className="font-display font-black text-fg tracking-[-0.04em] leading-none mb-5 group-hover:text-accent transition-colors duration-200"
                      style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
                    >
                      {w.headline}
                    </h3>
                    <p className="text-fg-secondary text-[0.9375rem] leading-[1.7] max-w-[52ch]" style={{ textWrap: 'pretty' }}>
                      {w.sub}
                    </p>
                    <p className="mt-5 text-[0.8125rem] text-fg-muted font-mono">{w.tag}</p>
                  </div>

                  <div className="flex lg:flex-col gap-6 lg:gap-5 lg:items-end lg:min-w-[180px] lg:text-right">
                    {w.metrics.map((m) => (
                      <div key={m.label} className="flex flex-col gap-0.5">
                        <span className="font-display font-black text-fg text-[1.75rem] tracking-[-0.03em] leading-none tabular-nums">
                          {m.value}<span className="text-fg-muted text-[1rem]">{m.unit}</span>
                        </span>
                        <span className="text-[0.75rem] text-fg-muted">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-8 flex items-center gap-2 text-[0.875rem] text-fg-muted group-hover:text-accent transition-colors duration-200">
                  <span>Read case study</span>
                  <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
                </div>
              </Link>
            </motion.div>
          ))}

          <motion.div variants={up} custom={4} className="mt-4 rounded-2xl border border-dashed border-edge bg-surface-1/50 p-7 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div>
                <p className="font-mono text-[0.75rem] text-fg-muted tracking-[0.04em] mb-2">Next engagement</p>
                <h3 className="font-display font-bold text-fg text-[1.375rem] tracking-[-0.02em]">
                  We're taking on 2–3 new engagements in 2026.
                </h3>
                <p className="text-fg-secondary text-[0.875rem] leading-[1.65] mt-2 max-w-[44ch]">
                  If your team has a high-volume manual workflow and the engineering foundation to connect it,
                  we want to talk.
                </p>
              </div>
              <Button href={demoHref} size="lg" className="shrink-0">Start a Conversation</Button>
            </div>
          </motion.div>
        </W>
      </Reveal>

      {/* ━━━ WHAT WE AUTOMATE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Reveal className="py-20 md:py-28 bg-surface-1" id="what-we-automate">
        <W>
          <motion.p variants={up} custom={0} className="font-mono text-fg-muted text-[0.75rem] tracking-[0.05em] uppercase mb-5">
            Workflows we automate
          </motion.p>
          <motion.h2
            variants={up} custom={1}
            className="font-display font-bold text-fg leading-[1.08] tracking-[-0.03em] mb-12"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
          >
            Any workflow with data in systems and a human doing it manually.
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'Support investigation & triage', detail: 'Query logs, bug trackers, and billing to diagnose tickets in 2 min instead of 45' },
              { label: 'Customer ops exception handling', detail: 'Surface context and route escalations before they reach engineering' },
              { label: 'Finance ops reconciliation', detail: 'Cross-reference invoices, POs, and payment records to flag discrepancies automatically' },
              { label: 'Sales ops qualification', detail: 'Score and route inbound leads by querying CRM, web signals, and fit criteria' },
              { label: 'Internal IT & ops triage', detail: 'Resolve tier-1 requests and route tier-2 with full context already pulled' },
              { label: 'Any API-connected workflow', detail: 'If your data is in systems with APIs and a human is doing it manually, we can automate it' },
            ].map((item, i) => (
              <motion.div key={item.label} variants={up} custom={i + 2} className="rounded-xl border border-edge bg-surface-0 p-5 hover:border-edge-hover transition-colors duration-200">
                <h3 className="font-display font-semibold text-fg text-[0.9375rem] tracking-[-0.01em] mb-2">{item.label}</h3>
                <p className="text-fg-secondary text-[0.8125rem] leading-[1.65]">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </W>
      </Reveal>

      {/* ━━━ HOW WE WORK ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Reveal className="py-24 md:py-36 bg-surface-1" id="how-we-work">
        <W>
          <motion.p variants={up} custom={0} className="font-mono text-fg-muted text-[0.75rem] tracking-[0.05em] uppercase mb-5">
            How we work
          </motion.p>
          <motion.h2
            variants={up} custom={1}
            className="font-display font-bold text-fg leading-[1.08] tracking-[-0.03em] mb-14 max-w-[20ch]"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', textWrap: 'balance' }}
          >
            Forward-deployed. Outcome-aligned. Production-grade.
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-edge rounded-2xl overflow-hidden">
            {capabilities.map((c, i) => (
              <motion.div key={c.num} variants={up} custom={i + 2} className="bg-surface-0 p-6 sm:p-8">
                <span className="font-mono text-accent text-[0.75rem] tracking-[0.04em] mb-4 block">{c.num}</span>
                <h3 className="font-display font-bold text-fg text-[1rem] tracking-[-0.01em] mb-3">{c.title}</h3>
                <p className="text-fg-secondary text-[0.8125rem] leading-[1.7]">{c.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={up} custom={6} className="mt-8 grid md:grid-cols-3 gap-px bg-edge rounded-2xl overflow-hidden">
            {[
              { week: 'Week 1', label: 'Audit', detail: 'We map your stack, identify the highest-cost manual workflow, and define what "production" looks like for your team.' },
              { week: 'Week 2', label: 'Build & connect', detail: 'Read-only integrations live. First investigations running on real data from your systems. No synthetic test cases.' },
              { week: 'Weeks 3–4', label: 'Tune & hand over', detail: 'System logic refined against actual data patterns. Your team trained. Median impact measured and benchmarked.' },
            ].map((s, i) => (
              <motion.div key={s.week} variants={up} custom={i + 7} className="bg-surface-1 p-6 sm:p-8">
                <span className="font-mono text-accent text-[0.75rem] mb-2 block">{s.week}</span>
                <h3 className="text-fg font-semibold text-[0.9375rem] tracking-[-0.01em] mb-3">{s.label}</h3>
                <p className="text-fg-secondary text-[0.875rem] leading-[1.7]">{s.detail}</p>
              </motion.div>
            ))}
          </motion.div>
        </W>
      </Reveal>

      {/* ━━━ PROOF ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Reveal className="py-16 md:py-20">
        <W>
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start max-w-[960px]">
            {/* Proof card */}
            <motion.div variants={up} custom={0} className="rounded-2xl border border-edge bg-surface-1 p-7 sm:p-8">
              <p className="font-mono text-accent text-[0.75rem] tracking-[0.05em] uppercase mb-4">Case study — Portkey</p>
              <p className="text-fg-secondary text-[0.8125rem] leading-relaxed mb-5">
                Portkey is an AI gateway platform handling billions of API requests from AI-first engineering teams.
                Their support queue required querying ClickHouse, Linear, Stripe, and GitHub — every ticket, every time.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { before: '45 min', after: '2 min', label: 'per investigation' },
                  { before: 'manual', after: '200+ tickets', label: 'diagnosed automatically' },
                ].map(({ before, after, label }) => (
                  <div key={label} className="rounded-xl border border-edge bg-surface-0 p-3.5">
                    <div className="flex items-baseline gap-1.5 mb-0.5">
                      <span className="text-fg-faint text-[0.75rem] line-through">{before}</span>
                      <span className="text-fg font-display font-black text-[1.125rem] tracking-tight">{after}</span>
                    </div>
                    <p className="text-fg-muted text-[0.75rem]">{label}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[0.7rem] text-accent bg-accent/[0.08] border border-accent/20 rounded-full px-2 py-0.5">ClickHouse</span>
                <span className="font-mono text-[0.7rem] text-fg-muted bg-surface-0 border border-edge rounded-full px-2 py-0.5">Linear</span>
                <span className="font-mono text-[0.7rem] text-fg-muted bg-surface-0 border border-edge rounded-full px-2 py-0.5">Stripe</span>
                <span className="font-mono text-[0.7rem] text-fg-muted bg-surface-0 border border-edge rounded-full px-2 py-0.5">GitHub</span>
              </div>
              <blockquote className="text-fg-secondary text-[0.875rem] leading-relaxed italic mb-4 border-l-2 border-accent/30 pl-3">
                "Nobody else could even attempt to answer them automatically."
                <span className="not-italic text-fg-muted"> — Engineering Lead, Portkey</span>
              </blockquote>
              <Link to="/work/support-investigation" className="text-[0.8125rem] text-accent font-medium hover:opacity-75 transition-opacity">
                Read the full case study →
              </Link>
            </motion.div>

            {/* ICP checklist */}
            <motion.div variants={up} custom={1}>
              <p className="font-mono text-fg-muted text-[0.75rem] tracking-[0.05em] uppercase mb-5">Who we work best with</p>
              <div className="space-y-3">
                {[
                  { label: 'B2B SaaS with production support queues', detail: 'Tickets that require querying live systems — not just searching a knowledge base.' },
                  { label: 'Stacks with APIs: ClickHouse, Linear, Stripe, GitHub, Pylon, Zendesk, or similar', detail: 'If your data is in systems with APIs, we can connect to it.' },
                  { label: 'Recurring investigation patterns', detail: 'The same 5–10 ticket types, over and over. That\'s what we automate.' },
                  { label: 'Engineering teams who own the problem', detail: 'You understand your stack. We understand AI systems. We work best together.' },
                ].map(({ label, detail }) => (
                  <div key={label} className="flex gap-3 p-4 rounded-xl border border-accent/15 bg-accent/[0.02]">
                    <span className="text-accent text-[0.875rem] shrink-0 mt-0.5">✓</span>
                    <div>
                      <p className="text-fg text-[0.875rem] font-medium mb-0.5">{label}</p>
                      <p className="text-fg-secondary text-[0.8125rem] leading-relaxed">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <Link to="/work/support-investigation" className="inline-flex items-center gap-1.5 text-[0.875rem] text-fg-secondary hover:text-fg transition-colors">
                  Your stack looks like Portkey's — see what we built →
                </Link>
              </div>
            </motion.div>
          </div>
        </W>
      </Reveal>

      {/* ━━━ WHO WE WORK WITH ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Reveal className="py-24 md:py-36 bg-surface-1" id="who-we-work-with">
        <W>
          <div className="grid lg:grid-cols-[1fr_1fr] gap-14 lg:gap-24 items-start">
            <div>
              <motion.p variants={up} custom={0} className="font-mono text-fg-muted text-[0.75rem] tracking-[0.05em] uppercase mb-5">
                Who we work with
              </motion.p>
              <motion.h2
                variants={up} custom={1}
                className="font-display font-bold text-fg leading-[1.08] tracking-[-0.03em] mb-6"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', textWrap: 'balance' }}
              >
                B2B engineering teams with high-cost manual workflows.
              </motion.h2>
              <motion.p variants={up} custom={2} className="text-fg-secondary text-[1rem] leading-[1.7]" style={{ textWrap: 'pretty' }}>
                We work best with companies that have a clear, high-volume process costing real money —
                and the engineering foundation (logs, APIs, production data) to connect to.
                We are not a good fit for companies wanting incremental improvement or a SaaS tool.
              </motion.p>
            </div>

            <motion.div variants={up} custom={3} className="space-y-3">
              {[
                { fit: true, label: 'AI infrastructure and gateway companies', detail: 'Every customer ticket is a multi-system investigation. You have the logs. Your team shouldn\'t be running them manually.' },
                { fit: true, label: 'API-first developer tools', detail: 'SDK errors, webhook failures, and latency spikes require live data from 4–6 systems. That\'s our exact capability.' },
                { fit: true, label: 'Data and analytics platforms', detail: 'Pipeline failures and query issues live in your logs. Altor reads them, not your engineers.' },
                { fit: false, label: 'Companies wanting a SaaS tool to self-configure', detail: 'We are a services company. We build, deploy, and maintain. If you want software to deploy yourself, we are not the right fit.' },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`flex gap-3.5 p-4 rounded-xl border transition-colors duration-200 ${
                    item.fit
                      ? 'border-accent/20 bg-accent/[0.03] hover:border-accent/30'
                      : 'border-edge bg-surface-0 opacity-50'
                  }`}
                >
                  <span className={`font-mono text-[0.875rem] shrink-0 mt-[1px] ${item.fit ? 'text-accent' : 'text-fg-muted'}`}>
                    {item.fit ? '✓' : '✗'}
                  </span>
                  <div>
                    <p className={`text-[0.875rem] font-medium mb-1 ${item.fit ? 'text-fg' : 'text-fg-secondary'}`}>{item.label}</p>
                    <p className="text-fg-secondary text-[0.8125rem] leading-[1.6]">{item.detail}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </W>
      </Reveal>

      {/* ━━━ CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Reveal className="py-24 md:py-36">
        <W>
          <div className="relative rounded-2xl border border-edge bg-surface-1 p-8 sm:p-12 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent pointer-events-none" />
            <div className="relative max-w-[580px]">
              <motion.p variants={up} custom={0} className="font-mono text-fg-muted text-[0.75rem] tracking-[0.05em] uppercase mb-5">
                Get started
              </motion.p>
              <motion.h2
                variants={up} custom={1}
                className="font-display font-bold text-fg leading-[1.08] tracking-[-0.03em] mb-5"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', textWrap: 'balance' }}
              >
                Tell us about the workflow you want to rearchitect.
              </motion.h2>
              <motion.p variants={up} custom={2} className="text-fg-secondary text-[1rem] leading-[1.65] mb-10" style={{ textWrap: 'pretty' }}>
                We'll ask you about the workflow, the systems involved, and the cost of the current process.
                If it's a fit, we'll scope an engagement and be in production within 3 weeks.
              </motion.p>
              <motion.div variants={up} custom={3} className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <Button href={demoHref} size="lg">Start a Conversation</Button>
                <a
                  href={emailWorkflowHref}
                  className="text-fg-secondary hover:text-fg text-[0.9375rem] transition-colors link-underline"
                >
                  or email us your workflow →
                </a>
              </motion.div>
            </div>
          </div>
        </W>
      </Reveal>

    </>
  )
}
