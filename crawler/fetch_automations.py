#!/usr/bin/env python3
"""
Automation Workflow Crawler
----------------------------
Builds the dataset powering altorlab.com/automate — programmatic pages
targeting "How to automate [workflow] with [AI tool]" search queries.

Strategy: the pages are static content (no live API dependency at render
time). This script pre-generates the full content matrix — 20 workflows ×
8 tools = 160 page definitions — and enriches each with n8n template
data when available.

Sources:
  1. Static workflow/tool matrix  — hand-curated, authoritative
  2. n8n public template API      — real workflow titles for SEO freshness

Output: react-app/public/data/automations.json
Cost:   $0 — no auth required, runs on GitHub Actions free tier.
Runtime: ~2-3 min.
"""

import json
import re
import time
import logging
from datetime import datetime, timezone
from pathlib import Path

import requests

OUTPUT_PATH = (
    Path(__file__).parent.parent / "react-app" / "public" / "data" / "automations.json"
)
REQUEST_TIMEOUT = 15
CRAWL_DELAY = 0.5

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger(__name__)

WORKFLOWS = [
    {
        "slug": "customer-support",
        "label": "Customer Support",
        "description": "Triage tickets, draft replies, escalate edge cases, and close routine queries without human intervention.",
        "pain": "Support teams spend 60%+ of their time on repetitive tier-1 tickets that follow the same investigation pattern every time.",
        "outcome": "Tickets resolved in under 2 minutes instead of 45. Engineering time reclaimed for product work.",
        "steps": [
            "Incoming ticket arrives via Zendesk / Intercom / Freshdesk",
            "AI reads the ticket and queries relevant data systems (logs, CRM, billing)",
            "AI drafts a response or escalation summary with full context",
            "Human reviews and approves, or system auto-resolves for known patterns",
        ],
        "related_tools": ["claude", "chatgpt", "n8n", "zapier"],
    },
    {
        "slug": "lead-qualification",
        "label": "Lead Qualification",
        "description": "Score and route inbound leads by querying CRM data, firmographic signals, and fit criteria automatically.",
        "pain": "Sales teams waste 70% of their time on leads that will never convert. Manual qualification is slow, inconsistent, and non-scalable.",
        "outcome": "SDRs only touch qualified leads. Conversion rates improve. CRM data stays fresh without manual input.",
        "steps": [
            "New lead arrives in CRM or via web form",
            "AI enriches the lead with firmographic and intent data",
            "Scoring model assigns fit tier (hot / warm / cold)",
            "Lead is routed to appropriate rep or nurture sequence",
        ],
        "related_tools": ["claude", "chatgpt", "n8n", "zapier", "make"],
    },
    {
        "slug": "invoice-processing",
        "label": "Invoice Processing",
        "description": "Extract line items from PDF invoices, match against POs, flag discrepancies, and push to accounting automatically.",
        "pain": "Finance teams manually key invoice data into accounting systems — a process that takes hours and introduces errors on 5-8% of invoices.",
        "outcome": "Invoice cycle time drops from days to minutes. Discrepancies caught before payment. Zero manual data entry.",
        "steps": [
            "Invoice arrives via email or upload portal",
            "AI extracts structured data (vendor, amount, line items, due date)",
            "System matches against open POs and checks for discrepancies",
            "Approved invoices are posted to accounting; exceptions routed for review",
        ],
        "related_tools": ["claude", "chatgpt", "n8n", "make", "zapier"],
    },
    {
        "slug": "content-repurposing",
        "label": "Content Repurposing",
        "description": "Turn a single piece of long-form content into platform-specific formats: LinkedIn posts, Twitter threads, email newsletters.",
        "pain": "Creating content once and manually reformatting it for 5 channels takes 3-4 hours per piece. Most teams skip it.",
        "outcome": "One blog post becomes 8 pieces of platform-native content in under 5 minutes. Consistent publishing cadence without more headcount.",
        "steps": [
            "New blog post or long-form content is published or uploaded",
            "AI reads the full content and extracts key insights",
            "Generates platform-specific variants (LinkedIn, Twitter, email, YouTube script)",
            "Drafts are reviewed in a single queue and published with one click",
        ],
        "related_tools": ["claude", "chatgpt", "n8n", "make", "zapier"],
    },
    {
        "slug": "data-entry",
        "label": "Data Entry",
        "description": "Extract structured data from unstructured sources (emails, PDFs, forms) and populate CRM, ERP, or spreadsheet targets.",
        "pain": "Data entry is the most common manual task in every back-office team. It is error-prone, soul-destroying, and infinitely scalable with automation.",
        "outcome": "Zero manual keying. Structured data in the right place within seconds of source document arrival. Error rate drops to near zero.",
        "steps": [
            "Source document arrives (email, PDF, web form, image)",
            "AI extracts fields using document understanding",
            "Extracted data is validated against schema / business rules",
            "Pushed to target system (CRM, ERP, spreadsheet) via API",
        ],
        "related_tools": ["claude", "chatgpt", "n8n", "make", "zapier", "langchain"],
    },
    {
        "slug": "report-generation",
        "label": "Report Generation",
        "description": "Pull data from multiple sources, compute metrics, write narrative analysis, and deliver finished reports on a schedule.",
        "pain": "Weekly and monthly reports take analysts 2-6 hours to compile. Half of that time is data wrangling, not analysis.",
        "outcome": "Reports delivered automatically on schedule. Analysts focus on interpretation, not data collection.",
        "steps": [
            "Scheduled trigger fires (daily, weekly, end-of-month)",
            "AI queries all relevant data sources (CRM, analytics, finance)",
            "Metrics computed and narrative sections generated",
            "Report formatted and delivered via email, Slack, or Notion",
        ],
        "related_tools": ["claude", "chatgpt", "n8n", "langchain"],
    },
    {
        "slug": "code-review",
        "label": "Code Review",
        "description": "Automate first-pass code review: check for bugs, security issues, style violations, and documentation gaps before human review.",
        "pain": "Senior engineers spend 4-8 hours per week reviewing PRs for routine issues that a machine could catch in seconds.",
        "outcome": "PRs arrive for human review already clean. Engineers spend review time on architecture decisions, not typos and missing null checks.",
        "steps": [
            "PR opened or updated triggers the workflow",
            "AI reads diff and checks against style guide, security rules, test coverage",
            "Automated comments posted directly on the PR",
            "Human reviewer sees summary of AI findings and focuses on high-level concerns",
        ],
        "related_tools": ["claude", "chatgpt", "n8n", "langchain"],
    },
    {
        "slug": "onboarding",
        "label": "Employee Onboarding",
        "description": "Trigger provisioning, send welcome sequences, assign training, collect paperwork, and check in with new hires automatically.",
        "pain": "HR and ops teams manually coordinate 20+ tasks across 5 systems every time a new employee starts. Things fall through cracks.",
        "outcome": "New hires arrive on day 1 fully provisioned. HR team touches the process once to review, not to execute.",
        "steps": [
            "Offer accepted triggers the workflow in HRIS",
            "IT provisioning tickets created automatically",
            "Welcome email and onboarding checklist sent to new hire",
            "Manager notified with day-1 preparation checklist",
            "30/60/90 day check-ins scheduled automatically",
        ],
        "related_tools": ["n8n", "zapier", "make", "claude"],
    },
    {
        "slug": "social-media-posting",
        "label": "Social Media Posting",
        "description": "Schedule, generate, and publish social content across platforms from a single content calendar or trigger.",
        "pain": "Consistent social presence requires daily manual action across 4-6 platforms. Most teams post inconsistently or hire dedicated headcount.",
        "outcome": "Content calendar drives automated daily publishing across all channels. One review step. No manual platform switching.",
        "steps": [
            "Content brief or blog post enters the queue",
            "AI generates platform-specific copy and hashtags",
            "Human reviews and approves in single dashboard",
            "Posts scheduled and published automatically with analytics tracked",
        ],
        "related_tools": ["claude", "chatgpt", "n8n", "make", "zapier"],
    },
    {
        "slug": "email-management",
        "label": "Email Management",
        "description": "Triage inbox, draft replies, extract action items, and route messages to the right team member or system.",
        "pain": "Knowledge workers spend 2.6 hours/day on email. Most of it is routing, reading, and drafting replies to predictable requests.",
        "outcome": "Inbox zero maintained automatically. Important emails escalated with full context. Routine requests handled without reading.",
        "steps": [
            "New email arrives in monitored inbox",
            "AI classifies intent and urgency",
            "Routine emails: auto-reply drafted and queued for approval",
            "Complex emails: summarised and routed with full context to right team",
        ],
        "related_tools": ["claude", "chatgpt", "n8n", "make", "zapier"],
    },
    {
        "slug": "contract-review",
        "label": "Contract Review",
        "description": "Extract key terms, flag non-standard clauses, compare against standard templates, and summarise risk points.",
        "pain": "Legal review of routine contracts takes 2-4 hours per document. Most of that time is reading for standard issues a checklist could catch.",
        "outcome": "Contracts arrive for legal review pre-annotated. Lawyers spend time on edge cases, not routine reading.",
        "steps": [
            "Contract PDF received via email or upload portal",
            "AI extracts key terms (parties, dates, payment, IP, termination)",
            "Clauses compared against approved template and flagged if non-standard",
            "Risk summary delivered to legal team with specific line citations",
        ],
        "related_tools": ["claude", "chatgpt", "langchain"],
    },
    {
        "slug": "meeting-notes",
        "label": "Meeting Notes & Action Items",
        "description": "Transcribe meetings, extract decisions, assign action items to owners, and push to project management tools.",
        "pain": "Someone spends 20-45 minutes after every meeting writing up notes and action items. That person misses the next meeting while doing it.",
        "outcome": "Meeting transcript arrives in Notion/Jira/Linear with action items assigned within 2 minutes of meeting end.",
        "steps": [
            "Meeting ends and recording is available",
            "Transcription and speaker diarization runs automatically",
            "AI extracts decisions, action items, and owners",
            "Notes pushed to Notion/Confluence; tasks created in Jira/Linear with assignees",
        ],
        "related_tools": ["claude", "chatgpt", "n8n", "zapier"],
    },
    {
        "slug": "candidate-screening",
        "label": "Candidate Screening",
        "description": "Parse resumes, score against job requirements, draft outreach, and schedule screening calls automatically.",
        "pain": "Recruiting teams manually review 200+ applications per role. Early-stage screening takes 3-5 hours per role per week.",
        "outcome": "Recruiters only see pre-qualified candidates with a scoring rationale. Time-to-first-screen drops from days to hours.",
        "steps": [
            "Application arrives in ATS",
            "AI parses resume and scores against job requirements",
            "Top candidates flagged; rejection emails drafted for below-threshold",
            "Interview scheduling links sent to qualified candidates automatically",
        ],
        "related_tools": ["claude", "chatgpt", "n8n", "zapier"],
    },
    {
        "slug": "incident-response",
        "label": "Incident Response",
        "description": "Detect alerts, query logs and metrics, draft incident summaries, coordinate team response, and generate postmortems.",
        "pain": "When a production incident fires, engineers spend the first 20 minutes just gathering context from 6 different monitoring tools.",
        "outcome": "On-call engineer receives full incident context within 90 seconds of alert. Investigation starts at diagnosis, not at data collection.",
        "steps": [
            "PagerDuty / alerting system fires",
            "AI queries logs, metrics, and recent deployments across all systems",
            "Incident summary with likely root cause drafted and posted to Slack",
            "After resolution, postmortem template auto-populated from incident data",
        ],
        "related_tools": ["claude", "chatgpt", "n8n", "langchain"],
    },
    {
        "slug": "customer-feedback-analysis",
        "label": "Customer Feedback Analysis",
        "description": "Aggregate NPS responses, support tickets, and reviews, extract themes, and surface product insights weekly.",
        "pain": "Product teams have feedback scattered across Intercom, G2, AppStore, NPS surveys, and support tickets. Nobody synthesises it regularly.",
        "outcome": "Weekly digest of top themes, sentiment trends, and specific customer quotes delivered automatically to product team Slack.",
        "steps": [
            "Scheduled trigger collects feedback from all sources",
            "AI clusters by theme and scores sentiment",
            "Top 5 themes this week identified with supporting quotes",
            "Digest posted to Slack with links to source conversations",
        ],
        "related_tools": ["claude", "chatgpt", "n8n", "langchain"],
    },
    {
        "slug": "inventory-management",
        "label": "Inventory Management",
        "description": "Monitor stock levels, predict reorder points, generate POs, and alert on supply chain anomalies.",
        "pain": "Operations teams manually check inventory levels and create purchase orders. Stockouts and overstock both cost real money.",
        "outcome": "Reorder happens automatically before stockout. POs generated and sent for approval without manual intervention.",
        "steps": [
            "Real-time inventory levels monitored against reorder thresholds",
            "Forecasting model predicts depletion based on historical velocity",
            "Draft PO generated and sent to approver when threshold hit",
            "On approval, PO transmitted to supplier automatically",
        ],
        "related_tools": ["n8n", "make", "zapier", "claude"],
    },
    {
        "slug": "sales-outreach",
        "label": "Sales Outreach",
        "description": "Research prospects, personalise email sequences, enrich CRM, and follow up at optimal timing automatically.",
        "pain": "SDRs spend 4 hours/day manually researching prospects and writing emails that are 80% the same with 20% personalisation.",
        "outcome": "Personalised outreach at 10x volume. SDRs spend time on live conversations, not research and drafting.",
        "steps": [
            "Target account list imported or triggered from ICP criteria",
            "AI researches each company and identifies a specific personalisation hook",
            "Email sequence drafted with genuine personalisation per recipient",
            "Sequence enrolled and follow-ups triggered based on engagement signals",
        ],
        "related_tools": ["claude", "chatgpt", "n8n", "zapier"],
    },
    {
        "slug": "financial-reconciliation",
        "label": "Financial Reconciliation",
        "description": "Match transactions across bank statements, invoices, and accounting systems, and flag discrepancies for review.",
        "pain": "Month-end reconciliation takes finance teams 2-5 days of manual matching. Every mismatch requires manual investigation.",
        "outcome": "Reconciliation runs nightly. Month-end close takes hours, not days. Only genuine exceptions reach a human.",
        "steps": [
            "Bank feed, payment processor data, and accounting system all polled",
            "AI matches transactions using amount, date, and description",
            "Matched transactions confirmed automatically",
            "Unmatched items ranked by materiality and delivered for human review",
        ],
        "related_tools": ["n8n", "make", "claude", "langchain"],
    },
    {
        "slug": "document-summarisation",
        "label": "Document Summarisation",
        "description": "Convert long-form documents, reports, and research papers into structured summaries with key takeaways.",
        "pain": "Professionals in legal, finance, research, and consulting receive 50-100 pages of documents they need to act on quickly.",
        "outcome": "Any document summarised with key points, decisions, and questions within 60 seconds. Analysts can read 10x more.",
        "steps": [
            "Document uploaded or received via email/Slack",
            "AI reads full document and extracts structure",
            "Summary generated with key points, decisions, and open questions",
            "Summary delivered in original channel with link to full document",
        ],
        "related_tools": ["claude", "chatgpt", "n8n", "langchain"],
    },
    {
        "slug": "webhook-processing",
        "label": "Webhook & Event Processing",
        "description": "Route, transform, and respond to webhooks from third-party systems without manual intervention or brittle custom code.",
        "pain": "Every SaaS integration requires custom webhook handling code. Engineers write the same boilerplate 10 times. Edge cases are never handled.",
        "outcome": "Webhook events routed and processed reliably with zero custom code. New event types handled by updating workflow, not deploying code.",
        "steps": [
            "Webhook fires from source system (Stripe, GitHub, Salesforce, etc.)",
            "Payload validated and normalised",
            "Conditional routing based on event type and payload content",
            "Target systems updated, notifications sent, audit log written",
        ],
        "related_tools": ["n8n", "make", "zapier", "langchain"],
    },
]

