import { Link, useLocation } from 'react-router-dom'
import { content } from '../content'

const Footer = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'

  const productLinks = [
    ['How it works', 'how-it-works'],
    ['Integrations', 'the-stack'],
    ['Trust & safety', 'trust'],
    ['Getting started', 'onboarding'],
    ['FAQ', 'faq'],
  ]

  const compareLinks = [
    ['vs. doc chatbots', '/compare/altor-vs-doc-chatbots'],
    ['vs. platform AI', '/compare/altor-vs-support-platform-ai'],
    ['vs. AI copilots', '/compare/altor-vs-copilot-for-support'],
  ]

  const moreLinks = [
    ['Portkey case study', '/customers/portkey'],
    ['API error investigation', '/use-case/api-error-investigation'],
    ['For AI infrastructure', '/for/ai-infrastructure-companies'],
    ['For API dev tools', '/for/api-first-developer-tools'],
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
              The investigation layer for B2B technical support.
            </p>
            <p className="text-fg-faint text-[0.75rem] mt-3 leading-relaxed">
              Usage-based pricing. No seat minimums.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:flex gap-10 sm:gap-12">
            <div>
              <h4 className="text-fg-muted font-mono text-[0.6875rem] tracking-[0.05em] uppercase mb-4">Product</h4>
              <div className="flex flex-col gap-2.5">
                {productLinks.map(([label, id]) => (
                  isHome ? (
                    <a key={id} href={`#${id}`} onClick={go(id)} className={linkClass}>{label}</a>
                  ) : (
                    <Link key={id} to={`/#${id}`} className={linkClass}>{label}</Link>
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
                <a href={content.hero.primaryCTA.url} target="_blank" rel="noopener noreferrer" className={linkClass}>Book a demo</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-edge-subtle flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="text-[0.75rem] text-fg-faint">{content.footer.copyright}</span>
          <span className="text-[0.75rem] text-fg-faint">San Francisco, CA</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
