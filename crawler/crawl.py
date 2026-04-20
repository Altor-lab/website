#!/usr/bin/env python3
"""
Altor AI Stack Intelligence Crawler
------------------------------------
Detects which AI tools B2B SaaS companies use by scraping public signals:
  1. Company web surfaces (homepage, /privacy, /blog, JS bundles, CSP headers)
  2. Public ATS job boards (Greenhouse, Lever, Workable — free, no auth)
  3. Vendor customer pages (OpenAI, Anthropic, LangChain, n8n, etc.)

Output: react-app/public/data/ai-companies.json
Cost:   $0 — runs on GitHub Actions free tier (2,000 min/month)
Runtime: ~15-25 min for 200 companies

Why this approach:
- No paid APIs. No proxies. No scraping LinkedIn (legal risk).
- Greenhouse/Lever/Workable expose public JSON endpoints by design.
- Privacy policies must list AI subprocessors by law — extremely reliable signal.
- Job postings reveal server-side tools (LangChain, Bedrock, etc.) invisible to crawlers.
"""

import json
import re
import time
import logging
import os
import hashlib
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse, urljoin
from concurrent.futures import ThreadPoolExecutor, as_completed

import requests
from bs4 import BeautifulSoup

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

OUTPUT_PATH = (
    Path(__file__).parent.parent / "react-app" / "public" / "data" / "ai-companies.json"
)

REQUEST_TIMEOUT = 12  # seconds per HTTP request
MAX_WORKERS = 8  # parallel threads — keep low to avoid rate limits
CRAWL_DELAY = 0.4  # seconds between requests per domain
MAX_JS_BUNDLE_SIZE = 500_000  # bytes — skip huge bundles

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# AI Tool Fingerprints
# ---------------------------------------------------------------------------
# Each entry: { "vendor": str, "tool": str, "tier": str, "patterns": [str] }
# Patterns are matched against: raw HTML, JS bundle text, HTTP headers (as string), job text
# Tier: "model_api" | "orchestration" | "app_layer" | "infra" | "internal_tool"

AI_FINGERPRINTS = [
    # ── Model APIs ──────────────────────────────────────────────────────────
    {
        "vendor": "OpenAI",
        "tool": "OpenAI API",
        "tier": "model_api",
        "patterns": [
            r"openai\.com",
            r"api\.openai\.com",
            r"@openai/",
            r"openai-node",
            r"OPENAI_API_KEY",
            r"openai_api_key",
            r"gpt-4o",
            r"gpt-4-turbo",
            r"gpt-3\.5",
            r"text-embedding-ada",
            r"powered by (gpt|openai)",
            r"uses openai",
            r"openai to process",
            r"openai as a",
        ],
    },
    {
        "vendor": "Anthropic",
        "tool": "Claude API",
        "tier": "model_api",
        "patterns": [
            r"anthropic\.com",
            r"api\.anthropic\.com",
            r"@anthropic-ai/",
            r"ANTHROPIC_API_KEY",
            r"anthropic_api_key",
            r"claude-3",
            r"claude-2",
            r"claude sonnet",
            r"claude opus",
            r"claude haiku",
            r"powered by claude",
            r"uses claude",
            r"anthropic to process",
            r"anthropic as a subprocessor",
        ],
    },
    {
        "vendor": "Google",
        "tool": "Gemini / Vertex AI",
        "tier": "model_api",
        "patterns": [
            r"generativelanguage\.googleapis\.com",
            r"aiplatform\.googleapis\.com",
            r"@google-cloud/vertexai",
            r"@google/generative-ai",
            r"GOOGLE_AI_API_KEY",
            r"VERTEX_AI",
            r"gemini-pro",
            r"gemini-1\.",
            r"vertexai",
            r"vertex ai",
            r"google gemini",
        ],
    },
    {
        "vendor": "AWS",
        "tool": "Amazon Bedrock",
        "tier": "model_api",
        "patterns": [
            r"bedrock\.amazonaws\.com",
            r"@aws-sdk/client-bedrock",
            r"AWS_BEDROCK",
            r"amazon bedrock",
            r"aws bedrock",
            r"bedrock-runtime",
            r"bedrock as a",
        ],
    },
    {
        "vendor": "Azure",
        "tool": "Azure OpenAI",
        "tier": "model_api",
        "patterns": [
            r"openai\.azure\.com",
            r"AZURE_OPENAI",
            r"azure openai",
            r"azure_openai_endpoint",
            r"azure-openai",
        ],
    },
    {
        "vendor": "Mistral AI",
        "tool": "Mistral API",
        "tier": "model_api",
        "patterns": [
            r"api\.mistral\.ai",
            r"@mistralai/",
            r"mistral-large",
            r"mistral-medium",
            r"mistral api",
        ],
    },
    {
        "vendor": "Cohere",
        "tool": "Cohere API",
        "tier": "model_api",
        "patterns": [
            r"api\.cohere\.ai",
            r"cohere\.com/llm",
            r"cohere-python",
            r"COHERE_API_KEY",
            r"cohere api",
            r"command-r",
        ],
    },
    # ── Orchestration / Frameworks ───────────────────────────────────────────
    {
        "vendor": "LangChain",
        "tool": "LangChain",
        "tier": "orchestration",
        "patterns": [
            r"langchain",
            r"@langchain/",
            r"langchain\.com",
            r"langchain engineer",
            r"langchain developer",
        ],
    },
    {
        "vendor": "LlamaIndex",
        "tool": "LlamaIndex",
        "tier": "orchestration",
        "patterns": [
            r"llamaindex",
            r"llama.index",
            r"llama_index",
            r"@llamaindex/",
            r"llama-index",
        ],
    },
    {
        "vendor": "Hugging Face",
        "tool": "Hugging Face",
        "tier": "orchestration",
        "patterns": [
            r"huggingface\.co",
            r"cdn-lfs\.huggingface\.co",
            r"@huggingface/",
            r"transformers library",
            r"hf\.co/",
            r"HUGGINGFACE_API",
            r"HF_TOKEN",
        ],
    },
    {
        "vendor": "n8n",
        "tool": "n8n",
        "tier": "orchestration",
        "patterns": [
            r"n8n\.io",
            r"n8n cloud",
            r"n8n workflow",
            r"n8n self.hosted",
            r"n8n automation",
        ],
    },
    {
        "vendor": "Zapier",
        "tool": "Zapier AI",
        "tier": "orchestration",
        "patterns": [
            r"zapier\.com/ai",
            r"zapier central",
            r"zapier ai",
            r"zapier automation",
            r"cdn\.zapier\.com",
        ],
    },
    # ── App Layer (customer-facing AI features) ──────────────────────────────
    {
        "vendor": "Intercom",
        "tool": "Intercom Fin (AI)",
        "tier": "app_layer",
        "patterns": [
            r"widget\.intercom\.io",
            r"js\.intercomcdn\.com",
            r"intercom fin",
            r"intercom ai",
            r"fin ai agent",
        ],
    },
    {
        "vendor": "Kapa.ai",
        "tool": "Kapa.ai Docs AI",
        "tier": "app_layer",
        "patterns": [
            r"widget\.kapa\.ai",
            r"kapa\.ai",
            r"kapa ai",
        ],
    },
    {
        "vendor": "Inkeep",
        "tool": "Inkeep AI Search",
        "tier": "app_layer",
        "patterns": [
            r"inkeep\.com",
            r"cdn\.inkeep\.com",
            r"inkeep ai",
        ],
    },
    {
        "vendor": "Mendable",
        "tool": "Mendable",
        "tier": "app_layer",
        "patterns": [
            r"mendable\.ai",
            r"widget\.mendable\.ai",
            r"mendable chat",
        ],
    },
    {
        "vendor": "Chatbase",
        "tool": "Chatbase",
        "tier": "app_layer",
        "patterns": [
            r"chatbase\.co",
            r"cdn\.chatbase\.co",
        ],
    },
    {
        "vendor": "Ada",
        "tool": "Ada AI Support",
        "tier": "app_layer",
        "patterns": [
            r"ada\.support",
            r"static\.ada\.support",
            r"ada bot",
            r"ada ai",
            r"ada chatbot",
        ],
    },
    {
        "vendor": "Algolia",
        "tool": "Algolia AI Search",
        "tier": "app_layer",
        "patterns": [
            r"algolia\.net",
            r"algolianet\.com",
            r"docsearch\.algolia",
            r"algolia search",
            r"algolia ai",
        ],
    },
    # ── Vector DBs / RAG Infra ───────────────────────────────────────────────
    {
        "vendor": "Pinecone",
        "tool": "Pinecone",
        "tier": "infra",
        "patterns": [
            r"pinecone\.io",
            r"PINECONE_API",
            r"pinecone-client",
            r"pinecone vector",
            r"pinecone index",
        ],
    },
    {
        "vendor": "Weaviate",
        "tool": "Weaviate",
        "tier": "infra",
        "patterns": [
            r"weaviate\.io",
            r"weaviate\.cloud",
            r"WEAVIATE_URL",
        ],
    },
    {
        "vendor": "Qdrant",
        "tool": "Qdrant",
        "tier": "infra",
        "patterns": [
            r"qdrant\.tech",
            r"qdrant\.io",
            r"qdrant cloud",
        ],
    },
    # ── Internal / Dev Tools ─────────────────────────────────────────────────
    {
        "vendor": "GitHub",
        "tool": "GitHub Copilot",
        "tier": "internal_tool",
        "patterns": [
            r"github copilot",
            r"copilot for business",
            r"copilot enterprise",
            r"github\.com/features/copilot",
        ],
    },
    {
        "vendor": "Cursor",
        "tool": "Cursor",
        "tier": "internal_tool",
        "patterns": [
            r"cursor\.sh",
            r"cursor\.com",
            r"cursor ide",
            r"cursor ai",
            r"cursor editor",
        ],
    },
]

