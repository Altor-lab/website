import { Link } from 'react-router-dom'
import PageHead from '../components/PageHead'

const softwareSchema = {
  '@type': 'SoftwareApplication',
  '@id': 'https://altorlab.com/mcp-servers/microsoft/playwright-mcp#software',
  name: 'Playwright MCP',
  alternateName: 'playwright-mcp',
  description: 'Microsoft\'s official MCP server for browser automation using Playwright. Lets Claude and AI agents control browsers via accessibility snapshots — no vision model required.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Windows, macOS, Linux',
  url: 'https://altorlab.com/mcp-servers/microsoft/playwright-mcp',
  downloadUrl: 'https://github.com/microsoft/playwright-mcp',
  softwareVersion: '0.0.70',
  author: { '@type': 'Organization', name: 'Microsoft', url: 'https://microsoft.com' },
  publisher: { '@type': 'Organization', name: 'Microsoft' },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: 31138, bestRating: '5' },
}

const faqSchema = {
  '@type': 'FAQPage',
  '@id': 'https://altorlab.com/mcp-servers/microsoft/playwright-mcp#faq',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Playwright MCP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Playwright MCP is Microsoft\'s official MCP server that lets AI agents like Claude control web browsers using Playwright. Unlike screenshot-based approaches, it uses accessibility snapshots — structured representations of page elements — so Claude reads element roles and labels rather than pixels. It supports Chromium, Firefox, and WebKit.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I install Playwright MCP in Claude Desktop?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Add this to your claude_desktop_config.json file (macOS: ~/Library/Application Support/Claude/claude_desktop_config.json): { "mcpServers": { "playwright": { "command": "npx", "args": ["@playwright/mcp@latest"] } } }. Restart Claude Desktop after saving.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Playwright MCP free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Playwright MCP is open source (Apache 2.0) and runs locally on your machine at no cost. You only pay for the AI model API calls (Claude, GPT-4, etc.) you use to interact with it.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between Playwright MCP and Puppeteer MCP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Playwright MCP is Microsoft\'s actively maintained server supporting Chromium, Firefox, and WebKit. The Anthropic Puppeteer MCP server was deprecated in early 2026. Playwright MCP is now the recommended default for browser automation in MCP-based AI agents.',
      },
    },
  ],
}

