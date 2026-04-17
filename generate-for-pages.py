#!/usr/bin/env python3
"""Generate 20 /for/ landing pages for altorlab.com SEO."""

import os
import json

BASE = "/Users/anshul/work/gcp-instance-snapshot-20260327-201627/codebases/consumer/altorlab-com/react-app"

PAGES = [
    {
        "key": "forZendeskTeams",
        "component": "ForZendeskTeams",
        "slug": "/for/zendesk-teams",
        "title": "Altor for Zendesk Teams: Investigate Tickets Beyond Routing in the US",
        "description": "Zendesk AI routes and tags. Altor investigates — querying ClickHouse, Stripe, and Linear to diagnose what's actually broken. Built for US B2B teams.",
        "headline": "Zendesk routes tickets. Your engineers still investigate them manually.",
        "subhead": "Zendesk AI auto-tags, routes, and suggests articles. But when a customer reports 'latency spiked since yesterday,' someone still has to open ClickHouse, check Linear for bugs, and cross-reference Stripe billing. Altor automates that investigation layer.",
        "ticket_title": "Tickets Zendesk AI can't solve",
        "tickets": [
            '"API response times doubled for our enterprise tier" — infrastructure bottleneck, query regression, or upstream provider degradation?',
            '"Our SSO integration broke after your last update" — config drift, OAuth token expiry, or a breaking change in the latest deploy?',
            '"Webhook delivery success rate dropped from 99% to 83%" — their endpoint failing, your delivery pipeline backed up, or a regional outage?',
            '"Billing shows 2M requests but our internal counter shows 1.4M" — double-counting bug, or a metering discrepancy in batch endpoints?',
        ],
        "investigate_title": "What Altor queries for Zendesk-integrated teams",
        "investigations": [
            "ClickHouse / your analytics DB — per-customer request logs, latency percentiles, error rates by endpoint and time window",
            "Linear / Jira — open bugs matching ticket keywords, recent regressions, deploy-correlated issues",
            "Stripe — subscription tier, usage metering, invoice line items vs. actual logged usage",
            "GitHub — recent deploys, breaking change PRs, SDK version compatibility",
            "Zendesk ticket context — prior ticket history, account tier, escalation patterns",
        ],
        "stats": [
            {"value": "2 min", "label": "median investigation time vs. 25 min manual"},
            {"value": "6+", "label": "systems queried per ticket — automatically"},
            {
                "value": "80%",
                "label": "of B2B tickets need investigation, not article lookup",
            },
            {"value": "$0", "label": "changes to your existing Zendesk workflows"},
        ],
        "why_title": "Why Zendesk teams adopt Altor",
        "why_paragraphs": [
            "Zendesk's AI handles routing and article suggestions — that covers maybe 20% of B2B technical volume. The other 80% sits in queue until an engineer manually checks logs, billing, and bug trackers. That's the 20-45 minute bottleneck per ticket.",
            "Altor plugs into Zendesk as an investigation layer. Tickets that need diagnosis get investigated automatically. Your Zendesk workflows, macros, SLAs, and team structure stay exactly the same.",
        ],
        "related": [
            {
                "label": "Altor vs. support platform AI",
                "path": "/compare/altor-vs-support-platform-ai",
            },
            {
                "label": "API error investigation walkthrough",
                "path": "/use-case/api-error-investigation",
            },
            {"label": "Portkey case study", "path": "/customers/portkey"},
        ],
    },
    {
        "key": "forIntercomTeams",
        "component": "ForIntercomTeams",
        "slug": "/for/intercom-teams",
        "title": "Altor for Intercom Teams: Technical Investigation Beyond Fin",
        "description": "Intercom Fin answers from your help center. Altor investigates across production systems — ClickHouse, Linear, Stripe — to resolve what Fin can't.",
        "headline": "Fin answers FAQs. Your engineers still investigate the hard tickets.",
        "subhead": "Intercom Fin resolves common questions from your help center. When a customer reports a production issue — latency spikes, webhook failures, billing discrepancies — Fin can't query your ClickHouse logs or check your bug tracker. Altor can.",
        "ticket_title": "Tickets that escalate past Fin",
        "tickets": [
            '"Events stopped flowing into our dashboard 3 hours ago" — ingestion pipeline stalled, schema change, or customer-side config error?',
            '"Our monthly invoice is $800 higher than expected" — usage spike, plan change mid-cycle, or metering bug?',
            '"SDK throws auth errors intermittently on iOS" — token refresh race condition, clock skew, or a known SDK bug?',
            '"Data export job fails with timeout after running fine for months" — dataset grew past threshold, or infrastructure change?',
        ],
        "investigate_title": "What Altor investigates for Intercom-powered teams",
        "investigations": [
            "ClickHouse — event ingestion rates, pipeline latency, error logs by customer and endpoint",
            "Stripe — invoice breakdown, plan changes, metered billing reconciliation against actual usage",
            "Linear — open bugs, recent regressions, SDK compatibility issues",
            "GitHub — deploy history, config changes, SDK release notes matching the customer's version",
            "StatusPage / PagerDuty — upstream outages, planned maintenance windows",
        ],
        "stats": [
            {
                "value": "80%",
                "label": "of technical tickets escalate past Fin to human agents",
            },
            {"value": "2 min", "label": "Altor's median diagnosis vs. 30 min manual"},
            {"value": "6+", "label": "production systems queried simultaneously"},
            {"value": "0", "label": "changes to your Intercom inbox or routing rules"},
        ],
        "why_title": "Why Intercom teams add Altor",
        "why_paragraphs": [
            "Fin is excellent at deflecting FAQ-style questions. But B2B technical support isn't mostly FAQs — it's mostly investigations. A customer reporting intermittent auth failures needs someone to check their token flow against your OAuth logs, not read a help article.",
            "Altor works alongside Intercom as the investigation layer. Fin handles the 20% it can. Altor handles the 80% that requires pulling live data from production systems.",
        ],
        "related": [
            {
                "label": "Altor vs. doc chatbots",
                "path": "/compare/altor-vs-doc-chatbots",
            },
            {
                "label": "Webhook failure investigation",
                "path": "/use-case/webhook-failure-investigation",
            },
            {"label": "Portkey case study", "path": "/customers/portkey"},
        ],
    },
    {
        "key": "forFreshdesk",
        "component": "ForFreshdesk",
        "slug": "/for/freshdesk-teams",
        "title": "Altor for Freshdesk Teams: Automate B2B Ticket Investigation",
        "description": "Freshdesk manages tickets. Altor investigates them — querying logs, billing, and bug trackers to deliver root causes in 2 minutes for US support teams.",
        "headline": "Freshdesk manages tickets. Altor solves the technical ones.",
        "subhead": "Your Freshdesk setup handles routing, SLAs, and automation rules. But technical tickets still require manual investigation across multiple systems. Altor automates that investigation and delivers diagnoses back into Freshdesk.",
        "ticket_title": "Technical tickets that stall in Freshdesk queues",
        "tickets": [
            '"Our data sync runs but records are missing in the destination" — partial failure, schema mismatch, or rate limiting at the destination API?',
            '"PDF generation returns blank pages for our Japanese content" — encoding issue, font rendering bug, or a known CJK processing limitation?',
            '"Scheduled reports stopped sending last Tuesday" — cron job failed, email delivery blocked, or the report query started timing out?',
            '"Upload endpoint rejects files over 8MB but our plan allows 25MB" — misconfigured limit, CDN caching stale config, or a regression in the latest deploy?',
        ],
        "investigate_title": "What Altor queries for Freshdesk teams",
        "investigations": [
            "Application logs — sync job output, error traces, processing pipeline status per customer",
            "Postgres / MySQL — customer configuration, feature flags, plan-specific limits",
            "Stripe / Chargebee — subscription tier, add-on features, billing status",
            "Linear / Jira — matching bugs, recent regressions, version-specific known issues",
            "GitHub — recent deploys, configuration changes, migration scripts",
        ],
        "stats": [
            {
                "value": "35 min",
                "label": "average manual investigation time for technical tickets",
            },
            {
                "value": "< 3 min",
                "label": "Altor's investigation time for the same tickets",
            },
            {"value": "4-6", "label": "systems checked per investigation"},
            {"value": "67%", "label": "reduction in MTTR after deploying Altor"},
        ],
        "why_title": "Why Freshdesk teams adopt Altor",
        "why_paragraphs": [
            "Freshdesk excels at ticket management — routing, SLAs, automations, and customer communication. It does not excel at the actual technical investigation that B2B tickets require.",
            "Altor delivers structured diagnoses directly into your Freshdesk workflow. Your agents review the root cause and respond instead of spending 30+ minutes checking logs and bug trackers.",
        ],
        "related": [
            {
                "label": "Altor vs. support platform AI",
                "path": "/compare/altor-vs-support-platform-ai",
            },
            {
                "label": "Billing escalation debugging",
                "path": "/use-case/billing-escalation-debugging",
            },
            {"label": "Portkey case study", "path": "/customers/portkey"},
        ],
    },
    {
        "key": "forFintech",
        "component": "ForFintech",
        "slug": "/for/fintech-companies",
        "title": "Altor for Fintech Support: Investigate Payment and Compliance Tickets Fast",
        "description": "Fintech support tickets involve transactions, compliance logs, and regulatory requirements. Altor investigates across payment systems, KYC data, and audit trails in minutes.",
        "headline": "Fintech tickets aren't FAQs — they're forensic investigations.",
        "subhead": "When a customer reports a failed payment, a flagged transaction, or a compliance hold, your support team needs to cross-reference payment processors, KYC systems, fraud detection, and audit logs. Altor does that in 2 minutes.",
        "ticket_title": "Tickets unique to fintech support",
        "tickets": [
            '"My ACH transfer has been pending for 5 days" — bank processing delay, compliance hold, insufficient funds, or a stuck state in your payment orchestration?',
            '"Customer was flagged for fraud but this is a legitimate business" — which risk rule triggered, what evidence was scored, and can the decision be overridden?',
            '"Webhook notifications for successful payments stopped reaching our server" — delivery failure, endpoint misconfiguration, or event type filtering change?',
            '"Our settlement report shows a $2,300 discrepancy vs. our dashboard" — timing difference, currency conversion rounding, or a reconciliation bug?',
        ],
        "investigate_title": "What Altor investigates for fintech teams",
        "investigations": [
            "Payment processor logs — transaction status, retry history, failure codes, settlement timelines",
            "KYC / compliance system — verification status, risk scores, hold reasons, required documents",
            "Fraud detection — rule triggers, score breakdown, false positive patterns",
            "Stripe / Adyen / Plaid — payment method status, bank connectivity, reconciliation data",
            "Audit trail — who changed what, when, and the regulatory context for each action",
        ],
        "stats": [
            {
                "value": "45 min",
                "label": "average time to investigate a payment dispute manually",
            },
            {
                "value": "2 min",
                "label": "Altor's investigation time with full audit trail",
            },
            {"value": "3-5", "label": "compliance systems cross-referenced per ticket"},
            {
                "value": "$150K+",
                "label": "annual cost of manual compliance investigation per support FTE",
            },
        ],
        "why_title": "Why fintech companies need investigation automation",
        "why_paragraphs": [
            "Fintech support combines two challenges: technical complexity and regulatory requirements. Every payment failure needs root-cause analysis. Every compliance hold needs documented evidence. Every fraud flag needs a decision trail.",
            "Manual investigation means 30-60 minutes per ticket, spread across payment processors, KYC systems, and audit logs. Altor pulls from all of them simultaneously and delivers a structured diagnosis with the evidence chain your compliance team needs.",
        ],
        "related": [
            {
                "label": "Billing escalation debugging",
                "path": "/use-case/billing-escalation-debugging",
            },
            {
                "label": "Altor for API-first developer tools",
                "path": "/for/api-first-developer-tools",
            },
            {"label": "Portkey case study", "path": "/customers/portkey"},
        ],
    },
    {
        "key": "forDevtools",
        "component": "ForDevtools",
        "slug": "/for/devtools-companies",
        "title": "Altor for Developer Tools: Resolve SDK and API Tickets in Minutes",
        "description": "Developer tool companies face tickets about SDK bugs, API changes, and integration failures. Altor investigates across logs, code, and docs to deliver root causes fast.",
        "headline": "Developer customers don't want empathy. They want your logs.",
        "subhead": "When developers report SDK errors, API regressions, or integration failures, they've already read your docs and tried debugging. They need the data they can't access — your internal logs, deploy history, and bug tracker. Altor pulls it all in 2 minutes.",
        "ticket_title": "Developer tool tickets that drain engineering time",
        "tickets": [
            '"SDK v4.2 crashes on React 19 with a hydration error" — known incompatibility, or a new regression introduced in the latest patch?',
            '"GraphQL subscriptions disconnect every 30 seconds in production" — WebSocket timeout config, load balancer idle timeout, or a known issue with your gateway?',
            '"Rate limit headers show 1000/min but I get 429 at 600 requests" — shared rate limit across API keys, or a counting bug in the middleware?',
            '"Batch API returns partial success but no indication of which items failed" — by design, a serialization bug, or a payload size edge case?',
        ],
        "investigate_title": "What Altor queries for developer tool companies",
        "investigations": [
            "ClickHouse / application logs — per-customer request patterns, error rates by SDK version, latency by endpoint",
            "GitHub — SDK release notes, breaking changes, compatibility matrix, open issues matching the report",
            "Linear — known bugs for this SDK version, regression tracking, priority and ETA",
            "API gateway metrics — rate limit counters, throttle events, per-key vs. per-org limits",
            "Documentation — version-specific migration guides, deprecation notices, known limitations",
        ],
        "stats": [
            {
                "value": "20-45 min",
                "label": "typical manual investigation for a developer ticket",
            },
            {"value": "< 2 min", "label": "Altor's median investigation time"},
            {
                "value": "$80-200K",
                "label": "annual cost per support engineer on manual investigation",
            },
            {"value": "3 weeks", "label": "from kickoff to full deployment"},
        ],
        "why_title": "Why developer tool companies are the ideal fit",
        "why_paragraphs": [
            "Three traits make investigation automation especially effective for devtools: developer customers who expect technical depth and will churn without it, high ticket volume driven by integration complexity across many SDK versions, and well-structured API log data that Altor can query precisely.",
            "Your support team is already technical. The bottleneck isn't skill — it's time. Twenty minutes per ticket checking the same systems in the same order. Altor runs that workflow in 2 minutes.",
        ],
        "related": [
            {
                "label": "Altor for AI infrastructure companies",
                "path": "/for/ai-infrastructure-companies",
            },
            {
                "label": "API error investigation",
                "path": "/use-case/api-error-investigation",
            },
            {"label": "Portkey case study", "path": "/customers/portkey"},
        ],
    },
    {
        "key": "forDataInfra",
        "component": "ForDataInfra",
        "slug": "/for/data-infrastructure-companies",
        "title": "Altor for Data Infrastructure: Diagnose Pipeline and Query Tickets Fast",
        "description": "Data infrastructure tickets involve failed pipelines, query performance, and connector issues. Altor investigates across your systems in 2 minutes.",
        "headline": "Data infrastructure tickets are always multi-system investigations.",
        "subhead": "When customers report pipeline failures, slow queries, or connector errors, the root cause spans your query engine, connector framework, scheduling system, and their source/destination configs. Altor investigates all of them simultaneously.",
        "ticket_title": "Data infrastructure tickets that take 30+ minutes each",
        "tickets": [
            '"Our nightly sync to Snowflake failed with a schema mismatch" — source schema changed, connector type mapping issue, or a Snowflake DDL permission error?',
            '"Query performance degraded 10x after upgrading to your v3.0" — query plan regression, missing index rebuild step, or new memory allocation defaults?',
            '"CDC pipeline stopped capturing deletes from our Postgres source" — WAL level setting, replication slot full, or a connector bug with logical decoding?',
            '"Scheduled job runs but outputs zero rows — it was working fine last week" — upstream table renamed, partition filter mismatch, or credential rotation?',
        ],
        "investigate_title": "What Altor investigates for data infra teams",
        "investigations": [
            "Query engine logs — execution plans, memory usage, partition pruning effectiveness, timeout traces",
            "Connector framework — sync history, schema evolution tracking, error patterns by source type",
            "Scheduler — job run history, dependency chains, resource contention, retry outcomes",
            "Customer configuration — source/destination credentials, schema mappings, transformation rules",
            "Linear / Jira — known connector bugs, version-specific regressions, migration blockers",
        ],
        "stats": [
            {"value": "40 min", "label": "average pipeline failure investigation time"},
            {
                "value": "< 3 min",
                "label": "Altor's investigation with full dependency trace",
            },
            {"value": "5+", "label": "systems checked per data infrastructure ticket"},
            {
                "value": "70%",
                "label": "of pipeline tickets follow repeatable investigation patterns",
            },
        ],
        "why_title": "Why data infrastructure is ideal for Altor",
        "why_paragraphs": [
            "Data infrastructure companies have deeply structured operational data — query logs, sync histories, schema evolution trails — that Altor can query precisely. Every pipeline failure follows a diagnostic tree: check the source, check the connector, check the destination, check the schedule.",
            "Your support engineers run this same diagnostic tree manually, 30-40 minutes per ticket. Altor automates the entire tree and delivers a root cause with evidence.",
        ],
        "related": [
            {"label": "Altor for ClickHouse teams", "path": "/for/clickhouse-teams"},
            {
                "label": "Altor for AI infrastructure",
                "path": "/for/ai-infrastructure-companies",
            },
            {"label": "Portkey case study", "path": "/customers/portkey"},
        ],
    },
    {
        "key": "forEcommercePlatforms",
        "component": "ForEcommercePlatforms",
        "slug": "/for/ecommerce-platforms",
        "title": "Altor for E-Commerce Platforms: Resolve Merchant Tickets in Minutes",
        "description": "E-commerce platform support tickets involve checkout failures, payment disputes, and inventory sync issues. Altor investigates across payment, catalog, and order systems fast.",
        "headline": "Merchant tickets cost you revenue for every minute they stay open.",
        "subhead": "When a merchant reports checkout failures, inventory sync errors, or shipping calculation bugs, every hour of investigation is lost GMV. Altor cross-references payment processors, order management, and catalog systems to deliver root causes in minutes.",
        "ticket_title": "Merchant support tickets that block revenue",
        "tickets": [
            '"Checkout is failing for customers using Apple Pay since this morning" — payment provider issue, your tokenization layer, or a Safari update breaking the flow?',
            '"Inventory shows 0 for products that have 500 units in our warehouse" — sync delay, webhook failure from their ERP, or a stock calculation bug?',
            '"Shipping rates doubled overnight for all orders to California" — carrier rate table update, zone mapping change, or a weight calculation error?',
            '"Discount code SUMMER25 applies on preview but not at checkout" — coupon rule conflict, minimum order threshold, or a caching issue?',
        ],
        "investigate_title": "What Altor queries for e-commerce platforms",
        "investigations": [
            "Payment processor — transaction attempts, failure codes, tokenization logs, provider status",
            "Order management — checkout flow logs, cart state, pricing calculations, discount rule evaluation",
            "Catalog / inventory — sync history, webhook delivery, stock level changes, ERP connection status",
            "Shipping engine — rate calculation logs, zone mappings, carrier API responses",
            "Stripe / PayPal / Adyen — merchant account status, settlement history, chargeback data",
        ],
        "stats": [
            {
                "value": "$47K/hr",
                "label": "average revenue lost during checkout outage for mid-market merchants",
            },
            {
                "value": "< 2 min",
                "label": "Altor's diagnosis time for checkout-blocking issues",
            },
            {"value": "4-6", "label": "systems cross-referenced per merchant ticket"},
            {
                "value": "73%",
                "label": "of merchant escalations are resolvable with data from 3 systems",
            },
        ],
        "why_title": "Why e-commerce platforms need fast investigation",
        "why_paragraphs": [
            "E-commerce support has a unique pressure: merchant revenue is directly tied to resolution speed. A checkout bug during peak hours costs your merchants thousands per hour. Your support team's investigation speed is literally a revenue metric.",
            "Altor investigates merchant tickets by pulling payment logs, inventory sync history, and order system data simultaneously — delivering root causes before the merchant's next message.",
        ],
        "related": [
            {
                "label": "Billing escalation debugging",
                "path": "/use-case/billing-escalation-debugging",
            },
            {
                "label": "Webhook failure investigation",
                "path": "/use-case/webhook-failure-investigation",
            },
            {"label": "Portkey case study", "path": "/customers/portkey"},
        ],
    },
    {
        "key": "forObservability",
        "component": "ForObservability",
        "slug": "/for/observability-companies",
        "title": "Altor for Observability Companies: Investigate Agent and Pipeline Tickets Fast",
        "description": "Observability companies face tickets about agents, data pipelines, and alerting. Altor investigates across collector configs, ingestion pipelines, and billing systems.",
        "headline": "Your customers monitor everything — except your support queue.",
        "subhead": "When customers report missing metrics, alert storms, or ingestion failures, the root cause lives in agent configs, collector pipelines, and your ingest infrastructure. Altor investigates all three layers in 2 minutes.",
        "ticket_title": "Observability platform tickets that require deep investigation",
        "tickets": [
            '"Metrics stopped flowing from 3 of our 200 hosts since the agent upgrade" — agent crash, network policy change, or a collector config incompatibility?',
            '"Alert fired 47 times in one hour for a metric that looks stable" — threshold too sensitive, evaluation window too short, or a data gap causing false positives?',
            '"Our ingestion bill jumped 3x this month but our infrastructure has not changed" — cardinality explosion from new labels, custom metrics growth, or a metering bug?',
            '"Dashboard query takes 45 seconds — it used to load in 2" — query hitting cold storage, cardinality bloom, or tenant resource contention?',
        ],
        "investigate_title": "What Altor queries for observability companies",
        "investigations": [
            "Ingestion pipeline — per-tenant data volume, cardinality metrics, rejected/dropped samples",
            "Agent/collector logs — version, config diffs, connection status, sample delivery rates",
            "Query engine — slow query logs, resource utilization, storage tier access patterns",
            "Billing / usage metering — per-metric-series costs, cardinality breakdowns, plan limits",
            "StatusPage — infrastructure incidents, maintenance windows, regional capacity",
        ],
        "stats": [
            {
                "value": "30 min",
                "label": "average investigation time for agent/pipeline tickets",
            },
            {
                "value": "2 min",
                "label": "Altor's investigation with full pipeline trace",
            },
            {
                "value": "3x",
                "label": "ingestion billing disputes involve metering + usage data cross-referencing",
            },
            {
                "value": "60%",
                "label": "of escalations trace back to config drift or cardinality growth",
            },
        ],
        "why_title": "Why observability companies adopt Altor",
        "why_paragraphs": [
            "Observability companies handle ironically difficult support problems: customers who expect instant answers (they're monitoring experts) about deeply technical issues (data pipelines, query engines, distributed agents).",
            "Altor matches this expectation. It investigates by querying your ingestion pipeline data, agent fleet status, and billing metering — delivering root causes with the same precision your customers use to monitor their own infrastructure.",
        ],
        "related": [
            {
                "label": "Altor for data infrastructure",
                "path": "/for/data-infrastructure-companies",
            },
            {"label": "Altor for Datadog teams", "path": "/for/datadog-teams"},
            {"label": "Portkey case study", "path": "/customers/portkey"},
        ],
    },
    {
        "key": "forClickhouseTeams",
        "component": "ForClickhouseTeams",
        "slug": "/for/clickhouse-teams",
        "title": "Altor for ClickHouse Teams: Query Customer Logs Automatically During Investigation",
        "description": "If your customer data lives in ClickHouse, Altor queries it automatically during ticket investigation — correlating logs, metrics, and errors in 2 minutes.",
        "headline": "Your support data is in ClickHouse. Let Altor query it.",
        "subhead": "ClickHouse holds your customer's API logs, event streams, and operational metrics. Today your support engineers write ad-hoc queries to investigate tickets. Altor runs those same queries automatically — every ticket, every time, in 2 minutes.",
        "ticket_title": "How ClickHouse data powers ticket investigation",
        "tickets": [
            '"Error rate spiked for our production workload" — Altor queries ClickHouse for error_count by endpoint, time window, and customer_id to isolate the pattern',
            '"Latency doubled on our batch processing endpoint" — Altor queries p50/p95/p99 latency over the last 48 hours, segments by payload size and region',
            '"We are seeing intermittent timeouts on reads" — Altor checks query_log for slow queries, MergeTree part counts, and concurrent merge activity',
            '"Our event pipeline dropped events between 2-4am UTC" — Altor queries ingestion_log for gaps, checks insert_errors, and correlates with merge operations',
        ],
        "investigate_title": "ClickHouse tables Altor can query",
        "investigations": [
            "Request/event logs — error rates, latency percentiles, status codes by customer, endpoint, and time window",
            "system.query_log — slow queries affecting specific customers, resource-intensive operations",
            "system.merges / system.parts — merge activity, part counts, storage health indicators",
            "Custom analytics tables — whatever customer-facing metrics your product tracks",
            "Billing/usage tables — metered consumption reconciled against Stripe invoices",
        ],
        "stats": [
            {
                "value": "200+",
                "label": "tickets diagnosed using ClickHouse data at Portkey",
            },
            {"value": "< 2 min", "label": "from ticket to ClickHouse-backed diagnosis"},
            {
                "value": "5-10",
                "label": "ClickHouse queries typically needed per investigation",
            },
            {
                "value": "0",
                "label": "queries your support team needs to write manually",
            },
        ],
        "why_title": "Why ClickHouse teams get the most from Altor",
        "why_paragraphs": [
            "ClickHouse is the ideal investigation backend: it stores massive volumes of customer operational data with sub-second query performance. The problem isn't that the data doesn't exist — it's that writing the right queries for each ticket takes 15-20 minutes.",
            "Altor knows your schema. It generates and executes the right ClickHouse queries for each ticket automatically — the same queries your best engineer would write, but in seconds instead of minutes.",
        ],
        "related": [
            {
                "label": "Altor for AI infrastructure",
                "path": "/for/ai-infrastructure-companies",
            },
            {
                "label": "API error investigation",
                "path": "/use-case/api-error-investigation",
            },
            {"label": "Portkey case study", "path": "/customers/portkey"},
        ],
    },
    {
        "key": "forStripeBilling",
        "component": "ForStripeBilling",
        "slug": "/for/stripe-billing-teams",
        "title": "Altor for Stripe Billing Teams: Resolve Billing Disputes With Evidence",
        "description": "Billing disputes require cross-referencing Stripe invoices with actual usage data. Altor automates this investigation and delivers evidence-backed resolutions in minutes.",
        "headline": "Billing disputes need evidence, not explanations.",
        "subhead": "When customers dispute charges, your team cross-references Stripe invoices against usage logs, checks for proration errors, and verifies plan changes. Altor does this automatically — pulling Stripe data and usage logs in parallel to deliver evidence-backed resolutions.",
        "ticket_title": "Billing tickets that require Stripe investigation",
        "tickets": [
            '"My invoice is $800 higher than last month but nothing changed" — usage tier crossed, proration from mid-cycle plan change, or metering discrepancy?',
            '"I downgraded but was charged the full amount" — downgrade effective date, billing cycle timing, or Stripe subscription update lag?',
            '"Payment failed but my card works everywhere else" — card processor decline code, 3D Secure challenge required, or Stripe Radar fraud block?',
            '"Refund was issued 2 weeks ago but has not appeared on my statement" — Stripe refund status, bank processing time, or partial refund applied to wrong invoice?',
        ],
        "investigate_title": "What Altor queries for Stripe billing investigations",
        "investigations": [
            "Stripe Billing — invoices, line items, proration calculations, subscription change history",
            "Stripe Payments — charge attempts, decline codes, 3DS challenges, refund status",
            "Stripe Radar — fraud scores, rule triggers, block reasons for flagged payments",
            "Usage metering — actual API calls or resource consumption vs. billed amounts",
            "Customer config — plan tier, add-ons, coupon codes, billing contact details",
        ],
        "stats": [
            {
                "value": "30-60 min",
                "label": "typical manual billing investigation time",
            },
            {
                "value": "< 2 min",
                "label": "Altor's time to cross-reference Stripe + usage data",
            },
            {
                "value": "#1",
                "label": "cause of SaaS churn — unresolved billing disputes",
            },
            {
                "value": "100%",
                "label": "of billing resolutions include evidence from both systems",
            },
        ],
        "why_title": "Why Stripe teams add Altor for billing support",
        "why_paragraphs": [
            "Billing disputes are high-stakes: the customer is upset about money, and the answer requires cross-referencing two systems (Stripe + your usage database) that don't talk to each other natively.",
            "Altor queries both simultaneously. It pulls the Stripe invoice, compares line items against actual usage in your database, identifies discrepancies, and delivers a resolution with evidence — all before your agent finishes reading the ticket.",
        ],
        "related": [
            {
                "label": "Billing escalation debugging",
                "path": "/use-case/billing-escalation-debugging",
            },
            {"label": "Altor for fintech companies", "path": "/for/fintech-companies"},
            {"label": "Portkey case study", "path": "/customers/portkey"},
        ],
    },
]


