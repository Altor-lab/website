#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the MCP servers data
const dataPath = path.join(__dirname, '../data/mcp-servers.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const servers = data.servers || [];
const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

// Generate XML entries
const urlEntries = servers.map(server => {
  const lastmod = server.last_updated || today;
  return `  <url>
    <loc>https://altorlab.com/mcp-servers/${server.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
}).join('\n');

// Build complete sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

// Write to file
const outputPath = path.join(__dirname, '../sitemap-mcp.xml');
fs.writeFileSync(outputPath, sitemap, 'utf-8');

console.log(`✓ Generated sitemap-mcp.xml with ${servers.length} entries`);
console.log(`  Output: ${outputPath}`);
