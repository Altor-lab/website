import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import PageHead from '../components/PageHead'
import TrustBar from '../components/TrustBar'
import { cn } from '../lib/utils'

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
      <motion.div variants={up} initial="hidden" animate={vis ? 'show' : 'hidden'}>
        {children}
      </motion.div>
    </section>
  )
}

const W = ({ children, className }) => (
  <div className={cn('max-w-[1080px] mx-auto px-6', className)}>{children}</div>
)

const WORKFLOWS = [
  {
    label: 'Support investigation & triage',
    detail: 'Query logs, bug trackers, and billing to diagnose tickets in 2 min instead of 45',
    verticals: 'Fintech · SaaS · Legal',
  },
  {
    label: 'Finance ops reconciliation',
    detail: 'Cross-reference invoices, POs, and payment records — flag discrepancies automatically',
    verticals: 'Fintech · Proptech · Media',
  },
  {
    label: 'Sales ops qualification',
    detail: 'Score and route inbound leads by querying CRM, web signals, and fit criteria',
    verticals: 'SaaS · Adtech · HealthTech',
  },
  {
    label: 'Customer ops exception handling',
    detail: 'Surface context and route escalations before they reach your engineering team',
    verticals: 'SaaS · Fintech · Legal',
  },
  {
    label: 'Legal & compliance document review',
    detail: 'Extract terms, flag non-standard clauses, summarise risk — without the 4-hour read',
    verticals: 'Legal · Fintech · HealthTech',
  },
  {
    label: 'Any API-connected manual workflow',
    detail: 'If your data is in systems with APIs and a human is doing it manually, we can automate it',
    verticals: 'All verticals',
  },
]

const VERTICALS = [
  {
    name: 'Fintech & Financial Services',
    pain: 'Manual underwriting, reconciliation, compliance reporting, and KYC processing.',
    why: 'Highest tolerance for AI spend. Strongest ROI case. NYC is the global fintech capital.',
  },
  {
    name: 'Legal & Professional Services',
    pain: 'Document review, client intake, case status queries, time tracking.',
    why: 'High hourly rates mean automation ROI is obvious. BigLaw is headquartered here.',
  },
  {
    name: 'Media, Adtech & Publishing',
    pain: 'Campaign reporting, lead routing, content ops, client communication.',
    why: 'Fast-moving industry, high operational complexity, quarterly budget cycles.',
  },
  {
    name: 'HealthTech & Biotech',
    pain: 'Patient intake, clinical documentation, billing, scheduling.',
    why: 'Fastest-growing NYC sector. Compliance-first mindset matches how we build.',
  },
  {
    name: 'B2B SaaS & Developer Tools',
    pain: 'Support investigation, webhook failures, SDK errors, billing discrepancies.',
    why: 'Engineering-led buyers. Fast decisions. Portkey is our proof of concept.',
  },
]

const faqSchema = {
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the NYC Workflow Audit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A free 30-minute scoping call where we identify your highest-cost manual workflow, map the systems involved, and return a 1-page automation plan within 24 hours — no sales deck, no obligation.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly can Altor deploy a production AI system in NYC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Week 1: stack audit and integration setup. Week 2: first live investigations on real data. Weeks 3–4: system tuned and handed over. Most NYC clients are in production within 3 weeks of kickoff.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which NYC industries does Altor work with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fintech, legal and professional services, media and adtech, healthtech and biotech, and B2B SaaS. Any company with a high-volume manual workflow and an API-connected data stack.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Altor work with regulated NYC industries like finance and healthcare?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We are read-only by default, use no training data from client systems, and work within your existing security perimeter. We can provide DPA and security documentation for regulated engagements.',
      },
    },
  ],
}