def build_page_js_entry(p):
    sections = []

    sections.append(f"""      {{
        type: 'body',
        title: '{p["ticket_title"].replace("'", "\\'")}',
        paragraphs: [
          'These are the tickets that sit in queue until an engineer has time to investigate:',
        ],
        bullets: [
{chr(10).join(f"          '{t.replace(chr(39), chr(92) + chr(39))}'," for t in p["tickets"])}
        ],
      }}""")

    sections.append(f"""      {{
        type: 'body',
        title: '{p["investigate_title"].replace("'", "\\'")}',
        paragraphs: [
          'Altor connects to the systems where your investigation data actually lives:',
        ],
        bullets: [
{chr(10).join(f"          '{inv.replace(chr(39), chr(92) + chr(39))}'," for inv in p["investigations"])}
        ],
      }}""")

    stats_items = ",\n".join(
        f"          {{ value: '{s['value']}', label: '{s['label'].replace(chr(39), chr(92) + chr(39))}' }}"
        for s in p["stats"]
    )
    sections.append(f"""      {{
        type: 'stats',
        items: [
{stats_items},
        ],
      }}""")

    sections.append("""      {
        type: 'quote',
        text: 'Our tickets are investigations, not FAQs. Nobody else could even attempt to answer them automatically. Altor can because it queries our actual production data.',
        author: 'Engineering lead',
        company: 'Portkey',
      }""")

    why_paras = ",\n".join(
        f"          '{para.replace(chr(39), chr(92) + chr(39))}'"
        for para in p["why_paragraphs"]
    )
    sections.append(f"""      {{
        type: 'body',
        title: '{p["why_title"].replace("'", "\\'")}',
        paragraphs: [
{why_paras},
        ],
      }}""")

    related = ",\n".join(
        f"      {{ label: '{r['label'].replace(chr(39), chr(92) + chr(39))}', path: '{r['path']}' }}"
        for r in p["related"]
    )

    return f"""  {p["key"]}: {{
    slug: '{p["slug"]}',
    title: '{p["title"].replace("'", "\\'")}',
    description: '{p["description"].replace("'", "\\'")}',
    datePublished: '2026-04-01',
    dateModified: '2026-04-01',

    hero: {{
      headline: '{p["headline"].replace("'", "\\'")}',
      subhead: '{p["subhead"].replace("'", "\\'")}',
    }},

    sections: [
{("," + chr(10)).join(sections)},
    ],

    relatedPages: [
{related},
    ],

    cta: {{
      title: 'See Altor investigate a real ticket from your queue',
      body: 'We\\'ll connect to your systems and run a live investigation. Your data, your ticket, diagnosed in 2 minutes during EST or PST hours.',
      buttonText: 'Book a Demo (US Hours)',
      buttonUrl: 'https://calendly.com/founders-altorlab/30min',
    }},
  }}"""