function CodeBlock({ code, label }) {
  return (
    <div className="my-3">
      {label && <p className="text-xs uppercase tracking-[0.1em] text-fg-muted mb-1.5">{label}</p>}
      <pre className="bg-surface-1 border border-border-default rounded-xl px-4 py-3 text-sm font-mono text-fg-default overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export default function PlaywrightMCP() {
  return (
    <>
      <PageHead
        title="Playwright MCP Server — Browser Automation for Claude & AI Agents | Altor"
        description="Microsoft's official playwright-mcp server for browser automation. Install in Claude Desktop, Cursor, or VS Code. Control browsers with accessibility snapshots, not screenshots. Free, open source."
        slug="/mcp-servers/microsoft/playwright-mcp"
        datePublished="2026-04-21"
        dateModified="2026-04-21"
        schemaType="WebPage"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'MCP Servers', url: '/mcp-servers' },
          { name: 'Web & Browser', url: '/mcp-servers/web-browser' },
          { name: 'Playwright MCP', url: null },
        ]}
        extraSchema={[softwareSchema, faqSchema]}
      />

      <article className="max-w-4xl mx-auto px-4 pt-28 pb-16 md:pt-36">
        <nav className="text-sm text-fg-muted mb-8">
          <Link to="/" className="hover:text-fg-default">Home</Link>
          <span className="mx-2">&gt;</span>
          <Link to="/mcp-servers" className="hover:text-fg-default">MCP Servers</Link>
          <span className="mx-2">&gt;</span>
          <Link to="/mcp-servers/web-browser" className="hover:text-fg-default">Web & Browser</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-fg-default">Playwright MCP</span>
        </nav>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full border bg-violet-50 text-violet-800 border-violet-200">Web & Browser</span>
            <span className="text-sm text-fg-muted">★ 31,138</span>
            <span className="text-xs text-fg-muted">by Microsoft</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-fg-default tracking-[-0.03em] mb-4 text-balance">
            Playwright MCP
          </h1>
          <p className="text-lg text-fg-muted leading-relaxed max-w-2xl mb-6">
            Microsoft's official MCP server for browser automation. Lets Claude, Cursor, and
            other AI agents <strong className="text-fg-default">control web browsers using accessibility snapshots</strong> —
            structured element trees — rather than screenshots or a vision model.
            Supports Chromium, Firefox, and WebKit. Free and open source.
          </p>
          <div className="grid sm:grid-cols-4 gap-3">
            {[
              { label: 'Stars', value: '31,138' },
              { label: 'Version', value: 'v0.0.70' },
              { label: 'License', value: 'Apache 2.0' },
              { label: 'Maintained by', value: 'Microsoft' },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-lg border border-border-default bg-surface-1 px-3 py-2.5 text-center">
                <p className="text-sm font-bold text-fg-default">{value}</p>
                <p className="text-xs text-fg-muted mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-fg-default tracking-[-0.02em] mb-5">
            How It Works: Accessibility Snapshots, Not Screenshots
          </h2>
          <p className="text-fg-muted leading-relaxed mb-4">
            Most browser automation tools send screenshots to the model and rely on vision
            capabilities. Playwright MCP takes a fundamentally different approach: it gives
            the AI an <strong className="text-fg-default">accessibility tree</strong> — a
            structured, token-efficient representation of the page where every interactive
            element has a role, label, and reference ID.
          </p>
          <p className="text-fg-muted leading-relaxed mb-4">
            When Claude wants to click a button, it references the element by its accessibility
            ID (e.g., <code className="font-mono text-xs bg-surface-1 border border-border-default px-1 py-0.5 rounded">e42</code>),
            not by pixel coordinates or CSS selectors. This means the model reads
            <em> what the page means</em>, not what it looks like — making interactions more
            reliable and dramatically cheaper in token cost.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-fg-default tracking-[-0.02em] mb-5">Installation</h2>
          <p className="text-fg-muted leading-relaxed mb-5">
            Add Playwright MCP to your MCP client's configuration file. The server installs
            on first use via <code className="font-mono text-xs bg-surface-1 border border-border-default px-1 py-0.5 rounded">npx</code> — no separate install step needed.
          </p>

          <h3 className="text-base font-semibold text-fg-default mb-3">Claude Desktop</h3>
          <p className="text-sm text-fg-muted mb-2">
            Edit <code className="font-mono text-xs bg-surface-1 border border-border-default px-1.5 py-0.5 rounded">~/Library/Application Support/Claude/claude_desktop_config.json</code> (macOS)
            or <code className="font-mono text-xs bg-surface-1 border border-border-default px-1.5 py-0.5 rounded">%APPDATA%\Claude\claude_desktop_config.json</code> (Windows):
          </p>
          <CodeBlock code={`{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}`} />

          <h3 className="text-base font-semibold text-fg-default mb-3 mt-6">Cursor</h3>
          <p className="text-sm text-fg-muted mb-2">Go to Cursor Settings → MCP → Add new MCP Server:</p>
          <CodeBlock label="Name: playwright  |  Type: command" code={`npx @playwright/mcp@latest`} />

          <h3 className="text-base font-semibold text-fg-default mb-3 mt-6">VS Code</h3>
          <CodeBlock code={`code --add-mcp '{"name":"playwright","command":"npx","args":["@playwright/mcp@latest"]}'`} />

          <h3 className="text-base font-semibold text-fg-default mb-3 mt-6">Claude Code (CLI)</h3>
          <CodeBlock code={`claude mcp add playwright npx @playwright/mcp@latest`} />
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-fg-default tracking-[-0.02em] mb-5">Configuration Options</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {[
              { label: 'Headless mode (no browser window)', code: `"args": ["@playwright/mcp@latest", "--headless"]` },
              { label: 'Firefox instead of Chromium', code: `"args": ["@playwright/mcp@latest", "--browser=firefox"]` },
              { label: 'Isolated sessions (fresh context)', code: `"args": ["@playwright/mcp@latest", "--isolated"]` },
              { label: 'Persistent login (storage state)', code: `"args": ["@playwright/mcp@latest", "--storage-state=/path/auth.json"]` },
            ].map(({ label, code }) => (
              <div key={label} className="rounded-xl border border-border-default bg-surface-1 p-4">
                <p className="text-xs text-fg-muted mb-2">{label}</p>
                <code className="text-xs font-mono text-fg-default break-all">{code}</code>
              </div>
            ))}
          </div>
          <p className="text-sm text-fg-muted leading-relaxed">
            For remote or headless Linux environments, run the server in HTTP mode:
          </p>
          <CodeBlock label="Start server (terminal 1)" code={`npx @playwright/mcp@latest --port 8931`} />
          <CodeBlock label="Configure client (claude_desktop_config.json)" code={`{
  "mcpServers": {
    "playwright": {
      "url": "http://localhost:8931/mcp"
    }
  }
}`} />
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-fg-default tracking-[-0.02em] mb-5">What You Can Do With It</h2>
          <p className="text-fg-muted leading-relaxed mb-6">
            Playwright MCP exposes 34 browser control tools. Here are the most useful ones:
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {[
              { group: 'Navigation', tools: 'Navigate to URL, go back/forward, reload page, wait for load' },
              { group: 'Interaction', tools: 'Click, type, fill forms, select dropdowns, check/uncheck, press keys, hover' },
              { group: 'Page inspection', tools: 'Get accessibility snapshot, take screenshot, get full page content' },
              { group: 'Tabs & windows', tools: 'Open new tab, switch tabs, close tab' },
              { group: 'Network & storage', tools: 'Mock API routes, get/set cookies, save/restore session state' },
              { group: 'Code execution', tools: 'Run arbitrary Playwright script via browser_run_code' },
            ].map(({ group, tools }) => (
              <div key={group} className="rounded-xl border border-border-default bg-surface-0 p-4">
                <p className="text-xs font-semibold text-accent-default uppercase tracking-[0.06em] mb-1.5">{group}</p>
                <p className="text-xs text-fg-muted leading-relaxed">{tools}</p>
              </div>
            ))}
          </div>
          <h3 className="text-base font-semibold text-fg-default mb-3">Real-world use cases</h3>
          <ul className="space-y-2">
            {[
              'Self-QA during development — point Claude at localhost:3000 to verify UI flows work',
              'Automated form filling — e-commerce checkout, sign-up flows, data entry',
              'Web scraping — extract structured data using accessibility tree, no CSS selectors needed',
              'Test generation — navigate to a page, explore interactions, generate Playwright test code',
              'Authenticated workflows — save session state once, reuse across agent runs',
              'Cross-browser verification — check behaviour in Chromium, Firefox, and WebKit',
            ].map(uc => (
              <li key={uc} className="flex gap-2 text-sm text-fg-muted">
                <span className="text-accent-default flex-shrink-0 mt-0.5">✓</span> {uc}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-fg-default tracking-[-0.02em] mb-5">Playwright MCP vs. Alternatives</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border-default">
                  {['', 'Playwright MCP', 'Puppeteer MCP', 'Browserbase MCP'].map(h => (
                    <th key={h} className="text-left py-2.5 px-3 text-xs font-semibold text-fg-muted">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {[
                  ['Element targeting', 'Accessibility tree', 'CSS selectors', 'Natural language'],
                  ['Browsers', 'Chromium, Firefox, WebKit', 'Chromium only', 'Cloud-managed'],
                  ['Cost', 'Free (local)', 'Free (local)', '$20–99+/month'],
                  ['Status', '✅ Actively maintained', '⚠️ Deprecated 2026', '✅ Active'],
                  ['Best for', 'Most projects', 'Legacy code', 'Production scale'],
                ].map(([label, ...values]) => (
                  <tr key={label} className="hover:bg-surface-1 transition-colors">
                    <td className="py-2.5 px-3 text-xs font-medium text-fg-default">{label}</td>
                    {values.map((v, i) => (
                      <td key={i} className="py-2.5 px-3 text-xs text-fg-muted">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-fg-muted mt-3">
            Anthropic's Puppeteer MCP server was officially deprecated in early 2026.
            Playwright MCP is the recommended default for new projects.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-fg-default tracking-[-0.02em] mb-5">Common Issues & Fixes</h2>
          <div className="space-y-3">
            {[
              {
                issue: 'Browser won\'t launch after install',
                fix: 'Playwright browsers need a separate install: run npx playwright install chromium (or firefox/webkit). This downloads the browser binaries.',
              },
              {
                issue: 'Connection refused / server not found',
                fix: 'Ensure the server is running before the client connects. For HTTP mode, start the server first. For Claude Desktop, check that the command path resolves correctly outside your shell.',
              },
              {
                issue: 'Headless mode fails on Linux',
                fix: 'Most Linux servers lack a display. Use --port mode instead of stdio: start the server with npx @playwright/mcp@latest --port 8931 and configure the client with the URL.',
              },
              {
                issue: 'Accessibility snapshot is empty or too large',
                fix: 'Wait for full page load before snapshotting. For pages with huge DOM trees, use the --snapshot-timeout option or snapshot a specific element by reference.',
              },
              {
                issue: 'Works locally but fails in CI',
                fix: 'Add --headless to the args array. For GitHub Actions, also add --no-sandbox to launchOptions in a config file, as sandboxing requires extra privileges in containers.',
              },
            ].map(({ issue, fix }) => (
              <div key={issue} className="rounded-xl border border-border-default bg-surface-0 p-4">
                <p className="text-sm font-semibold text-fg-default mb-1">{issue}</p>
                <p className="text-sm text-fg-muted leading-relaxed">{fix}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-fg-default tracking-[-0.02em] mb-5">Frequently Asked Questions</h2>
          <div className="space-y-0 divide-y divide-border-default rounded-xl border border-border-default overflow-hidden">
            {faqSchema.mainEntity.map(q => (
              <details key={q.name} className="group bg-surface-0 hover:bg-surface-1 transition-colors">
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none">
                  <span className="text-sm font-medium text-fg-default">{q.name}</span>
                  <span className="text-fg-muted group-open:rotate-45 transition-transform flex-shrink-0 text-lg leading-none">+</span>
                </summary>
                <p className="px-5 pb-5 text-sm text-fg-muted leading-relaxed">{q.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-base font-bold text-fg-default mb-4 tracking-tight">Related MCP servers</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: 'All Web & Browser MCP Servers', desc: 'Playwright, Puppeteer, Firecrawl, and more', to: '/mcp-servers/web-browser' },
              { label: 'MCP Inspector', desc: 'Debug and test any MCP server including this one', to: '/mcp-inspector' },
              { label: 'Firecrawl MCP', desc: 'Web scraping and crawling MCP server', to: '/mcp-servers/mendableai/firecrawl-mcp-server' },
              { label: 'GitHub MCP Server', desc: 'Official GitHub repository MCP server', to: '/mcp-servers/github/github-mcp-server' },
            ].map(({ label, desc, to }) => (
              <Link key={to} to={to}
                className="rounded-xl border border-border-default bg-surface-1 p-4 hover:border-accent-muted transition-colors">
                <p className="text-sm font-semibold text-fg-default mb-1">{label}</p>
                <p className="text-xs text-fg-muted">{desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <div className="rounded-xl border border-border-default bg-surface-1 p-6 md:p-8">
          <p className="text-sm uppercase tracking-[0.12em] text-accent-default mb-3">Need Playwright MCP in production?</p>
          <h2 className="text-xl font-bold text-fg-default mb-3 tracking-tight">
            Altor deploys browser automation AI systems for B2B teams.
          </h2>
          <p className="text-sm text-fg-muted leading-relaxed mb-5">
            We wire Playwright MCP into production agent workflows — QA automation,
            web scraping pipelines, form-filling agents — and deploy them in 3 weeks.
            Not demo. Connected to your real systems from day one.
          </p>
          <a href="https://calendly.com/founders-altorlab/30min" target="_blank" rel="noopener noreferrer"
            className="text-sm font-medium text-accent-default hover:opacity-80 transition-opacity">
            Talk to Altor about browser automation →
          </a>
        </div>

        <div className="mt-8 flex gap-4 text-xs text-fg-muted">
          <a href="https://github.com/microsoft/playwright-mcp" target="_blank" rel="noopener noreferrer"
            className="hover:text-fg-default transition-colors">GitHub ↗</a>
          <a href="https://www.npmjs.com/package/@playwright/mcp" target="_blank" rel="noopener noreferrer"
            className="hover:text-fg-default transition-colors">npm ↗</a>
          <Link to="/mcp-servers/web-browser" className="hover:text-fg-default transition-colors">
            More Web & Browser servers →
          </Link>
        </div>
      </article>
    </>
  )
}
