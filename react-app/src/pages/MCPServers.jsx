import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
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

function categoryClass(cat) {
  return CATEGORY_COLORS[cat] ?? CATEGORY_COLORS['Other']
}

function ServerCard({ server }) {
  const installSlug = server.owner && server.repo ? `${server.owner}/${server.repo}` : null
  return (
    <article className="rounded-xl border border-border-default bg-surface-1 p-5 hover:border-accent-muted transition-colors flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          {installSlug ? (
            <Link
              to={`/mcp-servers/${installSlug}`}
              className="text-base font-semibold text-fg-default hover:text-accent-default transition-colors line-clamp-1"
            >
              {server.name}
            </Link>
          ) : (
            <h2 className="text-base font-semibold text-fg-default line-clamp-1">{server.name}</h2>
          )}
          {server.owner && (
            <p className="text-xs text-fg-muted mt-0.5">{server.owner}/{server.repo}</p>
          )}
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded border flex-shrink-0 ${categoryClass(server.category)}`}>
          {server.category}
        </span>
      </div>

      {server.description && (
        <p className="text-sm text-fg-muted leading-relaxed line-clamp-2">{server.description}</p>
      )}

      <div className="flex items-center gap-3 mt-auto pt-1">
        {server.stars > 0 && (
          <span className="text-xs text-fg-muted flex items-center gap-1">
            <span>★</span> {server.stars.toLocaleString()}
          </span>
        )}
        {server.install_command && (
          <code className="text-xs bg-surface-0 border border-border-default rounded px-2 py-0.5 text-fg-muted truncate max-w-[180px]">
            {server.install_command}
          </code>
        )}
        {server.github_url && (
          <a
            href={server.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-accent-default hover:opacity-80 ml-auto flex-shrink-0"
          >
            GitHub ↗
          </a>
        )}
      </div>
    </article>
  )
}

const CATEGORY_SLUGS = {
  'Databases': 'databases', 'File System': 'file-system', 'Web & Browser': 'web-browser',
  'Version Control': 'version-control', 'Communication': 'communication',
  'Productivity': 'productivity', 'Cloud & Infra': 'cloud-infra', 'AI & ML': 'ai-ml',
  'Search': 'search', 'Data & Analytics': 'data-analytics', 'Finance': 'finance',
  'Security': 'security', 'Media': 'media', 'Maps & Location': 'maps-location',
  'Developer Tools': 'developer-tools', 'Other': 'other',
}

const PAGE_SIZE = 48

export default function MCPServers() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [sort, setSort] = useState('stars')
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch('/data/mcp-servers.json')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const categories = useMemo(() => {
    if (!data) return []
    return ['All', ...Object.keys(data.meta.categories || {}).sort()]
  }, [data])

  const allFiltered = useMemo(() => {
    if (!data) return []
    let list = data.servers.filter(s => {
      const matchCat = activeCategory === 'All' || s.category === activeCategory
      const q = search.toLowerCase()
      const matchSearch = !q || s.name.toLowerCase().includes(q) || (s.description || '').toLowerCase().includes(q) || (s.owner || '').toLowerCase().includes(q)
      return matchCat && matchSearch
    })
    if (sort === 'stars') list = [...list].sort((a, b) => (b.stars || 0) - (a.stars || 0))
    else if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [data, activeCategory, search, sort])

  const servers = useMemo(() => allFiltered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [allFiltered, page])
  const totalPages = Math.ceil(allFiltered.length / PAGE_SIZE)

  useEffect(() => { setPage(1) }, [search, activeCategory, sort])

  const meta = data?.meta

  return (
    <>
      <PageHead
        title="MCP Server Directory & Registry — List of MCP Servers | Altor"
        description={`Daily updated MCP directory and MCP server registry with ${meta ? meta.total_servers.toLocaleString() + '+' : '4,000+'} servers. Browse the full list of MCP servers from the official registry, GitHub, and the community.`}
        slug="/mcp-servers"
        datePublished="2026-04-16"
        dateModified={meta?.generated_at?.slice(0, 10) ?? '2026-04-16'}
        schemaType="WebPage"
        breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'MCP Server Directory', url: null }]}
        extraSchema={meta ? {
          '@type': 'Dataset',
          '@id': 'https://altorlab.com/mcp-servers#dataset',
          name: 'MCP Server Directory & Registry — List of MCP Servers',
          description: `Daily updated MCP directory with ${meta.total_servers.toLocaleString()} MCP servers across ${Object.keys(meta.categories || {}).length} categories. Sourced from the official MCP registry, GitHub, and community curation.`,
          url: 'https://altorlab.com/mcp-servers',
          creator: { '@type': 'Organization', name: 'Altor', url: 'https://altorlab.com' },
          dateModified: meta.generated_at,
          keywords: 'MCP server, MCP directory, MCP server registry, list of MCP servers, Model Context Protocol',
          temporalCoverage: '2026/..',
        } : undefined}
      />

      <section className="max-w-6xl mx-auto px-4 pt-28 pb-12 md:pt-36">
        <nav className="text-sm text-fg-muted mb-8">
          <Link to="/" className="hover:text-fg-default">Home</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-fg-default">MCP Servers</span>
        </nav>

        <header className="mb-10 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.12em] text-accent-default mb-3">MCP server directory & registry</p>
          <h1 className="text-3xl md:text-5xl font-bold text-fg-default tracking-[-0.03em] mb-4 text-balance">
            MCP Server Directory
          </h1>
          <p className="text-lg text-fg-muted leading-relaxed text-pretty">
            The most complete MCP server registry and list of MCP servers — updated daily.
            Connect Claude, Cursor, and your AI agents to databases, browsers, APIs, files,
            and more without writing integration code. Sourced from the official MCP registry,
            GitHub topic search, and community curation.
          </p>
          {meta && meta.total_servers > 0 && (
            <div className="flex flex-wrap gap-6 mt-6">
              <div>
                <p className="text-2xl font-bold text-fg-default tracking-tight">{meta.total_servers.toLocaleString()}</p>
                <p className="text-xs text-fg-muted mt-0.5">Servers indexed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-fg-default tracking-tight">{Object.keys(meta.categories || {}).length}</p>
                <p className="text-xs text-fg-muted mt-0.5">Categories</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-fg-default tracking-tight">{meta.sources?.official ?? 0}</p>
                <p className="text-xs text-fg-muted mt-0.5">Official registry</p>
              </div>
              <div className="self-end">
                <p className="text-xs text-fg-muted">Updated {new Date(meta.generated_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
          )}
        </header>

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

        {data && data.total_servers === 0 && !loading && (
          <div className="rounded-xl border border-border-default p-8 text-center">
            <p className="text-fg-muted text-sm">First crawl pending — check back in a few hours.</p>
          </div>
        )}

        {data && data.servers?.length > 0 && (
          <>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="search"
                placeholder="Search servers..."
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

            <div className="flex flex-wrap gap-1.5 mb-6">
              {categories.map(cat => {
                const isActive = activeCategory === cat
                const slug = CATEGORY_SLUGS[cat]
                const label = cat + (cat !== 'All' && meta?.categories?.[cat] ? ` (${meta.categories[cat]})` : '')
                if (cat !== 'All' && slug && !search) {
                  return (
                    <Link key={cat} to={`/mcp-servers/${slug}`}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors bg-surface-0 text-fg-muted border-border-default hover:border-accent-muted hover:text-fg-default">
                      {label}
                    </Link>
                  )
                }
                return (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                      isActive ? 'bg-accent-default text-white border-accent-default' : 'bg-surface-0 text-fg-muted border-border-default hover:border-accent-muted hover:text-fg-default'
                    }`}>
                    {label}
                  </button>
                )
              })}
            </div>

            <p className="text-xs text-fg-muted mb-6">
              {allFiltered.length.toLocaleString()} servers
              {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
              {search ? ` matching "${search}"` : ''}
              {totalPages > 1 ? ` · page ${page} of ${totalPages}` : ''}
            </p>

            {servers.length === 0 ? (
              <p className="text-fg-muted text-sm">No servers match your filters.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {servers.map(server => (
                  <ServerCard key={server.id} server={server} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center gap-2 mt-8 flex-wrap">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="px-3 py-1.5 text-sm rounded-lg border border-border-default text-fg-muted disabled:opacity-40 hover:border-accent-muted transition-colors">
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
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="px-3 py-1.5 text-sm rounded-lg border border-border-default text-fg-muted disabled:opacity-40 hover:border-accent-muted transition-colors">
                  Next →
                </button>
              </div>
            )}

            <div className="mt-16 rounded-xl border border-border-default bg-surface-1 p-6 md:p-8 max-w-2xl">
              <p className="text-sm uppercase tracking-[0.12em] text-accent-default mb-3">Built with MCP?</p>
              <h2 className="text-xl font-bold text-fg-default mb-3 tracking-tight">
                Altor builds production AI systems that use MCP in production.
              </h2>
              <p className="text-sm text-fg-muted leading-relaxed mb-5">
                We connect AI agents to your live data systems — ClickHouse, Linear, Stripe, GitHub — and deploy them
                into production in 3 weeks. MCP is the protocol. Altor is the team that makes it work.
              </p>
              <a
                href="https://calendly.com/founders-altorlab/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-accent-default hover:opacity-80 transition-opacity"
              >
                Talk to Altor about production AI systems →
              </a>
            </div>

            <p className="mt-8 text-xs text-fg-muted max-w-2xl leading-relaxed">
              Data sourced from the{' '}
              <a href="https://registry.modelcontextprotocol.io" target="_blank" rel="noopener noreferrer" className="underline hover:text-fg-default">official MCP registry</a>,
              GitHub topic search, and community curation. Updated daily.
            </p>
          </>
        )}
      </section>
    </>
  )
}