export default function NYC() {
  return (
    <>
      <PageHead
        title="NYC Workflow Audit — 1-Page Automation Plan in 24 Hours | Altor"
        description="Altor is in New York. Get a free 30-minute workflow audit and a 1-page AI automation plan within 24 hours. Production AI systems deployed in 3 weeks for NYC fintech, legal, media, and SaaS teams."
        slug="/nyc"
        datePublished="2026-04-20"
        dateModified="2026-04-20"
        schemaType="WebPage"
        breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'NYC', url: null }]}
        extraSchema={[faqSchema]}
      />

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="pt-28 pb-24 md:pt-36 md:pb-32">
        <W>
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.09 } } }}
            className="max-w-[760px]"
          >
            <motion.p variants={up} custom={0}
              className="font-mono text-fg-muted text-[0.75rem] tracking-[0.05em] uppercase mb-5 flex items-center gap-2"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Altor is in New York
            </motion.p>

            <motion.h1
              variants={up} custom={1}
              className="font-display font-bold text-fg leading-[1.06] tracking-[-0.03em] mb-6"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', textWrap: 'balance' }}
            >
              NYC Workflow Audit.
              <br />
              <span className="text-accent">1-page automation plan in 24 hours.</span>
            </motion.h1>

            <motion.p variants={up} custom={2}
              className="text-fg-secondary text-[1.0625rem] leading-[1.75] max-w-[56ch] mb-10"
              style={{ textWrap: 'pretty' }}
            >
              Tell us the workflow that costs your team the most time.
              We'll map the systems involved and send back a 1-page automation plan —
              what to build, what it connects to, and what it saves — within 24 hours.
              No sales call. No obligation.
            </motion.p>

            <motion.div variants={up} custom={3} className="flex flex-col sm:flex-row gap-3 items-start">
              <Button
                as="a"
                href="mailto:anshul@altorlab.com?subject=NYC%20Workflow%20Audit&body=Hi%2C%0A%0AWorkflow%20I%27d%20like%20audited%3A%0A%0ASystems%20involved%3A%0A%0ATeam%20size%3A"
                variant="primary"
                size="lg"
              >
                Email us your workflow →
              </Button>
              <Button
                as="a"
                href="https://calendly.com/founders-altorlab/30min"
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                size="lg"
              >
                Book a 30-min call
              </Button>
            </motion.div>

            <motion.p variants={up} custom={4}
              className="mt-4 text-fg-muted text-[0.8125rem]"
            >
              Describe your workflow → get a 1-page automation plan within 24 hours. If it's a fit, we deploy in 3 weeks.
            </motion.p>
          </motion.div>
        </W>
      </section>

      <TrustBar />

      {/* ── PROOF BAR ───────────────────────────────────────────────────── */}
      <Reveal className="py-10 border-y border-edge bg-surface-1">
        <W>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-edge">
            {[
              { stat: '45→2', label: 'minutes per investigation at Portkey' },
              { stat: '3 wks', label: 'typical time to production' },
              { stat: '200+', label: 'tickets diagnosed in production' },
              { stat: '100%', label: 'production success rate' },
            ].map(({ stat, label }) => (
              <div key={stat} className="text-center md:px-8">
                <p className="font-display font-bold text-fg text-[1.75rem] tracking-[-0.03em]">{stat}</p>
                <p className="text-fg-muted text-[0.8rem] mt-1">{label}</p>
              </div>
            ))}
          </div>
        </W>
      </Reveal>

      {/* ── THE OFFER ───────────────────────────────────────────────────── */}
      <Reveal className="py-20 md:py-28">
        <W>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <motion.p variants={up} custom={0}
                className="font-mono text-fg-muted text-[0.75rem] tracking-[0.05em] uppercase mb-4"
              >
                What you get
              </motion.p>
              <motion.h2 variants={up} custom={1}
                className="font-display font-bold text-fg text-[1.75rem] tracking-[-0.025em] leading-[1.1] mb-6"
                style={{ textWrap: 'balance' }}
              >
                The Workflow Audit.<br />Free. In 24 hours.
              </motion.h2>
              <motion.div variants={up} custom={2} className="space-y-4">
                {[
                  {
                    n: '01',
                    label: 'You describe the workflow',
                    body: 'The process, the systems involved, how many times a week it happens, what a human does today.',
                  },
                  {
                    n: '02',
                    label: 'We map it',
                    body: 'We identify the data sources, integration points, and where AI replaces the manual steps.',
                  },
                  {
                    n: '03',
                    label: 'You get a 1-page plan',
                    body: 'What to build, what it connects to, how long it takes, and what it saves — within 24 hours.',
                  },
                  {
                    n: '04',
                    label: 'If it\'s a fit, we deploy in 3 weeks',
                    body: 'Audit to live production system. No synthetic demos. Connected to your real data from week 1.',
                  },
                ].map(({ n, label, body }) => (
                  <motion.div key={n} variants={up} className="flex gap-4">
                    <span className="font-mono text-accent text-[0.75rem] mt-1 flex-shrink-0 w-6">{n}</span>
                    <div>
                      <p className="text-fg text-[0.9375rem] font-semibold leading-snug mb-1">{label}</p>
                      <p className="text-fg-secondary text-[0.875rem] leading-[1.65]">{body}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div variants={up} custom={2}
              className="rounded-2xl border border-edge bg-surface-1 p-7 md:p-8 sticky top-24"
            >
              <p className="font-mono text-accent text-[0.75rem] tracking-[0.04em] mb-4">
                Available in NYC now
              </p>
              <h3 className="font-display font-bold text-fg text-[1.375rem] tracking-[-0.02em] leading-[1.15] mb-3">
                Get your 1-page<br />automation plan
              </h3>
              <p className="text-fg-secondary text-[0.875rem] leading-[1.65] mb-6">
                Email us a description of the workflow. We reply with a structured automation plan
                within 24 hours — what to build, what it connects to, what it saves.
                No call needed to get the plan.
              </p>
              <div className="space-y-3">
                <a
                  href="mailto:anshul@altorlab.com?subject=NYC%20Workflow%20Audit&body=Hi%2C%0A%0AWorkflow%3A%0A%0ASystems%20involved%3A%0A%0AFrequency%2Fvolume%3A%0A%0ATeam%20size%3A"
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-accent text-surface-0 font-semibold text-[0.9375rem] py-3.5 hover:opacity-90 transition-opacity"
                >
                  Email your workflow →
                </a>
                <a
                  href="https://calendly.com/founders-altorlab/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-xl border border-edge text-fg font-medium text-[0.9375rem] py-3.5 hover:border-accent/40 hover:bg-surface-2 transition-colors"
                >
                  Book a 30-min call
                </a>
              </div>
              <p className="text-fg-muted text-[0.75rem] text-center mt-4">
                Or text directly: available in Flatiron, Midtown, DUMBO
              </p>
              <p className="text-fg-muted text-[0.75rem] text-center mt-3 leading-relaxed border-t border-edge pt-3">
                In person: 30 minutes → you leave with a clear picture of whether Altor fits your workflow and what we'd build. Not a deck.
              </p>
            </motion.div>
          </div>
        </W>
      </Reveal>

      {/* ── PORTKEY QUOTE ───────────────────────────────────────────────── */}
      <Reveal className="py-16 md:py-20 border-y border-edge bg-surface-1">
        <W className="max-w-[760px]">
          <motion.blockquote variants={up} custom={0}
            className="text-fg text-[1.125rem] md:text-[1.3125rem] leading-[1.65] font-light italic"
          >
            "Altor diagnosed in 2 minutes what used to take our engineers 45 minutes of copying
            data between tabs. Nobody else could even attempt to answer them automatically."
          </motion.blockquote>
          <motion.p variants={up} custom={1}
            className="mt-5 font-mono text-fg-muted text-[0.75rem] tracking-[0.05em] uppercase"
          >
            Engineering Lead · Portkey · New York
          </motion.p>
        </W>
      </Reveal>

      {/* ── WORKFLOWS ───────────────────────────────────────────────────── */}
      <Reveal className="py-20 md:py-28">
        <W>
          <motion.p variants={up} custom={0}
            className="font-mono text-fg-muted text-[0.75rem] tracking-[0.05em] uppercase mb-4"
          >
            What we automate
          </motion.p>
          <motion.h2 variants={up} custom={1}
            className="font-display font-bold text-fg text-[1.75rem] tracking-[-0.025em] leading-[1.1] mb-10 max-w-[480px]"
            style={{ textWrap: 'balance' }}
          >
            Any high-cost manual workflow with data in systems.
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-4">
            {WORKFLOWS.map((wf, i) => (
              <motion.div key={wf.label} variants={up} custom={i + 2}
                className="rounded-xl border border-edge bg-surface-1 p-5"
              >
                <p className="text-fg font-semibold text-[0.9375rem] mb-1">{wf.label}</p>
                <p className="text-fg-secondary text-[0.875rem] leading-[1.6] mb-3">{wf.detail}</p>
                <p className="font-mono text-accent text-[0.7rem] tracking-[0.04em]">{wf.verticals}</p>
              </motion.div>
            ))}
          </div>
        </W>
      </Reveal>

      {/* ── NYC VERTICALS ───────────────────────────────────────────────── */}
      <Reveal className="py-20 md:py-28 bg-surface-1 border-y border-edge">
        <W>
          <motion.p variants={up} custom={0}
            className="font-mono text-fg-muted text-[0.75rem] tracking-[0.05em] uppercase mb-4"
          >
            NYC industries
          </motion.p>
          <motion.h2 variants={up} custom={1}
            className="font-display font-bold text-fg text-[1.75rem] tracking-[-0.025em] leading-[1.1] mb-10 max-w-[520px]"
            style={{ textWrap: 'balance' }}
          >
            We work best with teams in regulated, high-volume industries.
          </motion.h2>
          <div className="space-y-0 divide-y divide-edge rounded-xl border border-edge overflow-hidden">
            {VERTICALS.map((v, i) => (
              <motion.div key={v.name} variants={up} custom={i + 2}
                className="grid md:grid-cols-3 gap-4 md:gap-8 p-5 md:p-6 bg-surface-0 hover:bg-surface-1 transition-colors"
              >
                <div>
                  <p className="text-fg font-semibold text-[0.9375rem]">{v.name}</p>
                </div>
                <div>
                  <p className="text-fg-secondary text-[0.875rem] leading-[1.6]">{v.pain}</p>
                </div>
                <div>
                  <p className="text-accent text-[0.875rem] leading-[1.6]">{v.why}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </W>
      </Reveal>

      {/* ── HOW WE WORK ─────────────────────────────────────────────────── */}
      <Reveal className="py-20 md:py-28">
        <W>
          <motion.p variants={up} custom={0}
            className="font-mono text-fg-muted text-[0.75rem] tracking-[0.05em] uppercase mb-4"
          >
            How it works
          </motion.p>
          <motion.h2 variants={up} custom={1}
            className="font-display font-bold text-fg text-[1.75rem] tracking-[-0.025em] leading-[1.1] mb-10 max-w-[480px]"
            style={{ textWrap: 'balance' }}
          >
            Audit to production in 3 weeks. Not 3 months.
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                week: 'Week 1',
                label: 'Stack audit',
                body: 'We map your systems, identify the highest-cost manual workflow, and define what "production" looks like for your team.',
              },
              {
                week: 'Week 2',
                label: 'Integrations live',
                body: 'Read-only connections to your production systems. First automations running on real data. No synthetic test cases.',
              },
              {
                week: 'Weeks 3–4',
                label: 'Tuned & handed over',
                body: 'System logic refined against your actual data patterns. Your team trained. Median impact measured and benchmarked.',
              },
            ].map(({ week, label, body }, i) => (
              <motion.div key={week} variants={up} custom={i + 2}
                className="rounded-xl border border-edge bg-surface-1 p-6"
              >
                <p className="font-mono text-accent text-[0.75rem] tracking-[0.04em] mb-3">{week}</p>
                <p className="text-fg font-semibold text-[1rem] mb-2">{label}</p>
                <p className="text-fg-secondary text-[0.875rem] leading-[1.65]">{body}</p>
              </motion.div>
            ))}
          </div>
        </W>
      </Reveal>

      {/* ── TRUST SIGNALS ───────────────────────────────────────────────── */}
      <Reveal className="py-14 border-y border-edge bg-surface-1">
        <W>
          <div className="flex flex-wrap gap-8 items-center justify-center md:justify-between">
            {[
              'Read-only by default',
              'No model training on your data',
              'Encrypted in transit',
              'DPA available for regulated industries',
              'US-based EST & PST hours',
            ].map(s => (
              <motion.p key={s} variants={up}
                className="font-mono text-fg-muted text-[0.75rem] tracking-[0.04em] flex items-center gap-2"
              >
                <span className="text-accent">✓</span> {s}
              </motion.p>
            ))}
          </div>
        </W>
      </Reveal>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <Reveal className="py-20 md:py-28">
        <W>
          <motion.p variants={up} custom={0}
            className="font-mono text-fg-muted text-[0.75rem] tracking-[0.05em] uppercase mb-4"
          >
            Questions
          </motion.p>
          <motion.h2 variants={up} custom={1}
            className="font-display font-bold text-fg text-[1.75rem] tracking-[-0.025em] leading-[1.1] mb-10"
          >
            Common questions
          </motion.h2>
          <div className="max-w-[700px] space-y-0 divide-y divide-edge rounded-xl border border-edge overflow-hidden">
            {[
              {
                q: 'Is the workflow audit really free?',
                a: 'Yes. Email us a description of the workflow — the process, the systems, the volume — and we send back a 1-page automation plan within 24 hours. No call required to get the plan. No obligation to proceed.',
              },
              {
                q: 'We\'re in a regulated industry. Can you work with us?',
                a: 'Yes. We are read-only by default, use no training data from client systems, and work within your existing security perimeter. We have worked with fintech and compliance-sensitive SaaS teams. DPA and security documentation available.',
              },
              {
                q: 'What systems do you connect to?',
                a: 'Any system with an API. ClickHouse, Linear, Stripe, GitHub, Zendesk, Pylon, Intercom, Salesforce, PagerDuty, custom databases, and more. We map your specific stack in Week 1.',
              },
              {
                q: 'How is Altor different from an AI agency or consultant?',
                a: 'We don\'t produce strategy documents or hand off code. We embed alongside your team, connect to your production systems, and stay until the system is in production and working. Portkey was live in 14 days.',
              },
              {
                q: 'What does engagement pricing look like?',
                a: 'Usage-based per investigation or outcome — not per seat. Scoped on a 30-minute call based on your workflow volume and systems. Pilot engagements start at $14K.',
              },
            ].map(({ q, a }, i) => (
              <motion.details key={q} variants={up} custom={i + 2}
                className="group bg-surface-0 hover:bg-surface-1 transition-colors"
              >
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none">
                  <span className="text-fg text-[0.9375rem] font-medium">{q}</span>
                  <span className="text-fg-muted group-open:rotate-45 transition-transform flex-shrink-0 text-lg">+</span>
                </summary>
                <p className="px-5 pb-5 text-fg-secondary text-[0.875rem] leading-[1.7]">{a}</p>
              </motion.details>
            ))}
          </div>
        </W>
      </Reveal>

      {/* ── FINAL CTA ───────────────────────────────────────────────────── */}
      <Reveal className="py-24 md:py-32 bg-surface-1 border-t border-edge">
        <W className="max-w-[760px]">
          <motion.p variants={up} custom={0}
            className="font-mono text-fg-muted text-[0.75rem] tracking-[0.05em] uppercase mb-5 flex items-center gap-2"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Altor is in New York
          </motion.p>
          <motion.h2 variants={up} custom={1}
            className="font-display font-bold text-fg leading-[1.06] tracking-[-0.03em] mb-6"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', textWrap: 'balance' }}
          >
            Tell us the workflow that costs<br />your team the most time.
          </motion.h2>
          <motion.p variants={up} custom={2}
            className="text-fg-secondary text-[1rem] leading-[1.75] max-w-[52ch] mb-10"
          >
            Email us a description of the workflow — the process, the systems, the volume.
            We'll send back a 1-page automation plan within 24 hours.
            If it's a fit, we deploy in 3 weeks.
          </motion.p>
          <motion.div variants={up} custom={3} className="flex flex-col sm:flex-row gap-3 items-start">
            <Button
              as="a"
              href="mailto:anshul@altorlab.com?subject=NYC%20Workflow%20Audit&body=Hi%2C%0A%0AWorkflow%20I%27d%20like%20audited%3A%0A%0ASystems%20involved%3A%0A%0AFrequency%2Fvolume%3A%0A%0ATeam%20size%3A"
              variant="primary"
              size="lg"
            >
              Email your workflow →
            </Button>
            <Button
              as="a"
              href="https://calendly.com/founders-altorlab/30min"
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="lg"
            >
              Book a 30-min call
            </Button>
          </motion.div>
          <motion.p variants={up} custom={4}
            className="mt-5 text-fg-muted text-[0.8125rem]"
          >
            Available in Flatiron · Midtown · Hudson Yards · DUMBO
          </motion.p>
        </W>
      </Reveal>
    </>
  )
}
