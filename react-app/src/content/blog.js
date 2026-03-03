export const blogPosts = {
  investigationWorkflow: {
    slug: '/blog/support-ticket-investigation-workflow',
    title: 'The Support Ticket Investigation Workflow — A Framework for B2B Teams',
    description: 'Most B2B support content focuses on routing and chatbots. The actual bottleneck — the 20-45 minute investigation phase — is invisible. Here\'s a framework for fixing it.',
    datePublished: '2026-03-03',
    dateModified: '2026-03-03',
    readTime: '7 min read',

    headline: 'The support ticket investigation workflow nobody talks about',
    opening: 'When a B2B customer reports "my API calls are failing," the support engineer\'s real work begins: querying ClickHouse for error patterns, searching Linear for known bugs, checking Stripe for billing issues, reviewing GitHub for recent deploys, and cross-referencing all of it into a diagnosis. This investigation phase takes 20–45 minutes per ticket and accounts for 80% of the total resolution time — yet almost no support tooling, training, or content addresses it. Every guide on "reducing resolution time" focuses on routing, chatbots, and knowledge bases. The investigation itself is treated as an opaque step labeled "engineer works on it." This guide breaks it down.',

    sections: [
      {
        heading: 'Why the investigation phase is the bottleneck',
        paragraphs: [
          'Support ticket lifecycle is typically modeled as: receive → triage → assign → resolve → close. But "resolve" hides the most expensive step. For technical B2B tickets, resolution decomposes into two distinct phases:',
        ],
        bullets: [
          'Investigation (20–45 minutes): Querying systems, correlating data, identifying root cause',
          'Response (5 minutes): Writing the customer reply once you know the answer',
        ],
        paragraphs2: null,
      },
      {
        paragraphs: [
          'Support platforms optimize triage and assignment. Chatbots handle the 20% of tickets that are FAQ-answerable. AI copilots help draft the 5-minute response faster. But nobody automates the 20–45 minute investigation — the part where an engineer manually queries 4–6 systems and correlates the results.',
          'This is why resolution time benchmarks plateau. You can route tickets instantly, deflect the simple ones, and draft responses with AI — but if the investigation still takes 30 minutes, resolution time stays at 35 minutes.',
        ],
      },
      {
        heading: 'The 4-query investigation method',
        paragraphs: [
          'After studying hundreds of B2B support investigations at companies using ClickHouse, Linear, Stripe, and GitHub, a consistent pattern emerges. Most technical investigations follow 4 queries in sequence:',
        ],
        steps: [
          'Symptom query — What is actually happening? Pull the customer\'s specific data from your observability system (ClickHouse, Datadog, etc.). Don\'t rely on their description — measure it. Example: "429 error rate for customer acme-corp spiked from 12% to 43% over the last 2 hours."',
          'Correlation query — Is this a known issue? Search your bug tracker (Linear, Jira) for matching symptoms. Check your status page for ongoing incidents. Example: "LIN-482: rate limit regression — open, priority urgent."',
          'Elimination query — What isn\'t causing it? Check billing (Stripe) for payment issues, plan limits, or feature access changes. Check deployment history (GitHub) for recent changes. Example: "Plan active, usage within limits. Last deploy: 6 days ago, unrelated endpoint."',
          'Synthesis — Combine findings into a diagnosis with confidence level and recommended action. Example: "Known bug LIN-482 causing elevated 429s. Fix in PR #891, shipping in 3 days. Workaround: exponential backoff."',
        ],
      },
      {
        heading: 'Why this method takes 20–45 minutes manually',
        paragraphs: [
          'Each query requires context-switching to a different tool, writing or adjusting a search query, interpreting results, and mentally holding findings from previous queries. The total time breaks down approximately:',
        ],
        table: {
          headers: ['Step', 'Tool', 'Time', 'What makes it slow'],
          rows: [
            ['Symptom query', 'ClickHouse / Datadog', '5–15 min', 'Writing SQL, finding the right table, narrowing the time window'],
            ['Correlation query', 'Linear / Jira + StatusPage', '5–10 min', 'Searching with the right keywords, reading through matches'],
            ['Elimination query', 'Stripe + GitHub', '5–10 min', 'Navigating to the right customer, checking multiple fields'],
            ['Synthesis', 'Your brain', '5–10 min', 'Correlating findings, assessing confidence, drafting response'],
          ],
        },
      },
      {
        paragraphs: [
          'The biggest cost isn\'t any single query — it\'s the context-switching. An engineer averages 5–10 tab switches per investigation, each requiring them to mentally reload where they are in the investigation and what they\'ve found so far.',
        ],
      },
      {
        heading: 'What automated investigation looks like',
        paragraphs: [
          'The 4-query method can be automated when three conditions are met: the systems have APIs, the query patterns are repeatable, and the investigation logic can be encoded into playbooks. When automated, the same investigation that takes a human 20–45 minutes completes in under 2 minutes.',
          'At Portkey, an AI gateway handling billions of API requests, this automation reduced median investigation time from 20–45 minutes to 2 minutes across 200+ tickets — with zero changes to their existing support platform or team workflows.',
        ],
        quote: {
          text: 'The investigation pattern was the same 80% of the time. Check ClickHouse, check Linear, check Stripe, synthesize. We just couldn\'t justify the engineering time to automate it ourselves.',
          author: 'Engineering lead',
          company: 'Portkey',
        },
      },
      {
        heading: 'How to evaluate your investigation workflow',
        paragraphs: [
          'Start by timing 10 consecutive technical support tickets. For each, track:',
        ],
        bullets: [
          'How many systems did the engineer query?',
          'How long did the investigation take (before they started writing the response)?',
          'Could the investigation have been done with read-only API access to those systems?',
          'How many times was the same investigation pattern repeated across different tickets?',
        ],
        callout: {
          title: 'The 80% rule',
          text: 'If 80% or more of your investigations follow 3 or fewer patterns, and the data sources have APIs, the investigation is automatable. The question is whether to build it yourself or use a purpose-built tool.',
        },
      },
    ],

    relatedPosts: [
      { label: 'The true cost of support ticket investigation', path: '/blog/support-investigation-cost' },
      { label: 'AI support agent vs. chatbot: the investigation gap', path: '/blog/ai-support-agent-vs-chatbot' },
    ],
  },

  investigationCost: {
    slug: '/blog/support-investigation-cost',
    title: 'The True Cost of Support Ticket Investigation — Why Benchmarks Miss It',
    description: 'Industry benchmarks measure total resolution time. They miss the biggest line item: the 20-45 minutes engineers spend investigating each ticket across ClickHouse, Linear, Stripe, and GitHub.',
    datePublished: '2026-03-03',
    dateModified: '2026-03-03',
    readTime: '5 min read',

    headline: 'The true cost of support ticket investigation',
    opening: 'The average B2B SaaS support ticket costs $18–35 to resolve. But that number hides the real expense. When you decompose resolution into its phases, investigation — the part where an engineer queries ClickHouse, checks Linear, verifies Stripe, and reviews GitHub — accounts for $17–40 of that cost per ticket. That\'s 75–85% of the total. At a company handling 200 technical tickets per month, investigation alone costs $3,400–8,000/month, or $40,000–96,000/year. Per support engineer. This cost is invisible in industry benchmarks because they measure resolution time as a single number.',

    sections: [
      {
        heading: 'How investigation cost breaks down',
        paragraphs: [
          'Based on industry data and observations across B2B SaaS support teams, the cost decomposition per technical ticket looks like this:',
        ],
        table: {
          headers: ['Phase', 'Time', 'Cost at $50/hr', '% of total'],
          rows: [
            ['Triage and routing', '1–2 min', '$0.83–1.67', '3–5%'],
            ['Investigation', '20–45 min', '$16.67–37.50', '75–85%'],
            ['Response drafting', '3–5 min', '$2.50–4.17', '10–12%'],
            ['Follow-up', '2–3 min', '$1.67–2.50', '5–8%'],
          ],
        },
      },
      {
        paragraphs: [
          'The $50/hour fully-loaded cost is conservative for a support engineer at a B2B SaaS company — when you factor in salary, benefits, tooling, and management overhead, the real number is often $60–80/hour. At $70/hour, investigation costs $23–52 per ticket.',
        ],
      },
      {
        heading: 'Why existing tools don\'t touch this cost',
        paragraphs: [
          'The support tooling ecosystem is built around everything except investigation:',
        ],
        bullets: [
          'Support platforms (Zendesk, Intercom, Pylon) optimize triage and routing — the $1 phase',
          'Doc chatbots deflect FAQ-answerable tickets — roughly 20% of B2B volume',
          'AI copilots speed up response drafting — the $3 phase',
          'Investigation — the $17–40 phase — has no dedicated tooling in most stacks',
        ],
        paragraphs2: null,
      },
      {
        paragraphs: [
          'This is why companies report modest ROI from support AI despite investing heavily in it. They\'ve optimized the $4 in triage + response and left the $30 in investigation untouched.',
        ],
      },
      {
        heading: 'The annual investigation tax',
        paragraphs: [
          'For a B2B support team, the math scales quickly:',
        ],
        table: {
          headers: ['Ticket volume', 'Investigation cost/ticket', 'Monthly cost', 'Annual cost'],
          rows: [
            ['100 tickets/month', '$25 avg', '$2,500', '$30,000'],
            ['200 tickets/month', '$25 avg', '$5,000', '$60,000'],
            ['500 tickets/month', '$25 avg', '$12,500', '$150,000'],
            ['1,000 tickets/month', '$25 avg', '$25,000', '$300,000'],
          ],
        },
      },
      {
        paragraphs: [
          'These numbers represent the investigation cost alone — not total support cost. And they don\'t include the second-order costs: missed SLAs, delayed escalation resolution, engineer burnout, and customer churn from slow response times.',
        ],
      },
      {
        heading: 'What happens when you automate investigation',
        paragraphs: [
          'When investigation is automated — running the same ClickHouse queries, Linear searches, Stripe checks, and GitHub lookups in parallel instead of sequentially — the time drops from 20–45 minutes to under 2 minutes. The cost per ticket drops proportionally.',
        ],
        quote: {
          text: 'Altor diagnosed in 2 minutes what used to take our engineers 45 minutes of copying data between tabs.',
          author: 'Engineering lead',
          company: 'Portkey',
        },
        callout: {
          title: 'Calculate your investigation cost',
          text: 'Take your average fully-loaded engineer cost per hour, multiply by your average investigation time per ticket, multiply by your monthly ticket volume. That\'s your investigation tax. If 80% of those investigations follow repeatable patterns, that\'s the amount you can automate away.',
        },
      },
    ],

    relatedPosts: [
      { label: 'The investigation workflow framework', path: '/blog/support-ticket-investigation-workflow' },
      { label: 'How to reduce escalations by automating investigation', path: '/blog/reduce-support-escalations' },
    ],
  },

  clickhouseDiagnosis: {
    slug: '/blog/clickhouse-support-diagnosis',
    title: 'Using ClickHouse to Diagnose Customer Support Issues in Minutes',
    description: 'If your team uses ClickHouse for product analytics, it already has the data to diagnose 80% of support tickets. Here are the query patterns that turn ClickHouse into a support investigation tool.',
    datePublished: '2026-03-03',
    dateModified: '2026-03-03',
    readTime: '8 min read',

    headline: 'How to use ClickHouse to diagnose customer support issues in minutes',
    opening: 'If your engineering team uses ClickHouse for product analytics, your support team is probably already querying it manually for every technical ticket. When a customer reports "my API calls are failing," someone opens a ClickHouse console, writes a query to pull that customer\'s error rates, waits for results, interprets them, then pivots to the next system. This process — repeated 5–20 times per day across your support team — typically takes 5–15 minutes just for the ClickHouse portion of each investigation. The queries themselves follow repeatable patterns. This guide covers the 5 most common ClickHouse query patterns for support diagnosis and how to reduce investigation time from minutes to seconds.',

    sections: [
      {
        heading: 'Pattern 1: Error rate spike detection',
        paragraphs: [
          'The most common support query. Customer reports errors — you need to quantify the problem, identify when it started, and determine the severity.',
          'What you\'re looking for: the customer\'s error rate over time, compared to their baseline. The query should answer: "Is this actually happening? When did it start? How bad is it?"',
          'Typical approach: Query the API logs table filtered by customer ID, group by time interval (5 min or 1 hour), calculate error rate as percentage of total requests. Compare the current window against the previous 24–48 hours to establish baseline.',
          'Key fields: customer_id, timestamp, http_status_code (or error_type), endpoint, request_id.',
          'What this tells you: Whether the customer\'s complaint is valid, when the problem started (which narrows the root cause), and whether it\'s getting worse or stabilizing.',
        ],
      },
      {
        heading: 'Pattern 2: Latency percentile tracking',
        paragraphs: [
          'Customer reports "things are slow." You need to measure actual latency, identify the affected endpoints, and determine if this is a regression.',
          'What you\'re looking for: p50, p95, and p99 latency for the customer\'s requests, broken down by endpoint. Compare current values against their historical baseline.',
          'Key insight: Customers often report "everything is slow" when only one endpoint is affected. The query should break down latency by endpoint to isolate the problem. If p95 jumped but p50 is stable, you\'re looking at a tail-latency issue (likely a specific code path or external dependency).',
        ],
      },
      {
        heading: 'Pattern 3: Customer activity timeline',
        paragraphs: [
          'For debugging configuration or authentication issues, you need a timeline of the customer\'s recent activity — what they called, when, and what happened.',
          'What you\'re looking for: the last N requests from this customer, ordered by time, with status codes and relevant metadata. This is the "replay the tape" query.',
          'Key insight: Often reveals the root cause immediately. A customer reporting "auth stopped working" may have rotated their API key 2 hours ago and the old key is cached somewhere. The timeline shows the exact moment behavior changed.',
        ],
      },
      {
        heading: 'Pattern 4: Comparative analysis across customers',
        paragraphs: [
          'Is this a single-customer issue or a platform-wide problem? This query determines blast radius.',
          'What you\'re looking for: the same error/latency metric across multiple customers during the same time window. If only one customer is affected, it\'s likely a customer-specific issue (config, billing, usage). If multiple customers show the same pattern, it\'s likely a platform issue (deploy regression, infrastructure).',
          'This query is critical for triage. A customer-specific issue means you check Stripe and their configuration. A platform-wide issue means you check GitHub deploys and StatusPage.',
        ],
      },
      {
        heading: 'Pattern 5: Usage and billing reconciliation',
        paragraphs: [
          'Customer disputes their invoice. You need to count their actual usage for the billing period and compare it against what they were charged.',
          'What you\'re looking for: total request count (or whatever your billing unit is) for the customer during the billing period, broken down by billable vs. non-billable requests, by endpoint, and by day to identify any spikes.',
          'Key insight: The most common billing disputes come from unexpected usage spikes — a customer\'s CI pipeline running in a loop, a misconfigured retry policy, or a legitimate traffic increase they didn\'t anticipate. The daily breakdown reveals these patterns instantly.',
        ],
      },
      {
        heading: 'The manual bottleneck: not the query, but the context',
        paragraphs: [
          'If your support team runs these queries manually, the bottleneck isn\'t ClickHouse\'s execution time — it\'s everything around it:',
        ],
        bullets: [
          'Opening the ClickHouse console and connecting to the right cluster',
          'Remembering (or looking up) the table names, column names, and customer ID format',
          'Adjusting the time window based on when the customer reported the issue',
          'Interpreting results in the context of the customer\'s plan tier and normal usage',
          'Then switching to Linear, Stripe, and GitHub to continue the investigation',
        ],
      },
      {
        paragraphs: [
          'When these 5 query patterns are automated — running in parallel, with results correlated against Linear bugs, Stripe billing, and GitHub deploys — the entire investigation completes in under 2 minutes instead of 20–45.',
        ],
        quote: {
          text: 'Our support engineers were writing the same ClickHouse queries 10 times a day. Same tables, same columns, different customer ID. Automating that alone saved hours per week.',
          author: 'Engineering lead',
          company: 'Portkey',
        },
      },
    ],

    relatedPosts: [
      { label: 'The support investigation workflow framework', path: '/blog/support-ticket-investigation-workflow' },
      { label: 'API error investigation — full walkthrough', path: '/use-case/api-error-investigation' },
    ],
  },

  agentVsChatbot: {
    slug: '/blog/ai-support-agent-vs-chatbot',
    title: 'AI Support Agent vs. Chatbot — The Investigation Gap',
    description: 'Chatbots answer questions from your docs. AI agents investigate across live systems. For B2B technical support, the distinction determines whether 80% of your tickets get solved or stuck.',
    datePublished: '2026-03-03',
    dateModified: '2026-03-03',
    readTime: '6 min read',

    headline: 'AI support agent vs. chatbot: why the distinction matters for B2B',
    opening: 'In B2B technical support, the terms "AI agent" and "chatbot" are used interchangeably, but they describe fundamentally different tools that solve different problems. A chatbot retrieves answers from a knowledge base — it handles "how do I configure webhooks?" A support investigation agent queries live production systems — it handles "why are my webhooks failing right now?" The distinction matters because 80% of B2B technical support tickets require live data investigation, not document lookup. Choosing the wrong tool means 80% of your tickets still require manual engineering time.',

    sections: [
      {
        heading: 'What each tool actually does',
        table: {
          headers: ['', 'Doc chatbot', 'Investigation agent'],
          rows: [
            ['Data source', 'Knowledge base, help center, docs', 'Live production systems (ClickHouse, Linear, Stripe, GitHub)'],
            ['Question type', '"How does this feature work?"', '"Why is this broken for this customer right now?"'],
            ['Output', 'Article links, generated text from docs', 'Structured diagnosis with evidence from actual data'],
            ['Ticket coverage', '~20% (FAQ-answerable)', '~80% (requires live investigation)'],
            ['Time saved', 'Deflects simple tickets entirely', 'Reduces 20-45 min investigations to 2 min'],
            ['Data freshness', 'Static — updated when docs change', 'Real-time — queries live customer data per ticket'],
            ['Failure mode', 'Gives generic answer or says "I don\'t know"', 'Returns "insufficient data" with what it did find'],
          ],
        },
      },
      {
        heading: 'The 80/20 split in B2B support',
        paragraphs: [
          'B2B support tickets split roughly 80/20:',
        ],
        bullets: [
          '20% are knowledge-answerable: "How do I rotate my API key?" "What\'s the rate limit on the batch endpoint?" "How do I set up webhook retries?" These are well-served by doc chatbots.',
          '80% require investigation: "My API calls are returning 429s." "Latency spiked since this morning." "Our webhook endpoint stopped receiving events." "My invoice doesn\'t match my usage." These require querying the customer\'s actual data across multiple systems.',
        ],
      },
      {
        paragraphs: [
          'The 20% that chatbots handle are the cheapest tickets anyway — they take 2–3 minutes to resolve manually. The 80% that require investigation are the expensive ones — 20–45 minutes each. A chatbot that handles 100% of the cheap tickets and 0% of the expensive tickets reduces your support cost by roughly 10–15%. An investigation agent that handles the expensive tickets reduces cost by 60–70%.',
        ],
      },
      {
        heading: 'Why chatbots fail on investigation tickets',
        paragraphs: [
          'When a chatbot encounters an investigation ticket — "my API calls are failing" — it does the only thing it can: search the knowledge base for "API errors" and return the most relevant article. The customer gets a link to "Troubleshooting API Errors" that tells them to check their API key and verify their endpoint URL.',
          'This fails because the answer isn\'t in the documentation. The answer is in the customer\'s actual API logs (12% → 43% error rate spike), your bug tracker (LIN-482, rate limit regression), and your deployment history (fix in PR #891, 3 days out). No amount of knowledge base improvement will put live, per-customer, per-ticket data into a static document.',
          'The customer escalates. An engineer spends 30 minutes doing the investigation the chatbot couldn\'t. The chatbot\'s "deflection" actually increased resolution time by adding a wasted round-trip.',
        ],
      },
      {
        heading: 'When to use each tool',
        paragraphs: [
          'The answer isn\'t either/or — it\'s both, each in their lane:',
        ],
        bullets: [
          'Deploy a doc chatbot for customer-facing FAQ deflection. It handles onboarding questions, feature documentation, and self-service workflows. Measure it by deflection rate on FAQ-type tickets.',
          'Deploy an investigation agent for internal technical diagnosis. It handles the 80% of tickets that require querying live data across multiple systems. Measure it by investigation time reduction and escalation rate.',
          'Don\'t try to make one tool do both jobs. A chatbot with "agent capabilities" bolted on will do neither well. A purpose-built investigation tool that also tries to answer FAQs is overengineered for the simple cases.',
        ],
        quote: {
          text: 'Our doc chatbot handled maybe 1 in 5 tickets. The rest sat in queue until an engineer had time to investigate. Now the investigation happens automatically and the engineer just reviews the diagnosis.',
          author: 'Engineering lead',
          company: 'Portkey',
        },
      },
    ],

    relatedPosts: [
      { label: 'Altor vs. doc chatbots — comparison', path: '/compare/altor-vs-doc-chatbots' },
      { label: 'Altor vs. AI copilots — investigation vs. drafting', path: '/compare/altor-vs-copilot-for-support' },
    ],
  },

  reduceEscalations: {
    slug: '/blog/reduce-support-escalations',
    title: 'How to Reduce Support Escalations — Automate Investigation, Not Conversation',
    description: 'Support escalations happen because frontline agents lack technical context, not because they lack communication skills. Automating the investigation phase eliminates the root cause of most escalations.',
    datePublished: '2026-03-03',
    dateModified: '2026-03-03',
    readTime: '6 min read',

    headline: 'How to reduce support escalations by automating investigation',
    opening: 'Support escalations in B2B technical support happen for one reason: the frontline agent doesn\'t have the technical context to resolve the issue. They can\'t query ClickHouse, they don\'t have access to Linear, they can\'t check the customer\'s Stripe billing status. So they escalate to an engineer who can. The standard playbook — better routing, more training, improved knowledge bases — treats escalation as a competence problem. It\'s not. It\'s an information access problem. When the investigation is done automatically before the agent opens the ticket, the diagnosis is already there. Escalation becomes unnecessary because the context gap no longer exists.',

    sections: [
      {
        heading: 'Why escalations actually happen',
        paragraphs: [
          'The conventional explanation for escalations is "the agent didn\'t know the answer." But when you decompose escalated tickets, a more specific pattern emerges:',
        ],
        bullets: [
          '65–75% escalate because the answer requires querying internal systems the agent can\'t access (database logs, bug trackers, deployment history)',
          '15–20% escalate because the issue is genuinely novel and requires engineering judgment',
          '10–15% escalate due to miscategorization or routing errors',
        ],
      },
      {
        paragraphs: [
          'The first category — system access — is the only one that scales with ticket volume. More tickets means more manual investigations, more escalations, more engineering time burned on support instead of product work. And it\'s the only category that\'s fully automatable.',
        ],
      },
      {
        heading: 'The information access gap',
        paragraphs: [
          'A typical escalation path looks like this:',
        ],
        steps: [
          'Customer submits: "Our API calls have been failing with 429 errors since this morning."',
          'Frontline agent reads the ticket. They can see the customer\'s account info and ticket history in the support platform, but they can\'t query API logs, check the bug tracker, or verify billing details.',
          'Agent tries the knowledge base. Finds the "Rate Limit Troubleshooting" article. Sends it to the customer.',
          'Customer replies: "I already tried that. This isn\'t a rate limit on my end — your error rate spiked."',
          'Agent escalates to engineering. An engineer opens ClickHouse, finds the error spike, checks Linear for known bugs, verifies Stripe billing, reviews recent deploys. Investigation takes 25 minutes.',
          'Engineer resolves: "Known bug LIN-482. Fix shipping in 3 days. Workaround available."',
        ],
      },
      {
        paragraphs: [
          'Steps 2–4 were wasted time. The escalation happened not because the agent lacked skill — but because they lacked data. If the ClickHouse query, Linear search, and Stripe check had been done automatically when the ticket arrived, the agent could have resolved it in step 2.',
        ],
      },
      {
        heading: 'What "automate the investigation" means',
        paragraphs: [
          'Investigation automation doesn\'t mean replacing agents with AI. It means giving agents the investigation results that currently require engineering access:',
        ],
        bullets: [
          'When a ticket arrives, automatically query ClickHouse for the customer\'s error rates, latency, and recent activity',
          'Search Linear for bugs matching the customer\'s symptoms',
          'Check Stripe for billing status, plan limits, and payment issues',
          'Review GitHub for recent deploys that might correlate with the reported issue',
          'Deliver a structured diagnosis — root cause, evidence, confidence level, recommended response — into the agent\'s existing support platform',
        ],
      },
      {
        paragraphs: [
          'The agent still reviews and sends the response. They still exercise judgment on edge cases. But they\'re reviewing a diagnosis instead of staring at a ticket they can\'t investigate.',
        ],
        quote: {
          text: 'We didn\'t need another ticket router. We needed something that could actually pull the data and tell us what\'s wrong. Once our agents had the diagnosis, escalations dropped because the context gap was gone.',
          author: 'Engineering lead',
          company: 'Portkey',
        },
      },
      {
        heading: 'The escalation-resolution flywheel',
        paragraphs: [
          'Reducing escalations creates a compounding effect:',
        ],
        bullets: [
          'Fewer escalations → engineers spend less time on support → more time on product work',
          'Faster resolution → higher customer satisfaction → lower churn → more revenue to invest in support',
          'Agents resolve more tickets independently → higher job satisfaction → lower agent turnover → lower hiring and training costs',
          'Investigation data accumulates → playbooks improve → future tickets resolve even faster',
        ],
        callout: {
          title: 'Measuring the impact',
          text: 'Track three metrics before and after automating investigation: escalation rate (% of tickets escalated to engineering), investigation time (minutes from ticket open to diagnosis), and first-contact resolution rate. At Portkey, investigation time dropped from 20-45 minutes to 2 minutes across 200+ tickets.',
        },
      },
    ],

    relatedPosts: [
      { label: 'The true cost of support investigation', path: '/blog/support-investigation-cost' },
      { label: 'The investigation workflow framework', path: '/blog/support-ticket-investigation-workflow' },
    ],
  },
}
