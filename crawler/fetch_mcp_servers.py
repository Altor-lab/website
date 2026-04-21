#!/usr/bin/env python3
"""
MCP Server Directory Crawler
-----------------------------
Fetches MCP servers from three public sources:
  1. Official MCP Registry API  (registry.modelcontextprotocol.io)
  2. GitHub topic search        (topic:mcp-server, by stars)
  3. awesome-mcp-servers README (curated community list)

Deduplicates by GitHub owner/repo identity, enriches with category
classification, and writes react-app/public/data/mcp-servers.json.

Cost: $0 — uses GITHUB_TOKEN from Actions environment (5,000 req/hr).
Runtime: ~5-8 min for ~500 official + top-500 GitHub servers.
"""

import json
import os
import re
import time
import logging
from datetime import datetime, timezone
from pathlib import Path

import requests
from bs4 import BeautifulSoup

OUTPUT_PATH = (
    Path(__file__).parent.parent / "react-app" / "public" / "data" / "mcp-servers.json"
)
REQUEST_TIMEOUT = 15
CRAWL_DELAY = 0.3

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger(__name__)

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN", "")

CATEGORY_KEYWORDS = {
    "Databases": [
        "postgres",
        "mysql",
        "sqlite",
        "mongodb",
        "redis",
        "database",
        "sql",
        "db",
    ],
    "File System": [
        "filesystem",
        "file",
        "directory",
        "folder",
        "storage",
        "drive",
        "s3",
    ],
    "Web & Browser": [
        "browser",
        "playwright",
        "puppeteer",
        "selenium",
        "web",
        "http",
        "fetch",
        "scrape",
    ],
    "Version Control": ["git", "github", "gitlab", "bitbucket", "repo", "commit"],
    "Communication": [
        "slack",
        "discord",
        "email",
        "gmail",
        "teams",
        "telegram",
        "whatsapp",
    ],
    "Productivity": ["notion", "asana", "jira", "trello", "linear", "calendar", "todo"],
    "Cloud & Infra": [
        "aws",
        "gcp",
        "azure",
        "kubernetes",
        "docker",
        "terraform",
        "cloud",
    ],
    "AI & ML": [
        "openai",
        "anthropic",
        "llm",
        "embedding",
        "vector",
        "rag",
        "langchain",
    ],
    "Search": ["search", "brave", "google", "bing", "ddg", "elasticsearch", "algolia"],
    "Data & Analytics": [
        "analytics",
        "bigquery",
        "snowflake",
        "airflow",
        "dbt",
        "spark",
    ],
    "Finance": ["stripe", "payment", "invoice", "billing", "accounting", "quickbooks"],
    "Security": ["auth", "oauth", "security", "vault", "secret", "credential"],
    "Media": ["image", "video", "audio", "youtube", "spotify", "pdf", "ocr"],
    "Maps & Location": ["maps", "geo", "location", "address", "weather"],
    "Developer Tools": [
        "code",
        "compiler",
        "test",
        "lint",
        "format",
        "debug",
        "terminal",
        "shell",
    ],
}


def classify_category(name: str, description: str) -> str:
    text = f"{name} {description or ''}".lower()
    for category, keywords in CATEGORY_KEYWORDS.items():
        if any(kw in text for kw in keywords):
            return category
    return "Other"


def github_headers() -> dict:
    h = {"Accept": "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28"}
    if GITHUB_TOKEN:
        h["Authorization"] = f"Bearer {GITHUB_TOKEN}"
    return h


def fetch_official_registry() -> list[dict]:
    log.info("Fetching official MCP registry...")
    servers = []
    cursor = None
    page = 0

    while True:
        url = "https://registry.modelcontextprotocol.io/v0.1/servers?limit=100"
        if cursor:
            url += f"&cursor={cursor}"

        try:
            r = requests.get(url, timeout=REQUEST_TIMEOUT)
            r.raise_for_status()
            data = r.json()
        except Exception as e:
            log.warning(f"Official registry fetch failed (page {page}): {e}")
            break

        for item in data.get("servers", []):
            # API wraps each entry as {"server": {...}, "_meta": {...}}
            s = item.get("server", item)
            meta = item.get("_meta", {}).get(
                "io.modelcontextprotocol.registry/official", {}
            )
            if not meta.get("isLatest", True):
                continue

            name = s.get("name", "") or s.get("title", "")
            description = s.get("description", "")

            # Extract GitHub URL from remotes list or source_url
            owner, repo = "", ""
            all_urls = [str(rem.get("url", "")) for rem in s.get("remotes", [])]
            all_urls.append(str(s.get("source_url", "") or ""))
            for u in all_urls:
                m = re.search(r"github\.com/([^/]+)/([^/.]+)", u)
                if m:
                    owner, repo = m.group(1), m.group(2).rstrip(".git")
                    break

            packages = s.get("packages", [])
            install_cmd = ""
            if packages:
                pkg = packages[0]
                if pkg.get("registry") == "npm":
                    install_cmd = f"npx -y {pkg.get('name', '')}"
                elif pkg.get("registry") == "pypi":
                    install_cmd = f"uvx {pkg.get('name', '')}"

            servers.append(
                {
                    "id": f"{owner}/{repo}" if owner else name,
                    "name": s.get("title") or name,
                    "description": description,
                    "category": classify_category(name, description),
                    "github_url": f"https://github.com/{owner}/{repo}" if owner else "",
                    "owner": owner,
                    "repo": repo,
                    "install_command": install_cmd,
                    "language": "",
                    "last_updated": "",
                    "stars": 0,
                    "source": "official",
                }
            )

        cursor = data.get("nextCursor") or data.get("metadata", {}).get("nextCursor")
        page += 1
        if not cursor or page > 50:
            break
        time.sleep(CRAWL_DELAY)

    log.info(f"  Official registry: {len(servers)} servers")
    return servers