# Pre-compile all patterns for speed
for fp in AI_FINGERPRINTS:
    fp["_compiled"] = [re.compile(p, re.IGNORECASE) for p in fp["patterns"]]


# ---------------------------------------------------------------------------
# Target Company Seed List
# ---------------------------------------------------------------------------
# These are B2B SaaS / developer tool companies — Altor's ideal customers.
# They are publicly known AI infrastructure companies, API-first tools,
# and observability/data platforms. Altor already lists these as target verticals.
# Expand this list over time as the dataset grows.

SEED_COMPANIES = [
    # ── AI Infrastructure & Gateways ────────────────────────────────────────
    {
        "name": "Portkey",
        "domain": "portkey.ai",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    {
        "name": "OpenRouter",
        "domain": "openrouter.ai",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    {
        "name": "Together AI",
        "domain": "together.ai",
        "greenhouse_slug": "togetherai",
        "lever_slug": None,
    },
    {
        "name": "Replicate",
        "domain": "replicate.com",
        "greenhouse_slug": "replicate",
        "lever_slug": None,
    },
    {
        "name": "Modal",
        "domain": "modal.com",
        "greenhouse_slug": None,
        "lever_slug": "modal-labs",
    },
    {
        "name": "Baseten",
        "domain": "baseten.co",
        "greenhouse_slug": "baseten",
        "lever_slug": None,
    },
    {
        "name": "Groq",
        "domain": "groq.com",
        "greenhouse_slug": "groq",
        "lever_slug": None,
    },
    {
        "name": "Fireworks AI",
        "domain": "fireworks.ai",
        "greenhouse_slug": None,
        "lever_slug": "fireworks-ai",
    },
    {
        "name": "Anyscale",
        "domain": "anyscale.com",
        "greenhouse_slug": "anyscale",
        "lever_slug": None,
    },
    {
        "name": "Cohere",
        "domain": "cohere.com",
        "greenhouse_slug": "cohere",
        "lever_slug": None,
    },
    {
        "name": "Scale AI",
        "domain": "scale.com",
        "greenhouse_slug": "scaleai",
        "lever_slug": None,
    },
    {
        "name": "Weights & Biases",
        "domain": "wandb.ai",
        "greenhouse_slug": "wandb",
        "lever_slug": None,
    },
    {
        "name": "Hugging Face",
        "domain": "huggingface.co",
        "greenhouse_slug": "huggingface",
        "lever_slug": None,
    },
    {
        "name": "Perplexity AI",
        "domain": "perplexity.ai",
        "greenhouse_slug": None,
        "lever_slug": "perplexity-ai",
    },
    {
        "name": "Mistral AI",
        "domain": "mistral.ai",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    {
        "name": "LangChain",
        "domain": "langchain.com",
        "greenhouse_slug": None,
        "lever_slug": "langchain",
    },
    {
        "name": "BentoML",
        "domain": "bentoml.com",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    # ── Observability & Monitoring ───────────────────────────────────────────
    {
        "name": "Datadog",
        "domain": "datadoghq.com",
        "greenhouse_slug": "datadog",
        "lever_slug": None,
    },
    {
        "name": "New Relic",
        "domain": "newrelic.com",
        "greenhouse_slug": "newrelic",
        "lever_slug": None,
    },
    {
        "name": "Grafana Labs",
        "domain": "grafana.com",
        "greenhouse_slug": "grafanalabs",
        "lever_slug": None,
    },
    {
        "name": "Honeycomb",
        "domain": "honeycomb.io",
        "greenhouse_slug": None,
        "lever_slug": "honeycomb",
    },
    {
        "name": "Chronosphere",
        "domain": "chronosphere.io",
        "greenhouse_slug": "chronosphere",
        "lever_slug": None,
    },
    {
        "name": "Dynatrace",
        "domain": "dynatrace.com",
        "greenhouse_slug": "dynatrace",
        "lever_slug": None,
    },
    {
        "name": "Elastic",
        "domain": "elastic.co",
        "greenhouse_slug": "elastic",
        "lever_slug": None,
    },
    {
        "name": "Splunk",
        "domain": "splunk.com",
        "greenhouse_slug": "splunk",
        "lever_slug": None,
    },
    {
        "name": "Cribl",
        "domain": "cribl.io",
        "greenhouse_slug": "cribl",
        "lever_slug": None,
    },
    {
        "name": "Sumo Logic",
        "domain": "sumologic.com",
        "greenhouse_slug": "sumologic",
        "lever_slug": None,
    },
    {
        "name": "Observe",
        "domain": "observeinc.com",
        "greenhouse_slug": "observeinc",
        "lever_slug": None,
    },
    {
        "name": "Sentry",
        "domain": "sentry.io",
        "greenhouse_slug": None,
        "lever_slug": "sentry",
    },
    {
        "name": "AppDynamics",
        "domain": "appdynamics.com",
        "greenhouse_slug": "appdynamics",
        "lever_slug": None,
    },
    {
        "name": "Lightstep",
        "domain": "lightstep.com",
        "greenhouse_slug": None,
        "lever_slug": "lightstep",
    },
    # ── API-first Developer Tools ────────────────────────────────────────────
    {
        "name": "Stripe",
        "domain": "stripe.com",
        "greenhouse_slug": "stripe",
        "lever_slug": None,
    },
    {
        "name": "Twilio",
        "domain": "twilio.com",
        "greenhouse_slug": "twilio",
        "lever_slug": None,
    },
    {
        "name": "Clerk",
        "domain": "clerk.com",
        "greenhouse_slug": None,
        "lever_slug": "clerk",
    },
    {
        "name": "Neon",
        "domain": "neon.tech",
        "greenhouse_slug": None,
        "lever_slug": "neon-database",
    },
    {
        "name": "PlanetScale",
        "domain": "planetscale.com",
        "greenhouse_slug": None,
        "lever_slug": "planetscale",
    },
    {
        "name": "Supabase",
        "domain": "supabase.com",
        "greenhouse_slug": None,
        "lever_slug": "supabase",
    },
    {
        "name": "Convex",
        "domain": "convex.dev",
        "greenhouse_slug": None,
        "lever_slug": "convex",
    },
    {
        "name": "Postman",
        "domain": "postman.com",
        "greenhouse_slug": "postman",
        "lever_slug": None,
    },
    {
        "name": "Kong",
        "domain": "konghq.com",
        "greenhouse_slug": "kong",
        "lever_slug": None,
    },
    {
        "name": "Readme",
        "domain": "readme.com",
        "greenhouse_slug": None,
        "lever_slug": "readme",
    },
    {
        "name": "Stoplight",
        "domain": "stoplight.io",
        "greenhouse_slug": None,
        "lever_slug": "stoplight",
    },
    {"name": "Tyk", "domain": "tyk.io", "greenhouse_slug": None, "lever_slug": None},
    {
        "name": "Auth0",
        "domain": "auth0.com",
        "greenhouse_slug": "auth0",
        "lever_slug": None,
    },
    {
        "name": "Okta",
        "domain": "okta.com",
        "greenhouse_slug": "okta",
        "lever_slug": None,
    },
    # ── Data & Analytics Platforms ───────────────────────────────────────────
    {
        "name": "Fivetran",
        "domain": "fivetran.com",
        "greenhouse_slug": "fivetran",
        "lever_slug": None,
    },
    {
        "name": "dbt Labs",
        "domain": "getdbt.com",
        "greenhouse_slug": "dbtlabs",
        "lever_slug": None,
    },
    {
        "name": "Airbyte",
        "domain": "airbyte.com",
        "greenhouse_slug": None,
        "lever_slug": "airbyte",
    },
    {
        "name": "Prefect",
        "domain": "prefect.io",
        "greenhouse_slug": None,
        "lever_slug": "prefect",
    },
    {
        "name": "Dagster",
        "domain": "dagster.io",
        "greenhouse_slug": None,
        "lever_slug": "dagster",
    },
    {
        "name": "Astronomer",
        "domain": "astronomer.io",
        "greenhouse_slug": "astronomer",
        "lever_slug": None,
    },
    {
        "name": "Monte Carlo",
        "domain": "montecarlodata.com",
        "greenhouse_slug": "montecarlodata",
        "lever_slug": None,
    },
    {"name": "Hex", "domain": "hex.tech", "greenhouse_slug": None, "lever_slug": "hex"},
    {
        "name": "Metabase",
        "domain": "metabase.com",
        "greenhouse_slug": None,
        "lever_slug": "metabase",
    },
    {
        "name": "Retool",
        "domain": "retool.com",
        "greenhouse_slug": "retool",
        "lever_slug": None,
    },
    {
        "name": "Databricks",
        "domain": "databricks.com",
        "greenhouse_slug": "databricks",
        "lever_slug": None,
    },
    {
        "name": "Snowflake",
        "domain": "snowflake.com",
        "greenhouse_slug": "snowflake",
        "lever_slug": None,
    },
    {
        "name": "Starburst",
        "domain": "starburst.io",
        "greenhouse_slug": "starburst",
        "lever_slug": None,
    },
    {
        "name": "Matillion",
        "domain": "matillion.com",
        "greenhouse_slug": "matillion",
        "lever_slug": None,
    },
    {
        "name": "Meltano",
        "domain": "meltano.com",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    {
        "name": "Supermetrics",
        "domain": "supermetrics.com",
        "greenhouse_slug": "supermetrics",
        "lever_slug": None,
    },
    # ── Support / CX Platforms ───────────────────────────────────────────────
    {
        "name": "Plain",
        "domain": "plain.com",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    {
        "name": "Pylon",
        "domain": "usepylon.com",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    {
        "name": "Zendesk",
        "domain": "zendesk.com",
        "greenhouse_slug": "zendesk",
        "lever_slug": None,
    },
    {
        "name": "Intercom",
        "domain": "intercom.com",
        "greenhouse_slug": "intercom",
        "lever_slug": None,
    },
    {
        "name": "Front",
        "domain": "front.com",
        "greenhouse_slug": "frontapp",
        "lever_slug": None,
    },
    {
        "name": "Help Scout",
        "domain": "helpscout.com",
        "greenhouse_slug": "helpscout",
        "lever_slug": None,
    },
    {
        "name": "Kustomer",
        "domain": "kustomer.com",
        "greenhouse_slug": "kustomer",
        "lever_slug": None,
    },
    {
        "name": "Freshworks",
        "domain": "freshworks.com",
        "greenhouse_slug": "freshworks",
        "lever_slug": None,
    },
    {
        "name": "Gladly",
        "domain": "gladly.com",
        "greenhouse_slug": "gladly",
        "lever_slug": None,
    },
    {
        "name": "Dixa",
        "domain": "dixa.com",
        "greenhouse_slug": None,
        "lever_slug": "dixa",
    },
    {
        "name": "Drift",
        "domain": "drift.com",
        "greenhouse_slug": "drift",
        "lever_slug": None,
    },
    # ── Product Analytics ────────────────────────────────────────────────────
    {
        "name": "Amplitude",
        "domain": "amplitude.com",
        "greenhouse_slug": "amplitude",
        "lever_slug": None,
    },
    {
        "name": "Mixpanel",
        "domain": "mixpanel.com",
        "greenhouse_slug": "mixpanel",
        "lever_slug": None,
    },
    {
        "name": "Heap",
        "domain": "heap.io",
        "greenhouse_slug": "heap",
        "lever_slug": None,
    },
    {
        "name": "FullStory",
        "domain": "fullstory.com",
        "greenhouse_slug": "fullstory",
        "lever_slug": None,
    },
    {
        "name": "LogRocket",
        "domain": "logrocket.com",
        "greenhouse_slug": None,
        "lever_slug": "logrocket",
    },
    {
        "name": "PostHog",
        "domain": "posthog.com",
        "greenhouse_slug": None,
        "lever_slug": "posthog",
    },
    {
        "name": "Hotjar",
        "domain": "hotjar.com",
        "greenhouse_slug": "hotjar",
        "lever_slug": None,
    },
    {
        "name": "Pendo",
        "domain": "pendo.io",
        "greenhouse_slug": "pendo",
        "lever_slug": None,
    },
    {
        "name": "Statsig",
        "domain": "statsig.com",
        "greenhouse_slug": None,
        "lever_slug": "statsig",
    },
    {
        "name": "LaunchDarkly",
        "domain": "launchdarkly.com",
        "greenhouse_slug": "launchdarkly",
        "lever_slug": None,
    },
    {
        "name": "Split.io",
        "domain": "split.io",
        "greenhouse_slug": "split",
        "lever_slug": None,
    },
    {
        "name": "Optimizely",
        "domain": "optimizely.com",
        "greenhouse_slug": "optimizely",
        "lever_slug": None,
    },
    {
        "name": "Segment",
        "domain": "segment.com",
        "greenhouse_slug": "segment",
        "lever_slug": None,
    },
    # ── Sales & RevOps ───────────────────────────────────────────────────────
    {
        "name": "Outreach",
        "domain": "outreach.io",
        "greenhouse_slug": "outreach",
        "lever_slug": None,
    },
    {
        "name": "Salesloft",
        "domain": "salesloft.com",
        "greenhouse_slug": "salesloft",
        "lever_slug": None,
    },
    {
        "name": "Apollo.io",
        "domain": "apollo.io",
        "greenhouse_slug": "apolloio",
        "lever_slug": None,
    },
    {
        "name": "Gong",
        "domain": "gong.io",
        "greenhouse_slug": "gong",
        "lever_slug": None,
    },
    {
        "name": "Clari",
        "domain": "clari.com",
        "greenhouse_slug": "clari",
        "lever_slug": None,
    },
    {
        "name": "Highspot",
        "domain": "highspot.com",
        "greenhouse_slug": "highspot",
        "lever_slug": None,
    },
    {
        "name": "Seismic",
        "domain": "seismic.com",
        "greenhouse_slug": "seismic",
        "lever_slug": None,
    },
    {
        "name": "Showpad",
        "domain": "showpad.com",
        "greenhouse_slug": "showpad",
        "lever_slug": None,
    },
    {
        "name": "ZoomInfo",
        "domain": "zoominfo.com",
        "greenhouse_slug": "zoominfo",
        "lever_slug": None,
    },
    {
        "name": "Chorus.ai",
        "domain": "chorus.ai",
        "greenhouse_slug": None,
        "lever_slug": "chorus",
    },
    {
        "name": "HubSpot",
        "domain": "hubspot.com",
        "greenhouse_slug": "hubspot",
        "lever_slug": None,
    },
    # ── Security & Compliance ────────────────────────────────────────────────
    {
        "name": "Snyk",
        "domain": "snyk.io",
        "greenhouse_slug": "snyk",
        "lever_slug": None,
    },
    {
        "name": "Vanta",
        "domain": "vanta.com",
        "greenhouse_slug": "vanta",
        "lever_slug": None,
    },
    {
        "name": "Drata",
        "domain": "drata.com",
        "greenhouse_slug": "drata",
        "lever_slug": None,
    },
    {
        "name": "Secureframe",
        "domain": "secureframe.com",
        "greenhouse_slug": "secureframe",
        "lever_slug": None,
    },
    {
        "name": "Sprinto",
        "domain": "sprinto.com",
        "greenhouse_slug": None,
        "lever_slug": "sprinto",
    },
    {
        "name": "Wiz",
        "domain": "wiz.io",
        "greenhouse_slug": "wiz-io",
        "lever_slug": None,
    },
    {
        "name": "Orca Security",
        "domain": "orca.security",
        "greenhouse_slug": "orca",
        "lever_slug": None,
    },
    {
        "name": "CrowdStrike",
        "domain": "crowdstrike.com",
        "greenhouse_slug": "crowdstrike",
        "lever_slug": None,
    },
    {
        "name": "Lacework",
        "domain": "lacework.com",
        "greenhouse_slug": "lacework",
        "lever_slug": None,
    },
    {
        "name": "Noname Security",
        "domain": "nonamesecurity.com",
        "greenhouse_slug": None,
        "lever_slug": "noname-security",
    },
    {
        "name": "Salt Security",
        "domain": "salt.security",
        "greenhouse_slug": "salt-security",
        "lever_slug": None,
    },
    {
        "name": "Traceable",
        "domain": "traceable.ai",
        "greenhouse_slug": "traceable",
        "lever_slug": None,
    },
    # ── Developer Tools & DevOps ─────────────────────────────────────────────
    {
        "name": "GitLab",
        "domain": "gitlab.com",
        "greenhouse_slug": "gitlab",
        "lever_slug": None,
    },
    {
        "name": "CircleCI",
        "domain": "circleci.com",
        "greenhouse_slug": "circleci",
        "lever_slug": None,
    },
    {
        "name": "JFrog",
        "domain": "jfrog.com",
        "greenhouse_slug": "jfrog",
        "lever_slug": None,
    },
    {
        "name": "HashiCorp",
        "domain": "hashicorp.com",
        "greenhouse_slug": "hashicorp",
        "lever_slug": None,
    },
    {
        "name": "Pulumi",
        "domain": "pulumi.com",
        "greenhouse_slug": None,
        "lever_slug": "pulumi",
    },
    {
        "name": "Spacelift",
        "domain": "spacelift.io",
        "greenhouse_slug": "spacelift",
        "lever_slug": None,
    },
    {
        "name": "Humanitec",
        "domain": "humanitec.com",
        "greenhouse_slug": None,
        "lever_slug": "humanitec",
    },
    {
        "name": "Cloudflare",
        "domain": "cloudflare.com",
        "greenhouse_slug": "cloudflare",
        "lever_slug": None,
    },
    {
        "name": "Netlify",
        "domain": "netlify.com",
        "greenhouse_slug": "netlify",
        "lever_slug": None,
    },
    {
        "name": "Fastly",
        "domain": "fastly.com",
        "greenhouse_slug": "fastly",
        "lever_slug": None,
    },
    {
        "name": "Doppler",
        "domain": "doppler.com",
        "greenhouse_slug": None,
        "lever_slug": "doppler",
    },
    {
        "name": "Sonatype",
        "domain": "sonatype.com",
        "greenhouse_slug": "sonatype",
        "lever_slug": None,
    },
    # ── AI-native SaaS ───────────────────────────────────────────────────────
    {
        "name": "Cursor",
        "domain": "cursor.com",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    {
        "name": "Linear",
        "domain": "linear.app",
        "greenhouse_slug": None,
        "lever_slug": "linear",
    },
    {
        "name": "Notion",
        "domain": "notion.so",
        "greenhouse_slug": "notion",
        "lever_slug": None,
    },
    {
        "name": "Coda",
        "domain": "coda.io",
        "greenhouse_slug": "coda",
        "lever_slug": None,
    },
    {
        "name": "Vercel",
        "domain": "vercel.com",
        "greenhouse_slug": None,
        "lever_slug": "vercel",
    },
    {
        "name": "Render",
        "domain": "render.com",
        "greenhouse_slug": None,
        "lever_slug": "render",
    },
    {"name": "Fly.io", "domain": "fly.io", "greenhouse_slug": None, "lever_slug": None},
    {
        "name": "Railway",
        "domain": "railway.app",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    {
        "name": "Loom",
        "domain": "loom.com",
        "greenhouse_slug": "loom",
        "lever_slug": None,
    },
    {
        "name": "Figma",
        "domain": "figma.com",
        "greenhouse_slug": "figma",
        "lever_slug": None,
    },
    {
        "name": "Miro",
        "domain": "miro.com",
        "greenhouse_slug": "miro",
        "lever_slug": None,
    },
    {
        "name": "Airtable",
        "domain": "airtable.com",
        "greenhouse_slug": "airtable",
        "lever_slug": None,
    },
    {
        "name": "ClickUp",
        "domain": "clickup.com",
        "greenhouse_slug": "clickup",
        "lever_slug": None,
    },
    {
        "name": "Asana",
        "domain": "asana.com",
        "greenhouse_slug": "asana",
        "lever_slug": None,
    },
    # ── Integration & Automation Platforms ──────────────────────────────────
    {
        "name": "Workato",
        "domain": "workato.com",
        "greenhouse_slug": "workato",
        "lever_slug": None,
    },
    {
        "name": "Tray.io",
        "domain": "tray.io",
        "greenhouse_slug": None,
        "lever_slug": "tray",
    },
    {
        "name": "Boomi",
        "domain": "boomi.com",
        "greenhouse_slug": "boomi",
        "lever_slug": None,
    },
    {
        "name": "Celigo",
        "domain": "celigo.com",
        "greenhouse_slug": "celigo",
        "lever_slug": None,
    },
    {"name": "n8n", "domain": "n8n.io", "greenhouse_slug": None, "lever_slug": "n8n"},
    {
        "name": "Make",
        "domain": "make.com",
        "greenhouse_slug": "make",
        "lever_slug": None,
    },
    # ── Product-Led Growth / User Adoption ──────────────────────────────────
    {
        "name": "Appcues",
        "domain": "appcues.com",
        "greenhouse_slug": "appcues",
        "lever_slug": None,
    },
    {
        "name": "WalkMe",
        "domain": "walkme.com",
        "greenhouse_slug": "walkme",
        "lever_slug": None,
    },
    {
        "name": "Chameleon",
        "domain": "chameleon.io",
        "greenhouse_slug": None,
        "lever_slug": "chameleon",
    },
    {
        "name": "UserFlow",
        "domain": "userflow.com",
        "greenhouse_slug": None,
        "lever_slug": "userflow",
    },
    {
        "name": "UserPilot",
        "domain": "userpilot.com",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    {
        "name": "Gainsight",
        "domain": "gainsight.com",
        "greenhouse_slug": "gainsight",
        "lever_slug": None,
    },
    {
        "name": "ChurnZero",
        "domain": "churnzero.com",
        "greenhouse_slug": "churnzero",
        "lever_slug": None,
    },
    {
        "name": "Totango",
        "domain": "totango.com",
        "greenhouse_slug": "totango",
        "lever_slug": None,
    },
    # ── Fintech & Payments ───────────────────────────────────────────────────
    {
        "name": "Brex",
        "domain": "brex.com",
        "greenhouse_slug": "brex",
        "lever_slug": None,
    },
    {
        "name": "Ramp",
        "domain": "ramp.com",
        "greenhouse_slug": None,
        "lever_slug": "ramp",
    },
    {
        "name": "Plaid",
        "domain": "plaid.com",
        "greenhouse_slug": "plaid",
        "lever_slug": None,
    },
    {
        "name": "Finix",
        "domain": "finixpayments.com",
        "greenhouse_slug": "finix",
        "lever_slug": None,
    },
    {
        "name": "Modern Treasury",
        "domain": "moderntreasury.com",
        "greenhouse_slug": None,
        "lever_slug": "modern-treasury",
    },
    {
        "name": "Moov",
        "domain": "moov.io",
        "greenhouse_slug": None,
        "lever_slug": "moov",
    },
    {
        "name": "Lithic",
        "domain": "lithic.com",
        "greenhouse_slug": None,
        "lever_slug": "lithic",
    },
    {
        "name": "Unit",
        "domain": "unit.co",
        "greenhouse_slug": None,
        "lever_slug": "unit-co",
    },
    # ── HR Tech ─────────────────────────────────────────────────────────────
    {
        "name": "Rippling",
        "domain": "rippling.com",
        "greenhouse_slug": "rippling",
        "lever_slug": None,
    },
    {
        "name": "Deel",
        "domain": "deel.com",
        "greenhouse_slug": "deel",
        "lever_slug": None,
    },
    {
        "name": "Remote",
        "domain": "remote.com",
        "greenhouse_slug": "remote",
        "lever_slug": None,
    },
    {
        "name": "Lattice",
        "domain": "lattice.com",
        "greenhouse_slug": "lattice",
        "lever_slug": None,
    },
    {
        "name": "Leapsome",
        "domain": "leapsome.com",
        "greenhouse_slug": "leapsome",
        "lever_slug": None,
    },
    {
        "name": "Culture Amp",
        "domain": "cultureamp.com",
        "greenhouse_slug": "cultureamp",
        "lever_slug": None,
    },
    {
        "name": "Workday",
        "domain": "workday.com",
        "greenhouse_slug": "workday",
        "lever_slug": None,
    },
    # ── E-commerce & Retail Tech ─────────────────────────────────────────────
    {
        "name": "Shopify",
        "domain": "shopify.com",
        "greenhouse_slug": "shopify",
        "lever_slug": None,
    },
    {
        "name": "BigCommerce",
        "domain": "bigcommerce.com",
        "greenhouse_slug": "bigcommerce",
        "lever_slug": None,
    },
    {
        "name": "Recharge",
        "domain": "rechargepayments.com",
        "greenhouse_slug": "recharge",
        "lever_slug": None,
    },
    {
        "name": "Gorgias",
        "domain": "gorgias.com",
        "greenhouse_slug": "gorgias",
        "lever_slug": None,
    },
    {
        "name": "Klaviyo",
        "domain": "klaviyo.com",
        "greenhouse_slug": "klaviyo",
        "lever_slug": None,
    },
    {
        "name": "Attentive",
        "domain": "attentive.com",
        "greenhouse_slug": "attentive",
        "lever_slug": None,
    },
    # ── Cybersecurity AI ─────────────────────────────────────────────────────
    {
        "name": "Darktrace",
        "domain": "darktrace.com",
        "greenhouse_slug": "darktrace",
        "lever_slug": None,
    },
    {
        "name": "SentinelOne",
        "domain": "sentinelone.com",
        "greenhouse_slug": "sentinellabs",
        "lever_slug": None,
    },
    {
        "name": "Vectra AI",
        "domain": "vectra.ai",
        "greenhouse_slug": "vectranetworks",
        "lever_slug": None,
    },
    {
        "name": "Abnormal Security",
        "domain": "abnormalsecurity.com",
        "greenhouse_slug": "abnormalsecurity",
        "lever_slug": None,
    },
    {
        "name": "Recorded Future",
        "domain": "recordedfuture.com",
        "greenhouse_slug": "recordedfuture",
        "lever_slug": None,
    },
    {
        "name": "Tines",
        "domain": "tines.com",
        "greenhouse_slug": None,
        "lever_slug": "tines",
    },
    {
        "name": "Torq",
        "domain": "torq.io",
        "greenhouse_slug": None,
        "lever_slug": "torq",
    },
    {
        "name": "Gem Security",
        "domain": "gem.security",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    # ── Legal Tech AI ────────────────────────────────────────────────────────
    {
        "name": "Harvey AI",
        "domain": "harvey.ai",
        "greenhouse_slug": None,
        "lever_slug": "harvey-ai",
    },
    {
        "name": "Ironclad",
        "domain": "ironcladapp.com",
        "greenhouse_slug": "ironclad",
        "lever_slug": None,
    },
    {
        "name": "ContractPodAi",
        "domain": "contractpodai.com",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    {
        "name": "Evisort",
        "domain": "evisort.com",
        "greenhouse_slug": "evisort",
        "lever_slug": None,
    },
    {
        "name": "Spellbook",
        "domain": "spellbook.legal",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    {
        "name": "Luminance",
        "domain": "luminance.com",
        "greenhouse_slug": None,
        "lever_slug": "luminance",
    },
    {
        "name": "Agiloft",
        "domain": "agiloft.com",
        "greenhouse_slug": None,
        "lever_slug": "agiloft",
    },
    {
        "name": "LawGeex",
        "domain": "lawgeex.com",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    # ── Healthcare AI ────────────────────────────────────────────────────────
    {
        "name": "Nabla",
        "domain": "nabla.com",
        "greenhouse_slug": None,
        "lever_slug": "nabla",
    },
    {
        "name": "Abridge",
        "domain": "abridge.com",
        "greenhouse_slug": "abridge",
        "lever_slug": None,
    },
    {
        "name": "Suki AI",
        "domain": "suki.ai",
        "greenhouse_slug": "suki-ai",
        "lever_slug": None,
    },
    {
        "name": "Anterior",
        "domain": "anterior.com",
        "greenhouse_slug": None,
        "lever_slug": "anterior",
    },
    {
        "name": "Corti",
        "domain": "corti.ai",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    {
        "name": "Aidoc",
        "domain": "aidoc.com",
        "greenhouse_slug": "aidoc",
        "lever_slug": None,
    },
    {
        "name": "Augmedix",
        "domain": "augmedix.com",
        "greenhouse_slug": "augmedix",
        "lever_slug": None,
    },
    {
        "name": "Notable Health",
        "domain": "notablehealth.com",
        "greenhouse_slug": "notable",
        "lever_slug": None,
    },
    # ── Fintech / Lending AI ─────────────────────────────────────────────────
    {
        "name": "Ocrolus",
        "domain": "ocrolus.com",
        "greenhouse_slug": "ocrolus",
        "lever_slug": None,
    },
    {
        "name": "Inscribe",
        "domain": "inscribe.ai",
        "greenhouse_slug": None,
        "lever_slug": "inscribe",
    },
    {
        "name": "Blend",
        "domain": "blend.com",
        "greenhouse_slug": "blend",
        "lever_slug": None,
    },
    {
        "name": "Upstart",
        "domain": "upstart.com",
        "greenhouse_slug": "upstart",
        "lever_slug": None,
    },
    {
        "name": "Zest AI",
        "domain": "zest.ai",
        "greenhouse_slug": None,
        "lever_slug": "zest-ai",
    },
    {
        "name": "Kasisto",
        "domain": "kasisto.com",
        "greenhouse_slug": None,
        "lever_slug": "kasisto",
    },
    # ── Sales Intelligence AI ────────────────────────────────────────────────
    {
        "name": "People.ai",
        "domain": "people.ai",
        "greenhouse_slug": "peopleai",
        "lever_slug": None,
    },
    {
        "name": "Aviso",
        "domain": "aviso.ai",
        "greenhouse_slug": "aviso",
        "lever_slug": None,
    },
    {
        "name": "Revenue.io",
        "domain": "revenue.io",
        "greenhouse_slug": "ringdna",
        "lever_slug": None,
    },
    {
        "name": "Amplemarket",
        "domain": "amplemarket.com",
        "greenhouse_slug": None,
        "lever_slug": "amplemarket",
    },
    {
        "name": "Lavender",
        "domain": "lavender.ai",
        "greenhouse_slug": None,
        "lever_slug": "lavender",
    },
    {
        "name": "Clay",
        "domain": "clay.com",
        "greenhouse_slug": None,
        "lever_slug": "clay-hq",
    },
    {
        "name": "Fireflies.ai",
        "domain": "fireflies.ai",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    {
        "name": "Chorus.ai",
        "domain": "chorus.ai",
        "greenhouse_slug": None,
        "lever_slug": "chorus",
    },
    # ── Marketing AI ─────────────────────────────────────────────────────────
    {
        "name": "Jasper",
        "domain": "jasper.ai",
        "greenhouse_slug": "jasperai",
        "lever_slug": None,
    },
    {
        "name": "Writer",
        "domain": "writer.com",
        "greenhouse_slug": None,
        "lever_slug": "writer",
    },
    {
        "name": "Persado",
        "domain": "persado.com",
        "greenhouse_slug": "persado",
        "lever_slug": None,
    },
    {
        "name": "Anyword",
        "domain": "anyword.com",
        "greenhouse_slug": None,
        "lever_slug": "anyword",
    },
    {
        "name": "Smartly.io",
        "domain": "smartly.io",
        "greenhouse_slug": "smartly",
        "lever_slug": None,
    },
    {
        "name": "Hypotenuse AI",
        "domain": "hypotenuse.ai",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    # ── Engineering / Dev AI ─────────────────────────────────────────────────
    {
        "name": "Tabnine",
        "domain": "tabnine.com",
        "greenhouse_slug": "tabnine",
        "lever_slug": None,
    },
    {
        "name": "Codeium",
        "domain": "codeium.com",
        "greenhouse_slug": None,
        "lever_slug": "codeium",
    },
    {
        "name": "Sourcegraph",
        "domain": "sourcegraph.com",
        "greenhouse_slug": "sourcegraph",
        "lever_slug": None,
    },
    {
        "name": "Swimm",
        "domain": "swimm.io",
        "greenhouse_slug": None,
        "lever_slug": "swimm",
    },
    {
        "name": "Mintlify",
        "domain": "mintlify.com",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    {
        "name": "CodeRabbit",
        "domain": "coderabbit.ai",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    {
        "name": "Devin AI",
        "domain": "devin.ai",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    {
        "name": "Continue.dev",
        "domain": "continue.dev",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    # ── Data / Analytics AI ──────────────────────────────────────────────────
    {
        "name": "Census",
        "domain": "getcensus.com",
        "greenhouse_slug": None,
        "lever_slug": "census",
    },
    {
        "name": "Hightouch",
        "domain": "hightouch.com",
        "greenhouse_slug": None,
        "lever_slug": "hightouch",
    },
    {
        "name": "Equals",
        "domain": "equals.com",
        "greenhouse_slug": None,
        "lever_slug": "equals",
    },
    {
        "name": "Causal",
        "domain": "causal.app",
        "greenhouse_slug": None,
        "lever_slug": "causal",
    },
    {
        "name": "Northbeam",
        "domain": "northbeam.io",
        "greenhouse_slug": None,
        "lever_slug": "northbeam",
    },
    {
        "name": "Steep",
        "domain": "steep.ai",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    # ── Document AI ──────────────────────────────────────────────────────────
    {
        "name": "Instabase",
        "domain": "instabase.com",
        "greenhouse_slug": "instabase",
        "lever_slug": None,
    },
    {
        "name": "Hyperscience",
        "domain": "hyperscience.com",
        "greenhouse_slug": "hyperscience",
        "lever_slug": None,
    },
    {
        "name": "Rossum",
        "domain": "rossum.ai",
        "greenhouse_slug": None,
        "lever_slug": "rossum",
    },
    {
        "name": "Indico",
        "domain": "indico.io",
        "greenhouse_slug": None,
        "lever_slug": "indico",
    },
    {
        "name": "Docsumo",
        "domain": "docsumo.com",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    # ── Infrastructure / Platform Engineering AI ─────────────────────────────
    {
        "name": "env0",
        "domain": "env0.com",
        "greenhouse_slug": None,
        "lever_slug": "env0",
    },
    {
        "name": "Cortex",
        "domain": "cortex.io",
        "greenhouse_slug": None,
        "lever_slug": "cortex",
    },
    {
        "name": "OpsLevel",
        "domain": "opslevel.com",
        "greenhouse_slug": None,
        "lever_slug": "opslevel",
    },
    {
        "name": "incident.io",
        "domain": "incident.io",
        "greenhouse_slug": None,
        "lever_slug": "incident-io",
    },
    {
        "name": "Harness",
        "domain": "harness.io",
        "greenhouse_slug": "harness",
        "lever_slug": None,
    },
    {
        "name": "Firefly",
        "domain": "gofirefly.io",
        "greenhouse_slug": None,
        "lever_slug": "gofirefly",
    },
    # ── Conversational AI Platforms ───────────────────────────────────────────
    {
        "name": "Voiceflow",
        "domain": "voiceflow.com",
        "greenhouse_slug": None,
        "lever_slug": "voiceflow",
    },
    {
        "name": "Botpress",
        "domain": "botpress.com",
        "greenhouse_slug": None,
        "lever_slug": "botpress",
    },
    {
        "name": "Kore.ai",
        "domain": "kore.ai",
        "greenhouse_slug": "kore",
        "lever_slug": None,
    },
    {
        "name": "Yellow.ai",
        "domain": "yellow.ai",
        "greenhouse_slug": "yellow",
        "lever_slug": None,
    },
    {
        "name": "RASA",
        "domain": "rasa.com",
        "greenhouse_slug": "rasa",
        "lever_slug": None,
    },
    # ── Customer Success AI ───────────────────────────────────────────────────
    {
        "name": "Vitally",
        "domain": "vitally.io",
        "greenhouse_slug": None,
        "lever_slug": "vitally",
    },
    {
        "name": "Planhat",
        "domain": "planhat.com",
        "greenhouse_slug": None,
        "lever_slug": "planhat",
    },
    {
        "name": "Catalyst",
        "domain": "catalyst.io",
        "greenhouse_slug": None,
        "lever_slug": "catalyst-software",
    },
    {
        "name": "Glean",
        "domain": "glean.com",
        "greenhouse_slug": "glean",
        "lever_slug": None,
    },
    # ── AI-native Products (high signal) ─────────────────────────────────────
    {
        "name": "Runway",
        "domain": "runwayml.com",
        "greenhouse_slug": "runway",
        "lever_slug": None,
    },
    {
        "name": "Synthesia",
        "domain": "synthesia.io",
        "greenhouse_slug": "synthesia",
        "lever_slug": None,
    },
    {
        "name": "Descript",
        "domain": "descript.com",
        "greenhouse_slug": "descript",
        "lever_slug": None,
    },
    {
        "name": "ElevenLabs",
        "domain": "elevenlabs.io",
        "greenhouse_slug": None,
        "lever_slug": "elevenlabs",
    },
    {
        "name": "Typeform",
        "domain": "typeform.com",
        "greenhouse_slug": "typeform",
        "lever_slug": None,
    },
    {
        "name": "Liveblocks",
        "domain": "liveblocks.io",
        "greenhouse_slug": None,
        "lever_slug": "liveblocks",
    },
    {
        "name": "Resend",
        "domain": "resend.com",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    {
        "name": "Loops",
        "domain": "loops.so",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    {
        "name": "Cal.com",
        "domain": "cal.com",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    {
        "name": "Inngest",
        "domain": "inngest.com",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    {
        "name": "Trigger.dev",
        "domain": "trigger.dev",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    {
        "name": "Modal",
        "domain": "modal.com",
        "greenhouse_slug": None,
        "lever_slug": "modal-labs",
    },
    {
        "name": "Temporal",
        "domain": "temporal.io",
        "greenhouse_slug": "temporal-technologies",
        "lever_slug": None,
    },
    {
        "name": "Grafbase",
        "domain": "grafbase.com",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    {
        "name": "Wundergraph",
        "domain": "wundergraph.com",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    {
        "name": "Novu",
        "domain": "novu.co",
        "greenhouse_slug": None,
        "lever_slug": "novu",
    },
    {
        "name": "Courier",
        "domain": "courier.com",
        "greenhouse_slug": None,
        "lever_slug": "courier",
    },
    {
        "name": "Knock",
        "domain": "knock.app",
        "greenhouse_slug": None,
        "lever_slug": "knock",
    },
    {
        "name": "Stytch",
        "domain": "stytch.com",
        "greenhouse_slug": None,
        "lever_slug": "stytch",
    },
    {
        "name": "WorkOS",
        "domain": "workos.com",
        "greenhouse_slug": None,
        "lever_slug": "workos",
    },
    {
        "name": "Propel Auth",
        "domain": "propelauth.com",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
]


# ---------------------------------------------------------------------------
# HTTP helpers
# ---------------------------------------------------------------------------

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (compatible; AltorBot/1.0; +https://altorlab.com/ai-stack)"
    ),
    "Accept": "text/html,application/json,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}

_session = None


def get_session() -> requests.Session:
    global _session
    if _session is None:
        _session = requests.Session()
        _session.headers.update(HEADERS)
    return _session


def safe_get(
    url: str, timeout: int = REQUEST_TIMEOUT, stream: bool = False
) -> requests.Response | None:
    """GET with timeout and silent failure."""
    try:
        r = get_session().get(url, timeout=timeout, stream=stream, allow_redirects=True)
        r.raise_for_status()
        return r
    except Exception as e:
        log.debug(f"GET {url} failed: {e}")
        return None


# ---------------------------------------------------------------------------
# Signal detection
# ---------------------------------------------------------------------------


def match_fingerprints(text: str) -> list[dict]:
    """Return list of matched AI tools for a text blob."""
    matched = {}  # vendor+tool key → match dict
    for fp in AI_FINGERPRINTS:
        key = f"{fp['vendor']}::{fp['tool']}"
        if key in matched:
            continue
        for regex in fp["_compiled"]:
            if regex.search(text):
                matched[key] = {
                    "vendor": fp["vendor"],
                    "tool": fp["tool"],
                    "tier": fp["tier"],
                }
                break
    return list(matched.values())


def extract_csp_domains(response: requests.Response) -> str:
    """Pull Content-Security-Policy header into a searchable string."""
    csp = response.headers.get("Content-Security-Policy", "")
    return csp


def scrape_company_web(domain: str) -> tuple[list[dict], list[str]]:
    """
    Scrape company's public web surfaces for AI fingerprints.
    Returns (detections, evidence_urls).

    Pages checked (in order, stop early if enough signals found):
      1. Homepage
      2. /privacy or /privacy-policy (subprocessor disclosures)
      3. /blog, /changelog, /releases (AI feature announcements)
      4. First JS bundle found on homepage (bundle string leaks)
    """
    base = f"https://{domain}"
    all_text_parts = []
    evidence_urls = []

    # 1. Homepage — HTML + headers
    r = safe_get(base)
    if r:
        all_text_parts.append(r.text[:80_000])  # first 80k chars of HTML
        all_text_parts.append(extract_csp_domains(r))  # CSP header
        evidence_urls.append(base)

        # Extract first JS bundle URL and fetch it (string leaks)
        soup = BeautifulSoup(r.text, "html.parser")
        for script in soup.find_all("script", src=True):
            src = script["src"]
            if not src.startswith("http"):
                src = urljoin(base, src)
            # Only fetch bundles from same domain, not CDNs
            if domain in src or urlparse(src).netloc == domain:
                bundle_r = safe_get(src, stream=True)
                if bundle_r:
                    content = bundle_r.content[:MAX_JS_BUNDLE_SIZE]
                    try:
                        all_text_parts.append(content.decode("utf-8", errors="ignore"))
                        evidence_urls.append(src)
                    except Exception:
                        pass
                break  # only first bundle

        time.sleep(CRAWL_DELAY)

    # 2. Privacy policy — subprocessor disclosures
    for privacy_path in [
        "/privacy",
        "/privacy-policy",
        "/legal/privacy",
        "/legal/privacy-policy",
    ]:
        privacy_r = safe_get(base + privacy_path)
        if privacy_r and privacy_r.status_code == 200:
            all_text_parts.append(privacy_r.text[:60_000])
            evidence_urls.append(base + privacy_path)
            time.sleep(CRAWL_DELAY)
            break

    # 3. Blog / changelog — AI feature announcements
    for blog_path in ["/blog", "/changelog", "/releases", "/updates"]:
        blog_r = safe_get(base + blog_path)
        if blog_r and blog_r.status_code == 200:
            all_text_parts.append(blog_r.text[:40_000])
            evidence_urls.append(base + blog_path)
            time.sleep(CRAWL_DELAY)
            break

    combined = "\n".join(all_text_parts)
    detections = match_fingerprints(combined)
    return detections, evidence_urls


def fetch_greenhouse_jobs(slug: str) -> list[str]:
    """
    Greenhouse exposes a public JSON API: no auth, no scraping needed.
    Returns list of job description text blobs.
    """
    if not slug:
        return []
    url = f"https://boards-api.greenhouse.io/v1/boards/{slug}/jobs?content=true"
    r = safe_get(url)
    if not r:
        return []
    try:
        data = r.json()
        jobs = data.get("jobs", [])
        # Combine title + content of each job (strip HTML)
        texts = []
        for job in jobs[:40]:  # cap at 40 jobs per company
            title = job.get("title", "")
            content = BeautifulSoup(job.get("content", ""), "html.parser").get_text(
                separator=" "
            )
            texts.append(f"{title} {content}")
        return texts
    except Exception as e:
        log.debug(f"Greenhouse parse error for {slug}: {e}")
        return []


def fetch_lever_jobs(slug: str) -> list[str]:
    """
    Lever exposes public postings JSON.
    Returns list of job description text blobs.
    """
    if not slug:
        return []
    url = f"https://api.lever.co/v0/postings/{slug}?mode=json"
    r = safe_get(url)
    if not r:
        return []
    try:
        jobs = r.json()
        if not isinstance(jobs, list):
            return []
        texts = []
        for job in jobs[:40]:
            title = job.get("text", "")
            descr = ""
            for block in job.get("descriptionPlain", "").split():
                descr += block + " "
            for block in job.get("additional", ""):
                descr += block.get("content", "") + " "
            texts.append(f"{title} {descr}")
        return texts
    except Exception as e:
        log.debug(f"Lever parse error for {slug}: {e}")
        return []


def scan_jobs(greenhouse_slug: str | None, lever_slug: str | None) -> list[dict]:
    """Fetch jobs from ATS and return AI tool detections."""
    job_texts = []

    if greenhouse_slug:
        job_texts.extend(fetch_greenhouse_jobs(greenhouse_slug))
        time.sleep(CRAWL_DELAY)

    if lever_slug:
        job_texts.extend(fetch_lever_jobs(lever_slug))
        time.sleep(CRAWL_DELAY)

    if not job_texts:
        return []

    combined = " ".join(job_texts)
    return match_fingerprints(combined)


# ---------------------------------------------------------------------------
# Vendor customer page crawl (one-time seed, run separately via flag)
# ---------------------------------------------------------------------------

VENDOR_CUSTOMER_PAGES = [
    "https://openai.com/customer-stories",
    "https://www.anthropic.com/customers",
    "https://www.langchain.com/customers",
    "https://n8n.io/case-studies",
    "https://www.pinecone.io/customers",
    "https://huggingface.co/enterprise",
    "https://cohere.com/customers",
    "https://aws.amazon.com/bedrock/customers",
]


def extract_company_names_from_vendor_page(url: str) -> list[str]:
    """
    Pull company names from vendor customer/case-study pages.
    Returns raw list of mentioned company names (for fuzzy matching later).
    """
    r = safe_get(url)
    if not r:
        return []
    soup = BeautifulSoup(r.text, "html.parser")
    # Extract all <h2>, <h3>, alt tags, and aria-labels — usually company names
    names = set()
    for tag in soup.find_all(["h2", "h3", "h4"]):
        text = tag.get_text(strip=True)
        if 2 < len(text) < 60 and not text.lower().startswith(
            ("how ", "why ", "what ")
        ):
            names.add(text)
    for img in soup.find_all("img", alt=True):
        alt = img["alt"].strip()
        if 2 < len(alt) < 40:
            names.add(alt)
    return list(names)


# ---------------------------------------------------------------------------
# Per-company crawl orchestrator
# ---------------------------------------------------------------------------


def crawl_company(company: dict) -> dict:
    """
    Full crawl for one company. Returns enriched company dict with detections.
    """
    name = company["name"]
    domain = company["domain"]
    log.info(f"Crawling: {name} ({domain})")

    detections_map: dict[str, dict] = {}  # key = vendor::tool

    # Signal 1: Web surfaces
    web_detections, evidence_urls = scrape_company_web(domain)
    for d in web_detections:
        key = f"{d['vendor']}::{d['tool']}"
        if key not in detections_map:
            detections_map[key] = {
                **d,
                "sources": ["web"],
                "evidence_urls": evidence_urls[:2],
            }
        else:
            if "web" not in detections_map[key]["sources"]:
                detections_map[key]["sources"].append("web")

    # Signal 2: Job postings
    job_detections = scan_jobs(
        company.get("greenhouse_slug"), company.get("lever_slug")
    )
    for d in job_detections:
        key = f"{d['vendor']}::{d['tool']}"
        if key not in detections_map:
            detections_map[key] = {**d, "sources": ["jobs"], "evidence_urls": []}
        else:
            if "jobs" not in detections_map[key]["sources"]:
                detections_map[key]["sources"].append("jobs")

    # Confidence scoring:
    # - 1 source (web only or jobs only): "medium"
    # - 2 sources (web + jobs): "high"
    # - app_layer tier web match: always "high" (deterministic script detection)
    final_detections = []
    for detection in detections_map.values():
        source_count = len(detection["sources"])
        if detection["tier"] == "app_layer":
            confidence = "high"
        elif source_count >= 2:
            confidence = "high"
        else:
            confidence = "medium"
        final_detections.append({**detection, "confidence": confidence})

    # Sort: high confidence first, then by tier
    tier_order = {
        "app_layer": 0,
        "model_api": 1,
        "orchestration": 2,
        "infra": 3,
        "internal_tool": 4,
    }
    final_detections.sort(
        key=lambda d: (
            0 if d["confidence"] == "high" else 1,
            tier_order.get(d["tier"], 9),
        )
    )

    return {
        "name": name,
        "domain": domain,
        "ai_tools": final_detections,
        "tool_count": len(final_detections),
        "last_crawled": datetime.now(timezone.utc).isoformat(),
        # Altor relevance signal: companies using AI tools are ideal Altor customers
        # because they already have AI systems that need production support workflows
        "altor_fit": _score_altor_fit(final_detections),
    }


def _score_altor_fit(detections: list[dict]) -> str:
    """
    Rate how good a fit this company is for Altor's services.
    Altor builds production AI systems for B2B engineering teams.
    Companies that already use model APIs + orchestration = warm leads.
    """
    tiers = {d["tier"] for d in detections}
    tool_count = len(detections)

    if "model_api" in tiers and "orchestration" in tiers:
        return "strong"
    if "model_api" in tiers and tool_count >= 2:
        return "strong"
    if "model_api" in tiers or ("app_layer" in tiers and tool_count >= 2):
        return "good"
    if tool_count >= 1:
        return "moderate"
    return "low"


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def load_existing(path: Path) -> dict:
    """Load existing output to preserve historical data."""
    if path.exists():
        try:
            with open(path) as f:
                return json.load(f)
        except Exception:
            pass
    return {}


def run():
    log.info(f"Starting Altor AI Stack Crawler — {len(SEED_COMPANIES)} companies")
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)

    # Load existing data for historical preservation
    existing_raw = load_existing(OUTPUT_PATH)
    existing_companies: dict[str, dict] = {
        c["domain"]: c for c in existing_raw.get("companies", [])
    }

    results: list[dict] = []

    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        futures = {executor.submit(crawl_company, co): co for co in SEED_COMPANIES}
        for future in as_completed(futures):
            company = futures[future]
            try:
                result = future.result()
                # Preserve first_seen date from existing data
                domain = result["domain"]
                if domain in existing_companies:
                    result["first_seen"] = existing_companies[domain].get(
                        "first_seen", result["last_crawled"]
                    )
                else:
                    result["first_seen"] = result["last_crawled"]
                results.append(result)
                log.info(
                    f"  ✓ {result['name']} — "
                    f"{result['tool_count']} tools detected, "
                    f"fit={result['altor_fit']}"
                )
            except Exception as e:
                log.error(f"  ✗ {company['name']}: {e}")

    # Sort by tool count desc (most instrumented companies first)
    results.sort(key=lambda c: (-c["tool_count"], c["name"]))

    output = {
        "meta": {
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "company_count": len(results),
            "total_detections": sum(c["tool_count"] for c in results),
            "crawler_version": "1.0.0",
            "description": (
                "AI tool adoption intelligence for B2B SaaS companies. "
                "Signals sourced from public web surfaces, ATS job postings, "
                "and vendor customer pages. Confidence-scored, evidence-linked."
            ),
        },
        "companies": results,
    }

    with open(OUTPUT_PATH, "w") as f:
        json.dump(output, f, indent=2)

    log.info(f"\nDone. {len(results)} companies written to {OUTPUT_PATH}")
    log.info(
        f"Strong Altor fits: {sum(1 for c in results if c['altor_fit'] == 'strong')}"
    )


if __name__ == "__main__":
    run()
