import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
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

const principles = [
  {
    icon: '◉',
    title: 'Read-only by default',
    body: 'Every Altor deployment starts with read-only access. We request the minimum permissions required for investigation — read access to logs, bug trackers, billing records, and deployment history. We never request write or delete access without explicit conversation and approval.',
  },
  {
    icon: '⊟',
    title: 'Your data is not used for training',
    body: 'Data from your production systems is used only to generate the investigation diagnosis for that specific ticket. It is never used to train models, improve our general system, or shared with any third party. Your investigation data is yours.',
  },
  {
    icon: '⊞',
    title: 'Encrypted in transit and at rest',
    body: 'All connections between Altor and your production systems use TLS 1.2+ encryption. Data at rest is encrypted using AES-256. Credentials are stored in isolated, encrypted vaults — never in plain text, never in application code.',
  },
  {
    icon: '○',
    title: 'No destructive automation',
    body: 'Write and delete actions are never automated. The read/write/delete permission model is explicit: reads are auto-approved on day one, writes require human approval per action type, and destructive actions are never taken automatically under any circumstances.',
  },
]

const faqs = [
  {
    q: 'What credentials do you need from us?',
    a: 'Read-only API keys or service account credentials for each connected system (ClickHouse, Linear, Stripe, GitHub, etc.). We document the exact permissions required for each integration before connection. We request nothing beyond what is needed to query the data for investigation.',
  },
  {
    q: 'Where is investigation data stored?',
    a: 'Investigation results are ephemeral. We store the diagnosis output for your team to access, but the raw data queried from your systems is not persisted beyond the investigation session. Investigation logs are retained for 30 days for debugging, then deleted.',
  },
  {
    q: 'Do you have a DPA (Data Processing Agreement)?',
    a: 'Yes. We provide a DPA for enterprise engagements. Email us to request it before your security review.',
  },
  {
    q: 'Can we review your architecture before engaging?',
    a: 'Yes. We provide a security architecture one-pager and are available for a security review call before contract. Email anshul@altorlab.com to request documentation.',
  },
  {
    q: 'What is your SOC 2 status?',
    a: 'SOC 2 Type II audit is in progress. We can share the audit timeline and scope on request. Enterprise customers who need SOC 2 before engagement: contact us to discuss bridging controls.',
  },
  {
    q: 'Do you store our ClickHouse credentials?',
    a: 'Credentials are stored in an encrypted secrets vault (isolated from application infrastructure) with access logged and audited. They are never committed to code, never logged in plaintext, and never accessible to anyone outside the infrastructure.',
  },
]

export default function Security() {
  return (
    <>
      <PageHead
        title="Security & Trust — Altor"
        description="Altor connects read-only to your production systems. Your data is never used for training. All connections are encrypted. SOC 2 Type II in progress."
        slug="/security"
        datePublished="2026-04-14"
        dateModified="2026-04-14"
      />

      <section className="pt-32 pb-20 md:pt-44 md:pb-24">
        <W>
          <motion.div initial="hidden" animate="show">
            <motion.p variants={up} custom={0} className="font-mono text-fg-muted text-[0.75rem] tracking-[0.05em] uppercase mb-5">
              Security & Trust
            </motion.p>
            <motion.h1
              variants={up} custom={1}
              className="font-display font-black text-fg leading-[1.04] tracking-[-0.04em] mb-6 max-w-[18ch]"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Read-only. Encrypted. No training on your data.
            </motion.h1>
            <motion.p
              variants={up} custom={2}
              className="text-fg-secondary text-[1.0625rem] leading-[1.7] max-w-[50ch] mb-8"
              style={{ textWrap: 'pretty' }}
            >
              Altor connects to your production systems to run investigations. We take that access seriously.
              Here is exactly what we do and don't do with your data.
            </motion.p>
            <motion.div variants={up} custom={3} className="flex items-center gap-6 flex-wrap">
              {['Read-only by default', 'TLS 1.2+ encryption', 'No model training', 'SOC 2 in progress'].map((badge) => (
                <div key={badge} className="flex items-center gap-2">
                  <span className="text-accent text-[0.875rem]">✓</span>
                  <span className="text-fg-secondary text-[0.875rem]">{badge}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </W>
      </section>

      <section className="py-16 md:py-24 bg-surface-1 border-y border-edge-subtle">
        <W>
          <div className="grid sm:grid-cols-2 gap-4">
            {principles.map((p, i) => (
              <Reveal key={p.title}>
                <div className="rounded-xl border border-edge bg-surface-0 p-6 sm:p-7 h-full">
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="text-accent text-[1rem] font-mono">{p.icon}</span>
                    <h2 className="font-display font-bold text-fg text-[1.0625rem] tracking-[-0.01em]">{p.title}</h2>
                  </div>
                  <p className="text-fg-secondary text-[0.875rem] leading-[1.7]">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </W>
      </section>

      <section className="py-16 md:py-24">
        <W>
          <Reveal>
            <div className="max-w-[720px]">
              <h2 className="font-display font-bold text-fg text-[1.5rem] tracking-[-0.02em] mb-8">Security FAQ</h2>
              <div className="space-y-0">
                {faqs.map((faq, i) => (
                  <div key={faq.q} className="py-5 border-b border-edge-subtle first:border-t">
                    <h3 className="font-display font-semibold text-fg text-[1rem] tracking-[-0.01em] mb-2">{faq.q}</h3>
                    <p className="text-fg-secondary text-[0.875rem] leading-[1.7]">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </W>
      </section>

      <section className="py-16 md:py-20 bg-surface-1 border-t border-edge-subtle">
        <W>
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 max-w-[720px]">
              <div>
                <h2 className="font-display font-bold text-fg text-[1.25rem] tracking-[-0.02em] mb-2">
                  Need security documentation?
                </h2>
                <p className="text-fg-secondary text-[0.875rem] leading-relaxed">
                  We provide a security architecture one-pager and DPA for enterprise reviews. Email us to request.
                </p>
              </div>
              <Button href="mailto:anshul@altorlab.com?subject=Security%20Documentation%20Request" size="lg" className="shrink-0">
                Request docs →
              </Button>
            </div>
          </Reveal>
        </W>
      </section>
    </>
  )
}
