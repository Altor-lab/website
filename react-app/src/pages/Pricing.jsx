import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import PageHead from '../components/PageHead'
import TrustBar from '../components/TrustBar'

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

const tiers = [
  {
    name: 'Pilot',
    desc: 'Prove the value before committing.',
    price: 'Scoped on call',
    unit: '',
    highlight: false,
    includes: [
      '500 investigations included',
      '3-week forward-deployed engagement',
      'Up to 3 system integrations',
      'Investigation playbooks for top 5 ticket types',
      'Full investigation log access',
      'Unlimited team seats',
    ],
    cta: 'Start a conversation',
    href: 'https://calendly.com/founders-altorlab/30min',
  },
  {
    name: 'Production',
    desc: 'For teams where Altor is part of the support stack.',
    price: 'Scoped on call',
    unit: '',
    highlight: true,
    includes: [
      'Custom investigation volume',
      'All system integrations (6+ supported)',
      'Continuous playbook refinement',
      'Self-improving investigation logic',
      'Priority support (EST/PST)',
      'Quarterly impact review',
      'DPA and security documentation',
    ],
    cta: 'Work with us',
    href: 'https://calendly.com/founders-altorlab/30min',
  },
]

const faqs = [
  {
    q: 'How is pricing structured?',
    a: 'Usage-based — per investigation, not per seat. We price based on your investigation volume (tickets per month) and the systems connected. Scoped during the demo so there are no surprises.',
  },
  {
    q: 'What counts as an investigation?',
    a: 'One investigation = one ticket triaged by Altor (querying your connected systems, generating a diagnosis). If Altor determines a ticket doesn\'t require cross-system investigation, it is not counted.',
  },
  {
    q: 'Is there a minimum commitment?',
    a: 'No seat minimums, no annual commitments on the pilot tier. Production engagements are typically scoped quarterly. All pricing in USD.',
  },
  {
    q: 'What is included in the forward deployment?',
    a: 'We embed alongside your team for 3 weeks: Week 1 is stack audit and integration setup, Week 2 is first live investigations on real tickets, Weeks 3–4 is playbook tuning and handover. No extra charge — this is how we work.',
  },
  {
    q: 'Do you work with teams outside the US?',
    a: 'We currently support US-based teams during EST and PST hours. International teams: reach out and we will discuss what coverage looks like.',
  },
]

