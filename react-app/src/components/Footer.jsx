import { Link, useLocation } from 'react-router-dom'
import { content } from '../content'

const Footer = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'

  const productLinks = [
    ['Platform', '/platform'],
    ['How it works', 'how-it-works'],
    ['Integrations', 'the-stack'],
    ['Trust & safety', 'trust'],
    ['FAQ', 'faq'],
    ['About', '/about'],
  ]

  const compareLinks = [
    ['vs. doc chatbots', '/compare/altor-vs-doc-chatbots'],
    ['vs. platform AI', '/compare/altor-vs-support-platform-ai'],
    ['vs. AI copilots', '/compare/altor-vs-copilot-for-support'],
  ]

  const moreLinks = [
    ['Portkey: 45 min → 2', '/customers/portkey'],
    ['API error investigation', '/use-case/api-error-investigation'],
    ['Webhook failure investigation', '/use-case/webhook-failure-investigation'],
    ['For AI infrastructure', '/for/ai-infrastructure-companies'],
    ['For ClickHouse teams', '/for/clickhouse-teams'],
    ['Blog', '/blog'],
    ['Glossary', '/glossary'],
  ]

  const go = (id) => (e) => {
    if (isHome) {
      e.preventDefault()
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const linkClass = 'text-[0.8125rem] text-fg-secondary hover:text-fg transition-colors duration-200'

  return (
    <footer className="border-t border-edge-subtle">
      <div className="max-w-[1120px] mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div>
            <Link to="/" className="font-display font-bold text-fg tracking-[-0.02em] text-[1.0625rem]">
              {content.companyName}
            </Link>
            <p className="text-fg-muted text-[0.8125rem] mt-2 max-w-[28ch] leading-relaxed">
              45 minutes to 2. Automated support investigation for US B2B engineering teams.
            </p>
            <p className="text-fg-faint text-[0.75rem] mt-3 leading-relaxed">
              200+ tickets diagnosed at Portkey. Deployed in 3 weeks.
            </p>
            <p className="text-fg-faint text-[0.75rem] mt-2 leading-relaxed">
              Usage-based in USD. No seat minimums. EST &amp; PST hours.
            </p>
            <p className="text-fg-faint text-[0.75rem] mt-2 leading-relaxed">
              Email <a href="mailto:anshul@altorlab.com" className="text-fg-secondary hover:text-fg transition-colors">anshul@altorlab.com</a>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:flex gap-10 sm:gap-12">
            <div>
              <h4 className="text-fg-muted font-mono text-[0.6875rem] tracking-[0.05em] uppercase mb-4">Product</h4>
              <div className="flex flex-col gap-2.5">
                {productLinks.map(([label, dest]) => (
                  dest.startsWith('/') ? (
                    <Link key={dest} to={dest} className={linkClass}>{label}</Link>
                  ) : isHome ? (
                    <a key={dest} href={`#${dest}`} onClick={go(dest)} className={linkClass}>{label}</a>
                  ) : (
                    <Link key={dest} to={`/#${dest}`} className={linkClass}>{label}</Link>
                  )
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-fg-muted font-mono text-[0.6875rem] tracking-[0.05em] uppercase mb-4">Compare</h4>
              <div className="flex flex-col gap-2.5">
                {compareLinks.map(([label, path]) => (
                  <Link key={path} to={path} className={linkClass}>{label}</Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-fg-muted font-mono text-[0.6875rem] tracking-[0.05em] uppercase mb-4">Resources</h4>
              <div className="flex flex-col gap-2.5">
                {moreLinks.map(([label, path]) => (
                  <Link key={path} to={path} className={linkClass}>{label}</Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-fg-muted font-mono text-[0.6875rem] tracking-[0.05em] uppercase mb-4">Connect</h4>
              <div className="flex flex-col gap-2.5">
                <a href={`mailto:${content.footer.email}`} className={linkClass}>Email</a>
                <a href={content.footer.linkedIn} target="_blank" rel="noopener noreferrer" className={linkClass}>LinkedIn</a>
                <a href={content.hero.primaryCTA.url} target="_blank" rel="noopener noreferrer" className={linkClass}>{content.hero.primaryCTA.text}</a>
              </div>
            </div>

            <div>
              <h4 className="text-fg-muted font-mono text-[0.6875rem] tracking-[0.05em] uppercase mb-4">AltorLab</h4>
              <div className="flex flex-col gap-2.5">
                <a href="https://altorlab.dev" target="_blank" rel="noopener noreferrer" className={linkClass}>Vector Search SDK</a>
                <a href="https://altorlab.app" target="_blank" rel="noopener noreferrer" className={linkClass}>Accessibility Scanner</a>
                <a href="https://altorlab.xyz" target="_blank" rel="noopener noreferrer" className={linkClass}>AI Marketing Agency</a>
                <a href="https://app.altorlab.org" target="_blank" rel="noopener noreferrer" className={linkClass}>AI Room Redesign</a>
                <a href="https://kundlimilan.co.in" target="_blank" rel="noopener noreferrer" className={linkClass}>Kundli Milan</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-edge-subtle flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="text-[0.75rem] text-fg-faint">{content.footer.copyright}</span>
          <span className="text-[0.75rem] text-fg-faint">{content.footer.serving} · EST &amp; PST hours</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
