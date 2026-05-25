#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

const projectRoot = path.join(__dirname, '..');
const automationsPath = path.join(projectRoot, 'data', 'automations.json');
const companiesPath = path.join(projectRoot, 'data', 'ai-companies.json');
const sitemapPath = path.join(projectRoot, 'sitemap-data.xml');

const today = new Date().toISOString().split('T')[0];

// Helper: Convert domain to slug (e.g., "portkey.ai" -> "portkey-ai")
function domainToSlug(domain) {
  return domain.replace(/\./g, '-');
}

// Helper: Create URL entry
function createUrlEntry(loc, priority = '0.7') {
  return {
    loc: [loc],
    lastmod: [today],
    changefreq: ['weekly'],
    priority: [priority]
  };
}

async function generateSitemap() {
  try {
    // Load data files
    const automations = JSON.parse(fs.readFileSync(automationsPath, 'utf8'));
    const companies = JSON.parse(fs.readFileSync(companiesPath, 'utf8'));

    // Parse existing sitemap
    const parser = new xml2js.Parser();
    const existingSitemap = await parser.parseStringPromise(fs.readFileSync(sitemapPath, 'utf8'));

    // Extract existing URLs that are NOT /automate/ and NOT /ai-stack/
    const existingUrls = existingSitemap.urlset.url.filter(entry => {
      const loc = entry.loc[0];
      return !loc.includes('/automate/') && !loc.includes('/ai-stack/');
    });

    // Generate /automate/ URLs (20 workflows × 8 tools = 160)
    const automateUrls = [];
    for (const workflow of automations.workflows) {
      for (const tool of automations.tools) {
        const loc = `https://altorlab.com/automate/${workflow.slug}/with/${tool.slug}`;
        automateUrls.push(createUrlEntry(loc, '0.7'));
      }
    }

    // Generate /ai-stack/ URLs (268 companies)
    const aiStackUrls = [];
    for (const company of companies.companies) {
      const slug = domainToSlug(company.domain);
      const loc = `https://altorlab.com/ai-stack/${slug}`;
      aiStackUrls.push(createUrlEntry(loc, '0.6'));
    }

    // Combine all URLs
    const allUrls = [...existingUrls, ...automateUrls, ...aiStackUrls];

    // Create new sitemap
    const newSitemap = {
      urlset: {
        $: {
          xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
        },
        url: allUrls
      }
    };

    // Build XML
    const builder = new xml2js.Builder({
      xmldec: { version: '1.0', encoding: 'UTF-8' },
      renderOpts: { pretty: true }
    });
    const xml = builder.buildObject(newSitemap);

    // Write to file
    fs.writeFileSync(sitemapPath, xml, 'utf8');

    console.log('✓ Sitemap generated successfully');
    console.log(`  - Existing non-automate/non-ai-stack entries: ${existingUrls.length}`);
    console.log(`  - /automate/ URLs: ${automateUrls.length}`);
    console.log(`  - /ai-stack/ URLs: ${aiStackUrls.length}`);
    console.log(`  - Total URLs: ${allUrls.length}`);
  } catch (error) {
    console.error('Error generating sitemap:', error.message);
    process.exit(1);
  }
}

generateSitemap();
