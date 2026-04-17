#!/usr/bin/env python3
"""
Regenerates react-app/public/sitemap-data.xml from the live data files.
Called by all three crawler workflows after data is updated, so the
sitemap reflects newly indexed MCP servers and automation pages immediately
without waiting for a full Vite build.
"""

import json
from datetime import datetime, timezone
from pathlib import Path

BASE_URL = "https://altorlab.com"
PUBLIC = Path(__file__).parent.parent / "react-app" / "public"
DATA_DIR = PUBLIC / "data"
TODAY = datetime.now(timezone.utc).strftime("%Y-%m-%d")


def make_url(path: str, priority: str, changefreq: str, lastmod: str = TODAY) -> str:
    return (
        f"  <url>\n"
        f"    <loc>{BASE_URL}{path}</loc>\n"
        f"    <lastmod>{lastmod}</lastmod>\n"
        f"    <changefreq>{changefreq}</changefreq>\n"
        f"    <priority>{priority}</priority>\n"
        f"  </url>"
    )


def build_data_routes() -> list[str]:
    routes = []

    mcp_path = DATA_DIR / "mcp-servers.json"
    if mcp_path.exists():
        try:
            data = json.loads(mcp_path.read_text())
            lastmod = (data.get("meta", {}).get("generated_at") or TODAY)[:10]
            top_servers = [
                s for s in data.get("servers", []) if s.get("owner") and s.get("repo")
            ]
            for s in top_servers[:1000]:
                routes.append(
                    make_url(
                        f"/mcp-servers/{s['owner']}/{s['repo']}",
                        "0.6",
                        "weekly",
                        lastmod,
                    )
                )
            print(f"  MCP servers: {len(top_servers[:1000])} URLs")
        except Exception as e:
            print(f"  MCP parse error: {e}")

    automations_path = DATA_DIR / "automations.json"
    if automations_path.exists():
        try:
            data = json.loads(automations_path.read_text())
            lastmod = (data.get("meta", {}).get("generated_at") or TODAY)[:10]
            pages = data.get("pages", [])
            for page in pages:
                routes.append(make_url(page["slug"], "0.7", "weekly", lastmod))
            print(f"  Automation pages: {len(pages)} URLs")
        except Exception as e:
            print(f"  Automations parse error: {e}")

    return routes


def run():
    print("Regenerating sitemap-data.xml...")
    routes = build_data_routes()

    if not routes:
        print("  No data routes found — skipping write")
        return

    xml = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "\n".join(routes)
        + "\n</urlset>\n"
    )

    out = PUBLIC / "sitemap-data.xml"
    out.write_text(xml)
    print(f"  Done. {len(routes)} URLs written to {out}")


if __name__ == "__main__":
    run()
