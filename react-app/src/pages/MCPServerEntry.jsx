import { useEffect, useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import PageHead from '../components/PageHead'

const CATEGORY_SLUGS = {
  'Databases': 'databases', 'File System': 'file-system', 'Web & Browser': 'web-browser',
  'Version Control': 'version-control', 'Communication': 'communication',
  'Productivity': 'productivity', 'Cloud & Infra': 'cloud-infra', 'AI & ML': 'ai-ml',
  'Search': 'search', 'Data & Analytics': 'data-analytics', 'Finance': 'finance',
  'Security': 'security', 'Media': 'media', 'Maps & Location': 'maps-location',
  'Developer Tools': 'developer-tools', 'Other': 'other',
}

const CATEGORY_COLORS = {
  'Databases': 'bg-blue-50 text-blue-800 border-blue-200',
  'File System': 'bg-amber-50 text-amber-800 border-amber-200',
  'Web & Browser': 'bg-violet-50 text-violet-800 border-violet-200',
  'Version Control': 'bg-zinc-100 text-zinc-700 border-zinc-200',
  'Communication': 'bg-green-50 text-green-800 border-green-200',
  'Productivity': 'bg-orange-50 text-orange-800 border-orange-200',
  'Cloud & Infra': 'bg-sky-50 text-sky-800 border-sky-200',
  'AI & ML': 'bg-emerald-50 text-emerald-800 border-emerald-200',
  'Search': 'bg-pink-50 text-pink-800 border-pink-200',
  'Developer Tools': 'bg-zinc-50 text-zinc-700 border-zinc-200',
  'Other': 'bg-zinc-50 text-zinc-500 border-zinc-200',
}

const CATEGORY_USE_CASES = {
  'Databases': ['Query and mutate production databases via natural language', 'Run schema migrations with AI-assisted validation', 'Generate and explain SQL queries from plain English', 'Debug slow queries by pulling execution plans automatically'],
  'File System': ['Read, write, and search files without leaving your AI client', 'Automate file organization and batch renaming workflows', 'Extract and summarize content from large document collections', 'Watch directories and trigger workflows on file changes'],
  'Web & Browser': ['Scrape and summarize live web pages inside Claude', 'Automate browser-based workflows end-to-end', 'Extract structured data from any website on demand', 'Monitor web pages for changes and trigger alerts'],
  'Version Control': ['Review diffs and PRs without switching tabs', 'Search commit history with natural language queries', 'Automate branch management and issue linking', 'Generate release notes from commit history automatically'],
  'Communication': ['Draft and send messages from your AI client', 'Search and summarize conversation history', 'Automate notification workflows across channels', 'Set up AI-powered message routing and triage'],
  'Productivity': ['Create and update tasks directly from AI conversations', 'Summarize and extract action items from documents', 'Automate recurring workflow steps across productivity tools', 'Build AI-powered project status reports automatically'],
  'Cloud & Infra': ['Query cloud resource state and metrics in real time', 'Automate infrastructure changes with AI-assisted validation', 'Debug deployment failures by pulling logs and config diffs', 'Monitor costs and trigger alerts on anomalies'],
  'AI & ML': ['Chain AI models and pipelines from a single interface', 'Query model outputs and fine-tuning runs programmatically', 'Automate eval pipelines and benchmark comparisons', 'Connect AI agents to specialized ML infrastructure'],
  'Search': ['Run semantic and keyword searches across multiple indices', 'Summarize and cluster search results automatically', 'Integrate external search APIs into AI agent workflows', 'Build RAG pipelines connecting AI to live search indexes'],
  'Developer Tools': ['Trigger CI/CD pipelines and view build status in chat', 'Search and manage issues across projects automatically', 'Automate code review and static analysis workflows', 'Query deployment history and rollback with natural language'],
  'Data & Analytics': ['Query analytics dashboards and export results via AI', 'Build automated reporting pipelines without code', 'Connect AI agents to BI tools for live data access', 'Summarize trends from large datasets in seconds'],
  'Finance': ['Query transaction history and detect anomalies', 'Generate financial reports from raw data automatically', 'Automate reconciliation workflows across accounts', 'Connect AI agents to accounting and billing systems'],
  'Security': ['Query security logs and detect threat patterns', 'Automate vulnerability scanning and triage workflows', 'Connect AI agents to SIEM and compliance systems', 'Generate security incident reports from raw event data'],
  'Media': ['Process, convert, and summarize media files via AI', 'Automate media tagging and metadata extraction', 'Connect AI agents to CDN and media management systems', 'Generate captions and transcripts automatically'],
  'Maps & Location': ['Query location data and generate route optimizations', 'Automate geofencing and proximity alert workflows', 'Connect AI agents to mapping and logistics APIs', 'Generate location-based insights from movement data'],
  'Other': ['Connect AI agents to specialized external systems', 'Automate custom workflows via API integration', 'Extend Claude capabilities with domain-specific tools', 'Build AI-powered integrations for niche use cases'],
}

export default function MCPServerEntry() {
  const { owner, repo } = useParams()
  const [server, setServer] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/mcp-servers.json')
      .then(r => r.json())
      .then(data => {
        const id = `${owner}/${repo}`.toLowerCase()
        const found = data.servers.find(
          s => (s.id || '').toLowerCase() === id ||
               (s.owner === owner && s.repo === repo)
        )
        setServer(found || null)
        if (found) {
          setRelated(
            data.servers
              .filter(s => s.category === found.category && s.id !== found.id)
              .slice(0, 6)
          )
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [owner, repo])

  if (loading) {
    return (
      <section className="max-w-4xl mx-auto px-4 pt-28 pb-12 md:pt-36">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-border-default rounded w-1/4" />
          <div className="h-8 bg-border-default rounded w-2/3" />
          <div className="h-4 bg-border-default rounded w-full" />
        </div>
      </section>
    )
  }

  if (!server) return <Navigate to="/mcp-servers" replace />

  const slug = `/mcp-servers/${owner}/${repo}`
  const catClass = CATEGORY_COLORS[server.category] ?? CATEGORY_COLORS['Other']

  const softwareSchema = {
    '@type': 'SoftwareApplication',
    '@id': `https://altorlab.com${slug}#software`,
    name: server.name,
    description: server.description || `MCP server by ${owner}`,
    applicationCategory: 'DeveloperApplication',
    url: `https://altorlab.com${slug}`,
    ...(server.github_url && { downloadUrl: server.github_url }),
    ...(server.stars > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.5',
        ratingCount: server.stars,
        bestRating: '5',
      },
    }),
    author: { '@type': 'Person', name: owner },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }

  const faqSchema = {
    '@type': 'FAQPage',
    '@id': `https://altorlab.com${slug}#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the ${server.name} MCP server?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: server.description || `${server.name} is a Model Context Protocol (MCP) server by ${owner} in the ${server.category} category. It allows AI agents like Claude to interact with ${server.category.toLowerCase()} systems directly.`,
        },
      },
      {
        '@type': 'Question',
        name: `How do I install the ${server.name} MCP server?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: server.install_command
            ? `Install using: ${server.install_command}. Then configure it in your Claude Desktop or MCP-compatible client configuration file.`
            : `Clone the repository from ${server.github_url || `https://github.com/${owner}/${repo}`} and follow the README installation instructions.`,
        },
      },
      {
        '@type': 'Question',
        name: `What AI models work with ${server.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${server.name} works with any MCP-compatible AI model, including Claude (Anthropic), and any client that supports the Model Context Protocol standard.`,
        },
      },
    ],
  }

  const howToSchema = server.install_command ? {
    '@type': 'HowTo',
    '@id': `https://altorlab.com${slug}#howto`,
    name: `How to install ${server.name} MCP server`,
    description: `Step-by-step installation guide for ${server.name} MCP server`,
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Install the server', text: `Run: ${server.install_command}` },
      { '@type': 'HowToStep', position: 2, name: 'Configure your MCP client', text: `Add the server entry to your claude_desktop_config.json or MCP client configuration file with the server name and command.` },
      { '@type': 'HowToStep', position: 3, name: 'Restart and verify', text: `Restart your AI client. ${server.name} will appear in the available tools list once the client detects the new server configuration.` },
    ],
  } : null

  return (
    <>
      <PageHead
        title={`${server.name} MCP Server — Install & Use with Claude | Altor`}
        description={
          server.description
            ? `${server.description.slice(0, 120)}. ${server.stars > 0 ? '★ ' + server.stars.toLocaleString() + ' stars.' : ''} Install ${server.name} as an MCP server for Claude, Cursor, or any MCP client.`
            : `${server.name} is an open-source MCP server${server.language ? ' built in ' + server.language : ''} in the ${server.category} category. Works with Claude and any Model Context Protocol client.`
        }
        slug={slug}
        datePublished="2026-04-16"
        dateModified={new Date().toISOString().slice(0, 10)}
        schemaType="WebPage"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'MCP Servers', url: '/mcp-servers' },
          { name: server.category, url: `/mcp-servers/${CATEGORY_SLUGS[server.category] ?? 'other'}` },
          { name: server.name, url: null },
        ]}
        extraSchema={[softwareSchema, faqSchema, ...(howToSchema ? [howToSchema] : [])].filter(Boolean)}
      />

      <article className="max-w-4xl mx-auto px-4 pt-28 pb-12 md:pt-36">
        <nav className="text-sm text-fg-muted mb-8">
          <Link to="/" className="hover:text-fg-default">Home</Link>
          <span className="mx-2">&gt;</span>
          <Link to="/mcp-servers" className="hover:text-fg-default">MCP Servers</Link>
          <span className="mx-2">&gt;</span>
          <Link to={`/mcp-servers/${CATEGORY_SLUGS[server.category] ?? 'other'}`} className="hover:text-fg-default">{server.category}</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-fg-default">{server.name}</span>
        </nav>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${catClass}`}>
              {server.category}
            </span>
            {server.stars > 0 && (
              <span className="text-sm text-fg-muted">★ {server.stars.toLocaleString()}</span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-fg-default tracking-[-0.03em] mb-4 text-balance">
            {server.name}
          </h1>
          {server.description && (
            <p className="text-lg text-fg-muted leading-relaxed max-w-2xl">
              {server.description}
            </p>
          )}
          <p className="text-sm text-fg-muted mt-3">
            by <span className="font-medium text-fg-default">{owner}</span>
            {server.repo && (
              <> &middot; <span className="font-mono">{owner}/{repo}</span></>
            )}
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="rounded-xl border border-border-default bg-surface-1 p-5">
            <p className="text-xs uppercase tracking-[0.1em] text-accent-default mb-3">Install</p>
            {server.install_command ? (
              <code className="text-sm font-mono bg-surface-0 border border-border-default rounded-lg px-3 py-2 block text-fg-default break-all">
                {server.install_command}
              </code>
            ) : (
              <p className="text-sm text-fg-muted">
                See{' '}
                {server.github_url ? (
                  <a href={server.github_url} target="_blank" rel="noopener noreferrer" className="text-accent-default hover:opacity-80">
                    GitHub repository
                  </a>
                ) : 'repository'}{' '}
                for installation instructions.
              </p>
            )}
          </div>

          <div className="rounded-xl border border-border-default bg-surface-1 p-5">
            <p className="text-xs uppercase tracking-[0.1em] text-accent-default mb-3">Links</p>
            <div className="space-y-2">
              {server.github_url && (
                <a
                  href={server.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-fg-default hover:text-accent-default transition-colors"
                >
                  <span>GitHub →</span>
                  <span className="text-fg-muted text-xs truncate">{server.github_url.replace('https://github.com/', '')}</span>
                </a>
              )}
              <Link
                to={`/mcp-servers/${CATEGORY_SLUGS[server.category] ?? 'other'}`}
                className="flex items-center gap-2 text-sm text-fg-muted hover:text-fg-default transition-colors"
              >
                Browse all {server.category} MCP servers →
              </Link>
            </div>
          </div>
        </div>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-fg-default mb-4 tracking-tight">
            How to use {server.name} with Claude
          </h2>
          <div className="space-y-4 text-sm text-fg-muted leading-relaxed">
            <p>
              <strong className="text-fg-default">{server.name}</strong> is a Model Context Protocol (MCP) server
              that gives Claude and other AI agents direct access to {server.category.toLowerCase()} capabilities.
              Once installed, you can use it in Claude Desktop, Cursor, or any MCP-compatible client.
            </p>
            {server.install_command && (
              <div className="rounded-lg border border-border-default bg-surface-1 p-4">
                <p className="text-xs uppercase tracking-[0.1em] text-fg-muted mb-2">Quick start</p>
                <ol className="space-y-2 list-decimal list-inside text-sm text-fg-muted">
                  <li>Run: <code className="font-mono bg-surface-0 px-1.5 py-0.5 rounded text-xs">{server.install_command}</code></li>
                  <li>Add the server to your Claude Desktop <code className="font-mono bg-surface-0 px-1.5 py-0.5 rounded text-xs">claude_desktop_config.json</code></li>
                  <li>Restart Claude Desktop and the server will be available</li>
                </ol>
              </div>
            )}
          </div>
        </section>

        <section className="mb-10 rounded-xl border border-border-default bg-surface-1 p-6">
          <h2 className="text-lg font-bold text-fg-default mb-4 tracking-tight">
            About {server.name}
          </h2>
          <div className="flex flex-wrap gap-3 mb-4">
            {server.language && (
              <span className="text-xs px-2.5 py-1 rounded-full border border-border-default text-fg-muted">
                {server.language}
              </span>
            )}
            {server.stars > 0 && (
              <span className="text-xs px-2.5 py-1 rounded-full border border-border-default text-fg-muted">
                ★ {server.stars.toLocaleString()} stars
              </span>
            )}
            {server.last_updated && (
              <span className="text-xs px-2.5 py-1 rounded-full border border-border-default text-fg-muted">
                Updated {new Date(server.last_updated).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
            )}
            {server.source && (
              <span className="text-xs px-2.5 py-1 rounded-full border border-border-default text-fg-muted capitalize">
                Source: {server.source}
              </span>
            )}
          </div>
          <p className="text-sm text-fg-muted leading-relaxed">
            {server.name} is an open-source MCP server in the{' '}
            <strong className="text-fg-default">{server.category}</strong> category
            {server.language && <>, built in <strong className="text-fg-default">{server.language}</strong></>}.
            {' '}It connects Claude and other MCP-compatible clients to {server.category.toLowerCase()} systems directly.
            {server.github_url && (
              <> Source available on{' '}
                <a href={server.github_url} target="_blank" rel="noopener noreferrer" className="text-accent-default hover:opacity-80">
                  GitHub
                </a>.
              </>
            )}
          </p>
        </section>

        {(CATEGORY_USE_CASES[server.category] || CATEGORY_USE_CASES['Other']).length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-fg-default mb-4 tracking-tight">
              Use cases for {server.category} MCP servers
            </h2>
            <ul className="space-y-3">
              {(CATEGORY_USE_CASES[server.category] || CATEGORY_USE_CASES['Other']).map((uc) => (
                <li key={uc} className="flex gap-3 text-sm text-fg-muted leading-relaxed">
                  <span className="text-accent-default flex-shrink-0 mt-0.5">→</span>
                  <span>{uc}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mb-10 rounded-xl border border-border-default bg-surface-1 p-6">
          <h2 className="text-lg font-bold text-fg-default mb-4 tracking-tight">
            Where {server.name} fits in an MCP workflow
          </h2>
          <div className="space-y-3 text-sm text-fg-muted leading-relaxed">
            <p>
              Teams use <strong className="text-fg-default">{server.name}</strong> to give Claude a direct bridge into
              {' '}{server.category.toLowerCase()} workflows, so routine actions happen inside the AI client instead of across separate tabs and dashboards.
            </p>
            <p>
              {server.install_command
                ? `Once installed and configured, ${server.name} can be part of repeatable MCP workflows for research, operations, and execution tasks tied to your ${server.category.toLowerCase()} stack.`
                : `${server.name} can be connected to MCP clients by following the repository setup instructions, making it useful for teams that want AI access to ${server.category.toLowerCase()} systems.`}
            </p>
          </div>
        </section>

        {related.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-bold text-fg-default mb-4 tracking-tight">
              More {server.category} MCP servers
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {related.map(s => (
                <Link
                  key={s.id}
                  to={`/mcp-servers/${s.owner}/${s.repo}`}
                  className="rounded-lg border border-border-default p-4 hover:border-accent-muted transition-colors"
                >
                  <p className="text-sm font-medium text-fg-default mb-1">{s.name}</p>
                  {s.description && (
                    <p className="text-xs text-fg-muted line-clamp-2">{s.description}</p>
                  )}
                  {s.stars > 0 && (
                    <p className="text-xs text-fg-muted mt-1.5">★ {s.stars.toLocaleString()}</p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="rounded-xl border border-border-default bg-surface-1 p-6 md:p-8">
          <p className="text-sm uppercase tracking-[0.12em] text-accent-default mb-3">Built with MCP?</p>
          <h2 className="text-xl font-bold text-fg-default mb-3 tracking-tight">
            Altor deploys MCP servers into production for B2B engineering teams.
          </h2>
          <p className="text-sm text-fg-muted leading-relaxed mb-5">
            We connect AI agents to your live systems — ClickHouse, Linear, Stripe, GitHub — using MCP
            and deploy them to production in 3 weeks. Not demo.
          </p>
          <a
            href="https://calendly.com/founders-altorlab/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-accent-default hover:opacity-80 transition-opacity"
          >
            Talk to Altor →
          </a>
        </div>
      </article>
    </>
  )
}
