import { Link } from 'react-router-dom'
import PageHead from '../components/PageHead'

const techArticleSchema = {
  '@type': 'TechArticle',
  '@id': 'https://altorlab.com/mcp-inspector#article',
  headline: 'What is MCP Inspector? The Complete Guide to Debugging MCP Servers',
  description: 'MCP Inspector is the official debugging and testing tool for Model Context Protocol servers. Learn how to install it, use the UI and CLI modes, debug common errors, and integrate it into your development workflow.',
  url: 'https://altorlab.com/mcp-inspector',
  datePublished: '2026-04-21',
  dateModified: '2026-04-21',
  author: { '@type': 'Organization', name: 'Altor', url: 'https://altorlab.com' },
  publisher: { '@type': 'Organization', name: 'Altor', url: 'https://altorlab.com' },
  keywords: 'MCP Inspector, model context protocol inspector, debug MCP server, test MCP server, MCP development tools',
  articleSection: 'Developer Tools',
}

const faqSchema = {
  '@type': 'FAQPage',
  '@id': 'https://altorlab.com/mcp-inspector#faq',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is MCP Inspector?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MCP Inspector is the official debugging and testing tool for Model Context Protocol (MCP) servers, built by the Anthropic MCP team. It is a React-based web UI that acts as a standalone MCP client, letting you test servers in isolation — browse tools, invoke them with custom inputs, inspect resources, and see raw JSON-RPC responses — before integrating them into Claude Desktop or Cursor.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I install MCP Inspector?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MCP Inspector requires no installation. Run it directly with: npx @modelcontextprotocol/inspector. It starts a web UI on port 6274 and a proxy bridge on port 6277. Point it at any MCP server with: npx @modelcontextprotocol/inspector node build/index.js',
      },
    },
    {
      '@type': 'Question',
      name: 'When should I use MCP Inspector instead of Claude Desktop?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use MCP Inspector during development and debugging: it lets you test individual tools, inspect JSON-RPC responses, verify protocol compliance, and run tools in CI via CLI mode. Use Claude Desktop when you need to test the complete AI interaction, validate real prompts, or do end-to-end integration testing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does my MCP server work in Inspector but not Claude Desktop?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most common cause is environment variables — Claude Desktop needs them declared in its config file, not just in your shell. Also check: (1) your server writes logs to stderr not stdout, (2) the command path is absolute or npx-resolvable from Claude Desktop context, (3) your server handles the initialize handshake correctly.',
      },
    },
    {
      '@type': 'Question',
      name: 'What MCP clients does MCP Inspector support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MCP Inspector can connect to any MCP server using stdio transport (Node.js, Python, or binary), SSE transport (HTTP server-sent events), or Streamable HTTP transport. It is transport-agnostic — if your server speaks MCP, Inspector can connect to it.',
      },
    },
  ],
}

