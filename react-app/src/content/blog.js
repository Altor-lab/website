export const blogPosts = {
  investigationWorkflow: {
    slug: '/blog/support-ticket-investigation-workflow',
    title: 'The Support Investigation Workflow Top B2B Teams Use to Cut Resolution Time',
    description: 'Most support teams optimize routing and replies while the 20-45 minute investigation step stays manual. This framework shows where resolution time actually goes — and how to shrink it.',
    datePublished: '2026-03-03',
    dateModified: '2026-03-03',
    readTime: '7 min read',

    headline: 'The support ticket investigation workflow nobody talks about',
    opening: 'When a B2B customer reports "my API calls are failing," the support engineer\'s real work begins: querying ClickHouse for error patterns, searching Linear for known bugs, checking Stripe for billing issues, reviewing GitHub for recent deploys, and cross-referencing all of it into a diagnosis. This investigation phase takes 20–45 minutes per ticket and accounts for 80% of the total resolution time — yet almost no support tooling, training, or content addresses it. According to a 2025 Zendesk benchmark study of US SaaS companies, the average US support team now handles 400+ tickets per week, which makes investigation speed a board-level lever instead of a workflow detail. Every guide on "reducing resolution time" focuses on routing, chatbots, and knowledge bases. The investigation itself is treated as an opaque step labeled "engineer works on it." This guide breaks it down.',

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

    seeAlso: [
      {
        label: 'See also: altor-vec, our open-source client-side vector search library',
        href: 'https://altorlab.dev',
      },
    ],
  },

  investigationCost: {
    slug: '/blog/support-investigation-cost',
    title: 'The Hidden Cost of Support Investigation (It\'s Probably Your Biggest Support Expense)',
    description: 'Benchmarks usually lump support work into one number. This breakdown shows why the real cost is the investigation phase — and why B2B teams keep missing the biggest lever.',
    datePublished: '2026-03-03',
    dateModified: '2026-03-03',
    readTime: '5 min read',

    headline: 'The true cost of support ticket investigation',
    opening: 'The average B2B SaaS support ticket costs $18–35 to resolve. But that number hides the real expense. When you decompose resolution into its phases, investigation — the part where an engineer queries ClickHouse, checks Linear, verifies Stripe, and reviews GitHub — accounts for $17–40 of that cost per ticket. That\'s 75–85% of the total. At a company handling 200 technical tickets per month, investigation alone costs $3,400–8,000/month, or $40,000–96,000/year. Per support engineer. For US SaaS teams running 400+ tickets per week, that investigation tax compounds even faster across SLA pressure, overtime, and engineering interruptions. This cost is invisible in industry benchmarks because they measure resolution time as a single number.',

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

    seeAlso: [
      {
        label: 'See also: altor-vec, our open-source client-side vector search library',
        href: 'https://altorlab.dev',
      },
    ],
  },

  clickhouseDiagnosis: {
    slug: '/blog/clickhouse-support-diagnosis',
    title: 'How Support Teams Use ClickHouse to Diagnose API Issues in Minutes',
    description: 'If your product data already lives in ClickHouse, your support team may be sitting on the fastest path to root cause. These query patterns help B2B teams investigate without tab-switching for half an hour.',
    datePublished: '2026-03-03',
    dateModified: '2026-03-03',
    readTime: '8 min read',

    headline: 'How to use ClickHouse to diagnose customer support issues in minutes',
    opening: 'If your engineering team uses ClickHouse for product analytics, your support team is probably already querying it manually for every technical ticket. When a customer reports "my API calls are failing," someone opens a ClickHouse console, writes a query to pull that customer\'s error rates, waits for results, interprets them, then pivots to the next system. This process — repeated 5–20 times per day across your support team — typically takes 5–15 minutes just for the ClickHouse portion of each investigation. For US SaaS teams handling 400+ tickets per week, shaving even five minutes off that query loop materially improves coverage across EST and PST queues. The queries themselves follow repeatable patterns. This guide covers the 5 most common ClickHouse query patterns for support diagnosis and how to reduce investigation time from minutes to seconds.',

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

    seeAlso: [
      {
        label: 'See also: altor-vec, our open-source client-side vector search library',
        href: 'https://altorlab.dev',
      },
    ],
  },

  agentVsChatbot: {
    slug: '/blog/ai-support-agent-vs-chatbot',
    title: 'AI Support Agent vs. Chatbot: Which One Actually Reduces Escalations?',
    description: 'Chatbots are good at docs. They usually break down on live technical tickets. Here\'s how B2B support teams decide when they need answer generation — and when they need real investigation.',
    datePublished: '2026-03-03',
    dateModified: '2026-03-03',
    readTime: '6 min read',

    headline: 'AI support agent vs. chatbot: why the distinction matters for B2B',
    opening: 'In B2B technical support, the terms "AI agent" and "chatbot" are used interchangeably, but they describe fundamentally different tools that solve different problems. A chatbot retrieves answers from a knowledge base — it handles "how do I configure webhooks?" A support investigation agent queries live production systems — it handles "why are my webhooks failing right now?" The distinction matters because 80% of B2B technical support tickets require live data investigation, not document lookup. According to a 2025 Zendesk benchmark study of US SaaS companies, teams with technical support queues are under the most pressure to improve first-contact resolution without adding headcount. Choosing the wrong tool means 80% of your tickets still require manual engineering time.',

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

    seeAlso: [
      {
        label: 'See also: altor-vec, our open-source client-side vector search library',
        href: 'https://altorlab.dev',
      },
    ],
  },

  reduceEscalations: {
    slug: '/blog/reduce-support-escalations',
    title: 'Why 70% of Support Escalations Are Preventable — And How to Cut Them',
    description: 'Most escalations happen because agents lack system context, not training. This guide shows how B2B support teams reduce avoidable handoffs by automating investigation before engineering gets pulled in.',
    datePublished: '2026-03-03',
    dateModified: '2026-03-03',
    readTime: '6 min read',

    headline: 'How to reduce support escalations by automating investigation',
    opening: 'Support escalations in B2B technical support happen for one reason: the frontline agent doesn\'t have the technical context to resolve the issue. They can\'t query ClickHouse, they don\'t have access to Linear, they can\'t check the customer\'s Stripe billing status. So they escalate to an engineer who can. The standard playbook — better routing, more training, improved knowledge bases — treats escalation as a competence problem. It\'s not. It\'s an information access problem. For US SaaS support teams handling 400+ tickets per week, every avoidable escalation creates real backlog pressure across time zones. When the investigation is done automatically before the agent opens the ticket, the diagnosis is already there. Escalation becomes unnecessary because the context gap no longer exists.',

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

    seeAlso: [
      {
        label: 'See also: altor-vec, our open-source client-side vector search library',
        href: 'https://altorlab.dev',
      },
    ],
  },

  whyEnterpriseAIFails: {
    slug: '/blog/why-enterprise-ai-fails-in-production',
    title: 'Why Enterprise AI Fails in Production: 7 Critical Mistakes',
    description: '67% of enterprise AI projects fail at production. Not because the models are bad — because the systems around them are wrong. Here are the 7 mistakes that kill AI deployments, and what successful teams do differently.',
    datePublished: '2026-04-15',
    dateModified: '2026-04-15',
    readTime: '9 min read',

    headline: 'Why enterprise AI fails in production: 7 critical mistakes',
    opening: '67% of enterprise AI projects fail to reach production. This is not a new statistic — it has hovered around this figure since 2022, surviving multiple model generations and billions in enterprise AI investment. The models have gotten dramatically better. The failure rate has not moved. That tells you something important: the problem is not the model. The problem is everything around the model — the systems, the deployment approach, the organizational structure, and the metrics. This article breaks down the 7 most common reasons enterprise AI fails at production, drawn from our experience deploying AI systems at B2B SaaS companies. Each mistake is fixable. Most are preventable.',

    sections: [
      {
        heading: 'Mistake 1: Treating the pilot as the product',
        paragraphs: [
          'The single most common pattern: a team runs a successful AI pilot — clean data, controlled environment, enthusiastic stakeholders — and assumes production will be a straightforward scale-up. It is not.',
          'Production introduces what pilots never have: dirty data, edge cases, latency requirements, concurrent users, and the expectation that the system works every time. The gap between "impressive demo" and "reliable production system" is where most AI projects die.',
        ],
        bullets: [
          'Design pilots explicitly for production transition. Every pilot decision should ask: "Does this hold at scale?"',
          'Define production success criteria before the pilot starts, not after',
          'Plan for 3-5x the compute costs observed in pilot (production data is messier and more variable)',
          'Identify the 20% of edge cases that will appear in production and test them explicitly in the pilot',
        ],
      },
      {
        heading: 'Mistake 2: Underestimating data quality requirements',
        paragraphs: [
          'AI models in pilot environments typically run on curated, cleaned datasets. Production systems run on real data — and real data is messy. Schema changes, missing fields, inconsistent formats, and stale records all degrade model performance in ways that sandbox testing never reveals.',
          'We have seen production deployments where model accuracy dropped 40% within the first two weeks solely because production data had characteristics the training data did not. No amount of model quality compensates for data quality failure.',
        ],
        bullets: [
          'Build data validation pipelines before deployment, not after problems appear',
          'Monitor input data distribution continuously — model performance will degrade silently if inputs drift',
          'Establish data quality SLAs alongside model performance SLAs',
          'Plan for the most common data quality failures specific to your domain (for support tickets: missing customer IDs, merged accounts, deleted records)',
        ],
      },
      {
        heading: 'Mistake 3: Skipping the production readiness assessment',
        paragraphs: [
          'Production readiness is not a checklist item — it is a systematic evaluation of whether your system can handle real-world conditions. Most teams skip it because it slows down the timeline. The teams that skip it spend 2-3x longer on post-launch fire-fighting than the assessment would have taken.',
        ],
        bullets: [
          'Latency under load: does the system meet response time requirements at 10x pilot volume?',
          'Failure modes: what happens when a connected system (database, API, third-party service) is unavailable?',
          'Rollback: can you revert to the previous workflow within 15 minutes if the AI system fails?',
          'Monitoring: do you have alerts that will fire before users start complaining?',
          'Access controls: are production credentials properly scoped and audited?',
        ],
      },
      {
        heading: 'Mistake 4: Measuring the wrong things',
        paragraphs: [
          'AI projects report model accuracy. Business stakeholders care about business outcomes. These are not the same thing — and the gap between them is where AI projects lose executive support.',
          'A support ticket investigation system with 94% root cause accuracy is impressive. "We reduced median investigation time from 45 minutes to 2 minutes across 200 tickets" is the same system, measured in business terms. The second framing survives budget reviews. The first does not.',
        ],
        bullets: [
          'Define business outcome metrics before deployment: time saved, cost reduced, error rate decreased',
          'Track model metrics and business metrics in parallel — both matter, but business metrics drive continued investment',
          'Set measurement cadence: weekly for early deployments, monthly for stable systems',
          'Build an ROI calculation that a finance team can audit (not just an engineering team)',
        ],
      },
      {
        heading: 'Mistake 5: Deploying without a governance framework',
        paragraphs: [
          'Governance sounds like a compliance problem. It is actually an operational problem. Without clear rules about when AI acts autonomously versus when it defers to humans, production systems generate unpredictable behavior at exactly the worst moments.',
          'This is why every AI system we deploy starts read-only. The system surfaces diagnoses for human review. Write access — any automated action — requires explicit approval and a defined escalation path. Destructive actions are never automated regardless of confidence level.',
        ],
        bullets: [
          'Define the action taxonomy before deployment: what can the AI do autonomously, what requires approval, what is always human-only?',
          'Build explicit override mechanisms that are easy to use, not buried in admin interfaces',
          'Log every AI decision with the reasoning — both for debugging and for regulatory requirements',
          'Review AI action logs weekly for the first month, then monthly as the system matures',
        ],
      },
      {
        heading: 'Mistake 6: Ignoring model drift',
        paragraphs: [
          'A model that works in April may not work in September. The world changes — new product features, new customer segments, new failure modes — and models trained on historical data do not automatically adapt. Most teams discover model drift when users start complaining, not before.',
          'The fix is monitoring input distributions continuously, not just output quality. When inputs drift, outputs will drift next.',
        ],
        bullets: [
          'Set up input distribution monitoring from day one — track the statistical properties of data your model receives',
          'Define drift thresholds that trigger retraining before performance degrades visibly',
          'Build retraining pipelines before the model goes live — not as an afterthought when drift is detected',
          'Review a sample of AI outputs manually every week for the first quarter',
        ],
      },
      {
        heading: 'Mistake 7: Treating AI deployment as a one-time project',
        paragraphs: [
          'Software is released and maintained. AI systems are deployed and operated. The distinction matters: a production AI system requires ongoing attention — monitoring, retraining, playbook updates, and adaptation to new use cases — that does not exist for traditional software at the same cadence.',
          'Teams that staff AI projects like software releases — build it, ship it, move on — consistently see performance degrade within 60-90 days. Teams that assign ongoing operational ownership see systems that compound value over time.',
        ],
        bullets: [
          'Assign explicit ownership for AI operations before deployment — not "the team that built it" in their spare time',
          'Budget for operational costs: monitoring, retraining, infrastructure, and support',
          'Build a playbook update process: how will the system be updated as your product and customer base evolve?',
          'Schedule quarterly reviews of AI system performance against business outcomes',
        ],
      },
      {
        heading: 'What successful deployments look like',
        paragraphs: [
          'At Portkey, an AI gateway platform, every support ticket was a 45-minute manual investigation across ClickHouse, Linear, Stripe, and GitHub. The failure modes we had seen repeatedly — dirty data, undefined governance, no monitoring — shaped how we approached the deployment.',
          'We started read-only. We defined what "investigation" meant precisely before writing code. We built monitoring on the investigation process itself, not just the model outputs. We measured in business terms: median investigation time, not model accuracy. After 200 tickets diagnosed in production, the system still runs at under 2 minutes per investigation. That outcome required getting the 7 things above right, not just the model.',
        ],
      },
    ],

    seeAlso: [
      { label: 'How Altor approaches production AI deployment', href: '/platform' },
      { label: 'Portkey case study: 45 minutes to 2', href: '/work/support-investigation' },
      { label: 'Support investigation cost: the hidden expense', href: '/blog/support-investigation-cost' },
    ],
  },

  productionAIGuide: {
    slug: '/blog/production-ai-complete-guide',
    title: 'Production AI: The Complete Guide for Engineering Teams',
    description: 'Production AI is different from pilot AI in every meaningful way. This guide covers what "production" actually means for AI systems, why pilots fail to scale, and the framework for deploying AI that stays working.',
    datePublished: '2026-04-15',
    dateModified: '2026-04-15',
    readTime: '11 min read',

    headline: 'Production AI: the complete guide',
    opening: 'Every enterprise has done an AI pilot. Most enterprises have not successfully deployed production AI. The gap between these two states — between "it works in the demo" and "it works every day in the real system" — is where most AI investment disappears. This guide defines what production AI actually means, why it is fundamentally different from pilot AI, and what a framework for successful production AI deployment looks like. It is written for engineering teams and technical leads who have seen AI pilots succeed and production deployments fail, and who want to understand why.',

    sections: [
      {
        heading: 'What "production AI" means',
        paragraphs: [
          'Production AI is an AI system that operates continuously in a live business environment, handling real data, serving real users, and being held to the same reliability and performance standards as any other production software.',
          'This definition has three components worth unpacking:',
        ],
        bullets: [
          'Continuous operation: the system runs without manual intervention, handles the volume and variety of real-world inputs, and recovers from failures automatically',
          'Real data: not curated training data or pilot datasets — actual production data with all its messiness, inconsistency, and edge cases',
          'Production standards: the system is monitored, has defined SLAs, has an on-call runbook, and has a rollback procedure — just like any other production service',
        ],
      },
      {
        heading: 'Why pilot AI and production AI are different systems',
        paragraphs: [
          'Pilot AI is designed to demonstrate capability. Production AI is designed to deliver value reliably, repeatedly, at scale.',
          'This sounds like a small distinction. It produces completely different engineering requirements.',
        ],
        table: {
          headers: ['Dimension', 'Pilot AI', 'Production AI'],
          rows: [
            ['Data', 'Curated, clean, static', 'Messy, evolving, inconsistent'],
            ['Volume', 'Controlled sample', 'Full production load'],
            ['Users', 'Internal stakeholders', 'Actual end users'],
            ['Failure mode', 'Acceptable (it\'s a demo)', 'Must be handled gracefully'],
            ['Monitoring', 'None or minimal', 'Full observability required'],
            ['Ownership', 'Project team', 'Permanent operational owner'],
            ['Timeline', 'Weeks', 'Years'],
            ['Success metric', 'Accuracy, impressiveness', 'Business outcome, uptime'],
          ],
        },
      },
      {
        heading: 'The 5-stage production AI deployment framework',
        paragraphs: [
          'Successful production AI deployments follow a consistent pattern. Teams that skip stages spend 3-5x longer on post-launch remediation than the skipped stage would have required.',
        ],
        steps: [
          'Stage 1 — Readiness Assessment: Before writing a line of deployment code, evaluate whether the system is ready for production. Latency under load. Data quality in production (not just training). Failure modes when dependencies are unavailable. Rollback procedure. Access controls. Teams that do this catch 60-70% of production failures before they happen.',
          'Stage 2 — Integration design: Map every system the AI will connect to. Define the access model (read-only first — always). Design the data flow. Identify the bottlenecks. This is where most teams underestimate scope: a support investigation system that connects to ClickHouse, Linear, Stripe, GitHub, and docs is not one integration — it is five, each with its own failure modes.',
          'Stage 3 — Staged rollout: Do not deploy to all users on day one. Start with 5-10% of traffic or a specific user segment. Monitor the business metrics and system metrics for 2 weeks. Expand only when you have evidence the system behaves correctly at scale.',
          'Stage 4 — Operations setup: Before launch, define the monitoring dashboard, set the alert thresholds, write the runbook, and assign on-call ownership. A production AI system that has no alert when it stops working is not a production system — it is a time bomb.',
          'Stage 5 — Continuous improvement: Production AI is not software you ship and maintain. It requires ongoing playbook updates, retraining triggers, and adaptation to new inputs. Build this process before you need it.',
        ],
      },
      {
        heading: 'What production AI looks like in practice',
        paragraphs: [
          'Abstract frameworks are useful. A concrete example is more useful.',
          'At Portkey, an AI gateway platform, the production AI system we deployed investigates support tickets. Every ticket that arrives connects to 6 production systems simultaneously: ClickHouse for API logs, Linear for bug tracking, Stripe for billing, GitHub for deploy history, documentation for workarounds, and StatusPage for upstream incidents.',
          'The system runs read-only. Every investigation is logged. The playbooks are reviewed quarterly and updated as Portkey\'s product evolves. When a new integration type becomes common in their customer base, the investigation logic is updated to handle it.',
          'After 200+ tickets in production: median investigation time is under 2 minutes. The system handles 6 concurrent system queries per ticket. Zero false positives on high-severity issues in the first 90 days. That is what production AI looks like — not accuracy metrics in a notebook, but measured business outcomes from a system that runs every day.',
        ],
      },
      {
        heading: 'The production AI readiness checklist',
        paragraphs: [
          'Before any AI system goes to production, verify these 10 criteria:',
        ],
        steps: [
          'Latency SLA defined and tested: the system meets its response time requirement under 2x expected peak load',
          'Data validation pipeline in place: bad inputs are caught and handled gracefully before they reach the model',
          'Failure modes documented: you know what happens when each dependency is unavailable and have tested it',
          'Rollback procedure written and tested: you can revert to the previous workflow in under 15 minutes',
          'Monitoring dashboard live: key metrics visible before users start using the system',
          'Alert thresholds set: you will know about problems before users report them',
          'On-call ownership assigned: a specific person is responsible when the system has problems at 2am',
          'Action governance defined: explicit rules about what the AI can do autonomously vs. what requires human approval',
          'Business outcome baseline established: you know what "better" looks like in business terms',
          'Retraining trigger defined: you know what signal will prompt a model update and who will execute it',
        ],
      },
      {
        heading: 'Common production AI failure modes and their fixes',
        paragraphs: [],
        bullets: [
          'Silent degradation — model accuracy drops without alerts firing. Fix: monitor input distributions, not just output quality. When inputs drift, outputs will drift next.',
          'Data quality failures — production data has characteristics training data did not. Fix: build data validation pipelines and test them against real production data samples before launch.',
          'Missing edge cases — the pilot covered 80% of scenarios; the 20% that appear in production break the system. Fix: explicitly enumerate edge cases before launch and test each one.',
          'Governance gaps — the AI takes an action nobody expected it to take. Fix: define the action taxonomy before deployment and build override mechanisms that are easy to use.',
          'Dependency failures — a connected system (database, API, service) goes down and the AI system has no graceful degradation. Fix: test every dependency failure explicitly during readiness assessment.',
          'Operational orphans — the team that built the system moves on; nobody owns it. Fix: assign operational ownership before launch, not after the first production incident.',
        ],
      },
    ],

    seeAlso: [
      { label: 'Why enterprise AI fails in production: 7 critical mistakes', href: '/blog/why-enterprise-ai-fails-in-production' },
      { label: 'How Altor deploys production AI systems', href: '/platform' },
      { label: 'Portkey: production AI investigation in practice', href: '/work/support-investigation' },
    ],
  },

  aiServicesVsConsulting: {
    slug: '/blog/ai-services-vs-ai-consulting-vs-ai-implementation',
    title: 'AI Services vs AI Consulting vs AI Implementation: What\'s the Difference?',
    description: 'These three terms are used interchangeably by vendors but mean very different things when it comes to outcomes, cost structure, and what you actually get. Here is how to tell them apart.',
    datePublished: '2026-04-15',
    dateModified: '2026-04-15',
    readTime: '6 min read',

    headline: 'AI services vs AI consulting vs AI implementation: what\'s the difference?',
    opening: 'If you have asked three vendors what they do and gotten three different answers that sound nearly identical, you are not alone. "AI services," "AI consulting," and "AI implementation" are used interchangeably across the industry — by vendors trying to position themselves, by buyers trying to evaluate options, and by analysts trying to categorize a market that is still defining itself. They are not the same thing. The differences matter because they predict what you will get, how much you will pay, and whether your AI system will actually run in production. This article defines each term clearly and gives you the questions to ask to figure out which one you are actually buying.',

    sections: [
      {
        heading: 'AI consulting: strategy and advice',
        paragraphs: [
          'AI consulting is the delivery of strategic guidance, roadmaps, and recommendations. A consulting engagement typically results in a document: an AI strategy, an opportunity assessment, a vendor evaluation, or a transformation roadmap.',
          'What you get: advice about what to do and how to think about AI in your organization.',
          'What you do not get: working software, deployed systems, or production AI.',
          'When it makes sense: when you need to understand the landscape, build internal alignment, or make a buy vs. build decision. When you have executive buy-in but no AI technical leadership.',
          'When it does not make sense: when you already know what you want to build and need someone to build it.',
        ],
        bullets: [
          'Typical deliverable: strategy document, roadmap, opportunity assessment',
          'Typical engagement length: 4-12 weeks',
          'Typical team: former Big Tech executives, MBAs, strategy consultants',
          'Typical pricing: $50-500K for a strategy engagement',
          'Red flag: the engagement ends when the document is delivered',
        ],
      },
      {
        heading: 'AI implementation: building the system',
        paragraphs: [
          'AI implementation is the delivery of software — the actual build. An implementation engagement results in code, deployed infrastructure, and a working AI system.',
          'What you get: a built system. Sometimes with training, sometimes with documentation, sometimes with a brief handoff period.',
          'What you do not get (usually): ongoing operational support, continuous improvement, or accountability for production outcomes.',
          'When it makes sense: when you have internal technical teams who can own and operate the system after handoff.',
          'When it does not make sense: when you do not have the internal capability to maintain what gets built.',
        ],
        bullets: [
          'Typical deliverable: working software, deployed infrastructure, documentation',
          'Typical engagement length: 8-24 weeks',
          'Typical team: software engineers, ML engineers, data engineers',
          'Typical pricing: $100K-1M depending on scope',
          'Red flag: the engagement ends at launch, not at production stability',
        ],
      },
      {
        heading: 'AI services: building and operating the system',
        paragraphs: [
          'AI services is the ongoing delivery of AI capability — not just the initial build, but the deployment, operation, monitoring, and continuous improvement of the system over time.',
          'What you get: a production AI system that the services company is accountable for operating and improving.',
          'What you do not get: a handoff. The services company stays involved.',
          'When it makes sense: when you want a production AI system but do not want to build and maintain it internally. When speed to production matters more than internal ownership.',
          'When it does not make sense: when you have strong internal AI engineering capability and want to own the system entirely.',
        ],
        bullets: [
          'Typical deliverable: production AI system, ongoing operation, monthly impact reporting',
          'Typical engagement length: quarterly or annual, ongoing',
          'Typical team: forward-deployed engineers who stay embedded',
          'Typical pricing: usage-based or retainer, aligned to outcomes',
          'Green flag: the services company is measured on business outcomes, not deliverables',
        ],
      },
      {
        heading: 'The comparison in one table',
        paragraphs: [],
        table: {
          headers: ['', 'AI Consulting', 'AI Implementation', 'AI Services'],
          rows: [
            ['Deliverable', 'Strategy document', 'Working software', 'Production system'],
            ['Outcome ownership', 'Client', 'Client (after handoff)', 'Shared'],
            ['Engagement end', 'Document delivery', 'Launch', 'When you choose to end it'],
            ['What happens at 2am', 'Client calls their team', 'Client calls their team', 'Services company handles it'],
            ['Business outcome accountability', 'Low', 'Medium', 'High'],
            ['Best for', 'Direction-setting', 'Building with internal ops', 'Building without internal ops'],
            ['Failure risk', 'Low (just advice)', 'Medium (build risks)', 'Low (outcomes aligned)'],
          ],
        },
      },
      {
        heading: 'The questions that reveal which one you are actually buying',
        paragraphs: [
          'Every vendor will call what they do "AI services." These questions cut through the positioning:',
        ],
        steps: [
          '"What does the engagement look like after go-live?" — Consulting ends before launch. Implementation ends at launch. Services continues after launch. The answer to this question tells you what you are buying.',
          '"How is your success measured?" — If the answer is deliverables (documents, code, deployment), you are buying consulting or implementation. If the answer is business outcomes (time saved, cost reduced, accuracy achieved), you are buying services.',
          '"Who is on the hook if the system stops working in production?" — If the answer is "your team," it is consulting or implementation. If the answer is "us," it is services.',
          '"What is your standard engagement length?" — Consulting: weeks. Implementation: months. Services: quarters to years.',
          '"Can I see your pricing structure?" — Consulting and implementation: project-based. Services: usage-based or retainer.',
        ],
      },
      {
        heading: 'What Altor is (and is not)',
        paragraphs: [
          'Altor is an AI services company. We build production AI systems and operate them — we do not hand off at launch and move on.',
          'We are not AI consultants. We do not produce strategy documents or roadmaps. If you need help deciding whether and what to build, we are not the right fit.',
          'We are not pure AI implementors. We do not build and hand off. If you have strong internal engineering capability and want to own the system entirely, we are not the right fit.',
          'We are right for teams that want a production AI system and are not planning to build and maintain it internally. We embed alongside your team, deploy in 3 weeks, and stay accountable for the system running and improving over time.',
        ],
      },
    ],

    seeAlso: [
      { label: 'How Altor works: our deployment model', href: '/platform' },
      { label: 'See the Portkey case study', href: '/work/support-investigation' },
      { label: 'Pricing: how we structure engagements', href: '/pricing' },
    ],
  },
}
