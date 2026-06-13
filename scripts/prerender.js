const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { createRequire } = require('node:module');

const REPO_ROOT = path.resolve(__dirname, '..');
const REACT_APP_DIR = path.join(REPO_ROOT, 'react-app');
const requireFromReactApp = createRequire(path.join(REACT_APP_DIR, 'package.json'));
const puppeteer = requireFromReactApp('puppeteer');

const HOST = '127.0.0.1';
const PORT = 5173;
const BASE_URL = `http://${HOST}:${PORT}`;
const SERVER_READY_TIMEOUT_MS = 30_000;
const POLL_INTERVAL_MS = 500;
const PAGE_TIMEOUT_MS = 5_000;

const ROUTES = [
  '/automate',
  '/automate/customer-support/with/claude',
  '/automate/lead-qualification/with/claude',
  '/automate/invoice-processing/with/claude',
  '/automate/code-review/with/claude',
  '/automate/incident-response/with/claude',
  '/automate/candidate-screening/with/claude',
  '/automate/email-management/with/claude',
  '/automate/webhook-processing/with/claude',
  '/automate/report-generation/with/claude',
  '/automate/data-entry/with/claude',
  '/automate/customer-support/with/chatgpt',
  '/automate/customer-support/with/n8n',
  '/automate/customer-support/with/langchain',
  '/automate/incident-response/with/n8n',
  '/automate/incident-response/with/langchain',
  '/automate/code-review/with/chatgpt',
  '/automate/webhook-processing/with/n8n',
  '/mcp-servers',
  '/ai-stack',
  '/ai-stack/okta-com',
  '/ai-stack/gem-security',
  '/ai-stack/jfrog-com',
  '/ai-stack/openrouter-ai',
  '/ai-stack/sumologic-com',
  '/ai-stack/twilio-com',
  '/ai-stack/amplitude-com',
  '/ai-stack/anyword-com',
  '/ai-stack/apollo-io',
  '/ai-stack/asana-com',
  '/ai-stack/coderabbit-ai',
  '/ai-stack/datadoghq-com',
  '/ai-stack/huggingface-co',
  '/ai-stack/launchdarkly-com',
  '/ai-stack/make-com',
  '/ai-stack/portkey-ai',
  '/ai-stack/render-com',
  '/ai-stack/salesloft-com',
  '/ai-stack/snyk-io',
  '/ai-stack/upstart-com',
  '/ai-stack/n8n-io',
  '/ai-stack/baseten-co',
  '/ai-stack/brex-com',
  '/ai-stack/circleci-com',
  '/ai-stack/coda-io',
  '/ai-stack/cultureamp-com',
  '/ai-stack/cursor-com',
  '/ai-stack/databricks-com',
  '/ai-stack/drift-com',
  '/ai-stack/elastic-co',
  '/ai-stack/equals-com',
  '/ai-stack/fly-io',
  '/ai-stack/grafana-com',
  '/ai-stack/grafbase-com',
  '/ai-stack/hightouch-com',
  '/ai-stack/inngest-com',
  '/ai-stack/intercom-com',
  '/ai-stack/klaviyo-com',
  '/ai-stack/knock-app',
  '/ai-stack/kustomer-com',
  '/ai-stack/langchain-com',
  '/ai-stack/linear-app',
  '/ai-stack/mixpanel-com',
  '/ai-stack/newrelic-com',
  '/ai-stack/orca-security',
  '/ai-stack/pendo-io',
  '/ai-stack/usepylon-com',
  '/ai-stack/resend-com',
  '/ai-stack/scale-com',
  '/ai-stack/showpad-com',
  '/ai-stack/sonatype-com',
  '/ai-stack/stytch-com',
  '/ai-stack/suki-ai',
  '/ai-stack/supabase-com',
  '/ai-stack/wiz-io',
  '/ai-stack/zoominfo-com',
  '/ai-stack/abnormalsecurity-com',
  '/ai-stack/abridge-com',
  '/ai-stack/agiloft-com',
  '/ai-stack/aidoc-com',
  '/ai-stack/airbyte-com',
  '/ai-stack/airtable-com',
  '/ai-stack/amplemarket-com',
  '/ai-stack/anterior-com',
  '/ai-stack/anyscale-com',
  '/ai-stack/appdynamics-com',
  '/ai-stack/appcues-com',
  '/ai-stack/astronomer-io',
  '/ai-stack/attentive-com',
  '/ai-stack/augmedix-com',
  '/ai-stack/auth0-com',
  '/ai-stack/aviso-ai',
  '/ai-stack/bentoml-com',
  '/ai-stack/bigcommerce-com',
  '/ai-stack/blend-com',
  '/ai-stack/boomi-com',
  '/ai-stack/botpress-com',
  '/ai-stack/cal-com',
  '/ai-stack/catalyst-io',
  '/ai-stack/causal-app',
  '/ai-stack/celigo-com',
  '/ai-stack/getcensus-com',
  '/ai-stack/chameleon-io',
  '/ai-stack/chorus-ai',
  '/ai-stack/chorus-ai',
  '/ai-stack/chronosphere-io',
  '/ai-stack/churnzero-com',
  '/ai-stack/clari-com',
  '/ai-stack/clay-com',
  '/ai-stack/clerk-com',
  '/ai-stack/clickup-com',
  '/ai-stack/cloudflare-com',
  '/ai-stack/codeium-com',
  '/ai-stack/cohere-com',
  '/ai-stack/continue-dev',
  '/ai-stack/contractpodai-com',
  '/ai-stack/convex-dev',
  '/ai-stack/cortex-io',
  '/ai-stack/corti-ai',
  '/ai-stack/courier-com',
  '/ai-stack/cribl-io',
  '/ai-stack/crowdstrike-com',
  '/ai-stack/dagster-io',
  '/ai-stack/darktrace-com',
  '/ai-stack/deel-com',
  '/ai-stack/descript-com',
  '/ai-stack/devin-ai',
  '/ai-stack/dixa-com',
  '/ai-stack/docsumo-com',
  '/ai-stack/doppler-com',
  '/ai-stack/drata-com',
  '/ai-stack/dynatrace-com',
  '/ai-stack/elevenlabs-io',
  '/ai-stack/evisort-com',
  '/ai-stack/fastly-com',
  '/ai-stack/figma-com',
  '/ai-stack/finixpayments-com',
  '/ai-stack/fireflies-ai',
  '/ai-stack/gofirefly-io',
  '/ai-stack/fireworks-ai',
  '/ai-stack/fivetran-com',
  '/ai-stack/freshworks-com',
  '/ai-stack/front-com',
  '/ai-stack/fullstory-com',
  '/ai-stack/gainsight-com',
  '/ai-stack/gitlab-com',
  '/ai-stack/gladly-com',
  '/ai-stack/glean-com',
  '/ai-stack/gong-io',
  '/ai-stack/gorgias-com',
  '/ai-stack/groq-com',
  '/ai-stack/harness-io',
  '/ai-stack/harvey-ai',
  '/ai-stack/hashicorp-com',
  '/ai-stack/heap-io',
  '/ai-stack/helpscout-com',
  '/ai-stack/hex-tech',
  '/ai-stack/highspot-com',
  '/ai-stack/honeycomb-io',
  '/ai-stack/hotjar-com',
  '/ai-stack/hubspot-com',
  '/ai-stack/humanitec-com',
  '/ai-stack/hyperscience-com',
  '/ai-stack/hypotenuse-ai',
  '/ai-stack/indico-io',
  '/ai-stack/inscribe-ai',
  '/ai-stack/instabase-com',
  '/ai-stack/ironcladapp-com',
  '/ai-stack/jasper-ai',
  '/ai-stack/kasisto-com',
  '/ai-stack/konghq-com',
  '/ai-stack/kore-ai',
  '/ai-stack/lacework-com',
  '/ai-stack/lattice-com',
  '/ai-stack/lavender-ai',
  '/ai-stack/lawgeex-com',
  '/ai-stack/leapsome-com',
  '/ai-stack/lightstep-com',
  '/ai-stack/lithic-com',
  '/ai-stack/liveblocks-io',
  '/ai-stack/logrocket-com',
  '/ai-stack/loom-com',
  '/ai-stack/loops-so',
  '/ai-stack/luminance-com',
  '/ai-stack/matillion-com',
  '/ai-stack/meltano-com',
  '/ai-stack/metabase-com',
  '/ai-stack/mintlify-com',
  '/ai-stack/miro-com',
  '/ai-stack/mistral-ai',
  '/ai-stack/modal-com',
  '/ai-stack/modal-com',
  '/ai-stack/moderntreasury-com',
  '/ai-stack/montecarlodata-com',
  '/ai-stack/moov-io',
  '/ai-stack/nabla-com',
  '/ai-stack/neon-tech',
  '/ai-stack/netlify-com',
  '/ai-stack/nonamesecurity-com',
  '/ai-stack/northbeam-io',
  '/ai-stack/notablehealth-com',
  '/ai-stack/notion-so',
  '/ai-stack/novu-co',
  '/ai-stack/observeinc-com',
  '/ai-stack/ocrolus-com',
  '/ai-stack/opslevel-com',
  '/ai-stack/optimizely-com',
  '/ai-stack/outreach-io',
  '/ai-stack/people-ai',
  '/ai-stack/perplexity-ai',
  '/ai-stack/persado-com',
  '/ai-stack/plaid-com',
  '/ai-stack/plain-com',
  '/ai-stack/planetscale-com',
  '/ai-stack/planhat-com',
  '/ai-stack/posthog-com',
  '/ai-stack/postman-com',
  '/ai-stack/prefect-io',
  '/ai-stack/propelauth-com',
  '/ai-stack/pulumi-com',
  '/ai-stack/rasa-com',
  '/ai-stack/railway-app',
  '/ai-stack/ramp-com',
  '/ai-stack/readme-com',
  '/ai-stack/rechargepayments-com',
  '/ai-stack/recordedfuture-com',
  '/ai-stack/remote-com',
  '/ai-stack/replicate-com',
  '/ai-stack/retool-com',
  '/ai-stack/revenue-io',
  '/ai-stack/rippling-com',
  '/ai-stack/rossum-ai',
  '/ai-stack/runwayml-com',
  '/ai-stack/salt-security',
  '/ai-stack/secureframe-com',
  '/ai-stack/segment-com',
  '/ai-stack/seismic-com',
  '/ai-stack/sentinelone-com',
  '/ai-stack/sentry-io',
  '/ai-stack/shopify-com',
  '/ai-stack/smartly-io',
  '/ai-stack/snowflake-com',
  '/ai-stack/sourcegraph-com',
  '/ai-stack/spacelift-io',
  '/ai-stack/spellbook-legal',
  '/ai-stack/split-io',
  '/ai-stack/splunk-com',
  '/ai-stack/sprinto-com',
  '/ai-stack/starburst-io',
  '/ai-stack/statsig-com',
  '/ai-stack/steep-ai',
  '/ai-stack/stoplight-io',
  '/ai-stack/stripe-com',
  '/ai-stack/supermetrics-com',
  '/ai-stack/swimm-io',
  '/ai-stack/synthesia-io',
  '/ai-stack/tabnine-com',
  '/ai-stack/temporal-io',
  '/ai-stack/tines-com',
  '/ai-stack/together-ai',
  '/ai-stack/torq-io',
  '/ai-stack/totango-com',
  '/ai-stack/traceable-ai',
  '/ai-stack/tray-io',
  '/ai-stack/trigger-dev',
  '/ai-stack/tyk-io',
  '/ai-stack/typeform-com',
  '/ai-stack/unit-co',
  '/ai-stack/userflow-com',
  '/ai-stack/userpilot-com',
  '/ai-stack/vanta-com',
  '/ai-stack/vectra-ai',
  '/ai-stack/vercel-com',
  '/ai-stack/vitally-io',
  '/ai-stack/voiceflow-com',
  '/ai-stack/walkme-com',
  '/ai-stack/wandb-ai',
  '/ai-stack/workos-com',
  '/ai-stack/workato-com',
  '/ai-stack/workday-com',
  '/ai-stack/writer-com',
  '/ai-stack/wundergraph-com',
  '/ai-stack/yellow-ai',
  '/ai-stack/zendesk-com',
  '/ai-stack/zest-ai',
  '/ai-stack/getdbt-com',
  '/ai-stack/env0-com',
  '/ai-stack/incident-io',
  '/glossary',
];

