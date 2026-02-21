export const content = {
  companyName: 'Altor',

  hero: {
    headline: ['"My API calls are failing."', 'Diagnosed in 2 minutes.', ''],
    subhead: 'Altor connects to your ClickHouse, Linear, Stripe, and GitHub to investigate support tickets — pulling the same data your engineers check manually, in seconds.',
    proof: 'Live at Portkey — tickets diagnosed across 6 systems.',
    primaryCTA: { text: 'Book a demo', url: 'https://calendly.com/founders-altorlab/30min' },
    secondaryCTA: { text: 'See how it works', anchor: '#how-it-works' },
    tryProduct: { text: 'Try Altor', url: 'https://app.altorlab.com' },
  },

  metrics: [
    { value: 2, suffix: 'min', label: 'median time to diagnosis' },
    { value: 6, suffix: '+', label: 'systems per investigation' },
    { value: 80, suffix: '%', label: 'of investigation logic reusable' },
  ],

  gap: {
    title: 'Your support AI answers questions. Your tickets need investigations.',
    body: 'Doc chatbots handle the 20% where the answer is in your knowledge base. The other 80% — "my API calls are failing," "latency spiked," "webhook isn\'t firing" — need live data from your actual systems.',
    comparison: [
      { label: 'What you have today', detail: 'AI that reads documentation and guesses. Handles refunds, password resets, and FAQ. Breaks down the moment a ticket requires live customer data.', status: 'solved' },
      { label: 'What your tickets actually need', detail: 'AI that reads your logs, your bug tracker, your billing system — and investigates like your best engineer would.', status: 'open' },
    ],
    punchline: 'The investigation layer for B2B technical support doesn\'t exist yet.',
  },

  investigation: {
    title: '"My API calls are failing"',
    subtitle: 'A real ticket triggers a real investigation. Not a doc lookup — a multi-system diagnosis pulling live data from the systems your engineers check manually.',
    steps: [
      { num: '01', title: 'Ticket ingested', body: 'From Pylon, Plain, Zendesk, or Slack. Intent classified, customer identified, technical signal extracted.' },
      { num: '02', title: 'Logs pulled', body: 'ClickHouse queried for this customer\'s recent API calls. 429 errors spiked 2 hours ago — error rate jumped from 12% to 43%.' },
      { num: '03', title: 'Known issues checked', body: 'Linear searched for matching bugs. LIN-482: "rate limit regression" — open, priority urgent. Filed 3 days ago.' },
      { num: '04', title: 'Billing and config verified', body: 'Stripe confirms active plan, no payment issues. Usage within limits. Not a billing problem — narrows the diagnosis.' },
      { num: '05', title: 'Diagnosis delivered', body: 'Known bug LIN-482 causing elevated 429s. Workaround in docs. Patch in PR #891, ETA 3 days. Reply drafted and ready for review.' },
    ],
  },

  stack: {
    title: 'Your systems. Connected.',
    subtitle: 'Altor reads from the tools your team already uses. No new dashboards, no data migration. We plug into your stack and start investigating.',
    integrations: [
      { name: 'ClickHouse', role: 'API logs, error patterns, customer activity' },
      { name: 'Linear', role: 'Known bugs, backlog, issue status' },
      { name: 'Stripe', role: 'Billing, subscriptions, payment issues' },
      { name: 'GitHub', role: 'Recent changes, PRs, deployments' },
      { name: 'Docs / Mintlify', role: 'Documentation, guides, known solutions' },
      { name: 'StatusPage', role: 'Upstream incidents, provider outages' },
    ],
    footnote: 'Works with Pylon, Plain, Zendesk, Intercom. Plugs in, doesn\'t replace.',
  },

  trust: {
    title: 'You wouldn\'t give a new hire production access on day one.',
    body: 'Altor starts read-only — pulling logs, checking bugs, verifying billing. As trust builds, you choose which actions graduate to auto-approval. Destructive actions stay manual. Always.',
    levels: [
      { label: 'Read', detail: 'Auto-approved. Pull logs, check bugs, verify billing. This is where every deployment starts.', accent: true },
      { label: 'Write', detail: 'Human approval required. Toggle feature flags, update customer configs, escalate issues.', accent: false },
      { label: 'Delete', detail: 'Never automated. Destructive actions stay with your team. No exceptions.', accent: false },
    ],
  },

  audience: {
    title: 'If your support team debugs more than it answers',
    groups: [
      { name: 'AI infrastructure', description: 'Your customers file tickets about API routing, model fallbacks, and gateway configs. Every ticket is an investigation, not a FAQ lookup.' },
      { name: 'API-first dev tools', description: 'Your customers are developers. They report latency spikes, webhook failures, and SDK errors. They expect root causes, not canned responses.' },
      { name: 'B2B SaaS at scale', description: 'You\'re paying $80–200K per support engineer to manually copy data between ClickHouse and Linear. That\'s the investigation tax.' },
    ],
  },

  faq: [
    { q: 'How is this different from a docs chatbot?', a: 'Docs chatbots answer "how does this work?" from your knowledge base. Altor answers "why is this broken for this customer right now?" by querying their actual API logs, checking your bug tracker, and verifying their billing status.' },
    { q: 'How is this different from our support platform?', a: 'Pylon, Plain, Zendesk — they route and manage tickets. Altor investigates them. We plug into your existing support tool as the investigation layer. You keep your workflows, we add the diagnosis.' },
    { q: 'Will it take actions without asking?', a: 'Not by default. Altor starts as a read-only investigator — it surfaces a diagnosis for your team to review. You control which action types graduate to auto-approval. Destructive actions are never automated.' },
    { q: 'How long until we see value?', a: 'We start with a forward-deployed engagement: audit your support stack, connect your systems, build investigation playbooks for your most common ticket types. Typically 2–4 weeks to first automated investigations.' },
    { q: 'What if our stack isn\'t listed?', a: 'If an API or MCP server exists for your system, we can integrate it. The architecture composes tools, it doesn\'t hardcode connectors. We\'ve yet to encounter a B2B stack we can\'t connect to.' },
  ],

  cta: {
    title: 'See Altor investigate a real ticket',
    body: 'We\'ll connect to your systems and run a live investigation on a ticket from your queue. No pitch deck — your data, your ticket, diagnosed in real time.',
    buttonText: 'Book a demo',
    buttonUrl: 'https://calendly.com/founders-altorlab/30min',
    email: 'anshul@altorlab.com',
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} Altor`,
    email: 'anshul@altorlab.com',
    linkedIn: 'https://www.linkedin.com/in/ansh27/',
  },
}