AI_TOOLS = [
    {
        "slug": "claude",
        "label": "Claude (Anthropic)",
        "vendor": "Anthropic",
        "description": "Anthropic's Claude is the leading model for long-context reasoning, coding, and instruction-following. Best for complex workflows requiring careful reasoning.",
        "strengths": [
            "Long context (200k tokens)",
            "Instruction following",
            "Code generation",
            "Document analysis",
        ],
        "use_cases": [
            "Document analysis",
            "Code review",
            "Customer support",
            "Contract review",
        ],
        "pricing_model": "Per token — claude-3-5-sonnet: $3/$15 per 1M tokens in/out",
        "docs_url": "https://docs.anthropic.com",
    },
    {
        "slug": "chatgpt",
        "label": "ChatGPT / GPT-4o (OpenAI)",
        "vendor": "OpenAI",
        "description": "OpenAI's GPT-4o is the most widely deployed LLM. Excellent function calling, vision, and broad general capability.",
        "strengths": [
            "Function calling",
            "Vision / multimodal",
            "Broad ecosystem",
            "Structured outputs",
        ],
        "use_cases": [
            "Data extraction",
            "Content generation",
            "Image analysis",
            "Structured outputs",
        ],
        "pricing_model": "Per token — gpt-4o: $2.50/$10 per 1M tokens in/out",
        "docs_url": "https://platform.openai.com/docs",
    },
    {
        "slug": "n8n",
        "label": "n8n",
        "vendor": "n8n GmbH",
        "description": "Open-source workflow automation with a visual builder. Self-hostable, 400+ integrations, and AI-native with LLM nodes.",
        "strengths": [
            "Self-hostable",
            "400+ integrations",
            "AI nodes built-in",
            "Code when needed",
        ],
        "use_cases": [
            "Multi-step automations",
            "API orchestration",
            "Data pipelines",
            "AI agents",
        ],
        "pricing_model": "Free self-hosted. Cloud from $20/month.",
        "docs_url": "https://docs.n8n.io",
    },
    {
        "slug": "zapier",
        "label": "Zapier",
        "vendor": "Zapier",
        "description": "The most widely used no-code automation platform. 6,000+ app integrations. Best for connecting SaaS tools without code.",
        "strengths": [
            "6,000+ integrations",
            "No code required",
            "Reliable triggers",
            "Large ecosystem",
        ],
        "use_cases": [
            "SaaS integrations",
            "Notifications",
            "CRM updates",
            "Simple data routing",
        ],
        "pricing_model": "Free tier. Paid from $19.99/month.",
        "docs_url": "https://zapier.com/help",
    },
    {
        "slug": "make",
        "label": "Make (formerly Integromat)",
        "vendor": "Make",
        "description": "Visual automation builder with more power than Zapier. Handles complex branching, iterators, and data transformations.",
        "strengths": [
            "Complex data transforms",
            "Visual branching",
            "Cost-effective",
            "Error handling",
        ],
        "use_cases": [
            "Complex multi-step flows",
            "Data transformation",
            "Scheduled jobs",
            "Error-tolerant pipelines",
        ],
        "pricing_model": "Free tier (1,000 ops). Paid from $9/month.",
        "docs_url": "https://www.make.com/en/help",
    },
    {
        "slug": "langchain",
        "label": "LangChain",
        "vendor": "LangChain Inc.",
        "description": "Python/JS framework for building LLM applications. Best for developers building custom AI agents and RAG pipelines.",
        "strengths": [
            "Full control",
            "RAG pipelines",
            "Agent frameworks",
            "Vector store integrations",
        ],
        "use_cases": [
            "Custom AI agents",
            "RAG systems",
            "Document Q&A",
            "Multi-step reasoning",
        ],
        "pricing_model": "Open source. LangSmith observability from $39/month.",
        "docs_url": "https://docs.langchain.com",
    },
    {
        "slug": "gemini",
        "label": "Gemini (Google)",
        "vendor": "Google",
        "description": "Google's frontier model family. Best for workflows deeply integrated with Google Workspace, Search, and GCP.",
        "strengths": [
            "Google Workspace integration",
            "Multimodal",
            "Long context",
            "GCP native",
        ],
        "use_cases": [
            "Google Workspace automation",
            "Search-grounded answers",
            "Code with Vertex",
            "Enterprise GCP workflows",
        ],
        "pricing_model": "Per token — gemini-1.5-pro: $1.25/$5 per 1M tokens in/out",
        "docs_url": "https://ai.google.dev/docs",
    },
    {
        "slug": "bedrock",
        "label": "Amazon Bedrock",
        "vendor": "Amazon Web Services",
        "description": "AWS managed service for accessing foundation models. Best for teams already on AWS who need enterprise compliance and VPC isolation.",
        "strengths": [
            "AWS ecosystem",
            "VPC isolation",
            "Enterprise compliance",
            "Model choice",
        ],
        "use_cases": [
            "Enterprise AI",
            "Compliance-sensitive workflows",
            "AWS-native pipelines",
            "Model evaluation",
        ],
        "pricing_model": "Per token, varies by model. Claude on Bedrock: similar to direct Anthropic pricing.",
        "docs_url": "https://docs.aws.amazon.com/bedrock",
    },
]


