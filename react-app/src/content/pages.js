export const pages = {
  compareDocChatbots: {
    slug: '/compare/altor-vs-doc-chatbots',
    title: 'Altor vs. Doc Chatbots — Why FAQ Lookup Fails B2B Support',
    description: 'Doc chatbots answer "how does this work?" Altor answers "why is this broken for this customer right now?" by investigating across 6+ live systems in under 2 minutes.',
    datePublished: '2026-03-03',
    dateModified: '2026-03-03',

    hero: {
      headline: 'Doc chatbots answer questions. Your tickets need investigations.',
      subhead: 'When a customer reports "my API calls are returning 429s," a doc chatbot searches your knowledge base. Altor queries their actual API logs in ClickHouse, checks Linear for known bugs, and verifies their billing in Stripe — delivering a root-cause diagnosis in 2 minutes instead of 45.',
    },

    sections: [
      {
        type: 'comparison',
        title: 'Same ticket, two approaches',
        subtitle: 'Customer reports: "My API calls are failing with 429 errors since this morning."',
        rows: [
          {
            dimension: 'First action',
            chatbot: 'Searches knowledge base for "429 error" articles',
            altor: 'Queries ClickHouse for this customer\'s 429 rate over the last 24 hours',
          },
          {
            dimension: 'Data sources',
            chatbot: 'Documentation only',
            altor: 'ClickHouse + Linear + Stripe + GitHub + StatusPage + docs',
          },
          {
            dimension: 'Response',
            chatbot: '"Here\'s our rate limit documentation" (generic)',
            altor: '"429s spiked from 12% to 43% due to bug LIN-482. Fix in PR #891, shipping in 3 days. Workaround: exponential backoff."',
          },
          {
            dimension: 'Time to resolution',
            chatbot: 'Customer escalates → engineer investigates manually (20–45 min)',
            altor: '2 minutes, no escalation needed',
          },
          {
            dimension: 'Ticket coverage',
            chatbot: '~20% of B2B support tickets (FAQ-answerable)',
            altor: 'The other 80% — tickets requiring live data from customer systems',
          },
        ],
      },
      {
        type: 'stats',
        items: [
          { value: '80%', label: 'of B2B support tickets require investigation, not doc lookups' },
          { value: '2 min', label: 'median diagnosis time with Altor (down from 20–45 min)' },
          { value: '6+', label: 'systems queried per investigation' },
          { value: '$80–200K', label: 'annual cost per support engineer spent on manual investigation' },
        ],
      },
      {
        type: 'body',
        title: 'The 80% gap in support AI',
        paragraphs: [
          'Doc chatbots solve a real problem — they handle password resets, "how do I configure X?" questions, and onboarding queries well. That covers roughly 20% of B2B support volume.',
          'The other 80% are technical investigations: "my API calls are failing," "latency spiked since yesterday," "webhooks stopped firing." These require pulling live customer data from ClickHouse, checking Linear for known bugs, verifying Stripe billing status, and cross-referencing recent GitHub deploys. No knowledge base contains this information because it changes with every customer and every ticket.',
          'This is the gap Altor fills. Not by replacing your doc chatbot — by handling the 80% it was never designed to solve.',
        ],
      },
      {
        type: 'quote',
        text: 'Altor diagnosed in 2 minutes what used to take our engineers 45 minutes of copying data between tabs.',
        author: 'Engineering lead',
        company: 'Portkey',
      },
      {
        type: 'body',
        title: 'How Altor works alongside your existing tools',
        paragraphs: [
          'Altor is not a replacement for your doc chatbot or your support platform. It\'s the investigation layer that sits between them. Your support platform (Pylon, Zendesk, Intercom) routes and manages tickets. Your doc chatbot handles FAQ-style questions. Altor handles everything else — the technical investigations that currently escalate to engineering.',
          'When a ticket arrives that needs investigation, Altor queries 6+ integrated systems, synthesizes findings into a structured diagnosis, and delivers it back into your existing workflow. Your support team gets root causes, not search results.',
        ],
      },
    ],

    cta: {
      title: 'See the difference on a real ticket',
      body: 'We\'ll connect to your systems and investigate a ticket from your queue — live. Your data, your ticket, diagnosed in real time.',
      buttonText: 'Book a demo',
      buttonUrl: 'https://calendly.com/founders-altorlab/30min',
    },
  },

  compareSupportPlatformAI: {
    slug: '/compare/altor-vs-support-platform-ai',
    title: 'Altor vs. Support Platform AI — Investigation, Not Routing',
    description: 'Zendesk AI routes tickets. Intercom Fin answers from docs. Altor investigates across ClickHouse, Linear, Stripe, and GitHub to diagnose what\'s actually broken — in 2 minutes.',
    datePublished: '2026-03-03',
    dateModified: '2026-03-03',

    hero: {
      headline: 'Support platforms route tickets. Altor investigates them.',
      subhead: 'Zendesk AI triages and routes. Intercom Fin answers from your help center. Neither queries your customer\'s actual API logs, checks your bug tracker, or verifies their billing status. Altor does — across 6+ systems in under 2 minutes.',
    },

    sections: [
      {
        type: 'comparison',
        title: 'What each tool actually does',
        subtitle: 'Altor complements your existing support platform — it doesn\'t replace it.',
        rows: [
          {
            dimension: 'Primary function',
            chatbot: 'Ticket management, routing, workflow automation',
            altor: 'Multi-system technical investigation and root-cause diagnosis',
          },
          {
            dimension: 'AI capability',
            chatbot: 'Auto-categorize tickets, suggest help center articles, draft responses from docs',
            altor: 'Query ClickHouse logs, check Linear bugs, verify Stripe billing, review GitHub deploys',
          },
          {
            dimension: 'Data access',
            chatbot: 'Ticket history, help center, customer metadata',
            altor: 'Live production data across 6+ systems (logs, errors, billing, code, incidents)',
          },
          {
            dimension: 'Handles',
            chatbot: '"How do I configure webhooks?" (knowledge-base answerable)',
            altor: '"Why are my webhooks failing right now?" (requires live investigation)',
          },
          {
            dimension: 'Integration model',
            chatbot: 'Replaces or extends your support workflow',
            altor: 'Plugs into your existing support platform as an investigation layer',
          },
        ],
      },
      {
        type: 'body',
        title: 'Why your support platform AI isn\'t enough',
        paragraphs: [
          'Support platform AI is built for workflow optimization — routing tickets to the right team, suggesting relevant articles, auto-categorizing by topic. This is valuable. But it doesn\'t touch the core bottleneck in B2B technical support: the investigation itself.',
          'When a customer reports "latency spiked since this morning," your support platform can route it to the right engineer. But that engineer still needs to open ClickHouse, check the customer\'s API logs, compare against yesterday\'s baseline, check GitHub for recent deploys, and search Linear for known issues. That\'s 20–45 minutes of manual investigation per ticket.',
          'Altor automates the investigation. It queries ClickHouse, finds the latency spike at 09:14 UTC, identifies deploy #447 as the likely cause, checks that no upstream incidents exist, and delivers a structured diagnosis — all in 2 minutes.',
        ],
      },
      {
        type: 'stats',
        items: [
          { value: '20–45 min', label: 'typical manual investigation time per technical ticket' },
          { value: '2 min', label: 'Altor\'s median diagnosis time across 200+ tickets' },
          { value: '6+', label: 'production systems queried per investigation' },
          { value: '0', label: 'workflows you need to change — Altor plugs into your existing tools' },
        ],
      },
      {
        type: 'quote',
        text: 'Altor diagnosed in 2 minutes what used to take our engineers 45 minutes of copying data between tabs.',
        author: 'Engineering lead',
        company: 'Portkey',
      },
      {
        type: 'body',
        title: 'How Altor fits into your stack',
        paragraphs: [
          'Altor works with Pylon, Plain, Zendesk, and Intercom — it ingests tickets from your existing platform and delivers diagnoses back into the same workflow. You keep your routing rules, SLAs, and team structure. Altor adds the investigation layer your support AI is missing.',
          'Think of it this way: your support platform is the operating system for your support team. Altor is the investigator that actually solves the technical tickets.',
        ],
      },
    ],

    cta: {
      title: 'See Altor investigate a real ticket from your queue',
      body: 'We\'ll connect to your systems and run a live investigation. Your support platform stays. Altor adds the diagnosis.',
      buttonText: 'Book a demo',
      buttonUrl: 'https://calendly.com/founders-altorlab/30min',
    },
  },

  useCaseAPIErrors: {
    slug: '/use-case/api-error-investigation',
    title: 'Automate API Error Investigation — From 429s to Root Cause in 2 Minutes',
    description: 'When customers report API errors, Altor queries ClickHouse logs, checks Linear for known bugs, verifies Stripe billing, and delivers a root-cause diagnosis in under 2 minutes.',
    datePublished: '2026-03-03',
    dateModified: '2026-03-03',

    hero: {
      headline: 'From "my API is broken" to root cause in 2 minutes.',
      subhead: 'API error tickets are the most common — and most time-consuming — category in B2B technical support. Altor automates the entire investigation: querying logs, checking for known bugs, verifying billing, and cross-referencing recent deploys.',
    },

    sections: [
      {
        type: 'body',
        title: 'The manual investigation workflow',
        paragraphs: [
          'A customer reports: "My API calls are returning 429 errors." Today, here\'s what happens:',
        ],
        steps: [
          'Support engineer opens ClickHouse. Queries the customer\'s API logs for 429 responses. Finds error rate spiked from 12% to 43% over the last 2 hours.',
          'Opens Linear. Searches for rate limit bugs. Finds LIN-482: "rate limit regression" — open, priority urgent.',
          'Checks Stripe. Confirms the customer\'s plan is active and usage is within limits. Rules out billing.',
          'Checks GitHub. Finds PR #891 (fix/rate-limit) in review. ETA: 3 days.',
          'Writes the response. Explains the known bug, links the workaround docs, gives the ETA for the fix.',
        ],
      },
      {
        type: 'stats',
        items: [
          { value: '20–45 min', label: 'time for a support engineer to manually investigate an API error ticket' },
          { value: '4–6', label: 'systems checked per investigation (logs, bugs, billing, code, docs, status)' },
          { value: '5–10', label: 'copy-paste operations between tabs per investigation' },
        ],
      },
      {
        type: 'body',
        title: 'The same investigation, automated by Altor',
        paragraphs: [
          'Altor runs the same workflow — but in 2 minutes instead of 45:',
        ],
        steps: [
          'Ingests the ticket from your support platform (Pylon, Zendesk, Intercom, or Slack).',
          'Queries ClickHouse: 429 error rate for this customer spiked 12% → 43% over 2 hours.',
          'Searches Linear: LIN-482 "rate limit regression" — open, priority urgent.',
          'Checks Stripe: Plan active, usage within limits. Not a billing issue.',
          'Checks GitHub: fix/rate-limit PR #891 — in review, shipping in 3 days.',
          'Delivers structured diagnosis with root cause, workaround, and ETA to your support team.',
        ],
      },
      {
        type: 'body',
        title: 'What the support team sees',
        paragraphs: [
          'Altor delivers a structured diagnosis directly into your support workflow:',
          'Diagnosis: Known bug LIN-482 causing elevated 429s for this customer. Error rate spiked from 12% to 43% over the last 2 hours. Fix is in review (PR #891, ETA 3 days). Customer billing is current — not a plan/usage issue.',
          'Recommended response: Explain the known issue, link to rate limit documentation with exponential backoff workaround, and provide the 3-day ETA for the permanent fix.',
          'The support engineer reviews the diagnosis, optionally edits the draft response, and sends — turning a 45-minute investigation into a 2-minute review-and-send.',
        ],
      },
      {
        type: 'quote',
        text: 'Altor diagnosed in 2 minutes what used to take our engineers 45 minutes of copying data between tabs.',
        author: 'Engineering lead',
        company: 'Portkey',
      },
      {
        type: 'body',
        title: 'Beyond 429s: other API error patterns Altor investigates',
        paragraphs: [
          'Rate limit errors are one pattern. Altor handles the full spectrum of API error investigations:',
        ],
        bullets: [
          '5xx server errors — correlates with recent deploys, upstream outages, and resource exhaustion',
          'Authentication failures — checks token expiration, permission changes, and billing status',
          'Timeout errors — traces latency across the request chain, identifies bottleneck services',
          'Webhook delivery failures — verifies endpoint health, checks for regional outages, confirms event queuing',
          'SDK version issues — matches client SDK version against known compatibility bugs',
        ],
      },
    ],

    cta: {
      title: 'See Altor investigate a real API error ticket',
      body: 'We\'ll connect to your systems and run a live investigation on an API error ticket from your queue. 2 minutes, 6+ systems, real diagnosis.',
      buttonText: 'Book a demo',
      buttonUrl: 'https://calendly.com/founders-altorlab/30min',
    },
  },

  customerPortkey: {
    slug: '/customers/portkey',
    title: 'How Portkey Cut Support Investigation Time From 45 Minutes to 2',
    description: 'Portkey deployed Altor to automate technical support investigations across ClickHouse, Linear, Stripe, and GitHub. Result: 200+ tickets diagnosed at a 2-minute median, down from 20–45 minutes manually.',
    datePublished: '2026-03-03',
    dateModified: '2026-03-03',

    hero: {
      headline: 'Portkey: 45 minutes to 2, across 200+ tickets.',
      subhead: 'Portkey is an AI gateway platform handling billions of API requests. Their support team was spending 20–45 minutes per ticket manually pulling data from ClickHouse, Linear, Stripe, and GitHub. After deploying Altor, median investigation time dropped to 2 minutes — with zero changes to their existing support workflow.',
    },

    sections: [
      {
        type: 'stats',
        items: [
          { value: '2 min', label: 'median diagnosis time (down from 20–45 min manually)' },
          { value: '200+', label: 'tickets diagnosed since deployment' },
          { value: '6', label: 'production systems connected (ClickHouse, Linear, Stripe, GitHub, docs, StatusPage)' },
          { value: '2 weeks', label: 'from kickoff to first live investigation' },
        ],
      },
      {
        type: 'body',
        title: 'The problem',
        paragraphs: [
          'Portkey routes billions of LLM API requests through their gateway. When a customer reports "my API calls are failing" or "latency spiked since this morning," Portkey\'s support team needs to investigate across multiple systems: API logs in ClickHouse, known bugs in Linear, customer billing in Stripe, and recent deploys on GitHub.',
          'Each investigation followed the same manual pattern: open ClickHouse, write a query, find the error pattern, switch to Linear, search for matching bugs, check Stripe, check GitHub deploys, cross-reference everything, and write the response. This took 20–45 minutes per ticket — for a workflow that was 80% identical every time.',
          'Portkey wasn\'t lacking a support platform. They had one. What they lacked was the investigation layer — something that could pull live data from their actual systems and produce a diagnosis, not just route the ticket to the right person.',
        ],
      },
      {
        type: 'body',
        title: 'The deployment',
        paragraphs: [
          'Altor deployed at Portkey in a forward-deployed engagement over 3 weeks:',
        ],
        steps: [
          'Week 1: Stack audit. Mapped Portkey\'s systems, ticket types, and investigation workflows. Identified 3 primary ticket patterns (API errors, latency spikes, webhook failures) that accounted for 70%+ of support volume.',
          'Week 2: Connections live. Read-only integrations to ClickHouse, Linear, Stripe, GitHub, internal docs, and StatusPage. First investigations running on real tickets from the queue.',
          'Week 3: Playbooks tuned. Investigation logic refined against Portkey\'s actual ticket patterns. Support team trained on reviewing and sending Altor-generated diagnoses.',
        ],
      },
      {
        type: 'body',
        title: 'What an investigation looks like',
        paragraphs: [
          'A Portkey customer submits: "My API calls are returning 429 errors." Here\'s what Altor does in under 2 minutes:',
        ],
        steps: [
          'Queries ClickHouse: 429 error rate for this customer spiked from 12% to 43% over the last 2 hours.',
          'Searches Linear: Finds LIN-482 "rate limit regression" — open, priority urgent.',
          'Checks Stripe: Customer plan active, usage within limits. Not a billing issue.',
          'Checks GitHub: fix/rate-limit PR #891 in review, shipping in 3 days.',
          'Delivers diagnosis: Known bug causing elevated 429s. Workaround available in docs. Fix shipping in PR #891.',
        ],
      },
      {
        type: 'quote',
        text: 'Altor diagnosed in 2 minutes what used to take our engineers 45 minutes of copying data between tabs.',
        author: 'Engineering lead',
        company: 'Portkey',
      },
      {
        type: 'body',
        title: 'The result',
        paragraphs: [
          'After 200+ tickets diagnosed through Altor, the numbers speak for themselves:',
        ],
        bullets: [
          'Median investigation time: 2 minutes (down from 20–45 minutes)',
          '6 systems queried per investigation automatically — no more copying data between tabs',
          '80% of investigation logic reusable across different ticket types',
          'Zero changes to Portkey\'s existing support platform or team workflows',
          'Support engineers shifted from manual investigation to reviewing and sending AI-generated diagnoses',
        ],
      },
    ],

    cta: {
      title: 'Your stack looks like Portkey\'s. See what Altor finds.',
      body: 'We\'ll connect to your systems and investigate a real ticket from your queue — live. Same 2-minute diagnosis, on your data.',
      buttonText: 'Book a demo',
      buttonUrl: 'https://calendly.com/founders-altorlab/30min',
    },
  },

  compareCopilotSupport: {
    slug: '/compare/altor-vs-copilot-for-support',
    title: 'Altor vs. AI Copilots for Support — Investigation vs. Response Drafting',
    description: 'AI copilots help agents write faster replies. Altor investigates the actual problem — querying ClickHouse, Linear, Stripe, and GitHub to produce a root-cause diagnosis before the reply gets written.',
    datePublished: '2026-03-03',
    dateModified: '2026-03-03',

    hero: {
      headline: 'AI copilots write faster replies. They don\'t investigate the problem.',
      subhead: 'Support copilots draft responses based on ticket history and knowledge base articles. But for B2B technical tickets, the bottleneck isn\'t writing the reply — it\'s the 20–45 minutes of investigation that happens before you know what to write. Altor automates the investigation itself.',
    },

    sections: [
      {
        type: 'comparison',
        title: 'Copilot vs. investigator',
        subtitle: 'Customer reports: "Dashboard is loading slowly since this morning."',
        rows: [
          {
            dimension: 'What it does',
            chatbot: 'Drafts a response from ticket context and help center articles',
            altor: 'Queries production systems to find the root cause, then provides a diagnosis',
          },
          {
            dimension: 'Data it accesses',
            chatbot: 'Previous tickets, knowledge base, customer metadata',
            altor: 'ClickHouse logs, Linear bugs, GitHub deploys, StatusPage incidents, Stripe billing',
          },
          {
            dimension: 'Output for this ticket',
            chatbot: '"We\'re looking into the performance issue and will update you shortly"',
            altor: '"Deploy #447 at 09:12 UTC introduced an unindexed query in /analytics. p95 latency jumped 340ms → 1.2s. Fix is being pushed."',
          },
          {
            dimension: 'Investigation time saved',
            chatbot: '1–2 minutes (writing the response faster)',
            altor: '20–45 minutes (eliminates the manual investigation entirely)',
          },
          {
            dimension: 'When it helps',
            chatbot: 'Agent already knows the answer, needs to write it faster',
            altor: 'Nobody knows the answer yet — someone needs to investigate across systems',
          },
        ],
      },
      {
        type: 'body',
        title: 'The investigation bottleneck',
        paragraphs: [
          'In B2B technical support, the time breakdown for a typical ticket is roughly: 20–45 minutes investigating across systems, 5 minutes writing the response. Copilots optimize the 5-minute part. Altor eliminates the 20–45 minute part.',
          'This matters because the investigation is where support teams burn engineering time and miss SLAs. A copilot that helps write "we\'re looking into it" faster doesn\'t solve the problem — it just ships a polished version of "we don\'t know yet."',
          'Altor produces the root-cause diagnosis that makes a real response possible. The copilot and the investigator solve different problems at different stages of the ticket lifecycle.',
        ],
      },
      {
        type: 'stats',
        items: [
          { value: '20–45 min', label: 'spent investigating — the part copilots don\'t touch' },
          { value: '5 min', label: 'spent writing the response — the part copilots speed up' },
          { value: '2 min', label: 'Altor\'s median investigation time across 200+ tickets at Portkey' },
          { value: '80%', label: 'of B2B tickets need investigation, not just a faster reply' },
        ],
      },
      {
        type: 'quote',
        text: 'Altor diagnosed in 2 minutes what used to take our engineers 45 minutes of copying data between tabs.',
        author: 'Engineering lead',
        company: 'Portkey',
      },
      {
        type: 'body',
        title: 'Use both — they solve different problems',
        paragraphs: [
          'Altor isn\'t a replacement for your copilot. The best workflow is: Altor investigates the ticket and produces a structured diagnosis. Your copilot (or your agent) turns that diagnosis into a polished customer response. Investigation first, response second.',
          'Altor plugs into your existing support platform — Pylon, Zendesk, Intercom — and delivers the diagnosis into the same workflow your copilot already uses.',
        ],
      },
    ],

    cta: {
      title: 'See the investigation your copilot can\'t do',
      body: 'We\'ll investigate a real ticket from your queue — across ClickHouse, Linear, Stripe, and GitHub — and show you the diagnosis in 2 minutes.',
      buttonText: 'Book a demo',
      buttonUrl: 'https://calendly.com/founders-altorlab/30min',
    },
  },

  useCaseWebhookFailure: {
    slug: '/use-case/webhook-failure-investigation',
    title: 'Automate Webhook Failure Investigation — From "Events Stopped" to Root Cause',
    description: 'When customers report webhook failures, Altor checks delivery rates, endpoint health, regional outages, and event queuing — producing a root-cause diagnosis in under 2 minutes.',
    datePublished: '2026-03-03',
    dateModified: '2026-03-03',

    hero: {
      headline: 'From "webhooks stopped" to root cause in 2 minutes.',
      subhead: 'Webhook failure tickets are high-urgency and high-complexity. The customer is losing events, and the root cause could be anywhere: their endpoint, your delivery pipeline, an upstream provider outage, or a billing issue. Altor investigates all of them simultaneously.',
    },

    sections: [
      {
        type: 'body',
        title: 'Why webhook tickets take so long manually',
        paragraphs: [
          'A customer reports: "Our webhook endpoint stopped receiving events." The support engineer\'s investigation path:',
        ],
        steps: [
          'Check delivery logs in ClickHouse. Look at success rate over the last 4–6 hours. Find it dropped from 98% to 12%.',
          'Check what errors the endpoint is returning. Find 503 responses — customer\'s server is unreachable.',
          'Check Stripe to rule out billing. Subscription active, webhook quota not exceeded.',
          'Check StatusPage for upstream outages. Find AWS us-east-1 is degraded — matches the customer\'s region.',
          'Synthesize: customer endpoint is down due to AWS outage. Events are queued for retry. No data loss.',
        ],
      },
      {
        type: 'stats',
        items: [
          { value: '25–40 min', label: 'typical manual investigation for a webhook failure ticket' },
          { value: '4+', label: 'systems checked: delivery logs, endpoint status, billing, upstream incidents' },
          { value: '2 min', label: 'Altor\'s investigation time for the same ticket' },
        ],
      },
      {
        type: 'body',
        title: 'How Altor investigates webhook failures',
        paragraphs: [
          'Altor runs all the same checks — but simultaneously, in under 2 minutes:',
        ],
        steps: [
          'Queries ClickHouse: webhook delivery success rate dropped from 98% to 12% over the last 4 hours. Endpoint returning 503.',
          'Checks Stripe: subscription active, webhook quota not exceeded. Not a billing issue.',
          'Checks StatusPage: AWS us-east-1 degraded — matches customer\'s region.',
          'Delivers diagnosis: customer endpoint is down due to regional AWS degradation. Events are queued and will auto-retry. No data loss.',
        ],
      },
      {
        type: 'quote',
        text: 'Altor diagnosed in 2 minutes what used to take our engineers 45 minutes of copying data between tabs.',
        author: 'Engineering lead',
        company: 'Portkey',
      },
      {
        type: 'body',
        title: 'Webhook failure patterns Altor handles',
        paragraphs: [
          'Every webhook failure has a different root cause. Altor investigates across all common patterns:',
        ],
        bullets: [
          'Endpoint down (503/502) — identifies whether it\'s the customer\'s server or an upstream outage',
          'Timeout failures — checks if payload size increased or endpoint response time degraded',
          'Authentication rejected (401/403) — verifies webhook signing secret rotation and credential status',
          'Rate limiting (429) — checks if delivery volume exceeded the customer\'s endpoint capacity',
          'SSL/TLS errors — identifies certificate expiration or misconfiguration',
          'Partial failures — compares delivery rates across event types to isolate the affected subset',
        ],
      },
    ],

    cta: {
      title: 'See Altor investigate a real webhook failure',
      body: 'We\'ll connect to your delivery logs, billing, and monitoring systems and diagnose a webhook issue from your queue — live.',
      buttonText: 'Book a demo',
      buttonUrl: 'https://calendly.com/founders-altorlab/30min',
    },
  },

  useCaseBillingEscalation: {
    slug: '/use-case/billing-escalation-debugging',
    title: 'Automate Billing Escalation Debugging — Usage Disputes Resolved in Minutes',
    description: 'When customers dispute charges or report billing issues, Altor cross-references Stripe billing data with actual API usage in ClickHouse to surface the facts in under 2 minutes.',
    datePublished: '2026-03-03',
    dateModified: '2026-03-03',

    hero: {
      headline: 'From "this charge is wrong" to evidence-backed answer in 2 minutes.',
      subhead: 'Billing tickets are high-stakes and slow. The customer thinks they\'re being overcharged, and proving otherwise requires cross-referencing Stripe invoices against actual API usage logs. Altor pulls both sides in seconds and surfaces the facts.',
    },

    sections: [
      {
        type: 'body',
        title: 'Why billing tickets are uniquely expensive',
        paragraphs: [
          'Billing escalations combine two problems: urgency (the customer is upset about money) and complexity (the answer lives across two systems that don\'t talk to each other). Here\'s the typical manual workflow:',
        ],
        steps: [
          'Open Stripe. Pull the customer\'s current invoice, subscription plan, and overage charges.',
          'Open ClickHouse. Query their actual API usage for the billing period. Count requests by endpoint, check for spikes.',
          'Compare the two. Does the billed amount match the usage? Were there unexpected spikes? Did a plan change mid-cycle?',
          'Check for known issues. Search Linear for any billing bugs. Check if a recent deploy affected usage tracking.',
          'Write the response with evidence: usage breakdown, invoice line items, and explanation.',
        ],
      },
      {
        type: 'stats',
        items: [
          { value: '30–60 min', label: 'typical time to resolve a billing dispute manually' },
          { value: '2', label: 'systems that must be cross-referenced (billing + usage logs)' },
          { value: '2 min', label: 'Altor\'s investigation time for the same ticket' },
          { value: 'High', label: 'churn risk — unresolved billing disputes are the #1 churn trigger' },
        ],
      },
      {
        type: 'body',
        title: 'How Altor investigates billing escalations',
        paragraphs: [
          'Customer submits: "My invoice is $2,400 but I expected around $1,500. Can you explain the overage?" Altor investigates:',
        ],
        steps: [
          'Queries Stripe: Current invoice is $2,412. Plan is Growth ($1,500/mo) with per-request overage at $0.002/request.',
          'Queries ClickHouse: Customer made 456,000 requests this period. 300,000 included in plan, 156,000 overage at $0.002 = $312 overage. Total should be $1,812.',
          'Identifies discrepancy: Billed $2,412 vs. calculated $1,812. Difference is $600.',
          'Searches Linear: Finds LIN-671 "double-counting on /v2/batch endpoint" — fixed in last week\'s deploy but this invoice period was affected.',
          'Delivers diagnosis: Overage charge is partially incorrect due to a known tracking bug. $600 should be credited. Links to the Linear ticket as evidence.',
        ],
      },
      {
        type: 'quote',
        text: 'Altor diagnosed in 2 minutes what used to take our engineers 45 minutes of copying data between tabs.',
        author: 'Engineering lead',
        company: 'Portkey',
      },
      {
        type: 'body',
        title: 'Billing patterns Altor handles',
        paragraphs: [
          'Billing tickets come in many forms. Altor investigates all of them by cross-referencing Stripe with your usage data:',
        ],
        bullets: [
          'Overage disputes — compares billed usage against actual ClickHouse logs',
          'Payment failures — checks Stripe for declined cards, expired methods, and retry status',
          'Plan mismatch — verifies when plan changes took effect vs. when the customer expected them',
          'Feature access issues — cross-references plan tier with feature flag status',
          'Credit requests — calculates exactly how much should be credited based on actual vs. billed usage',
        ],
      },
    ],

    cta: {
      title: 'See Altor resolve a billing dispute in real time',
      body: 'We\'ll connect to your Stripe and usage data and investigate a billing ticket from your queue — with evidence, not guesswork.',
      buttonText: 'Book a demo',
      buttonUrl: 'https://calendly.com/founders-altorlab/30min',
    },
  },

  forAIInfra: {
    slug: '/for/ai-infrastructure-companies',
    title: 'Altor for AI Infrastructure Companies — Investigate Gateway, Routing, and Model Tickets',
    description: 'AI infrastructure companies like Portkey, Helicone, and Langfuse deal with tickets about API routing, model fallbacks, and gateway configs. Altor investigates them across your full stack in 2 minutes.',
    datePublished: '2026-03-03',
    dateModified: '2026-03-03',

    hero: {
      headline: 'Your customers don\'t file FAQ tickets. They file investigations.',
      subhead: 'AI infrastructure tickets are about API routing failures, model fallback chains breaking, gateway latency spikes, and token usage discrepancies. These aren\'t questions a knowledge base can answer — they require pulling live data from your customer\'s actual API logs, configs, and billing. Altor does this in 2 minutes.',
    },

    sections: [
      {
        type: 'body',
        title: 'The AI infrastructure support problem',
        paragraphs: [
          'If you\'re building AI infrastructure — an API gateway, an observability platform, a prompt management layer — your support tickets look different from typical SaaS. Your customers are developers building on your platform. When something breaks, they need root causes, not canned responses.',
          'Typical tickets at AI infrastructure companies:',
        ],
        bullets: [
          '"API calls are returning 429s since this morning" — rate limit regression or genuine overuse?',
          '"Model fallback isn\'t triggering when OpenAI times out" — config issue or gateway bug?',
          '"Latency doubled on our production requests" — your gateway, their provider, or a recent deploy?',
          '"Token counts on our invoice don\'t match our logs" — tracking bug or expected prompt caching?',
          '"Requests to Claude are failing but GPT-4 works" — provider outage or routing config?',
        ],
      },
      {
        type: 'body',
        title: 'What Altor investigates for AI infra teams',
        paragraphs: [
          'Every ticket triggers a multi-system investigation. For an AI infrastructure company, Altor typically queries:',
        ],
        bullets: [
          'ClickHouse / your analytics DB — API request logs, error rates, latency percentiles, token usage per customer',
          'Linear / Jira — known bugs, open issues matching the customer\'s symptoms',
          'Stripe — subscription tier, usage billing, payment status, overage thresholds',
          'GitHub — recent deploys, open PRs that might affect the relevant endpoints',
          'StatusPage / PagerDuty — upstream provider outages (OpenAI, Anthropic, AWS)',
          'Internal docs — configuration guides, known workarounds, SDK compatibility matrices',
        ],
      },
      {
        type: 'stats',
        items: [
          { value: '2 min', label: 'median diagnosis time at Portkey (AI gateway platform)' },
          { value: '200+', label: 'tickets diagnosed across Portkey\'s AI infrastructure stack' },
          { value: '6', label: 'production systems queried per investigation' },
          { value: '80%', label: 'of investigation logic reusable across ticket types' },
        ],
      },
      {
        type: 'quote',
        text: 'Altor diagnosed in 2 minutes what used to take our engineers 45 minutes of copying data between tabs.',
        author: 'Engineering lead',
        company: 'Portkey',
      },
      {
        type: 'body',
        title: 'Why AI infra companies are the ideal fit',
        paragraphs: [
          'AI infrastructure companies have three traits that make Altor especially effective: highly technical tickets that require multi-system investigation, well-structured data in systems like ClickHouse that Altor can query precisely, and a support team that\'s already engineering-heavy and values root causes over templates.',
          'Portkey was Altor\'s first deployment. The patterns we built there — API error investigation, latency spike diagnosis, billing cross-referencing — transfer directly to other AI infrastructure companies because the ticket patterns and system architectures are so similar.',
        ],
      },
    ],

    cta: {
      title: 'Your stack looks like Portkey\'s. See what Altor finds.',
      body: 'We\'ll connect to your API logs, bug tracker, and billing system and investigate a real ticket from your queue. Same 2-minute diagnosis, on your data.',
      buttonText: 'Book a demo',
      buttonUrl: 'https://calendly.com/founders-altorlab/30min',
    },
  },

  forAPIDevTools: {
    slug: '/for/api-first-developer-tools',
    title: 'Altor for API-First Developer Tools — Investigate Latency, Webhooks, and SDK Tickets',
    description: 'API-first dev tools like Supabase, Resend, and Clerk get tickets about latency spikes, webhook failures, and SDK errors. Altor investigates across your production systems in 2 minutes.',
    datePublished: '2026-03-03',
    dateModified: '2026-03-03',

    hero: {
      headline: 'Your developers expect root causes, not "we\'re looking into it."',
      subhead: 'When your API customers report latency spikes, webhook failures, or SDK errors, they expect a real diagnosis — not a link to your docs. Altor queries their actual API logs, checks your bug tracker, and verifies their billing to deliver root causes in 2 minutes.',
    },

    sections: [
      {
        type: 'body',
        title: 'The API-first support problem',
        paragraphs: [
          'Developer-facing companies have uniquely demanding support expectations. Your customers are engineers. They\'ve already read your docs, checked your status page, and tried debugging themselves before they open a ticket. When they reach out, they need the information they can\'t access: your internal logs, your bug tracker, your deployment history.',
          'Typical tickets at API-first developer tools:',
        ],
        bullets: [
          '"Latency spiked from 50ms to 800ms on our production API calls since 9am" — deploy regression or upstream issue?',
          '"Webhooks stopped firing for our organization" — endpoint down, quota exceeded, or delivery pipeline issue?',
          '"SDK v3.2.1 throws a type error on the batch endpoint" — known bug or usage error?',
          '"Our email deliverability dropped from 98% to 72% this week" — reputation issue, config change, or provider problem?',
          '"Database connections timeout intermittently" — connection pool exhaustion, query performance, or infrastructure?',
        ],
      },
      {
        type: 'body',
        title: 'What Altor investigates for API-first teams',
        paragraphs: [
          'Altor connects to the systems your support engineers already check manually and automates the entire investigation:',
        ],
        bullets: [
          'ClickHouse / Postgres — API logs, request latency, error rates, customer-specific usage patterns',
          'Linear / Jira — known bugs matching the customer\'s symptoms, SDK version compatibility',
          'Stripe — plan tier, usage limits, payment status, feature access',
          'GitHub — recent deploys, PRs affecting the relevant endpoints, SDK changelogs',
          'StatusPage — upstream provider outages, planned maintenance windows',
          'Docs / Mintlify — relevant configuration guides, migration docs, known workarounds',
        ],
      },
      {
        type: 'stats',
        items: [
          { value: '20–45 min', label: 'typical manual investigation time for a developer support ticket' },
          { value: '2 min', label: 'Altor\'s median diagnosis time across 200+ tickets' },
          { value: '$80–200K', label: 'annual cost per support engineer spent on manual investigation' },
          { value: '0', label: 'changes to your existing support workflow required' },
        ],
      },
      {
        type: 'quote',
        text: 'Altor diagnosed in 2 minutes what used to take our engineers 45 minutes of copying data between tabs.',
        author: 'Engineering lead',
        company: 'Portkey',
      },
      {
        type: 'body',
        title: 'Why API-first companies choose Altor',
        paragraphs: [
          'API-first developer tools share three traits that make investigation automation critical: developer customers who expect technical depth, high ticket volume driven by integration complexity, and well-structured API log data that Altor can query precisely.',
          'Your support team is already technical. They know how to investigate. The problem is the time it takes — 20–45 minutes per ticket, checking the same 4–6 systems in the same order. Altor runs that same workflow in 2 minutes, so your engineers can focus on the 5% of tickets that actually need human judgment.',
        ],
      },
    ],

    cta: {
      title: 'See Altor investigate a real ticket from your queue',
      body: 'We\'ll connect to your API logs, bug tracker, and billing system. Your data, your ticket, diagnosed in 2 minutes.',
      buttonText: 'Book a demo',
      buttonUrl: 'https://calendly.com/founders-altorlab/30min',
    },
  },
}
