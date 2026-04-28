#!/usr/bin/env python3
"""Populate missing automation page sections with hardcoded workflow content."""

from __future__ import annotations

import copy
import json
from pathlib import Path


def table_section(heading: str, headers: list[str], rows: list[list[str]]) -> dict:
    return {
        "heading": heading,
        "table": {
            "headers": headers,
            "rows": rows,
        },
    }


def paragraphs_section(heading: str, paragraphs: list[str]) -> dict:
    return {
        "heading": heading,
        "paragraphs": paragraphs,
    }


WORKFLOW_SECTIONS = {
    "customer-support": [
        table_section(
            "Cost comparison: manual vs AI for customer support automation",
            ["Approach", "Setup time", "Monthly cost", "Tickets handled/hr"],
            [
                [
                    "Manual agent team",
                    "Immediate",
                    "$8,000–$15,000/mo per agent",
                    "8–12",
                ],
                [
                    "DIY with {tool}",
                    "4–12 weeks",
                    "$500–$2,500/mo + eng time",
                    "50–200",
                ],
                ["Altor production deployment", "3 weeks", "Usage-based", "500+"],
            ],
        ),
        paragraphs_section(
            "Common failure modes in customer support automation",
            [
                "The most common failure in LLM-based customer support is context hallucination — the model fabricates account details, order history, or policy specifics not present in the ticket. This happens when the AI doesn't have access to live customer data and instead extrapolates from training data. Fix: never let the model answer questions about specific accounts without first querying your CRM, billing system, or order management system for ground truth.",
                "Escalation misrouting is the second most common failure. When the AI classifies a complex technical ticket as a billing question or vice versa, it routes to the wrong team and delays resolution by hours. Fix: build a confidence threshold — if classification confidence < 0.85, route to a human reviewer rather than auto-routing.",
                "Tone calibration failures occur when the model responds to frustrated or angry customers with generic positive language. High-frustration tickets require acknowledgment before resolution. Fix: classify sentiment first, then adjust response template — high frustration tickets get a 'I understand this is urgent' opener before the resolution steps.",
            ],
        ),
        paragraphs_section(
            "Integration architecture for customer support automation",
            [
                "The production architecture connects four systems: (1) your helpdesk (Zendesk, Freshdesk, Intercom) as the ticket ingestion point via webhook, (2) your CRM (Salesforce, HubSpot) for customer history and account tier, (3) your product database or ClickHouse for usage data and error logs, (4) your knowledge base for policy and troubleshooting content.",
                "The AI layer sits between ingestion and response — it reads the ticket, queries the connected systems, and generates a draft response or investigation result. The human agent reviews and sends. This keeps humans in the loop for communication while automating the investigation work that takes 80% of resolution time.",
            ],
        ),
    ],
    "lead-qualification": [
        table_section(
            "Lead qualification automation: time and cost comparison",
            [
                "Approach",
                "Leads/hour",
                "Qualification accuracy",
                "Cost per qualified lead",
            ],
            [
                ["Manual SDR review", "8–15", "75–85%", "$25–$60"],
                ["Rules-based scoring", "500+", "60–70%", "$3–$8"],
                ["AI qualification ({tool})", "200–1000", "85–92%", "$1–$5"],
                ["Altor + AI qualification", "1000+", "90–95%", "$0.50–$2"],
            ],
        ),
        paragraphs_section(
            "Common failure modes in lead qualification automation",
            [
                "Over-qualification is the most expensive failure — the AI approves too many leads by using weak signals (job title match, company size) without negative signals (wrong industry, competitor employee, student account). Result: SDR time wasted on leads that convert at 2% instead of the target 8–12%. Fix: require 3 independent qualifying signals minimum — firmographic fit + behavioral signal + intent data.",
                "Firmographic data staleness causes systematic mis-qualification. Company size, funding stage, and tech stack data from enrichment tools like Clearbit or ZoomInfo can be 6–18 months out of date. A startup that raised Series A last year now has 200 employees — your 50-person minimum filter incorrectly disqualifies them. Fix: check LinkedIn headcount directly as a secondary signal for borderline cases.",
                'CRM duplication failures occur when the AI qualifies and creates records for leads that already exist in the pipeline under a different email variant. "john.smith@company.com" and "jsmith@company.com" get created as two separate contacts. Fix: run fuzzy deduplication on name+company before writing new records.',
            ],
        ),
        paragraphs_section(
            "Integration architecture for lead qualification automation",
            [
                "The standard architecture ingests leads from 3–4 sources: form fills (embedded Clearbit enrichment on submit), LinkedIn outbound (via Sales Navigator export or Apollo), outbound email clicks (via campaign tracking pixels), and inbound content downloads (gated assets). Each source feeds into a unified queue.",
                "The qualification layer runs a 5-point scoring check: ICP industry match, company size band, tech stack fit, seniority threshold, and behavioral intent signal. The AI resolves ambiguous signals by querying enrichment APIs in real time. Qualified leads are written to Salesforce/HubSpot with populated fields. Disqualified leads are tagged with rejection reason for analysis.",
            ],
        ),
    ],
    "invoice-processing": [
        table_section(
            "Invoice automation cost: manual vs AI — 2026 benchmarks",
            ["Method", "Cost per Invoice", "Processing Time", "Error Rate"],
            [
                ["Manual AP team", "$8–$15", "3–5 days", "3–5%"],
                ["Basic OCR + rules", "$2–$5", "1–2 days", "5–8% (structured only)"],
                [
                    "AI-assisted ({tool})",
                    "$0.10–$0.50",
                    "30–90 seconds",
                    "<1% with validation layer",
                ],
                [
                    "Altor production deployment",
                    "$0.20–$0.60 all-in",
                    "60–120 seconds",
                    "<0.5% with human-in-loop exceptions",
                ],
            ],
        ),
        paragraphs_section(
            "Common failure modes in invoice processing automation",
            [
                "Hallucinated totals are the most common failure — the model miscalculates line item sums on invoices with complex discount structures. Fix: always re-compute totals programmatically from extracted line items; never trust the model's arithmetic.",
                "Missing line items on multi-page PDFs is the second common failure — the extraction layer can miss items on page 3+ when the document is poorly formatted. Fix: chunk multi-page invoices by page and merge results before validation.",
                'Currency handling errors on international invoices happen when USD, EUR, and GBP amounts get confused because the invoice uses ambiguous symbols. Fix: extract currency code explicitly as a separate field ("USD", "EUR"), never infer from symbol alone.',
                'PO matching failures happen when vendor names vary across systems. "Acme Corp", "Acme Corporation", and "ACME" all fail exact-match lookup. Fix: fuzzy match vendor names against your vendor master using a similarity threshold of 0.85 before posting.',
            ],
        ),
        paragraphs_section(
            "Integration architecture for invoice processing automation",
            [
                "The production architecture has four layers: (1) ingestion — email parser or upload portal captures the PDF or image, (2) extraction — the AI extracts structured JSON with vendor, amount, line items, due date, PO number, and currency, (3) validation — rules engine checks totals, matches PO, and flags exceptions, (4) posting — approved invoices write to QuickBooks, NetSuite, or Xero through their APIs.",
                "Accounting system mappings should stay deterministic. QuickBooks writes through the QBO Bill object, NetSuite creates a VendorBill record, and Xero posts to the invoices endpoint only after validation passes. The AI handles interpretation; the integration layer handles schema mapping and posting.",
                "The exception queue is the most important production component. Any invoice where confidence < 0.90, amount > $5,000, or PO match fails gets routed to a human reviewer before posting. This keeps the error rate below 0.5% while still eliminating almost all manual data entry.",
            ],
        ),
    ],
    "content-repurposing": [
        table_section(
            "Content repurposing automation ROI",
            ["Content type", "Manual time", "AI time", "Output volume/week"],
            [
                ["Blog → LinkedIn posts", "2 hrs/post", "15 min", "5–10 posts"],
                ["Webinar → article series", "4 hrs/webinar", "30 min", "4–6 articles"],
                ["Report → social thread", "1 hr/report", "10 min", "8–12 threads"],
                ["Podcast → newsletter", "3 hrs/episode", "20 min", "4–6 newsletters"],
            ],
        ),
        paragraphs_section(
            "Common failure modes in content repurposing automation",
            [
                "Voice drift is the most visible failure — repurposed content loses the author's specific tone and reads as generic AI output. A founder who writes with technical depth and deliberate provocation gets a LinkedIn post that sounds like a PR release. Fix: include 3–5 examples of the author's best-performing content in the system prompt as style anchors, not just tone instructions.",
                "Platform format violations generate posts that are technically correct but algorithmically penalized. LinkedIn threads longer than 1,300 characters, Twitter threads with links in the first post, Instagram captions without hashtag placement optimization. Fix: build platform-specific formatters that post-process AI output for each distribution channel's current algorithm preferences.",
                "Claim accuracy failures occur when the AI extrapolates from partial source content. A report says 'in Q3, retention improved' and the repurposed version says '72% retention improvement' — a number that wasn't in the source. Fix: instruct the model to only use statistics that appear verbatim in the source document, and flag any numbers it generates for human review.",
            ],
        ),
        paragraphs_section(
            "Integration architecture for content repurposing automation",
            [
                "Content enters the pipeline from 3 sources: CMS webhooks (new blog post published triggers immediate repurposing), Zoom/cloud recording (webinar ends → transcript extracted → repurposing queued), and manual upload (existing PDF reports, whitepapers). A single Zapier or n8n trigger handles all three ingestion paths.",
                "The repurposing layer generates platform-specific variants in parallel: LinkedIn long-form post, Twitter/X thread (6–8 tweets), email newsletter section, and short-form video script. Each variant is stored in a review queue (Notion, Airtable, or Google Sheets) for human approval before scheduling. Publishing fires via Buffer or Hootsuite API on approval.",
            ],
        ),
    ],
    "data-entry": [
        table_section(
            "Data entry automation: accuracy and cost comparison",
            ["Method", "Accuracy rate", "Speed", "Cost/1000 records"],
            [
                ["Manual data entry", "96–98%", "200–400 records/hr", "$15–$40"],
                ["OCR + rules", "92–96%", "5,000+ records/hr", "$1–$3"],
                [
                    "AI-assisted ({tool})",
                    "97–99%",
                    "2,000–8,000 records/hr",
                    "$0.50–$2",
                ],
                [
                    "Human-in-loop validation",
                    "99.5%+",
                    "1,000–3,000 records/hr",
                    "$2–$5",
                ],
            ],
        ),
        paragraphs_section(
            "Common failure modes in data entry automation",
            [
                "Field mapping errors occur when source documents use non-standard column names or variable field ordering. A contract that puts 'Effective Date' in column D one month and column F the next breaks rigid OCR rules. Fix: use the AI to identify field semantics rather than column position — 'find the date this agreement becomes effective' rather than 'read cell D4'.",
                "Handwriting and poor scan quality cause OCR failures on 8–15% of documents in typical enterprise workflows. The AI returns a confidence score below 0.90 for these fields. Fix: route low-confidence extractions to a human validation queue rather than auto-writing — a 1% error rate in a 10,000-record dataset means 100 corrupt records.",
                "Duplicate detection failures happen when the same physical document is submitted twice (scan + email attachment, for example). Without deduplication logic, both records write to your database. Fix: generate a document fingerprint (hash of key fields + date) on ingestion and reject exact duplicates before processing.",
            ],
        ),
        paragraphs_section(
            "Integration architecture for data entry automation",
            [
                "Documents enter the pipeline via 4 channels: email attachment (monitored inbox triggers parsing), web upload portal, shared drive watch folder, and API webhook from external systems. All inputs normalize to a document queue with source metadata preserved.",
                "The extraction layer uses the AI to identify and parse field values, then runs a validation pass (field type checks, reference lookups, duplicate detection). Clean records write to the target system (CRM, ERP, database) via API. Exception records go to a human review queue with the specific failed validation highlighted.",
            ],
        ),
    ],
    "report-generation": [
        table_section(
            "Report generation automation: time and output quality",
            ["Report type", "Manual time", "AI time", "Refresh frequency possible"],
            [
                ["Weekly KPI dashboard", "3–4 hrs", "15 min", "Daily"],
                ["Monthly board report", "8–12 hrs", "45 min", "Weekly"],
                ["Ad-hoc competitive analysis", "4–6 hrs", "20 min", "On-demand"],
                ["Customer health scorecard", "2–3 hrs/customer", "5 min", "Real-time"],
            ],
        ),
        paragraphs_section(
            "Common failure modes in report generation automation",
            [
                "Data freshness failures produce reports with stale metrics. If your data pipeline has a 6-hour lag and your report runs at 8am, every metric is from 2am. For daily reports this is usually acceptable; for real-time dashboards it breaks trust. Fix: add a 'data as of [timestamp]' footer to every AI-generated report and alert if data is more than 2× the expected refresh cadence.",
                "Metric definition drift causes month-over-month comparisons to break silently. If 'active user' was redefined in February from '1 session in 30 days' to '3 sessions in 30 days', the AI generating a year-over-year comparison will mix definitions. Fix: version your metric definitions and store the definition date alongside every metric value in your data warehouse.",
                "Narrative hallucination occurs when the AI writes commentary about trends that aren't statistically significant. '15% increase in page views this week!' — but 15% on a base of 200 views is noise. Fix: require the AI to apply a significance threshold before generating narrative commentary — only describe changes that exceed 2 standard deviations from the rolling mean.",
            ],
        ),
        paragraphs_section(
            "Integration architecture for report generation automation",
            [
                "The architecture connects 3 layers: data sources (ClickHouse, Google Analytics, Salesforce, Stripe — queried via read-only service accounts), a report template registry (defines which metrics, time ranges, and narrative sections each report type includes), and a delivery layer (email via SendGrid, Slack via webhook, Notion via API, PDF via Puppeteer).",
                "The AI layer generates narrative commentary from the structured data. It receives: the raw metric values, the prior period values for comparison, and the report template instructions. It outputs the written sections. The final report assembles structured tables from the data layer and narrative sections from the AI layer before delivery.",
            ],
        ),
    ],
    "code-review": [
        table_section(
            "AI code review: coverage and time comparison",
            ["Review type", "Manual time", "AI time", "Coverage"],
            [
                [
                    "Style and formatting",
                    "30–60 min/PR",
                    "2 min",
                    "100% of changed lines",
                ],
                [
                    "Security vulnerability scan",
                    "1–2 hrs/PR",
                    "5 min",
                    "Known CVE patterns",
                ],
                [
                    "Logic and correctness",
                    "2–4 hrs/PR",
                    "10 min",
                    "Partial — AI misses subtle bugs",
                ],
                [
                    "Architecture review",
                    "4–8 hrs/PR",
                    "15 min",
                    "Surface patterns only",
                ],
            ],
        ),
        paragraphs_section(
            "Common failure modes in AI code review automation",
            [
                "False positive fatigue is the most damaging failure — the AI flags too many non-issues and developers start ignoring all automated comments. A 40% false positive rate means developers treat every automated comment as probably wrong. Fix: tune the severity threshold aggressively. Better to flag 10 real issues than 40 issues where 16 are real.",
                "Context blindness causes the AI to flag code that is intentionally written for a non-obvious reason. A deliberate N+1 query that's cached upstream gets flagged as a performance issue. A try/catch that swallows exceptions because the caller handles them gets flagged as an error suppressor. Fix: add a 'noqa-ai: [reason]' annotation pattern that tells the AI to skip review for a specific block with the reason documented.",
                "Hallucinated security vulnerabilities are dangerous because they look authoritative. The AI flags a bcrypt comparison as 'vulnerable to timing attacks' even though bcrypt's compare function is constant-time by design. Developers unfamiliar with the library trust the AI and rewrite working code incorrectly. Fix: for security findings, require the AI to cite a specific CVE or OWASP reference — unfounded security claims get suppressed.",
            ],
        ),
        paragraphs_section(
            "Integration architecture for code review automation",
            [
                "The integration hooks into your Git platform via webhook (GitHub Actions, GitLab CI, or Bitbucket Pipelines). On PR creation or push, the AI review runs as a required status check. It receives the diff, the PR title and description, and relevant context files (imported modules, schema files, test files).",
                "Review output posts as inline PR comments using the platform API. Each comment includes: the specific issue, the line reference, a suggested fix if applicable, and the confidence level. Only comments above the configured severity threshold post automatically; borderline findings go to a separate review queue for a team lead to approve before posting.",
            ],
        ),
    ],
    "onboarding": [
        table_section(
            "Customer onboarding automation: completion rates and time",
            [
                "Onboarding step",
                "Manual completion rate",
                "AI-assisted rate",
                "Time to complete",
            ],
            [
                ["Account setup wizard", "72%", "89%", "8 min vs 20 min"],
                ["First integration connection", "48%", "71%", "15 min vs 45 min"],
                ["First value milestone", "31%", "58%", "Day 3 vs Day 12"],
                ["Full feature activation", "22%", "44%", "Week 2 vs Week 6"],
            ],
        ),
        paragraphs_section(
            "Common failure modes in onboarding automation",
            [
                "Timing mismatch is the leading cause of automation failures — sending the right content at the wrong moment. A technical setup guide sent before the user has created their account doesn't help. An integration tutorial sent 2 weeks after account creation arrives after the user has already abandoned or succeeded on their own. Fix: trigger every onboarding step from a behavioral event (account created, first login, first API call) rather than a fixed time delay.",
                "Role mismatch sends technical content to executives and business overviews to engineers. The champion who signed the contract gets a product tour aimed at end users. The developer who needs to do the integration gets a slideshow about ROI. Fix: use job title enrichment (from signup data or Clearbit) to route users to role-specific onboarding tracks from first login.",
                "Stale progress tracking causes re-engagement emails to congratulate users on steps they completed weeks ago or nag them to complete steps they finished yesterday. Your onboarding system doesn't read from your product database. Fix: sync onboarding progress from your product's actual activity events — don't rely on whether users clicked links in your emails.",
            ],
        ),
        paragraphs_section(
            "Integration architecture for onboarding automation",
            [
                "The onboarding architecture has three layers: event ingestion (product events from Segment or Mixpanel stream into the onboarding system in real time), content delivery (emails via Customer.io or Intercom, in-app guides via Pendo or Appcues, Slack channels for enterprise), and success tracking (milestones written back to Salesforce as opportunity stages).",
                "The AI layer personalizes content for each user based on their role, company size, and progress velocity. A user who completes setup in 2 days gets advanced feature tutorials. A user stuck on step 2 for 5 days gets a personalized intervention from the CS team — the AI drafts the outreach email with specific context about where they stopped.",
            ],
        ),
    ],
    "social-media-posting": [
        table_section(
            "Social media automation: posting frequency and engagement",
            ["Approach", "Posts/week", "Avg engagement rate", "Team time/week"],
            [
                ["Manual posting", "3–5", "2.1%", "8–12 hrs"],
                ["Template-based automation", "7–14", "1.3%", "3–4 hrs"],
                ["AI-generated content ({tool})", "14–28", "1.8–2.4%", "2–3 hrs"],
                ["AI + human approval", "10–20", "2.5–3.2%", "4–6 hrs"],
            ],
        ),
        paragraphs_section(
            "Common failure modes in social media posting automation",
            [
                "Brand voice erosion happens gradually — each post is individually acceptable, but after 6 months the feed sounds like it was written by a committee of marketing interns. No edge, no specificity, no perspective. Fix: audit your top 20 highest-engagement posts manually and extract the specific stylistic patterns: sentence length, opening hook type, level of technical specificity, controversy tolerance. Encode these as explicit rules, not just 'sound like us'.",
                "Posting into breaking news creates PR incidents. An automated post about productivity goes live 20 minutes after a major layoff announcement in your industry. The timing is tone-deaf even if the content is innocent. Fix: implement a news monitoring check before every post — if there are major industry news events in the last 4 hours, hold the post for human review.",
                "Platform algorithm changes make yesterday's best practices wrong today. LinkedIn stopped boosting posts with external links in 2023. Twitter's algorithm now favors long threads over short posts. What worked 6 months ago now gets 40% less reach. Fix: review platform algorithm guidelines quarterly and update your AI prompts — treat them as living documents, not set-and-forget configurations.",
            ],
        ),
        paragraphs_section(
            "Integration architecture for social media posting automation",
            [
                "Content enters the automation from 3 sources: original AI-generated posts (scheduled weekly content calendar), derivative content (repurposed from blog/video/podcast), and reactive content (triggered by monitoring keywords in industry news). All three go through the same approval queue.",
                "The publishing layer connects to platforms via official APIs (LinkedIn Marketing API, Twitter/X API v2, Instagram Graph API, Facebook Pages API). Scheduling uses Buffer or Hootsuite as the intermediary layer — this provides a fallback approval UI and handles rate limiting. Analytics write back to your reporting database for engagement tracking.",
            ],
        ),
    ],
    "email-management": [
        table_section(
            "Email management automation: processing time and accuracy",
            ["Task", "Manual time", "AI time", "Accuracy"],
            [
                ["Triage and prioritization", "45 min/day", "2 min/day", "88–94%"],
                [
                    "Draft response generation",
                    "3–5 min/email",
                    "30 sec/email",
                    "70–85% usable",
                ],
                ["Meeting scheduling extraction", "2 min/email", "15 sec/email", "92%"],
                ["CRM data extraction", "5 min/email", "30 sec/email", "85–91%"],
            ],
        ),
        paragraphs_section(
            "Common failure modes in email management automation",
            [
                "Tone misclassification causes the AI to draft cheerful responses to angry customers and overly formal responses to casual threads. An email from your CEO that starts 'hey quick question' gets a response that starts 'Dear [Name], Thank you for reaching out'. Fix: classify sender relationship (internal/external, seniority level, existing conversation tone) before drafting — use different response templates for different relationship types.",
                "Thread context loss happens when the AI only reads the most recent email in a thread rather than the full history. It misses that the customer already tried the fix you're about to suggest, or that a promise was made two emails ago that the current draft contradicts. Fix: always include the full thread (not just the latest message) in the AI's context window when drafting responses.",
                "Action item extraction failures leave follow-ups incomplete. 'Can you send me the report by Friday?' doesn't always get extracted as a task. 'Let me know your thoughts' never does. Fix: run a dedicated action item extraction pass after drafting — prompt the AI specifically to list every commitment made in the draft and create a task for each.",
            ],
        ),
        paragraphs_section(
            "Integration architecture for email management automation",
            [
                "Email flows from your mail server (Gmail API, Microsoft Graph API for Outlook) into the processing pipeline via webhook or polling. The AI layer triages each email: classify intent, extract entities (names, dates, action items), and determine response type (needs reply, FYI only, delegate, archive). High-priority emails trigger immediate processing; lower-priority batch every 15 minutes.",
                "Response drafts write to a review queue where humans approve before sending. The UI shows the original email, the draft, and the extracted action items side by side. One-click approve sends; edit mode opens the draft inline. Sent emails and their metadata sync to your CRM automatically.",
            ],
        ),
    ],
    "contract-review": [
        table_section(
            "Contract review automation: speed and risk coverage",
            [
                "Review task",
                "Manual (lawyer) time",
                "AI-assisted time",
                "Coverage rate",
            ],
            [
                ["Standard clause check", "4–6 hrs", "15 min", "95% of named clauses"],
                ["Obligation extraction", "2–3 hrs", "10 min", "88%"],
                [
                    "Risk flag identification",
                    "3–5 hrs",
                    "20 min",
                    "80–85% of standard risks",
                ],
                [
                    "Redline generation",
                    "2–4 hrs",
                    "25 min",
                    "70% of boilerplate changes",
                ],
            ],
        ),
        paragraphs_section(
            "Common failure modes in contract review automation",
            [
                "Jurisdiction-specific clause errors are the most dangerous failure. An AI trained primarily on US contracts confidently flags a GDPR limitation-of-liability clause as 'unusual' in a UK contract where it's standard. Or it misses that a non-compete clause that's enforceable in Florida is void in California. Fix: explicitly tag each contract with jurisdiction before review and use jurisdiction-specific clause libraries, not a single global model.",
                "Defined term drift causes the AI to miss obligations and rights that are triggered by defined terms it didn't fully track. 'Company' means Parent Corp in the definitions section but the AI treats every instance of 'company' as referring to the signing entity. Fix: run a pre-pass that extracts all defined terms and their definitions, then surface these to the reviewer alongside the flagged clauses.",
                "Silence interpretation errors occur when the AI treats the absence of a clause as acceptable when the absence is actually a significant risk. A contract that doesn't mention IP assignment, data ownership, or limitation of liability is not 'clean' — it's missing critical protections. Fix: run a 'missing clause' check separately from the standard review — flag contracts that lack 15 specific required clauses regardless of what they do include.",
            ],
        ),
        paragraphs_section(
            "Integration architecture for contract review automation",
            [
                "Contracts enter the system via 3 channels: DocuSign webhook (new contract sent for signature triggers immediate review), email attachment parsing (contracts forwarded to a dedicated review alias), and Salesforce integration (opportunity closes → attached contract document triggers review). All inputs normalize to a review queue.",
                "The review output creates a structured risk report: flagged clauses with line references, missing required clauses, obligation extraction (deadlines, payment terms, renewal dates), and redline suggestions for non-standard terms. This syncs to your contract management system (Ironclad, ContractWorks, or Salesforce) as a linked record.",
            ],
        ),
    ],
    "meeting-notes": [
        table_section(
            "Meeting notes automation: time savings and output quality",
            ["Note type", "Manual time", "AI time", "Completeness"],
            [
                [
                    "Raw transcript → summary",
                    "20–30 min/hr of meeting",
                    "2 min/hr",
                    "85–90% of key points",
                ],
                [
                    "Action item extraction",
                    "10 min/meeting",
                    "1 min",
                    "92% of explicit commitments",
                ],
                ["CRM update from meeting", "5–10 min/meeting", "1 min", "88%"],
                [
                    "Follow-up email draft",
                    "10–15 min/meeting",
                    "2 min",
                    "75% usable without edits",
                ],
            ],
        ),
        paragraphs_section(
            "Common failure modes in meeting notes automation",
            [
                "Speaker misattribution causes action items assigned to the wrong person. 'John said he'd handle the pricing research' — but John and Jon both spoke and the transcript confused them. Meeting notes say Jon owns the action item. Fix: use meeting platforms that tag speakers by identity (Zoom with authenticated participants, Fireflies with CRM-linked contacts) rather than generic 'Speaker 1' labels.",
                "Implicit commitment extraction fails for statements like 'I'll loop you in' or 'let's circle back on this' — which are commitments in context but not flagged as action items by pattern-matching. Fix: use a two-pass extraction: first extract explicit commitments ('I will...', 'we'll send...', 'by Friday...'), then separately prompt the AI to identify implicit commitments that require follow-up.",
                "Confidentiality violations occur when meeting notes are automatically shared to a broader audience than intended. A 1:1 discussion about an underperformer gets included in the weekly team notes. A board-level strategy discussion gets summarized in a Slack channel. Fix: classify meeting type before processing (1:1, team, external, board) and apply different sharing permissions per type.",
            ],
        ),
        paragraphs_section(
            "Integration architecture for meeting notes automation",
            [
                "Meeting recordings flow from Zoom, Google Meet, or Teams via their respective API webhooks into the processing pipeline. The transcript (via Whisper or native platform transcription) is the primary input. The AI generates a structured output: 3-sentence summary, numbered action items with owner and deadline, key decisions made, and open questions requiring follow-up.",
                "Output distributes to 4 destinations: the meeting organizer's email (immediate summary), the team's Slack channel (for team meetings), Salesforce (CRM-linked for sales calls — updates contact notes and creates follow-up tasks), and Notion/Confluence (for recurring meetings — appends to the meeting page with date header).",
            ],
        ),
    ],
    "candidate-screening": [
        table_section(
            "Candidate screening automation: throughput and quality",
            ["Screening step", "Manual time", "AI time", "Accuracy vs. manual"],
            [
                ["Resume keyword match", "3–5 min/resume", "15 sec", "92%"],
                ["Skills gap analysis", "10–15 min/candidate", "1 min", "85%"],
                [
                    "Culture fit signals",
                    "20–30 min/interview",
                    "5 min (post-interview)",
                    "70%",
                ],
                ["Reference check synthesis", "30–45 min", "5 min", "88%"],
            ],
        ),
        paragraphs_section(
            "Common failure modes in candidate screening automation",
            [
                "Proxy discrimination occurs when the AI learns to filter on correlated variables that act as proxies for protected characteristics. Top-university preference discriminates by socioeconomic background. Specific activity patterns in employment history can correlate with age or gender. Fix: audit the model's screening decisions quarterly — compare pass rates across demographic groups and investigate systematic disparities.",
                "Job description over-matching rejects qualified candidates because they don't use the exact terminology from the job description. A candidate who writes 'distributed systems' when the job description says 'microservices architecture' gets penalized even though the skills are substantially equivalent. Fix: use semantic matching rather than keyword matching — measure skill similarity, not vocabulary similarity.",
                "Recency bias causes the AI to over-weight recent experience and under-weight depth. A candidate with 8 years of specialized expertise in one area gets screened out because they don't have the 'latest' framework listed in the requirements. Fix: separate screening criteria into required (must-have), preferred (nice-to-have), and learnable (trainable) tiers — weight required criteria 3× over preferred.",
            ],
        ),
        paragraphs_section(
            "Integration architecture for candidate screening automation",
            [
                "Resumes and applications flow from your ATS (Greenhouse, Lever, Workday) via API webhook on new application submission. The AI review runs before human recruiter review — it generates a structured assessment: skills match score, gaps against requirements, red flags, and a recommended next step (advance, screen call, reject, request portfolio).",
                "Output writes back to the ATS as a structured note on the candidate record — visible to recruiters as the first item in the review workflow. Borderline cases (scores 60–75%) get a second pass by a human recruiter before rejection. Advances trigger automated scheduling via Calendly or Greenhouse's built-in scheduler.",
            ],
        ),
    ],
    "incident-response": [
        table_section(
            "Incident response automation: detection and resolution time",
            ["Incident phase", "Manual time", "AI-assisted time", "Improvement"],
            [
                ["Detection to acknowledgment", "5–15 min", "30 sec–2 min", "10–30×"],
                ["Initial diagnosis", "20–45 min", "2–5 min", "8–20×"],
                ["Stakeholder notification", "10–15 min", "1 min", "10–15×"],
                ["Post-mortem draft", "2–4 hrs", "15 min", "8–16×"],
            ],
        ),
        paragraphs_section(
            "Common failure modes in incident response automation",
            [
                "Alert fatigue defeats the automation before incidents are resolved. If your monitoring system fires 200 alerts on a P1 outage (one per affected service, one per region, one per dependent system), the on-call engineer spends 10 minutes acknowledging alerts rather than diagnosing the root cause. Fix: implement alert deduplication and correlation — group related alerts into a single incident record with a summary of affected systems before paging.",
                "Incorrect severity classification causes P1 outages to be initially classified as P3 and vice versa. A single customer report of 'slow loading' might be the first signal of a database replication lag that will affect all customers in 20 minutes. Fix: use leading indicators for severity classification — look at error rate trajectory (rising fast = elevate) rather than current error count alone.",
                "Remediation suggestion hallucination is dangerous. The AI suggests running a specific database command to fix a replication lag issue — but the command is for MySQL and the system runs PostgreSQL. Fix: ground all remediation suggestions in your own runbooks. The AI should surface the relevant runbook section, not generate novel remediation steps.",
            ],
        ),
        paragraphs_section(
            "Integration architecture for incident response automation",
            [
                "The incident pipeline ingests from 4 sources: monitoring system (Datadog, New Relic, PagerDuty alerts), customer support tickets (high-severity Zendesk tickets trigger incident evaluation), status page (external monitors fire on endpoint failures), and engineering Slack (automated trigger on specific keywords in #alerts channel). All converge to a unified incident queue.",
                "The AI layer runs a 3-step analysis: (1) correlate the alert with recent deploys, config changes, and traffic patterns to identify probable cause, (2) check for similar past incidents in the incident history to surface known fixes, (3) draft stakeholder communication. Output goes to PagerDuty as an enriched incident record and to a dedicated Slack incident channel.",
            ],
        ),
    ],
    "customer-feedback-analysis": [
        table_section(
            "Customer feedback analysis: volume and insight quality",
            [
                "Feedback source",
                "Manual analysis time",
                "AI analysis time",
                "Themes identified",
            ],
            [
                ["NPS survey comments", "4–8 hrs/quarter", "20 min", "3× more themes"],
                [
                    "Support ticket themes",
                    "6–10 hrs/month",
                    "30 min",
                    "5× more sub-themes",
                ],
                [
                    "G2/Capterra reviews",
                    "2–3 hrs/month",
                    "10 min",
                    "Consistent categorization",
                ],
                [
                    "In-app feedback widgets",
                    "Real-time impossible",
                    "Real-time",
                    "Immediate trend detection",
                ],
            ],
        ),
        paragraphs_section(
            "Common failure modes in customer feedback analysis automation",
            [
                "Sentiment misclassification on B2B feedback occurs because enterprise customers write factual, neutral-toned complaints. 'The API rate limits prevent us from processing our batch jobs' scores as neutral sentiment even though it's a significant negative signal indicating a customer at churn risk. Fix: use intent classification alongside sentiment — classify feedback as complaint/praise/request/question regardless of tone.",
                "Theme taxonomy drift makes month-over-month comparisons meaningless. In January, 'slow performance' was tagged under 'reliability'. In March, the same issue is tagged under 'performance'. Your trend charts show a drop in reliability complaints and an increase in performance complaints — but it's the same issue. Fix: use a fixed taxonomy with strict definitions and require human approval before adding new tags.",
                "Feedback source bias produces a distorted picture. NPS surveys get responses from your most engaged users. Support tickets over-represent your most confused users. App store reviews skew negative. Synthesizing across all sources without weighting produces insights that don't represent your actual customer distribution. Fix: weight feedback sources by their representation of your customer base when generating aggregate insights.",
            ],
        ),
        paragraphs_section(
            "Integration architecture for customer feedback analysis automation",
            [
                "Feedback flows from 5 sources: NPS/CSAT survey responses (Delighted, Typeform webhook), support tickets (Zendesk/Freshdesk API), review sites (G2, Capterra via scraper or RSS), in-app feedback widgets (Pendo, Intercom), and direct email/Slack feedback (forwarded to a processing alias). All normalize to a structured feedback record.",
                "The AI layer runs a 3-pass analysis: (1) categorize by topic using your fixed taxonomy, (2) extract specific product/feature mentions and map to your product feature list, (3) identify churn signals and flag high-value customer feedback for immediate CS follow-up. Output generates a weekly digest report and populates your product roadmap tracking system (Linear, Jira, ProductBoard).",
            ],
        ),
    ],
    "inventory-management": [
        table_section(
            "Inventory management automation: accuracy and cost",
            ["Metric", "Manual management", "Rule-based system", "AI-powered ({tool})"],
            [
                ["Stockout rate", "8–15%", "3–6%", "0.5–2%"],
                [
                    "Overstock carrying cost",
                    "18–25% of inventory value/yr",
                    "12–18%",
                    "6–10%",
                ],
                ["Reorder accuracy", "70–80%", "80–88%", "92–97%"],
                [
                    "Labor hours (1000 SKUs)",
                    "40–60 hrs/week",
                    "10–15 hrs/week",
                    "2–4 hrs/week",
                ],
            ],
        ),
        paragraphs_section(
            "Common failure modes in inventory management automation",
            [
                "Demand forecast failures during anomalous events cause both stockouts and overstock simultaneously. A competitor's product recall spikes your demand 3× for 6 weeks. Your AI model trained on normal seasonality predicts normal demand. You run out of stock in week 1 and miss $400K in revenue. Fix: build an anomaly detection layer that flags when current demand deviates > 2 standard deviations from the forecast and automatically triggers a human review of the reorder quantities.",
                "Supplier lead time drift breaks the entire reorder calculation. Your AI assumes the supplier delivers in 5 days based on historical data. After a logistics disruption, lead time is now 12 days. The system keeps calculating reorder points based on 5-day lead time, triggering stockouts. Fix: integrate with supplier EDI or shipping APIs to update lead time estimates in real time rather than using static historical averages.",
                "Multi-location inventory imbalance occurs when total stock is sufficient but distribution is wrong. 200 units in your East Coast warehouse, 3 units in the West Coast warehouse, with high West Coast demand. Your AI looks at total inventory and says 'adequate stock' while the West Coast stockout happens in 2 days. Fix: run inventory calculations at the fulfillment location level, not the aggregate level.",
            ],
        ),
        paragraphs_section(
            "Integration architecture for inventory management automation",
            [
                "The system integrates with 4 data sources: your ERP or inventory database (real-time stock levels via API), your point-of-sale or order management system (sales velocity data), your supplier portal (lead times, MOQs, pricing), and external demand signals (weather APIs, event calendars, competitor pricing). The AI synthesizes these into daily reorder recommendations.",
                "Reorder triggers write to your purchasing workflow: purchase orders are auto-generated for pre-approved suppliers within defined quantity ranges. Orders outside the approved range or from new suppliers go to a buyer review queue. Received inventory updates stock levels automatically via barcode scan or EDI confirmation.",
            ],
        ),
    ],
    "sales-outreach": [
        table_section(
            "Sales outreach automation: response rates and conversion",
            ["Approach", "Response rate", "Meeting booked rate", "Hours/100 prospects"],
            [
                ["Generic template blast", "2–4%", "0.5–1%", "2 hrs"],
                ["Manual personalized", "12–18%", "4–7%", "25–40 hrs"],
                ["AI-personalized ({tool})", "8–14%", "3–6%", "4–6 hrs"],
                ["AI + human review", "11–16%", "4–7%", "8–12 hrs"],
            ],
        ),
        paragraphs_section(
            "Common failure modes in sales outreach automation",
            [
                "Personalization that feels robotic destroys credibility. 'I saw you recently posted about [TOPIC] on LinkedIn — really resonated with me' when the post is 8 months old, or the personalization is so surface-level (congratulating someone on their company funding when it was 2 years ago) that it signals automation rather than genuine interest. Fix: use recency filters — only trigger personalization based on events in the last 30 days. Stale 'personalization' is worse than no personalization.",
                "Sequence timing failures send follow-ups at the wrong intervals. Day 1, Day 2, Day 3 sequences feel aggressive. Day 1, Day 21, Day 45 sequences lose momentum. The optimal cadence varies by industry, deal size, and buyer role — what works for SMB SaaS sales fails for enterprise procurement. Fix: segment your sequences by deal profile and A/B test cadences systematically rather than using a single sequence for all prospects.",
                "Deliverability degradation kills the entire program. 500 emails/day from a new domain, no DKIM/DMARC setup, high unsubscribe rates — your domain gets blacklisted and real deliverability drops below 60%. Fix: warm up new domains over 30 days, maintain unsubscribe rates below 0.2%, never exceed 200 emails/day per domain, and monitor deliverability weekly with tools like MXToolbox.",
            ],
        ),
        paragraphs_section(
            "Integration architecture for sales outreach automation",
            [
                "Prospects enter the outreach pipeline from 3 sources: CRM (leads assigned to a sequence in Salesforce or HubSpot), enrichment tools (Apollo, ZoomInfo, or Clay generate contact lists matching your ICP filters), and intent data (Bombora, G2 intent signals trigger outreach to in-market buyers). Each prospect gets enrichment data pulled before personalization.",
                "The sending layer uses dedicated outreach infrastructure (Outreach, Salesloft, Lemlist, or Instantly) rather than your main company email domain. The AI generates personalized first lines and subject line variants for A/B testing. Replies route to the assigned SDR's inbox immediately. Meetings booked sync to Salesforce as activities and advance the opportunity stage.",
            ],
        ),
    ],
    "financial-reconciliation": [
        table_section(
            "Financial reconciliation automation: accuracy and speed",
            ["Reconciliation type", "Manual time", "AI time", "Error rate"],
            [
                [
                    "Bank statement to GL",
                    "4–8 hrs/month",
                    "20 min",
                    "Manual: 2–3%, AI: <0.3%",
                ],
                [
                    "Intercompany transactions",
                    "6–12 hrs/month",
                    "30 min",
                    "Manual: 3–5%, AI: <0.5%",
                ],
                [
                    "AP/AR aging review",
                    "3–5 hrs/week",
                    "15 min/week",
                    "Manual: 5–8%, AI: <1%",
                ],
                ["Month-end close", "3–5 days", "4–8 hrs", "Depends on sub-processes"],
            ],
        ),
        paragraphs_section(
            "Common failure modes in financial reconciliation automation",
            [
                "FX rate timing mismatches cause systematic reconciliation failures for companies with multi-currency transactions. The bank statement uses the settlement rate; the GL uses the transaction date rate; the AI uses today's rate. Three different rates on the same transaction create unresolvable variances. Fix: establish a single source of truth for FX rates (your bank's official daily rates) and ensure all systems use the same rate for the same transaction date.",
                "Partial payment matching failures occur when a single invoice is paid across multiple transactions. Customer pays 60% in March and 40% in April. The reconciliation AI tries to match transactions 1:1 and marks both as unmatched because neither equals the invoice total. Fix: implement N:M matching logic that groups transactions and invoices and attempts sum-matching within a configurable tolerance window.",
                "Timing cut-off errors affect month-end close. A payment processed at 11:58pm on March 31 hits the bank on April 1 due to settlement timing. Your March GL shows the payment as cleared; the March bank statement doesn't. The AI flags a variance that is technically accurate but represents correct accounting. Fix: explicitly model settlement timing rules per payment method (ACH: 1 business day, wire: same day, check: 2–5 days) and adjust the matching window accordingly.",
            ],
        ),
        paragraphs_section(
            "Integration architecture for financial reconciliation automation",
            [
                "The integration connects 3 financial systems: your bank (via Plaid, direct bank API, or SFTP for statement files), your ERP or accounting system (QuickBooks, NetSuite, or Sage via API or export), and your payment processor (Stripe, Square, PayPal) for transaction-level detail. Data normalizes to a unified transaction record schema.",
                "The matching engine runs nightly after market close. It produces: a match report (% auto-matched, exception count), an exception queue (unmatched items for human review with suggested matches), and a reconciliation summary for your controller to approve. Approved reconciliations write journal entries back to your ERP automatically.",
            ],
        ),
    ],
    "document-summarisation": [
        table_section(
            "Document summarization: time and comprehension accuracy",
            [
                "Document type",
                "Manual read time",
                "AI summary time",
                "Key point coverage",
            ],
            [
                [
                    "Legal contract (30 pages)",
                    "90–120 min",
                    "3 min",
                    "88–92% of material clauses",
                ],
                [
                    "Research report (50 pages)",
                    "2–3 hrs",
                    "5 min",
                    "90–95% of findings",
                ],
                [
                    "Meeting transcript (1 hr)",
                    "30–45 min read",
                    "2 min",
                    "93% of action items",
                ],
                [
                    "RFP response (100 pages)",
                    "4–6 hrs",
                    "8 min",
                    "85–90% of requirements",
                ],
            ],
        ),
        paragraphs_section(
            "Common failure modes in document summarization automation",
            [
                "Compression hallucination is the most dangerous failure — the AI fills gaps in complex documents with plausible-sounding content that isn't in the source. A legal contract summary says 'liability capped at $500,000' when the actual contract says '$500,000 per incident up to $2M aggregate' — a significant difference. Fix: require the AI to include a direct quote reference for every material claim in the summary. If it can't quote the source, it shouldn't claim the fact.",
                "Long document degradation causes quality to drop non-linearly as document length increases. The first 20 pages get excellent coverage; pages 40–60 get progressively worse representation as the model's attention weakens. Fix: chunk long documents into sections (by heading structure or fixed page ranges), summarize each chunk independently, then synthesize the section summaries into the final document summary.",
                "Audience mismatch produces summaries at the wrong technical depth. A technical architecture document summarized for a CFO should emphasize costs, risks, and business impact. Summarized for an engineer, it should cover implementation decisions and technical tradeoffs. Fix: always specify the audience role in the summarization prompt — the same document should produce different summaries for different audiences.",
            ],
        ),
        paragraphs_section(
            "Integration architecture for document summarization automation",
            [
                "Documents enter the pipeline from 4 sources: email attachments (PDF and Word files forwarded to a processing alias), shared drive watch folders (Google Drive or SharePoint triggers on new file upload), API upload endpoint (for programmatic document submission from other systems), and direct integration with document management systems (DocuSign, Clio, ShareFile).",
                "Summaries deliver to 3 destinations: the requesting user's email (immediate delivery with source document attached), your knowledge management system (Notion, Confluence) as a searchable record, and your CRM for sales or legal documents (linked to the relevant contact or opportunity record). Summaries include a confidence score and flag any sections where the AI had low confidence for human review.",
            ],
        ),
    ],
    "webhook-processing": [
        table_section(
            "Webhook processing automation: volume and reliability",
            ["Processing approach", "Events/second", "Failure rate", "Recovery time"],
            [
                ["Synchronous manual processing", "1–5", "2–5%", "Manual — hours"],
                [
                    "Queue-based async",
                    "100–1000",
                    "0.5–1%",
                    "Automatic retry — minutes",
                ],
                [
                    "AI-enriched processing ({tool})",
                    "50–500",
                    "0.3–0.8%",
                    "Automatic — seconds",
                ],
                [
                    "Altor production system",
                    "1000+",
                    "<0.1%",
                    "Automatic with alerting",
                ],
            ],
        ),
        paragraphs_section(
            "Common failure modes in webhook processing automation",
            [
                "Duplicate event processing causes double-charges, double-notifications, and corrupted state. Stripe sends the same payment.succeeded webhook twice (their retry behavior on slow acknowledgment). Your system processes both and credits the customer twice. Fix: implement idempotency keys — every event processor checks a deduplification cache (Redis) before processing. If the event ID has been seen, return 200 without reprocessing.",
                "Schema change failures occur when the webhook provider updates their payload format without versioning. Stripe added a new required field to the checkout.session.completed payload in 2023; systems that expected the old schema silently dropped events. Fix: use defensive parsing — access all webhook fields via safe getters with defaults rather than direct key access, and log schema validation warnings rather than throwing hard errors.",
                "Retry storm overload happens when a downstream system goes down and the webhook provider's retry logic floods your endpoint when it comes back up. 10,000 queued retries arrive in 30 seconds and overwhelm your processor. Fix: implement a circuit breaker pattern — when downstream failure is detected, return 503 (not 500) to signal temporary unavailability. Webhook providers treat 503 as 'retry later' rather than 'failed permanently'.",
            ],
        ),
        paragraphs_section(
            "Integration architecture for webhook processing automation",
            [
                "The production architecture has 4 layers: (1) ingestion endpoint (validates webhook signatures and writes raw events to a queue — responds 200 immediately), (2) queue (SQS, Redis, or Kafka — decouples ingestion from processing), (3) processor workers (pop from queue, apply business logic, call downstream systems), (4) dead letter queue (failed events after 3 retries — trigger alerts and human review).",
                "The AI enrichment layer sits between the queue and the processor for events that require interpretation. A customer support platform webhook with unstructured ticket content gets classified and enriched before routing. A payment webhook with ambiguous metadata gets normalized. The enriched event then processes through the standard workflow. For high-volume, time-sensitive events (payment confirmations), AI enrichment is optional and bypassed when latency is critical.",
            ],
        ),
    ],
}


