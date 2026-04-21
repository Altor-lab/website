import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import PageHead from '../components/PageHead'

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
  'Data & Analytics': 'bg-indigo-50 text-indigo-800 border-indigo-200',
  'Finance': 'bg-teal-50 text-teal-800 border-teal-200',
  'Security': 'bg-red-50 text-red-800 border-red-200',
  'Media': 'bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200',
  'Maps & Location': 'bg-lime-50 text-lime-800 border-lime-200',
  'Developer Tools': 'bg-zinc-50 text-zinc-700 border-zinc-200',
  'Other': 'bg-zinc-50 text-zinc-500 border-zinc-200',
}

const CATEGORY_META = {
  'Databases': {
    slug: 'databases',
    description: 'MCP servers that connect Claude and AI agents directly to databases — Postgres, MySQL, SQLite, MongoDB, Redis, Supabase, and more. Query your data in natural language without writing SQL manually.',
    useCases: ['Query production databases in natural language', 'Generate and run SQL from plain English', 'Inspect schemas and relationships', 'Debug slow queries and data anomalies'],
    topTools: ['PostgreSQL', 'MySQL', 'SQLite', 'MongoDB', 'Redis', 'Supabase'],
  },
  'Web & Browser': {
    slug: 'web-browser',
    description: 'MCP servers for browser automation, web scraping, and site interaction. Let Claude control browsers, fill forms, extract content, and automate web workflows using Playwright, Puppeteer, and more.',
    useCases: ['Automate browser workflows end-to-end', 'Scrape and extract structured data from websites', 'Run UI tests and visual regression checks', 'Navigate and interact with web applications'],
    topTools: ['Playwright', 'Puppeteer', 'Firecrawl', 'BrowserBase', 'Crawlee'],
  },
  'Version Control': {
    slug: 'version-control',
    description: 'MCP servers for Git, GitHub, GitLab, and Bitbucket. Let Claude read repos, create PRs, manage issues, review code, and interact with your version control workflow directly.',
    useCases: ['Review and create pull requests', 'Search codebases and commit history', 'Manage issues and project boards', 'Automate release notes and changelogs'],
    topTools: ['GitHub', 'GitLab', 'Bitbucket', 'Git'],
  },
  'Developer Tools': {
    slug: 'developer-tools',
    description: 'MCP servers for developer workflows — code execution, terminal access, CI/CD, testing, and debugging. Give Claude direct access to your development environment.',
    useCases: ['Execute code and run shell commands', 'Read and write files in your project', 'Run tests and interpret results', 'Access CI/CD pipelines and deployment logs'],
    topTools: ['Shell / Terminal', 'Docker', 'Kubernetes', 'Linear', 'Jira', 'Sentry'],
  },
  'Search': {
    slug: 'search',
    description: 'MCP servers for web search, document search, and knowledge retrieval. Connect Claude to real-time search engines, enterprise knowledge bases, and vector databases.',
    useCases: ['Search the web in real time', 'Query internal knowledge bases and wikis', 'Retrieve relevant documents by semantic similarity', 'Monitor brand mentions and news'],
    topTools: ['Brave Search', 'Exa', 'Tavily', 'DuckDuckGo', 'Algolia', 'Context7'],
  },
  'AI & ML': {
    slug: 'ai-ml',
    description: 'MCP servers for AI and machine learning workflows — memory, embeddings, reasoning, model evaluation, and agent orchestration. Extend Claude with persistent memory and advanced reasoning capabilities.',
    useCases: ['Give Claude persistent memory across conversations', 'Store and retrieve embeddings from vector databases', 'Chain multi-step reasoning with sequential thinking', 'Build knowledge graphs from documents'],
    topTools: ['Memory', 'Sequential Thinking', 'Knowledge Graph', 'Pinecone', 'Weaviate'],
  },
  'Cloud & Infra': {
    slug: 'cloud-infra',
    description: 'MCP servers for cloud infrastructure — AWS, GCP, Azure, Cloudflare, Kubernetes, and more. Let Claude query your infrastructure, manage deployments, and debug production systems.',
    useCases: ['Inspect cloud resources and configurations', 'Debug infrastructure failures', 'Manage Kubernetes workloads', 'Query cloud billing and usage metrics'],
    topTools: ['AWS', 'Google Cloud', 'Azure', 'Cloudflare', 'Kubernetes', 'Terraform'],
  },
  'Productivity': {
    slug: 'productivity',
    description: 'MCP servers for productivity and collaboration tools — Notion, Slack, Google Drive, Calendar, Jira, and more. Let Claude interact with the tools your team uses every day.',
    useCases: ['Read and write Notion pages and databases', 'Search and send Slack messages', 'Manage Google Drive files and documents', 'Create and update calendar events'],
    topTools: ['Notion', 'Slack', 'Google Drive', 'Linear', 'Jira', 'Asana'],
  },
  'Communication': {
    slug: 'communication',
    description: 'MCP servers for messaging and communication platforms — Slack, Discord, email, Telegram, and more. Let Claude send messages, monitor channels, and automate communication workflows.',
    useCases: ['Send and read Slack messages', 'Monitor Discord servers and channels', 'Compose and send emails', 'Automate notification workflows'],
    topTools: ['Slack', 'Discord', 'Gmail', 'Telegram', 'Twilio', 'SendGrid'],
  },
  'Data & Analytics': {
    slug: 'data-analytics',
    description: 'MCP servers for data platforms and analytics — BigQuery, Snowflake, Datadog, Amplitude, and more. Query your analytics data and monitoring systems directly from Claude.',
    useCases: ['Query BigQuery and Snowflake in natural language', 'Pull analytics metrics from Amplitude or Mixpanel', 'Inspect Datadog alerts and dashboards', 'Generate data reports and summaries'],
    topTools: ['BigQuery', 'Snowflake', 'Datadog', 'Amplitude', 'Grafana', 'Sentry'],
  },
  'File System': {
    slug: 'file-system',
    description: 'MCP servers for file and storage systems — local filesystem, S3, Google Drive, Dropbox, and more. Let Claude read, write, and manage files across your storage infrastructure.',
    useCases: ['Read and write local files and directories', 'Upload and download from S3 or cloud storage', 'Parse and process documents (PDF, CSV, JSON)', 'Manage file permissions and metadata'],
    topTools: ['Filesystem', 'AWS S3', 'Google Drive', 'Dropbox', 'Box'],
  },
  'Finance': {
    slug: 'finance',
    description: 'MCP servers for financial data and payment systems — Stripe, Plaid, market data APIs, and accounting tools. Let Claude query financial records, process payments, and analyze market data.',
    useCases: ['Query Stripe payments and subscription data', 'Access bank transactions via Plaid', 'Retrieve real-time market prices and financial data', 'Automate invoice and billing workflows'],
    topTools: ['Stripe', 'Plaid', 'QuickBooks', 'Alpha Vantage', 'Yahoo Finance'],
  },
  'Security': {
    slug: 'security',
    description: 'MCP servers for security, authentication, and vulnerability management. Connect Claude to security scanners, credential stores, and compliance tools.',
    useCases: ['Scan for vulnerabilities and security issues', 'Manage secrets and API keys securely', 'Query CVE databases and security advisories', 'Automate compliance checks and audits'],
    topTools: ['HashiCorp Vault', 'Snyk', 'Shodan', '1Password', 'Auth0'],
  },
  'Media': {
    slug: 'media',
    description: 'MCP servers for media, images, audio, and video processing. Let Claude generate images, process documents, transcribe audio, and interact with media APIs.',
    useCases: ['Generate and edit images with AI', 'Transcribe audio and video files', 'Process PDFs and extract text and structure', 'Interact with YouTube, Spotify, and media platforms'],
    topTools: ['YouTube', 'Spotify', 'Cloudinary', 'AssemblyAI', 'PDF tools'],
  },
  'Maps & Location': {
    slug: 'maps-location',
    description: 'MCP servers for geolocation, mapping, and location data. Connect Claude to Google Maps, OpenStreetMap, weather APIs, and other location-aware services.',
    useCases: ['Get directions and map data', 'Look up addresses and geocode locations', 'Retrieve weather forecasts and conditions', 'Query points of interest and business data'],
    topTools: ['Google Maps', 'OpenStreetMap', 'Weather APIs', 'Mapbox', 'Here'],
  },
  'Other': {
    slug: 'other',
    description: 'MCP servers that span multiple categories or serve specialized use cases not covered elsewhere. Includes emerging integrations, niche tools, and experimental servers.',
    useCases: ['Specialized domain integrations', 'Emerging tool support', 'Custom enterprise connections', 'Experimental MCP capabilities'],
    topTools: [],
  },
}

