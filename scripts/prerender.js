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
