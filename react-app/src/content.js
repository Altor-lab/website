export const content = {
  companyName: 'Altor',

  hero: {
    marketLabel: 'For US B2B engineering and support teams',
    headline: ['45 minutes to 2.', 'Every support ticket.'],
    subhead: 'Altor connects read-only to ClickHouse, Stripe, GitHub, Linear, and StatusPage — querying all 6 systems simultaneously to trace root cause and surface a diagnosis before your engineer finishes reading the ticket. Deployed in 3 weeks. Zero workflow changes.',
    proof: '200+ tickets diagnosed at Portkey. Median investigation time: 2 minutes.',
    supportHours: 'EST & PST support hours',
    primaryCTA: { text: 'Book a Demo (US Hours)', url: 'https://calendly.com/founders-altorlab/30min' },
    secondaryCTA: { text: 'See a real investigation', anchor: '#how-it-works' },
    tryProduct: { text: 'Request a walkthrough', url: 'https://calendly.com/founders-altorlab/30min' },
  },

  metrics: [
    { value: 45, suffix: '→2', label: 'minutes per investigation', note: 'Across 200+ real tickets at Portkey. Median time dropped from 45 min manual to under 2 min with Altor.' },
    { value: 6, suffix: '+', label: 'systems queried in parallel', note: 'ClickHouse, Linear, Stripe, GitHub, docs, StatusPage — simultaneously, not sequentially.' },
    { value: 3, suffix: 'wks', label: 'from kickoff to first live investigation', note: 'Week 1: audit. Week 2: integrations live. Week 3–4: playbooks tuned.' },
  ],

  socialProof: {
    quote: 'Altor diagnosed in 2 minutes what used to take our engineers 45 minutes of copying data between tabs. Our tickets are investigations, not FAQs — nobody else could even attempt to answer them automatically.',
    author: 'Engineering Lead',
    company: 'Portkey',
    logos: ['Portkey'],
  },

  gap: {
    title: '$80–200K per engineer, per year. In investigation time.',
    body: 'Every technical support ticket at a B2B SaaS company is a debugging session. "My API calls are failing" means opening ClickHouse, checking Linear for known bugs, verifying billing in Stripe, and cross-referencing recent GitHub deploys. That\'s 20–45 minutes per ticket, done manually, every time. At $150K fully-loaded cost per support engineer, investigation time is the biggest line item nobody talks about.',
    comparison: [
      { label: 'Without Altor', detail: 'Engineer opens 4–6 browser tabs. Copies customer ID. Runs queries manually. Cross-references results. Writes up diagnosis. 20–45 minutes. Every ticket.', variant: 'dim' },
      { label: 'With Altor', detail: 'Ticket arrives. Altor queries ClickHouse, Linear, Stripe, GitHub, docs, and StatusPage in parallel. Structured diagnosis delivered in 2 minutes. Engineer reviews and responds.', variant: 'accent' },
    ],
    punchline: 'The same investigation. The same 6 systems. The same quality diagnosis — in 2 minutes instead of 45.',
  },

  investigation: {
    title: 'One ticket, three different investigations',
    subtitle: 'Every ticket triggers a different path through your systems. Not a template — a real diagnosis pulling live data.',
    tabs: [
      {
        label: 'API failure',
        ticket: '"My API calls are returning 429s"',
        customer: 'acme-corp',
        steps: [
          { system: 'clickhouse', finding: '429s spiked 12% → 43% over 2 hours', status: 'alert' },
          { system: 'linear', finding: 'LIN-482 "rate limit regression" — open, priority urgent', status: 'warn' },
          { system: 'stripe', finding: 'Plan active, usage within limits. Not a billing issue.', status: 'ok' },
          { system: 'github', finding: 'fix/rate-limit PR #891 — in review, ETA 3 days', status: 'ok' },
        ],
        diagnosis: 'Known bug LIN-482 causing elevated 429s. Workaround available in docs. Patch shipping in PR #891.',
        draft: 'Hi — we\'ve identified this as a known issue (LIN-482) causing intermittent 429 errors. A fix is in review and expected to ship within 3 days. In the meantime, you can work around this by adding retry logic with exponential backoff. See our rate limit guide: docs.portkey.ai/rate-limits',
      },
      {
        label: 'Latency spike',
        ticket: '"Dashboard is loading slowly since this morning"',
        customer: 'series-b-co',
        steps: [
          { system: 'clickhouse', finding: 'p95 latency jumped 340ms → 1.2s at 09:14 UTC', status: 'alert' },
          { system: 'github', finding: 'Deploy #447 shipped at 09:12 UTC — new query in /analytics', status: 'warn' },
          { system: 'linear', finding: 'No related bugs filed yet', status: 'ok' },
          { system: 'statuspage', finding: 'No upstream incidents. All providers green.', status: 'ok' },
        ],
        diagnosis: 'Deploy #447 introduced an unindexed query in /analytics. Rollback or index addition will resolve.',
        draft: 'Hi — we\'ve traced the slowdown to a deployment this morning that introduced a heavier database query. Our team is pushing a fix now and you should see latency return to normal within the hour. No action needed on your end.',
      },
      {
        label: 'Webhook failure',
        ticket: '"Our webhook endpoint stopped receiving events"',
        customer: 'webhook-user',
        steps: [
          { system: 'clickhouse', finding: 'Webhook delivery: 98% → 12% success rate (last 4h)', status: 'alert' },
          { system: 'clickhouse', finding: 'Endpoint returning 503 — customer\'s server unreachable', status: 'warn' },
          { system: 'stripe', finding: 'Subscription active, webhook quota not exceeded', status: 'ok' },
          { system: 'statuspage', finding: 'AWS us-east-1 degraded — matches customer region', status: 'warn' },
        ],
        diagnosis: 'Customer\'s endpoint is down, likely due to AWS us-east-1 degradation. Events are being queued for retry.',
        draft: 'Hi — we\'re seeing your webhook endpoint returning 503 errors, which coincides with the ongoing AWS us-east-1 degradation. All failed events are queued and will be retried automatically once your endpoint recovers. No events will be lost.',
      },
    ],
  },

  stack: {
    title: 'Your systems. Connected.',
    subtitle: 'Altor reads from the tools your team already uses — 6 integrations out of the box. No new dashboards, no data migration.',
    integrations: [
      { name: 'ClickHouse', role: 'API logs, error rates, latency, customer activity' },
      { name: 'Linear', role: 'Known bugs, backlog items, issue status and priority' },
      { name: 'Stripe', role: 'Billing status, subscriptions, payment failures' },
      { name: 'GitHub', role: 'Recent deploys, open PRs, code changes' },
      { name: 'Docs / Mintlify', role: 'Documentation, guides, known workarounds' },
      { name: 'StatusPage', role: 'Upstream incidents, provider outage status' },
    ],
    footnote: 'Also works with your US stack: Salesforce, Zendesk, HubSpot, Stripe, PagerDuty, Pylon, Plain, and Intercom. Custom integrations available for any system with an API.',
  },

  trust: {
    title: 'You wouldn\'t give a new hire production access on day one.',
    body: 'Altor starts read-only — pulling logs, checking bugs, verifying billing. As trust builds, you control which actions graduate to auto-approval. Destructive actions stay manual. Always.',
    security: 'All connections are encrypted in transit and at rest. Read-only credentials by default. SOC 2 Type II in progress.',
    levels: [
      { label: 'Read', detail: 'Auto-approved. Pull logs, check bugs, verify billing. This is where every deployment starts.', accent: true },
      { label: 'Write', detail: 'Human approval required. Toggle feature flags, update configs, escalate to engineering.', accent: false },
      { label: 'Delete', detail: 'Never automated. Destructive actions stay with your team. No exceptions.', accent: false },
    ],
  },

  onboarding: {
    title: 'Live investigations in 3 weeks.',
    body: 'We forward-deploy alongside your team — auditing your support stack, connecting your systems, and building investigation playbooks for your top ticket types. You own the outcome alongside us.',
    steps: [
      { week: 'Week 1', label: 'Stack audit', detail: 'We map your systems, ticket types, and current investigation workflows. No RFPs. No committees. We start building immediately.' },
      { week: 'Week 2', label: 'Integrations live', detail: 'Read-only connections to ClickHouse, Linear, Stripe, GitHub, docs, and StatusPage. First investigations running on real tickets from your queue.' },
      { week: 'Week 3–4', label: 'Playbooks tuned', detail: 'Investigation logic refined against your actual ticket patterns. Team trained. Median diagnosis time measured and benchmarked.' },
    ],
  },

  audience: {
    title: 'Built for teams where every ticket is a debugging session',
    groups: [
      { name: 'AI infrastructure', description: 'Tickets about API routing, model fallbacks, and gateway configs. Every ticket is an investigation, not a FAQ lookup.' },
      { name: 'API-first dev tools', description: 'Customers report latency spikes, webhook failures, and SDK errors. They expect root causes, not canned responses.' },
      { name: 'Data & analytics platforms', description: 'Tickets about query performance, pipeline failures, and dashboard accuracy. Your support team lives in logs.' },
      { name: 'B2B SaaS at scale', description: 'You\'re paying $80–200K per support engineer to manually copy data between ClickHouse and Linear. That\'s the investigation tax.' },
    ],
  },

  faq: [
    { q: 'How is this different from a docs chatbot?', a: 'Docs chatbots answer "how does this work?" from your knowledge base. Altor answers "why is this broken for this customer right now?" by querying their actual API logs, checking your bug tracker, and verifying their billing status — across 6+ systems in under 2 minutes.' },
    { q: 'How is this different from our support platform?', a: 'Pylon, Plain, Zendesk — they route and manage tickets. Altor investigates them. We plug into your existing support tool as the investigation layer. You keep your workflows, we add the diagnosis.' },
    { q: 'Will it take actions without asking?', a: 'Not by default. Altor starts as a read-only investigator — it surfaces a diagnosis for your team to review. You control which action types graduate to auto-approval. Destructive actions are never automated.' },
    { q: 'What if our stack isn\'t listed?', a: 'If an API exists for your system, we can integrate it. The architecture composes tools — it doesn\'t hardcode connectors. We\'ve yet to encounter a B2B stack we can\'t connect to.' },
    { q: 'What does pricing look like?', a: 'Usage-based — you pay per investigation, not per seat. Pricing is quoted in USD ($) with no minimum commitment. We\'ll scope pricing during the demo based on your ticket volume and systems.' },
  ],

  cta: {
    title: 'See Altor investigate a ticket from your queue.',
    body: 'We\'ll connect to your systems and run a live investigation on a real ticket — your data, your stack, diagnosed in real time. Most teams see their first investigation in the first call.',
    buttonText: 'Book a Demo — EST/PST',
    buttonUrl: 'https://calendly.com/founders-altorlab/30min',
    secondaryText: 'Email us directly',
    secondaryUrl: 'mailto:anshul@altorlab.com',
    email: 'anshul@altorlab.com',
  },

  footer: {
    copyright: '© 2026 AltorLab Inc. United States',
    email: 'anshul@altorlab.com',
    linkedIn: 'https://www.linkedin.com/in/ansh27/',
    serving: 'Serving US B2B engineering and support teams',
  },
}