let viteProcess;
let isCleaningUp = false;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function routeToOutputFile(route) {
  const sanitizedRoute = route.replace(/^\/+/, '').replace(/\/+$/, '');
  return sanitizedRoute
    ? path.join(REPO_ROOT, sanitizedRoute, 'index.html')
    : path.join(REPO_ROOT, 'index.html');
}

function ensureHtmlDocument(html) {
  return /^<!doctype html>/i.test(html) ? html : `<!DOCTYPE html>\n${html}`;
}

function isServerResponding() {
  return new Promise((resolve) => {
    const request = http.get(
      {
        host: HOST,
        port: PORT,
        path: '/',
        timeout: 2_000,
      },
      (response) => {
        response.resume();
        resolve(response.statusCode >= 200 && response.statusCode < 500);
      }
    );

    request.on('timeout', () => {
      request.destroy();
      resolve(false);
    });

    request.on('error', () => resolve(false));
  });
}

async function waitForServerReady() {
  const startedAt = Date.now();

  while (Date.now() - startedAt < SERVER_READY_TIMEOUT_MS) {
    if (viteProcess && viteProcess.exitCode !== null) {
      throw new Error(`Vite dev server exited early with code ${viteProcess.exitCode}.`);
    }

    if (await isServerResponding()) {
      return;
    }

    await sleep(POLL_INTERVAL_MS);
  }

  throw new Error(`Timed out waiting for Vite dev server at ${BASE_URL}.`);
}

