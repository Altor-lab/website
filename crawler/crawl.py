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
    # AI Infrastructure & Gateways
    {
        "name": "Portkey",
        "domain": "portkey.ai",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    {
        "name": "Brainlid / LangCache",
        "domain": "langcache.com",
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
    # Observability & Monitoring
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
    # API-first Developer Tools
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
        "name": "Turso",
        "domain": "turso.tech",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    {
        "name": "Convex",
        "domain": "convex.dev",
        "greenhouse_slug": None,
        "lever_slug": "convex",
    },
    # Data & Analytics Platforms
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
    # Support / CX Platforms (AI-heavy)
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
    # AI-native SaaS
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
    {"name": "Fly.io", "domain": "fly.io", "greenhouse_slug": None, "lever_slug": None},
    {
        "name": "Railway",
        "domain": "railway.app",
        "greenhouse_slug": None,
        "lever_slug": None,
    },
    {
        "name": "Render",
        "domain": "render.com",
        "greenhouse_slug": None,
        "lever_slug": "render",
    },
    # Security / Compliance
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