def fetch_github_topic(max_pages: int = 5) -> list[dict]:
    log.info("Fetching GitHub topic: mcp-server...")
    servers = []

    for page in range(1, max_pages + 1):
        url = f"https://api.github.com/search/repositories?q=topic:mcp-server&sort=stars&order=desc&per_page=100&page={page}"
        try:
            r = requests.get(url, headers=github_headers(), timeout=REQUEST_TIMEOUT)
            r.raise_for_status()
            data = r.json()
        except Exception as e:
            log.warning(f"GitHub topic fetch failed (page {page}): {e}")
            break

        items = data.get("items", [])
        if not items:
            break

        for repo in items:
            owner_login = repo["owner"]["login"]
            repo_name = repo["name"]
            description = repo.get("description") or ""
            servers.append(
                {
                    "id": f"{owner_login}/{repo_name}",
                    "name": repo_name.replace("-", " ").replace("_", " ").title(),
                    "description": description,
                    "category": classify_category(repo_name, description),
                    "github_url": repo["html_url"],
                    "owner": owner_login,
                    "repo": repo_name,
                    "install_command": "",
                    "stars": repo.get("stargazers_count", 0),
                    "language": repo.get("language") or "",
                    "last_updated": (repo.get("pushed_at") or "")[:10],
                    "source": "github",
                }
            )

        time.sleep(CRAWL_DELAY)

    log.info(f"  GitHub topic: {len(servers)} servers")
    return servers


def fetch_awesome_list() -> list[dict]:
    log.info("Fetching awesome-mcp-servers README...")
    url = (
        "https://raw.githubusercontent.com/punkpeye/awesome-mcp-servers/main/README.md"
    )
    try:
        r = requests.get(url, timeout=REQUEST_TIMEOUT)
        r.raise_for_status()
        content = r.text
    except Exception as e:
        log.warning(f"awesome-mcp-servers fetch failed: {e}")
        return []

    servers = []
    pattern = re.compile(
        r"-\s+\[([^\]]+)\]\(https://github\.com/([^/]+)/([^/)\s]+)\)[^\n]*?(?:\s+-\s+(.+))?",
        re.MULTILINE,
    )

    for m in pattern.finditer(content):
        display_name = m.group(1).strip()
        owner = m.group(2).strip()
        repo = m.group(3).strip().rstrip(")")
        description = (m.group(4) or "").strip()

        servers.append(
            {
                "id": f"{owner}/{repo}",
                "name": display_name,
                "description": description,
                "category": classify_category(display_name, description),
                "github_url": f"https://github.com/{owner}/{repo}",
                "owner": owner,
                "repo": repo,
                "install_command": "",
                "stars": 0,
                "language": "",
                "last_updated": "",
                "source": "awesome",
            }
        )

    log.info(f"  Awesome list: {len(servers)} servers")
    return servers


def deduplicate(all_servers: list[dict]) -> list[dict]:
    seen: dict[str, dict] = {}
    source_priority = {"official": 3, "awesome": 2, "github": 1}

    for s in all_servers:
        sid = s["id"].lower().strip("/")
        if not sid or sid == "/":
            continue
        s.setdefault("language", "")
        s.setdefault("last_updated", "")
        existing = seen.get(sid)
        if not existing:
            seen[sid] = s
        else:
            if source_priority.get(s["source"], 0) > source_priority.get(
                existing["source"], 0
            ):
                merged = {**s}
                merged["stars"] = max(s.get("stars", 0), existing.get("stars", 0))
                merged["language"] = s.get("language") or existing.get("language") or ""
                merged["last_updated"] = (
                    s.get("last_updated") or existing.get("last_updated") or ""
                )
                seen[sid] = merged
            else:
                existing["stars"] = max(existing.get("stars", 0), s.get("stars", 0))
                if not existing.get("language"):
                    existing["language"] = s.get("language") or ""
                if not existing.get("last_updated"):
                    existing["last_updated"] = s.get("last_updated") or ""

    return list(seen.values())


def run():
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)

    all_servers = []
    all_servers.extend(fetch_official_registry())
    all_servers.extend(fetch_github_topic(max_pages=5))
    all_servers.extend(fetch_awesome_list())

    unique = deduplicate(all_servers)
    unique.sort(key=lambda s: (-s.get("stars", 0), s["name"].lower()))

    categories = sorted({s["category"] for s in unique})
    by_category = {
        cat: [s for s in unique if s["category"] == cat] for cat in categories
    }

    output = {
        "meta": {
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "total_servers": len(unique),
            "categories": {cat: len(servers) for cat, servers in by_category.items()},
            "sources": {
                "official": sum(1 for s in unique if s["source"] == "official"),
                "github": sum(1 for s in unique if s["source"] == "github"),
                "awesome": sum(1 for s in unique if s["source"] == "awesome"),
            },
        },
        "servers": unique,
    }

    with open(OUTPUT_PATH, "w") as f:
        json.dump(output, f, indent=2)

    log.info(f"Done. {len(unique)} unique MCP servers written to {OUTPUT_PATH}")
    log.info(
        f"Categories: {', '.join(f'{k}({v})' for k, v in output['meta']['categories'].items())}"
    )


if __name__ == "__main__":
    run()
