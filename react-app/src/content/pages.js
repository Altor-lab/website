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
}