function startViteServer() {
  const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  viteProcess = spawn(
    npmCommand,
    ['run', 'dev', '--', '--host', HOST, '--port', String(PORT), '--strictPort'],
    {
      cwd: REACT_APP_DIR,
      stdio: ['ignore', 'pipe', 'pipe'],
      detached: process.platform !== 'win32',
    }
  );

  viteProcess.stdout.on('data', (chunk) => {
    process.stdout.write(`[vite] ${chunk}`);
  });

  viteProcess.stderr.on('data', (chunk) => {
    process.stderr.write(`[vite] ${chunk}`);
  });

  viteProcess.on('exit', (code, signal) => {
    if (!isCleaningUp && code !== 0) {
      process.stderr.write(`Vite dev server exited unexpectedly (code=${code}, signal=${signal}).\n`);
    }
  });
}

async function stopViteServer() {
  if (!viteProcess || viteProcess.exitCode !== null || isCleaningUp) {
    return;
  }

  isCleaningUp = true;

  try {
    if (process.platform !== 'win32' && viteProcess.pid) {
      process.kill(-viteProcess.pid, 'SIGTERM');
    } else {
      viteProcess.kill('SIGTERM');
    }
  } catch (error) {
    process.stderr.write(`Failed to stop Vite dev server cleanly: ${error.message}\n`);
  }

  await Promise.race([
    new Promise((resolve) => viteProcess.once('exit', resolve)),
    sleep(5_000).then(() => {
      try {
        if (viteProcess && viteProcess.exitCode === null) {
          if (process.platform !== 'win32' && viteProcess.pid) {
            process.kill(-viteProcess.pid, 'SIGKILL');
          } else {
            viteProcess.kill('SIGKILL');
          }
        }
      } catch (error) {
        process.stderr.write(`Failed to force-stop Vite dev server: ${error.message}\n`);
      }
    }),
  ]);
}