def count_words_in_sections(sections: list[dict]) -> int:
    words = 0
    for section in sections:
        words += len(section.get("heading", "").split())
        paragraphs = section.get("paragraphs", [])
        for paragraph in paragraphs:
            words += len(paragraph.split())
        table = section.get("table")
        if table:
            for header in table.get("headers", []):
                words += len(header.split())
            for row in table.get("rows", []):
                for cell in row:
                    words += len(str(cell).split())
    return words


def main() -> int:
    root = Path(__file__).resolve().parent.parent
    data_path = root / "public" / "data" / "automations.json"

    with data_path.open("r", encoding="utf-8") as handle:
        data = json.load(handle)

    pages = data.get("pages", [])
    invoice_chatgpt_sections = None

    for page in pages:
        if (
            page.get("workflow_slug") == "invoice-processing"
            and page.get("tool_slug") == "chatgpt"
        ):
            invoice_chatgpt_sections = copy.deepcopy(page.get("sections", []))
            break

    if invoice_chatgpt_sections is None:
        raise RuntimeError("Could not find invoice-processing/chatgpt page.")

    pages_updated = 0
    sections_added = 0

    for page in pages:
        existing_sections = page.get("sections")
        if existing_sections not in (None, []):
            continue

        workflow_slug = page.get("workflow_slug")
        if workflow_slug not in WORKFLOW_SECTIONS:
            raise KeyError(f"No section template defined for workflow: {workflow_slug}")

        page["sections"] = copy.deepcopy(WORKFLOW_SECTIONS[workflow_slug])
        pages_updated += 1
        sections_added += len(page["sections"])

    current_invoice_sections = None
    for page in pages:
        if (
            page.get("workflow_slug") == "invoice-processing"
            and page.get("tool_slug") == "chatgpt"
        ):
            current_invoice_sections = page.get("sections", [])
            break

    if current_invoice_sections != invoice_chatgpt_sections:
        raise RuntimeError("invoice-processing/chatgpt sections changed unexpectedly.")

    total_pages = len(pages)
    pages_with_sections = sum(1 for page in pages if page.get("sections"))
    total_sections = sum(len(page.get("sections", [])) for page in pages)

    if total_pages != 86:
        raise RuntimeError(f"Expected 86 pages, found {total_pages}.")
    if pages_with_sections != 86:
        raise RuntimeError(
            f"Expected 86 pages with sections, found {pages_with_sections}."
        )
    if total_sections != 258:
        raise RuntimeError(f"Expected 258 total sections, found {total_sections}.")
    if pages_updated != 85:
        raise RuntimeError(f"Expected 85 updated pages, found {pages_updated}.")
    if sections_added != 255:
        raise RuntimeError(
            f"Expected 255 newly added sections, found {sections_added}."
        )

    low_word_count_pages = [
        (
            page["workflow_slug"],
            page["tool_slug"],
            count_words_in_sections(page.get("sections", [])),
        )
        for page in pages
        if count_words_in_sections(page.get("sections", [])) < 200
    ]
    if low_word_count_pages:
        raise RuntimeError(f"Pages below 200 words: {low_word_count_pages}")

    with data_path.open("w", encoding="utf-8") as handle:
        json.dump(data, handle, ensure_ascii=False, separators=(",", ":"))

    print(f"Updated pages: {pages_updated}")
    print(f"Added sections: {sections_added}")
    print(f"Pages with sections: {pages_with_sections}/{total_pages}")
    print(f"Total sections: {total_sections}")
    print(f"Wrote compact JSON to: {data_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