export default function Pricing() {
  return (
    <>
      <PageHead
        title="Pricing — Altor"
        description="Usage-based pricing per investigation. No seat fees. Forward-deployed engagement included. Scoped on call based on your ticket volume and systems."
        slug="/pricing"
        datePublished="2026-04-14"
        dateModified="2026-04-14"
      />

      <section className="pt-32 pb-20 md:pt-44 md:pb-24">
        <W>
          <motion.div initial="hidden" animate="show">
            <motion.p variants={up} custom={0} className="font-mono text-fg-muted text-[0.75rem] tracking-[0.05em] uppercase mb-5">
              Pricing
            </motion.p>
            <motion.h1
              variants={up} custom={1}
              className="font-display font-black text-fg leading-[1.04] tracking-[-0.04em] mb-6"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Per investigation.<br />Not per seat.
            </motion.h1>
            <motion.p
              variants={up} custom={2}
              className="text-fg-secondary text-[1.0625rem] leading-[1.7] max-w-[48ch]"
              style={{ textWrap: 'pretty' }}
            >
              You pay for the investigations Altor runs — not for the number of people who use it.
              No minimum commit. No surprise fees. Pricing in USD, scoped on a 30-minute call.
            </motion.p>
          </motion.div>
        </W>
      </section>

      <TrustBar />

      <section className="py-4 md:py-8">
        <W>
          <Reveal>
            <div className="max-w-[820px] rounded-2xl border border-accent/20 bg-accent/[0.03] px-6 py-5 mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <p className="font-mono text-accent text-[0.75rem] tracking-[0.05em] uppercase mb-1.5">Pilot engagements from $14K</p>
                <p className="text-fg-secondary text-[0.875rem] leading-relaxed">
                  3-week engagement · up to 3 system integrations · 500 investigations · playbooks for your top 5 ticket types.
                  {' '}At Portkey: 45 min per ticket became 2 min. 200+ tickets diagnosed.
                </p>
              </div>
              <a href="https://calendly.com/founders-altorlab/30min" className="shrink-0 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-accent hover:opacity-80 transition-opacity whitespace-nowrap">
                Start a conversation →
              </a>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-4 max-w-[820px]">
            {tiers.map((tier) => (
              <Reveal key={tier.name}>
                <div className={`rounded-2xl border p-7 sm:p-8 h-full flex flex-col ${
                  tier.highlight
                    ? 'border-accent/25 bg-accent/[0.03]'
                    : 'border-edge bg-surface-1'
                }`}>
                  {tier.highlight && (
                    <div className="mb-4">
                      <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/[0.08] px-2.5 py-1 text-[0.6875rem] font-mono uppercase tracking-[0.05em] text-accent">
                        Most common
                      </span>
                    </div>
                  )}
                  <h2 className="font-display font-bold text-fg text-[1.25rem] tracking-[-0.02em] mb-1">{tier.name}</h2>
                  <p className="text-fg-secondary text-[0.875rem] mb-5">{tier.desc}</p>
                  <div className="mb-6">
                    <span className="font-display font-black text-fg text-[1.5rem] tracking-[-0.03em]">{tier.price}</span>
                    {tier.unit && <span className="text-fg-muted text-[0.875rem] ml-1">{tier.unit}</span>}
                  </div>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {tier.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="text-accent text-[0.875rem] mt-[1px] shrink-0">✓</span>
                        <span className="text-fg-secondary text-[0.875rem] leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button href={tier.href} size="lg" className="w-full justify-center">
                    {tier.cta}
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </W>
      </section>

      <section className="py-16 md:py-20 bg-surface-1 border-y border-edge-subtle">
        <W>
          <Reveal>
            <div className="max-w-[640px]">
              <h2 className="font-display font-bold text-fg text-[1.25rem] tracking-[-0.02em] mb-3">
                What does Altor actually cost your team today?
              </h2>
              <p className="text-fg-secondary text-[0.9375rem] leading-[1.7] mb-6">
                Before Altor, investigation is your most expensive hidden cost. Here is what the math looks like for a typical team:
              </p>
              <div className="rounded-xl border border-edge bg-surface-0 overflow-hidden">
                <table className="w-full text-[0.875rem]">
                  <thead>
                    <tr className="border-b border-edge-subtle bg-surface-1">
                      <th className="text-left px-5 py-3 font-mono text-fg-muted text-[0.75rem] tracking-[0.04em] uppercase">Input</th>
                      <th className="text-right px-5 py-3 font-mono text-fg-muted text-[0.75rem] tracking-[0.04em] uppercase">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Tickets per day requiring investigation', '15'],
                      ['Minutes per manual investigation', '35 min'],
                      ['Loaded engineer cost (hourly)', '$150/hr'],
                      ['Working days per year', '250'],
                    ].map(([label, val]) => (
                      <tr key={label} className="border-b border-edge-subtle last:border-0">
                        <td className="px-5 py-3 text-fg-secondary">{label}</td>
                        <td className="px-5 py-3 text-right text-fg font-mono">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="border-t-2 border-edge bg-accent/[0.03] px-5 py-4 flex items-center justify-between">
                  <span className="font-display font-bold text-fg">Annual investigation cost</span>
                  <span className="font-display font-black text-accent text-[1.25rem] tracking-[-0.02em] tabular-nums">$328,125</span>
                </div>
              </div>
              <p className="text-fg-muted text-[0.8125rem] mt-4 leading-relaxed">
                15 tickets × 35 min × $150/hr × 250 days = $328,125/year in investigation time.
                Altor reduces median investigation time to under 2 minutes.
              </p>
            </div>
          </Reveal>
        </W>
      </section>

      <section className="py-16 md:py-24">
        <W>
          <Reveal>
            <div className="max-w-[720px]">
              <h2 className="font-display font-bold text-fg text-[1.5rem] tracking-[-0.02em] mb-8">Pricing FAQ</h2>
              <div className="space-y-0">
                {faqs.map((faq) => (
                  <div key={faq.q} className="py-5 border-b border-edge-subtle first:border-t">
                    <h3 className="font-display font-semibold text-fg text-[1rem] tracking-[-0.01em] mb-2">{faq.q}</h3>
                    <p className="text-fg-secondary text-[0.875rem] leading-[1.7]">{faq.a}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <p className="text-fg-secondary text-[0.9375rem] mb-5" style={{ textWrap: 'pretty' }}>
                  Pricing is always scoped to your actual volume and systems on a 30-minute call.
                  No pressure. Just numbers.
                </p>
                <Link
                  to="/work/support-investigation"
                  className="text-fg-secondary hover:text-fg text-[0.875rem] transition-colors link-underline"
                >
                  See what we built for Portkey →
                </Link>
              </div>
            </div>
          </Reveal>
        </W>
      </section>
    </>
  )
}