def main():
    pages_file = os.path.join(BASE, "src/content/pages.js")
    with open(pages_file) as f:
        content = f.read()

    new_entries = "\n\n".join(build_page_js_entry(p) for p in PAGES)
    content = content.rstrip().rstrip("}").rstrip()
    content += ",\n\n" + new_entries + ",\n}\n"

    with open(pages_file, "w") as f:
        f.write(content)
    print(f"Updated pages.js with {len(PAGES)} new entries")

    pages_dir = os.path.join(BASE, "src/pages")
    for p in PAGES:
        comp_file = os.path.join(pages_dir, f"{p['component']}.jsx")
        comp_content = f"""import ContentPage from '../components/ContentPage'
import {{ pages }} from '../content/pages'

const {p["component"]} = () => <ContentPage page={{pages.{p["key"]}}} />

export default {p["component"]}
"""
        with open(comp_file, "w") as f:
            f.write(comp_content)
    print(f"Created {len(PAGES)} page components")

    app_file = os.path.join(BASE, "src/App.jsx")
    with open(app_file) as f:
        app_content = f.read()

    new_imports = "\n".join(
        f"import {p['component']} from './pages/{p['component']}'" for p in PAGES
    )
    app_content = app_content.replace(
        "import NotFound from './pages/NotFound'",
        f"import NotFound from './pages/NotFound'\n{new_imports}",
    )

    new_routes = "\n".join(
        f'        <Route path="{p["slug"]}" element={{<{p["component"]} />}} />'
        for p in PAGES
    )
    app_content = app_content.replace(
        '<Route path="/customers/portkey"',
        f'{new_routes}\n        <Route path="/customers/portkey"',
    )

    with open(app_file, "w") as f:
        f.write(app_content)
    print("Updated App.jsx with new routes")

    sitemap_file = os.path.join(BASE, "scripts/generate-sitemap.mjs")
    with open(sitemap_file) as f:
        sm_content = f.read()

    new_sm_entries = "\n".join(
        f"  {{ path: '{p['slug']}', priority: '0.8', changefreq: 'monthly' }},"
        for p in PAGES
    )
    sm_content = sm_content.replace(
        "  { path: '/blog',",
        f"{new_sm_entries}\n  {{ path: '/blog',",
    )

    with open(sitemap_file, "w") as f:
        f.write(sm_content)
    print("Updated generate-sitemap.mjs")

    prerender_file = os.path.join(BASE, "scripts/prerender.mjs")
    with open(prerender_file) as f:
        pr_content = f.read()

    new_pr_routes = "\n".join(f"  '{p['slug']}'," for p in PAGES)
    pr_content = pr_content.replace(
        "  '/customers/portkey',",
        f"{new_pr_routes}\n  '/customers/portkey',",
    )

    with open(prerender_file, "w") as f:
        f.write(pr_content)
    print("Updated prerender.mjs")

    print(f"\nDone! {len(PAGES)} /for/ pages ready. Run `npm run build` to generate.")


if __name__ == "__main__":
    main()
