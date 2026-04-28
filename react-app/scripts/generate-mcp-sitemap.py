#!/usr/bin/env python3
"""
Generate sitemap XML for all MCP servers.
Reads from mcp-servers.json and writes to sitemap-mcp.xml
"""

import json
import os
from datetime import datetime
from urllib.parse import quote
from pathlib import Path


def url_encode(value):
    """URL-encode a string, preserving forward slashes."""
    return quote(str(value), safe="")


def generate_sitemap():
    """Generate sitemap XML from mcp-servers.json"""

    # Get script directory and construct paths
    script_dir = Path(__file__).parent
    data_file = script_dir.parent / "public" / "data" / "mcp-servers.json"
    output_file = script_dir.parent / "public" / "sitemap-mcp.xml"

    # Read the JSON data
    with open(data_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    servers = data.get("servers", [])

    if not servers:
        print("ERROR: No servers found in mcp-servers.json")
        return False

    # Start XML document
    xml_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]

    # Track date range
    dates = []

    # Add URL entry for each server
    for server in servers:
        owner = server.get("owner", "")
        repo = server.get("repo", "")
        last_updated = server.get("last_updated", datetime.now().strftime("%Y-%m-%d"))

        if not owner or not repo:
            print(
                f"WARNING: Skipping server with missing owner or repo: {server.get('id', 'unknown')}"
            )
            continue

        # URL-encode the owner and repo
        encoded_owner = url_encode(owner)
        encoded_repo = url_encode(repo)

        # Build the URL
        url = f"https://altorlab.com/mcp-servers/{encoded_owner}/{encoded_repo}"

        # Track dates
        if last_updated:
            dates.append(last_updated)

        # Add URL entry
        xml_lines.append("  <url>")
        xml_lines.append(f"    <loc>{url}</loc>")
        xml_lines.append(f"    <lastmod>{last_updated}</lastmod>")
        xml_lines.append("    <changefreq>monthly</changefreq>")
        xml_lines.append("    <priority>0.6</priority>")
        xml_lines.append("  </url>")

    # Close XML document
    xml_lines.append("</urlset>")

    # Write to file
    with open(output_file, "w", encoding="utf-8") as f:
        f.write("\n".join(xml_lines))

    # Print summary
    total_urls = len([s for s in servers if s.get("owner") and s.get("repo")])
    print(f"✓ Sitemap generated successfully")
    print(f"  Total URLs written: {total_urls}")

    if dates:
        dates_sorted = sorted(dates)
        print(f"  Date range: {dates_sorted[0]} to {dates_sorted[-1]}")

    print(f"  Output file: {output_file}")

    return True


if __name__ == "__main__":
    success = generate_sitemap()
    exit(0 if success else 1)