def slug_to_n8n_query(workflow_slug: str) -> str:
    return workflow_slug.replace("-", " ")


def fetch_n8n_templates(workflow_slug: str) -> list[dict]:
    query = slug_to_n8n_query(workflow_slug)
    url = f"https://api.n8n.io/api/templates/search?search={requests.utils.quote(query)}&limit=6"
    try:
        r = requests.get(url, timeout=REQUEST_TIMEOUT)
        r.raise_for_status()
        data = r.json()
        templates = data.get("workflows", data.get("data", []))
        return [
            {
                "id": t.get("id"),
                "title": t.get("name") or t.get("title", ""),
                "url": f"https://n8n.io/workflows/{t.get('id')}",
            }
            for t in templates[:4]
        ]
    except Exception as e:
        log.debug(f"n8n templates for {workflow_slug}: {e}")
        return []


def build_page(workflow: dict, tool: dict, n8n_templates: list[dict]) -> dict:
    wf_label = workflow["label"]
    tool_label = tool["label"]
    tool_slug = tool["slug"]
    wf_slug = workflow["slug"]

    return {
        "workflow_slug": wf_slug,
        "tool_slug": tool_slug,
        "slug": f"/automate/{wf_slug}/with/{tool_slug}",
        "title": f"How to Automate {wf_label} with {tool_label}",
        "description": (
            f"Step-by-step guide to automating {wf_label.lower()} using {tool_label}. "
            f"{workflow['outcome']}"
        ),
        "workflow": {
            "label": wf_label,
            "description": workflow["description"],
            "pain": workflow["pain"],
            "outcome": workflow["outcome"],
            "steps": workflow["steps"],
        },
        "tool": tool,
        "n8n_templates": n8n_templates,
        "related_workflows": [
            w["slug"]
            for w in WORKFLOWS
            if w["slug"] != wf_slug and tool_slug in w.get("related_tools", [])
        ][:3],
        "related_tools": [
            t["slug"]
            for t in AI_TOOLS
            if t["slug"] != tool_slug and t["slug"] in workflow.get("related_tools", [])
        ][:3],
    }