async function renderRoute(browser, route) {
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(PAGE_TIMEOUT_MS);
  page.setDefaultTimeout(PAGE_TIMEOUT_MS);

  try {
    const response = await page.goto(`${BASE_URL}${route}`, {
      waitUntil: 'networkidle0',
      timeout: PAGE_TIMEOUT_MS,
    });

    if (!response) {
      throw new Error('No response received from page.');
    }

    if (response.status() >= 400) {
      throw new Error(`HTTP ${response.status()}`);
    }

    const html = ensureHtmlDocument(await page.content());
    const outputFile = routeToOutputFile(route);

    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(outputFile, html, 'utf8');

    return { route, outputFile };
  } finally {
    await page.close();
  }
}

async function main() {
  let browser;
  let successCount = 0;
  let failureCount = 0;

  try {
    startViteServer();
    await waitForServerReady();

    browser = await puppeteer.launch({ headless: true });

    for (const route of ROUTES) {
      try {
        const result = await renderRoute(browser, route);
        successCount += 1;
        console.log(`✔ ${result.route} -> ${path.relative(REPO_ROOT, result.outputFile)}`);
      } catch (error) {
        failureCount += 1;
        console.error(`✖ ${route} -> ${error.message}`);
      }
    }

    console.log(`Prerender complete. Success: ${successCount}, Failed: ${failureCount}`);
    process.exitCode = failureCount > 0 ? 1 : 0;
  } finally {
    if (browser) {
      await browser.close();
    }

    await stopViteServer();
  }
}

async function shutdown(signal) {
  if (signal) {
    process.stderr.write(`Received ${signal}, shutting down...\n`);
  }

  await stopViteServer();
  process.exit(1);
}

process.on('SIGINT', () => {
  void shutdown('SIGINT');
});

process.on('SIGTERM', () => {
  void shutdown('SIGTERM');
});

void main().catch(async (error) => {
  console.error(error);
  await stopViteServer();
  process.exit(1);
});