const SLUG_TO_CATEGORY = Object.entries(CATEGORY_META).reduce((acc, [cat, meta]) => {
  acc[meta.slug] = cat
  return acc
}, {})

const PAGE_SIZE = 48

function ServerCard({ server }) {
  const catClass = CATEGORY_COLORS[server.category] ?? CATEGORY_COLORS['Other']
  const slug = server.owner && server.repo ? `${server.owner}/${server.repo}` : null
  return (
    <article className="rounded-xl border border-border-default bg-surface-1 p-5 hover:border-accent-muted transition-colors flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          {slug ? (
            <Link to={`/mcp-servers/${slug}`} className="text-base font-semibold text-fg-default hover:text-accent-default transition-colors line-clamp-1">
              {server.name}
            </Link>
          ) : (
            <p className="text-base font-semibold text-fg-default line-clamp-1">{server.name}</p>
          )}
          {server.owner && <p className="text-xs text-fg-muted mt-0.5">{server.owner}/{server.repo}</p>}
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded border flex-shrink-0 ${catClass}`}>
          {server.category}
        </span>
      </div>
      {server.description && (
        <p className="text-sm text-fg-muted leading-relaxed line-clamp-2">{server.description}</p>
      )}
      <div className="flex items-center gap-3 mt-auto pt-1">
        {server.stars > 0 && <span className="text-xs text-fg-muted">★ {server.stars.toLocaleString()}</span>}
        {server.install_command && (
          <code className="text-xs bg-surface-0 border border-border-default rounded px-2 py-0.5 text-fg-muted truncate max-w-[160px]">
            {server.install_command}
          </code>
        )}
        {server.github_url && (
          <a href={server.github_url} target="_blank" rel="noopener noreferrer"
            className="text-xs text-accent-default hover:opacity-80 ml-auto flex-shrink-0">
            GitHub ↗
          </a>
        )}
      </div>
    </article>
  )
}

export default function MCPCategory() {
  const { categorySlug } = useParams()
  const category = SLUG_TO_CATEGORY[categorySlug]

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState('stars')

  useEffect(() => {
    fetch('/data/mcp-servers.json')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => { setPage(1) }, [search, sort])

  const allServers = useMemo(() => {
    if (!data || !category) return []
    let list = data.servers.filter(s => s.category === category)
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(s =>
        s.name.toLowerCase().includes(q) ||
        (s.description || '').toLowerCase().includes(q) ||
        (s.owner || '').toLowerCase().includes(q)
      )
    }
    if (sort === 'stars') list = [...list].sort((a, b) => (b.stars || 0) - (a.stars || 0))
    else if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [data, category, search, sort])

  const pageServers = useMemo(() => allServers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [allServers, page])
  const totalPages = Math.ceil(allServers.length / PAGE_SIZE)
  const topServers = useMemo(() => {
    if (!data || !category) return []
    return data.servers
      .filter(s => s.category === category && s.stars > 0)
      .sort((a, b) => b.stars - a.stars)
      .slice(0, 5)
  }, [data, category])

  const otherCategories = useMemo(() => {
    if (!data) return []
    return Object.entries(CATEGORY_META)
      .filter(([cat]) => cat !== category && cat !== 'Other')
      .map(([cat, meta]) => ({ cat, meta, count: data.meta?.categories?.[cat] ?? 0 }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8)
  }, [data, category])

  if (!category) return <Navigate to="/mcp-servers" replace />

  const meta = CATEGORY_META[category]
  const count = data?.meta?.categories?.[category] ?? 0

  const faqSchema = {
    '@type': 'FAQPage',
    '@id': `https://altorlab.com/mcp-servers/${meta.slug}#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: `What are ${category} MCP servers?`,
        acceptedAnswer: { '@type': 'Answer', text: meta.description },
      },
      {
        '@type': 'Question',
        name: `How do I install a ${category} MCP server?`,
        acceptedAnswer: { '@type': 'Answer', text: `Most ${category} MCP servers can be installed with a single command using npx or uvx. Find the server you need, copy its install command, add the configuration to your claude_desktop_config.json file, and restart Claude Desktop. Each server's detail page has step-by-step setup instructions.` },
      },
      {
        '@type': 'Question',
        name: `Which ${category} MCP server should I use?`,
        acceptedAnswer: { '@type': 'Answer', text: `The best ${category} MCP server depends on your specific tool. Look for servers with high GitHub star counts and recent maintenance activity. ${meta.topTools.length > 0 ? `Popular options include servers for: ${meta.topTools.slice(0, 4).join(', ')}.` : ''}` },
      },
    ],
  }

  const collectionSchema = {
    '@type': 'CollectionPage',
    '@id': `https://altorlab.com/mcp-servers/${meta.slug}#collection`,
    name: `${category} MCP Servers`,
    description: meta.description,
    numberOfItems: count,
    url: `https://altorlab.com/mcp-servers/${meta.slug}`,
    creator: { '@type': 'Organization', name: 'Altor', url: 'https://altorlab.com' },
  }

  return (
    <>
      <PageHead
        title={`${category} MCP Servers — ${count} servers for ${category} | Altor`}
        description={`${meta.description.slice(0, 155)}`}
        slug={`/mcp-servers/${meta.slug}`}
        datePublished="2026-04-21"
        dateModified={data?.meta?.generated_at?.slice(0, 10) ?? '2026-04-21'}
        schemaType="WebPage"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'MCP Servers', url: '/mcp-servers' },
          { name: category, url: null },
        ]}
        extraSchema={[collectionSchema, faqSchema]}
      />

      <section className="max-w-6xl mx-auto px-4 pt-28 pb-12 md:pt-36">
        <nav className="text-sm text-fg-muted mb-8">
          <Link to="/" className="hover:text-fg-default">Home</Link>
          <span className="mx-2">&gt;</span>
          <Link to="/mcp-servers" className="hover:text-fg-default">MCP Servers</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-fg-default">{category}</span>
        </nav>

        <header className="mb-10 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.12em] text-accent-default mb-3">MCP server directory</p>
          <h1 className="text-3xl md:text-5xl font-bold text-fg-default tracking-[-0.03em] mb-4 text-balance">
            {category} MCP Servers
          </h1>
          <p className="text-lg text-fg-muted leading-relaxed text-pretty mb-6">{meta.description}</p>

          {meta.useCases.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {meta.useCases.map(uc => (
                <span key={uc} className="text-xs px-2.5 py-1 rounded-full border border-border-default text-fg-muted bg-surface-1">
                  {uc}
                </span>
              ))}
            </div>
          )}

          {!loading && (
            <div className="flex flex-wrap gap-6 mt-6">
              <div>
                <p className="text-2xl font-bold text-fg-default tracking-tight">{count.toLocaleString()}</p>
                <p className="text-xs text-fg-muted mt-0.5">Servers in {category}</p>
              </div>
              {topServers[0] && (
                <div>
                  <p className="text-2xl font-bold text-fg-default tracking-tight">★ {topServers[0].stars.toLocaleString()}</p>
                  <p className="text-xs text-fg-muted mt-0.5">Most starred ({topServers[0].name})</p>
                </div>
              )}
            </div>
          )}
        </header>

        {!loading && topServers.length > 0 && (
          <section className="mb-10">
            <h2 className="text-base font-bold text-fg-default mb-4 tracking-tight">Most popular {category} servers</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {topServers.map(s => (
                <Link key={s.id} to={`/mcp-servers/${s.owner}/${s.repo}`}
                  className="rounded-xl border border-border-default bg-surface-1 p-4 hover:border-accent-muted transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-sm font-semibold text-fg-default line-clamp-1">{s.name}</p>
                    <span className="text-xs text-fg-muted flex-shrink-0">★ {s.stars.toLocaleString()}</span>
                  </div>
                  {s.description && <p className="text-xs text-fg-muted line-clamp-2">{s.description}</p>}
                </Link>
              ))}
            </div>
          </section>
        )}

        {loading && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-border-default bg-surface-1 p-5 animate-pulse">
                <div className="h-4 bg-border-default rounded w-2/3 mb-3" />
                <div className="h-3 bg-border-default rounded w-full mb-2" />
                <div className="h-3 bg-border-default rounded w-4/5" />
              </div>
            ))}
          </div>
        )}

        {data && (
          <>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="search"
                placeholder={`Search ${category} servers...`}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-border-default bg-surface-0 text-fg-default placeholder-fg-muted focus:outline-none focus:border-accent-default transition-colors"
              />
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="px-3 py-2 text-sm rounded-lg border border-border-default bg-surface-0 text-fg-default focus:outline-none focus:border-accent-default"
              >
                <option value="stars">Sort: Stars</option>
                <option value="name">Sort: Name</option>
              </select>
            </div>

            <p className="text-xs text-fg-muted mb-6">
              {allServers.length} servers
              {search ? ` matching "${search}"` : ''}
              {totalPages > 1 ? ` · page ${page} of ${totalPages}` : ''}
            </p>

            {pageServers.length === 0 ? (
              <p className="text-fg-muted text-sm">No servers match your search.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {pageServers.map(server => <ServerCard key={server.id} server={server} />)}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center gap-2 mt-8 flex-wrap">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 text-sm rounded-lg border border-border-default text-fg-muted disabled:opacity-40 hover:border-accent-muted transition-colors"
                >
                  ← Previous
                </button>
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  const pg = totalPages <= 7 ? i + 1 : page <= 4 ? i + 1 : page >= totalPages - 3 ? totalPages - 6 + i : page - 3 + i
                  return (
                    <button key={pg} onClick={() => setPage(pg)}
                      className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${pg === page ? 'bg-accent-default text-white border-accent-default' : 'border-border-default text-fg-muted hover:border-accent-muted'}`}>
                      {pg}
                    </button>
                  )
                })}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 text-sm rounded-lg border border-border-default text-fg-muted disabled:opacity-40 hover:border-accent-muted transition-colors"
                >
                  Next →
                </button>
              </div>
            )}

            <section className="mt-16 mb-10">
              <h2 className="text-base font-bold text-fg-default mb-4 tracking-tight">Browse other categories</h2>
              <div className="flex flex-wrap gap-2">
                {otherCategories.map(({ cat, meta: m, count: c }) => (
                  <Link key={cat} to={`/mcp-servers/${m.slug}`}
                    className="px-3 py-1.5 text-xs rounded-lg border border-border-default text-fg-muted hover:border-accent-muted hover:text-fg-default transition-colors">
                    {cat} ({c})
                  </Link>
                ))}
                <Link to="/mcp-servers" className="px-3 py-1.5 text-xs rounded-lg border border-border-default text-accent-default hover:opacity-80 transition-opacity">
                  View all →
                </Link>
              </div>
            </section>

            <section className="mb-10 max-w-2xl">
              <h2 className="text-lg font-bold text-fg-default mb-4 tracking-tight">
                About {category} MCP servers
              </h2>
              <div className="space-y-3 text-sm text-fg-muted leading-relaxed">
                <p>{meta.description}</p>
                {meta.useCases.length > 0 && (
                  <div>
                    <p className="text-xs uppercase tracking-[0.1em] text-fg-muted mb-2 mt-4">Common use cases</p>
                    <ul className="space-y-1">
                      {meta.useCases.map(uc => (
                        <li key={uc} className="flex gap-2">
                          <span className="text-accent-default flex-shrink-0">✓</span> {uc}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>

            <section className="mb-10 max-w-2xl">
              <h2 className="text-lg font-bold text-fg-default mb-5 tracking-tight">Frequently asked questions</h2>
              <div className="space-y-0 divide-y divide-border-default rounded-xl border border-border-default overflow-hidden">
                {faqSchema.mainEntity.map(q => (
                  <details key={q.name} className="group bg-surface-0 hover:bg-surface-1 transition-colors">
                    <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none">
                      <span className="text-sm font-medium text-fg-default">{q.name}</span>
                      <span className="text-fg-muted group-open:rotate-45 transition-transform flex-shrink-0 text-lg">+</span>
                    </summary>
                    <p className="px-5 pb-5 text-sm text-fg-muted leading-relaxed">{q.acceptedAnswer.text}</p>
                  </details>
                ))}
              </div>
            </section>

            <div className="rounded-xl border border-border-default bg-surface-1 p-6 md:p-8 max-w-2xl">
              <p className="text-sm uppercase tracking-[0.12em] text-accent-default mb-3">Built with MCP?</p>
              <h2 className="text-xl font-bold text-fg-default mb-3 tracking-tight">
                Altor deploys {category} MCP servers into production.
              </h2>
              <p className="text-sm text-fg-muted leading-relaxed mb-5">
                We connect AI agents to your {category.toLowerCase()} systems using MCP and deploy them
                into production in 3 weeks. Not demo.
              </p>
              <a href="https://calendly.com/founders-altorlab/30min" target="_blank" rel="noopener noreferrer"
                className="text-sm font-medium text-accent-default hover:opacity-80 transition-opacity">
                Talk to Altor →
              </a>
            </div>
          </>
        )}
      </section>
    </>
  )
}
