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
        comparisonLabel: 'Doc chatbot',
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
        text: 'Our doc chatbot handled maybe 1 in 5 tickets. The rest sat in queue until an engineer had time to investigate.',
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

    relatedPages: [
      { label: 'How Portkey cut investigation time from 45 min to 2', path: '/customers/portkey' },
      { label: 'Altor vs. support platform AI', path: '/compare/altor-vs-support-platform-ai' },
      { label: 'See a full API error investigation', path: '/use-case/api-error-investigation' },
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
        comparisonLabel: 'Support platform AI',
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
        text: 'We didn\'t need another ticket router. We needed something that could actually pull the data and tell us what\'s wrong.',
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

    relatedPages: [
      { label: 'Altor vs. doc chatbots', path: '/compare/altor-vs-doc-chatbots' },
      { label: 'Altor vs. AI copilots', path: '/compare/altor-vs-copilot-for-support' },
      { label: 'Read the Portkey case study', path: '/customers/portkey' },
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
    title: 'Automate API Error Investigation — Root Cause in 2 Minutes',
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
        text: 'The 429 investigation used to be our most common ticket and our biggest time sink. Now it resolves before the customer finishes their coffee.',
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

    relatedPages: [
      { label: 'Webhook failure investigation', path: '/use-case/webhook-failure-investigation' },
      { label: 'Billing escalation debugging', path: '/use-case/billing-escalation-debugging' },
      { label: 'How Portkey uses Altor', path: '/customers/portkey' },
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
    title: 'How Portkey Cut Investigation Time From 45 Min to 2',
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
        title: 'A real investigation: latency spike diagnosis',
        paragraphs: [
          'A Portkey customer submits: "Dashboard is loading slowly since this morning." Here\'s what Altor does in under 2 minutes:',
        ],
        steps: [
          'Queries ClickHouse: p95 latency jumped from 340ms to 1.2s starting at 09:14 UTC.',
          'Checks GitHub: Deploy #447 shipped at 09:12 UTC — introduced a new query in the /analytics endpoint.',
          'Searches Linear: No related bugs filed yet.',
          'Checks StatusPage: No upstream incidents. All providers green.',
          'Delivers diagnosis: Deploy #447 introduced an unindexed query in /analytics. Rollback or index addition will resolve.',
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

    relatedPages: [
      { label: 'See a full API error investigation', path: '/use-case/api-error-investigation' },
      { label: 'Altor for AI infrastructure teams', path: '/for/ai-infrastructure-companies' },
      { label: 'How Altor differs from doc chatbots', path: '/compare/altor-vs-doc-chatbots' },
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
    title: 'Altor vs. AI Copilots for Support — Investigation vs. Drafting',
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
        comparisonLabel: 'AI copilot',
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
            dimension: 'Time saved',
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
        text: 'The bottleneck was never writing the response. It was the 30 minutes of digging through ClickHouse and Linear to figure out what to say.',
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

    relatedPages: [
      { label: 'Altor vs. doc chatbots', path: '/compare/altor-vs-doc-chatbots' },
      { label: 'Altor vs. support platform AI', path: '/compare/altor-vs-support-platform-ai' },
      { label: 'Read the Portkey case study', path: '/customers/portkey' },
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
    title: 'Automate Webhook Failure Investigation — Root Cause in Minutes',
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
        text: 'Webhook failures used to be our scariest tickets — the customer thinks they\'re losing data. Now we have the full picture in 2 minutes: what\'s failing, why, and whether events are safe.',
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

    relatedPages: [
      { label: 'API error investigation', path: '/use-case/api-error-investigation' },
      { label: 'Billing escalation debugging', path: '/use-case/billing-escalation-debugging' },
      { label: 'Altor for API-first dev tools', path: '/for/api-first-developer-tools' },
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
    title: 'Automate Billing Dispute Resolution — Evidence in Minutes',
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
          { value: '#1', label: 'cause of churn — unresolved billing disputes' },
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
        text: 'Billing disputes went from our most dreaded ticket type to the fastest to resolve. Altor pulls the Stripe invoice and the ClickHouse usage data in parallel — our engineer just reviews the comparison.',
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

    relatedPages: [
      { label: 'API error investigation', path: '/use-case/api-error-investigation' },
      { label: 'Webhook failure investigation', path: '/use-case/webhook-failure-investigation' },
      { label: 'Read the Portkey case study', path: '/customers/portkey' },
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
    title: 'Altor for AI Infrastructure — Gateway and Routing Investigation',
    description: 'AI infrastructure companies like Portkey, Helicone, and Langfuse deal with tickets about API routing, model fallbacks, and gateway configs. Altor investigates them in 2 minutes.',
    datePublished: '2026-03-03',
    dateModified: '2026-03-03',

    hero: {
      headline: 'Your customers don\'t file FAQ tickets. They file investigations.',
      subhead: 'AI infrastructure tickets are about API routing failures, model fallback chains breaking, gateway latency spikes, and token usage discrepancies. These aren\'t questions a knowledge base can answer — they require pulling live data from your customer\'s actual API logs, configs, and billing.',
    },

    sections: [
      {
        type: 'body',
        title: 'Ticket patterns unique to AI infrastructure',
        paragraphs: [
          'If you\'re building an AI gateway, observability platform, or prompt management layer — your support tickets are fundamentally different from typical SaaS. Your customers are developers pushing production LLM traffic through your platform. When something breaks, they need root causes with evidence.',
        ],
        bullets: [
          '"Requests to Claude are failing but GPT-4 works" — routing config, provider outage, or fallback chain not triggering?',
          '"Model fallback isn\'t activating when OpenAI times out" — threshold config issue, or a gateway bug introduced in a recent deploy?',
          '"Token counts on our invoice don\'t match our logged usage" — tracking discrepancy from prompt caching, or a billing pipeline bug?',
          '"Latency doubled on our production routing requests" — your gateway overhead, the provider\'s response time, or a DNS issue?',
          '"Our custom metadata isn\'t being passed through to the model provider" — request transformation bug or API version mismatch?',
        ],
      },
      {
        type: 'body',
        title: 'What Altor investigates for AI infra teams',
        paragraphs: [
          'For AI infrastructure companies, Altor connects to the specific systems where gateway and routing data lives:',
        ],
        bullets: [
          'ClickHouse / your analytics DB — request logs per model provider, routing decisions, fallback triggers, latency per hop',
          'Linear / Jira — known gateway bugs, routing issues, provider compatibility problems',
          'Stripe — token-based billing, usage tiers, overage calculations against actual logged tokens',
          'GitHub — gateway deploys, routing config changes, SDK version releases',
          'StatusPage / PagerDuty — upstream provider outages (OpenAI, Anthropic, Azure, AWS)',
        ],
      },
      {
        type: 'stats',
        items: [
          { value: '2 min', label: 'median diagnosis at Portkey — an AI gateway handling billions of requests' },
          { value: '200+', label: 'tickets diagnosed across gateway routing, latency, and billing patterns' },
          { value: '70%', label: 'of Portkey\'s support volume covered by 3 investigation playbooks' },
          { value: '3 weeks', label: 'from kickoff to full deployment at Portkey' },
        ],
      },
      {
        type: 'quote',
        text: 'Our tickets are investigations — "why is this model routing failing for this customer?" Nobody else could even attempt to answer that automatically. Altor can because it actually queries our ClickHouse logs.',
        author: 'Engineering lead',
        company: 'Portkey',
      },
      {
        type: 'body',
        title: 'Why AI infra is the ideal fit for Altor',
        paragraphs: [
          'AI infrastructure companies have three traits that make investigation automation especially effective: highly technical tickets that always require multi-system data, well-structured request logs in systems like ClickHouse that Altor can query precisely, and engineering-heavy support teams that value root causes over templates.',
          'Portkey was Altor\'s first deployment. The patterns built there — provider routing failures, latency spike diagnosis, token billing cross-referencing — transfer directly to other AI infrastructure companies.',
        ],
      },
    ],

    relatedPages: [
      { label: 'How Portkey uses Altor — full case study', path: '/customers/portkey' },
      { label: 'Altor for API-first developer tools', path: '/for/api-first-developer-tools' },
      { label: 'API error investigation walkthrough', path: '/use-case/api-error-investigation' },
    ],

    cta: {
      title: 'Your stack looks like Portkey\'s. See what Altor finds.',
      body: 'We\'ll connect to your API logs, bug tracker, and billing system and investigate a real ticket from your queue.',
      buttonText: 'Book a demo',
      buttonUrl: 'https://calendly.com/founders-altorlab/30min',
    },
  },

  forAPIDevTools: {
    slug: '/for/api-first-developer-tools',
    title: 'Altor for API Developer Tools — Latency, Webhooks, and SDK Investigation',
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
        title: 'What makes API-first support different',
        paragraphs: [
          'Your customers are developers. They\'ve already read your docs, checked your status page, and tried debugging themselves before they open a ticket. When they reach out, they need the information they can\'t access: your internal logs, your bug tracker, your deployment history.',
          'Typical tickets at API-first developer tools:',
        ],
        bullets: [
          '"Email deliverability dropped from 98% to 72% this week" — reputation issue, DNS config change, or provider problem?',
          '"Database connections timeout intermittently under load" — connection pool exhaustion, query performance, or infrastructure scaling?',
          '"SDK v3.2.1 throws a type error on the batch endpoint" — known bug in this version, or an API contract change?',
          '"Our auth tokens expire after 15 minutes instead of the configured 60" — config not propagated, or a regression in the last deploy?',
          '"Webhook payloads are missing the metadata field we added yesterday" — API version mismatch or webhook serialization bug?',
        ],
      },
      {
        type: 'body',
        title: 'What Altor investigates for API-first teams',
        paragraphs: [
          'API-first dev tools have rich, structured data that Altor can query precisely:',
        ],
        bullets: [
          'ClickHouse / Postgres — request logs, latency per endpoint, error rates by SDK version, delivery metrics',
          'Linear / Jira — SDK bugs, API contract changes, endpoint deprecation tracking',
          'Stripe — per-endpoint billing, usage tier enforcement, metered billing reconciliation',
          'GitHub — SDK releases, breaking change PRs, migration guides for affected versions',
          'StatusPage — infrastructure status, planned maintenance, third-party provider health',
          'Docs / Mintlify — SDK migration guides, breaking change notices, version compatibility matrices',
        ],
      },
      {
        type: 'stats',
        items: [
          { value: '20–45 min', label: 'typical investigation time for a developer support ticket' },
          { value: '2 min', label: 'Altor\'s median diagnosis time' },
          { value: '$80–200K', label: 'annual cost per support engineer in manual investigation time' },
          { value: '0', label: 'changes to your existing support workflow' },
        ],
      },
      {
        type: 'quote',
        text: 'Developer customers don\'t want empathy — they want data. Altor gives our support team the data before the customer even finishes writing the ticket.',
        author: 'Engineering lead',
        company: 'Portkey',
      },
      {
        type: 'body',
        title: 'Why API-first companies choose Altor',
        paragraphs: [
          'Three traits make investigation automation critical for API-first companies: developer customers who expect technical depth and will churn without it, high ticket volume driven by integration complexity across many SDK versions and use cases, and well-structured API log data that Altor can query precisely.',
          'Your support team is already technical. They know how to investigate. The problem is time — 20–45 minutes per ticket, checking the same systems in the same order. Altor runs that same workflow in 2 minutes, so your engineers focus on the tickets that actually need human judgment.',
        ],
      },
    ],

    relatedPages: [
      { label: 'Altor for AI infrastructure companies', path: '/for/ai-infrastructure-companies' },
      { label: 'Webhook failure investigation', path: '/use-case/webhook-failure-investigation' },
      { label: 'Read the Portkey case study', path: '/customers/portkey' },
    ],

    cta: {
      title: 'See Altor investigate a real ticket from your queue',
      body: 'We\'ll connect to your API logs, bug tracker, and billing system. Your data, your ticket, diagnosed in 2 minutes.',
      buttonText: 'Book a demo',
      buttonUrl: 'https://calendly.com/founders-altorlab/30min',
    },
  },
}