function CodeBlock({ code, label }) {
  return (
    <div className="my-4">
      {label && <p className="text-xs uppercase tracking-[0.1em] text-fg-muted mb-1.5">{label}</p>}
      <pre className="bg-surface-1 border border-border-default rounded-xl px-4 py-3 text-sm font-mono text-fg-default overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function SectionH2({ children }) {
  return (
    <h2 className="text-2xl font-bold text-fg-default tracking-[-0.02em] mt-12 mb-5">
      {children}
    </h2>
  )
}

function SectionH3({ children }) {
  return (
    <h3 className="text-lg font-semibold text-fg-default tracking-tight mt-8 mb-3">
      {children}
    </h3>
  )
}

export default function MCPInspector() {
  return (
    <>
      <PageHead
        title="What is MCP Inspector? Complete Guide to Debugging MCP Servers | Altor"
        description="MCP Inspector is the official tool for testing and debugging Model Context Protocol servers. Learn to install it, use UI and CLI modes, debug common errors, and integrate into your dev workflow."
        slug="/mcp-inspector"
        datePublished="2026-04-21"
        dateModified="2026-04-21"
        schemaType="WebPage"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'MCP Server Directory', url: '/mcp-servers' },
          { name: 'MCP Inspector', url: null },
        ]}
        extraSchema={[techArticleSchema, faqSchema]}
      />

      <article className="max-w-3xl mx-auto px-4 pt-28 pb-16 md:pt-36">
        <nav className="text-sm text-fg-muted mb-8">
          <Link to="/" className="hover:text-fg-default">Home</Link>
          <span className="mx-2">&gt;</span>
          <Link to="/mcp-servers" className="hover:text-fg-default">MCP Servers</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-fg-default">MCP Inspector</span>
        </nav>

        <header className="mb-10">
          <p className="text-sm uppercase tracking-[0.12em] text-accent-default mb-3">Developer tools</p>
          <h1 className="text-3xl md:text-4xl font-bold text-fg-default tracking-[-0.03em] mb-5 text-balance">
            What is MCP Inspector?
          </h1>
          <p className="text-lg text-fg-muted leading-relaxed">
            MCP Inspector is the <strong className="text-fg-default">official debugging and testing tool</strong> for
            Model Context Protocol servers, built and maintained by the Anthropic MCP team.
            It is a React-based web UI that acts as a standalone MCP client — letting you browse
            tools, invoke them with custom inputs, inspect resources, and see raw JSON-RPC
            responses, all before touching Claude Desktop or Cursor.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            {[
              { label: 'GitHub stars', value: '9,483' },
              { label: 'Latest version', value: 'v0.21.2' },
              { label: 'Maintained by', value: 'Anthropic' },
              { label: 'License', value: 'MIT' },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-lg border border-border-default bg-surface-1 px-4 py-2.5 min-w-[100px]">
                <p className="text-base font-bold text-fg-default">{value}</p>
                <p className="text-xs text-fg-muted mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </header>

        <SectionH2>Why MCP Inspector Exists</SectionH2>
        <p className="text-fg-muted leading-relaxed mb-4">
          Building an MCP server without Inspector is like building an API without Postman.
          When something goes wrong — a tool returns the wrong data, a resource isn't discovered,
          or the server crashes on connect — you need to see exactly what's happening at the
          protocol layer, not just guess from Claude's error messages.
        </p>
        <p className="text-fg-muted leading-relaxed mb-4">
          MCP Inspector solves this by acting as a real MCP client that exposes every layer of
          the protocol: the initial handshake, capability negotiation, raw JSON-RPC requests and
          responses, server logs, and notification streams. Everything is visible and testable
          without an AI model in the loop.
        </p>

        <SectionH2>Architecture: Two Processes</SectionH2>
        <p className="text-fg-muted leading-relaxed mb-4">
          Inspector runs as two cooperating processes:
        </p>
        <div className="grid sm:grid-cols-2 gap-4 my-6">
          {[
            {
              name: 'Inspector Client (MCPI)',
              port: 'Port 6274',
              desc: 'React web UI running in your browser. This is what you interact with — tabs for Tools, Resources, Prompts, and Notifications.',
            },
            {
              name: 'MCP Proxy (MCPP)',
              port: 'Port 6277',
              desc: 'Node.js bridge that translates between your browser and the MCP server transport (stdio, SSE, or Streamable HTTP).',
            },
          ].map(({ name, port, desc }) => (
            <div key={name} className="rounded-xl border border-border-default bg-surface-1 p-4">
              <p className="font-semibold text-fg-default text-sm">{name}</p>
              <p className="text-xs text-accent-default mb-2">{port}</p>
              <p className="text-sm text-fg-muted leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <p className="text-fg-muted leading-relaxed text-sm">
          The proxy is not a network proxy — it's a protocol bridge. It spawns your MCP server
          as a child process (for stdio) or connects to a running server (for SSE/HTTP), then
          exposes that connection to the browser UI over WebSocket.
        </p>

        <SectionH2>Installation & Quick Start</SectionH2>
        <p className="text-fg-muted leading-relaxed mb-4">
          No installation needed. Run with <code className="font-mono text-sm bg-surface-1 border border-border-default px-1.5 py-0.5 rounded">npx</code>:
        </p>
        <CodeBlock label="Open Inspector (no server)" code={`npx @modelcontextprotocol/inspector`} />
        <CodeBlock label="Connect to a Node.js server" code={`npx @modelcontextprotocol/inspector node build/index.js`} />
        <CodeBlock label="Pass environment variables" code={`npx @modelcontextprotocol/inspector -e API_KEY=your-key node build/index.js`} />
        <CodeBlock label="Connect to an npm-installed server" code={`npx -y @modelcontextprotocol/inspector npx @modelcontextprotocol/server-filesystem ~/Desktop`} />
        <CodeBlock label="Connect to a Python server" code={`npx @modelcontextprotocol/inspector uv --directory path/to/server run package-name`} />
        <p className="text-sm text-fg-muted mt-3">
          Inspector opens automatically at <code className="font-mono bg-surface-1 border border-border-default px-1.5 py-0.5 rounded text-xs">http://localhost:6274</code>.
          A session token is generated on startup and auto-filled in the URL for security.
        </p>

        <SectionH2>The UI: Five Panels</SectionH2>
        <p className="text-fg-muted leading-relaxed mb-6">
          Once connected, Inspector gives you five panels to explore your server:
        </p>
        <div className="space-y-4">
          {[
            {
              tab: 'Tools',
              desc: 'Lists every tool your server exposes, with its full JSON schema. Select a tool, fill in parameters using the generated form, click Execute, and see the raw JSON-RPC response. This is where you spend 80% of your debugging time.',
            },
            {
              tab: 'Resources',
              desc: 'Lists all resources available from the server — their URIs, MIME types, and descriptions. Click any resource to inspect its content and verify what data is actually returned.',
            },
            {
              tab: 'Prompts',
              desc: 'Lists server-defined prompt templates. Fill in template arguments and preview the generated message exactly as it will be sent to a language model.',
            },
            {
              tab: 'Notifications',
              desc: 'Real-time stream of server log messages and JSON-RPC notifications. This is where stdout/stderr output appears, and where you\'ll see transport errors and lifecycle events.',
            },
            {
              tab: 'Server Connection',
              desc: 'Left sidebar showing transport type (stdio/SSE/HTTP), server command, environment variables, and auth token input. Change connection settings here without restarting.',
            },
          ].map(({ tab, desc }) => (
            <div key={tab} className="flex gap-4">
              <span className="font-mono text-xs text-accent-default bg-accent-default/10 px-2 py-1 rounded h-fit flex-shrink-0 mt-0.5">{tab}</span>
              <p className="text-sm text-fg-muted leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <SectionH2>CLI Mode: Scripting and CI/CD</SectionH2>
        <p className="text-fg-muted leading-relaxed mb-4">
          Inspector's <code className="font-mono text-sm bg-surface-1 border border-border-default px-1.5 py-0.5 rounded">--cli</code> flag
          disables the web UI and runs commands directly from the terminal —
          useful for automated tests and CI pipelines:
        </p>
        <CodeBlock label="List all tools" code={`npx @modelcontextprotocol/inspector --cli node build/index.js --method tools/list`} />
        <CodeBlock label="Call a specific tool" code={`npx @modelcontextprotocol/inspector --cli node build/index.js \\
  --method tools/call \\
  --tool-name search \\
  --tool-arg query="hello world"`} />
        <p className="text-sm text-fg-muted mt-3">
          CLI mode exits with a non-zero code on error, making it composable with standard CI tooling.
        </p>

        <SectionH2>Development Workflow: Inspector → Claude Desktop → Production</SectionH2>
        <p className="text-fg-muted leading-relaxed mb-4">
          The recommended workflow is a three-stage pipeline:
        </p>
        <ol className="space-y-4 my-6">
          {[
            {
              n: '01',
              title: 'Inspector — protocol correctness',
              body: 'Verify every tool and resource works correctly at the protocol level. Check JSON schemas, test edge cases, read raw responses. No AI model involved — pure protocol.',
            },
            {
              n: '02',
              title: 'Claude Desktop — AI integration',
              body: 'Add the server to your claude_desktop_config.json and test real conversational flows. Verify the AI uses your tools as intended and handles errors gracefully.',
            },
            {
              n: '03',
              title: 'Production — monitoring and stability',
              body: 'Ship to your target environment. Use structured logging (stderr only, never stdout) for observability. Consider remote MCP hosting for scalability.',
            },
          ].map(({ n, title, body }) => (
            <li key={n} className="flex gap-4">
              <span className="font-mono text-accent-default text-sm flex-shrink-0 mt-0.5 w-6">{n}</span>
              <div>
                <p className="font-semibold text-fg-default text-sm mb-1">{title}</p>
                <p className="text-sm text-fg-muted leading-relaxed">{body}</p>
              </div>
            </li>
          ))}
        </ol>

        <SectionH2>Debugging Common Errors</SectionH2>
        <p className="text-fg-muted leading-relaxed mb-6">
          These are the errors MCP developers hit most often, and how to fix them:
        </p>
        <div className="space-y-5">
          {[
            {
              error: 'Server connects but tools/list returns empty',
              cause: 'Tool registration is conditional or async — tool setup code hasn\'t run before the server advertises capabilities.',
              fix: 'Ensure all tools are registered synchronously before calling server.start(). Check the Notifications panel for errors during initialization.',
            },
            {
              error: 'console.log breaks the protocol',
              cause: 'stdio transport uses stdout exclusively for JSON-RPC messages. Any other output to stdout corrupts the stream.',
              fix: 'Replace all console.log() with console.error() in your server. For structured logging, write to stderr or a log file.',
            },
            {
              error: '-32602 Invalid params on tool call',
              cause: 'The parameters you passed don\'t match the tool\'s JSON schema — wrong type, missing required field, or extra field.',
              fix: 'Check the tool\'s schema in the Tools tab. Inspector generates the input form from the schema, so use its default form to validate.',
            },
            {
              error: 'Server works in Inspector, fails in Claude Desktop',
              cause: 'Environment variables aren\'t available in Claude Desktop\'s process context.',
              fix: 'Declare all required environment variables in the env block of claude_desktop_config.json. Also verify the command is an absolute path or correctly npx-resolvable from Claude Desktop.',
            },
            {
              error: 'Connection timeout on startup',
              cause: 'Server takes too long to initialize (longer than the 5-second default), or throws during startup.',
              fix: 'Set MCP_SERVER_REQUEST_TIMEOUT in Inspector\'s Configuration panel. Check the Notifications panel for server-side errors during initialization.',
            },
          ].map(({ error, cause, fix }) => (
            <div key={error} className="rounded-xl border border-border-default bg-surface-0 p-5">
              <p className="font-mono text-sm text-fg-default font-semibold mb-2">{error}</p>
              <p className="text-xs text-fg-muted mb-1"><span className="text-amber-600 font-medium">Cause:</span> {cause}</p>
              <p className="text-xs text-fg-muted"><span className="text-emerald-600 font-medium">Fix:</span> {fix}</p>
            </div>
          ))}
        </div>

        <SectionH2>Security: Authentication Is On by Default</SectionH2>
        <p className="text-fg-muted leading-relaxed mb-4">
          Inspector generates a random session token on every startup and requires it
          in the URL. This prevents other processes on your machine from connecting to
          the proxy. The UI is bound to <code className="font-mono text-xs bg-surface-1 border border-border-default px-1.5 py-0.5 rounded">localhost</code> only by default.
        </p>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 my-4">
          <p className="text-sm text-amber-800 font-semibold mb-1">Never use DANGEROUSLY_OMIT_AUTH in shared environments</p>
          <p className="text-sm text-amber-700 leading-relaxed">
            The <code className="font-mono text-xs bg-amber-100 px-1 py-0.5 rounded">DANGEROUSLY_OMIT_AUTH=true</code> flag
            disables token authentication entirely. CVE-2025-49596 was an RCE
            vulnerability in older versions when auth was omitted. Update to v0.21.2+
            and never expose Inspector to untrusted networks.
          </p>
        </div>

        <SectionH2>Frequently Asked Questions</SectionH2>
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

        <SectionH2>Related Resources</SectionH2>
        <div className="grid sm:grid-cols-2 gap-3 mb-12">
          {[
            { label: 'MCP Server Directory', desc: 'Browse 4,000+ MCP servers', to: '/mcp-servers' },
            { label: 'Developer Tools MCP Servers', desc: 'MCP servers for your dev workflow', to: '/mcp-servers/developer-tools' },
            { label: 'Web & Browser MCP Servers', desc: 'Playwright, Puppeteer, and more', to: '/mcp-servers/web-browser' },
            { label: 'Playwright MCP Server', desc: 'Microsoft\'s browser automation server', to: '/mcp-servers/microsoft/playwright-mcp' },
          ].map(({ label, desc, to }) => (
            <Link key={to} to={to}
              className="rounded-xl border border-border-default bg-surface-1 p-4 hover:border-accent-muted transition-colors">
              <p className="text-sm font-semibold text-fg-default mb-1">{label}</p>
              <p className="text-xs text-fg-muted">{desc}</p>
            </Link>
          ))}
        </div>

        <a
          href="https://github.com/modelcontextprotocol/inspector"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-fg-muted hover:text-fg-default transition-colors"
        >
          View MCP Inspector on GitHub ↗
        </a>
      </article>
    </>
  )
}