def run():
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)

    pages = []
    total = len(WORKFLOWS) * len(AI_TOOLS)
    log.info(f"Building {total} workflow×tool page definitions...")

    for workflow in WORKFLOWS:
        tool_is_relevant = set(
            workflow.get("related_tools", [t["slug"] for t in AI_TOOLS])
        )
        for tool in AI_TOOLS:
            if tool["slug"] not in tool_is_relevant:
                continue

            n8n_templates = []
            if tool["slug"] == "n8n":
                n8n_templates = fetch_n8n_templates(workflow["slug"])
                time.sleep(CRAWL_DELAY)

            pages.append(build_page(workflow, tool, n8n_templates))

    output = {
        "meta": {
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "total_pages": len(pages),
            "workflows": len(WORKFLOWS),
            "tools": len(AI_TOOLS),
        },
        "workflows": [
            {"slug": w["slug"], "label": w["label"], "description": w["description"]}
            for w in WORKFLOWS
        ],
        "tools": [
            {"slug": t["slug"], "label": t["label"], "vendor": t["vendor"]}
            for t in AI_TOOLS
        ],
        "pages": pages,
    }

    with open(OUTPUT_PATH, "w") as f:
        json.dump(output, f, indent=2)

    log.info(f"Done. {len(pages)} automation pages written to {OUTPUT_PATH}")


if __name__ == "__main__":
    run()
