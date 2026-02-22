import { content } from '../content'

const Footer = () => {
  const productLinks = [
    ['How it works', 'how-it-works'],
    ['Integrations', 'the-stack'],
    ['Trust & safety', 'trust'],
    ['Getting started', 'onboarding'],
    ['FAQ', 'faq'],
  ]

  const go = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-edge-subtle">
      <div className="max-w-[1120px] mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div>
            <a href="/" className="font-display font-bold text-fg tracking-[-0.02em] text-[1.0625rem]">
              {content.companyName}
            </a>
            <p className="text-fg-muted text-[0.8125rem] mt-2 max-w-[28ch] leading-relaxed">
              The investigation layer for B2B technical support.
            </p>
            <p className="text-fg-faint text-[0.75rem] mt-3 leading-relaxed">
              Usage-based pricing. No seat minimums.
            </p>
          </div>

          <div className="flex gap-10 sm:gap-16">
            <div>
              <h4 className="text-fg-muted font-mono text-[0.6875rem] tracking-[0.05em] uppercase mb-4">Product</h4>
              <div className="flex flex-col gap-2.5">
                {productLinks.map(([label, id]) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={go(id)}
                    className="text-[0.8125rem] text-fg-secondary hover:text-fg transition-colors duration-200"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-fg-muted font-mono text-[0.6875rem] tracking-[0.05em] uppercase mb-4">Connect</h4>
              <div className="flex flex-col gap-2.5">
                <a href={`mailto:${content.footer.email}`} className="text-[0.8125rem] text-fg-secondary hover:text-fg transition-colors duration-200">
                  Email
                </a>
                <a href={content.footer.linkedIn} target="_blank" rel="noopener noreferrer" className="text-[0.8125rem] text-fg-secondary hover:text-fg transition-colors duration-200">
                  LinkedIn
                </a>
                <a href={content.hero.primaryCTA.url} target="_blank" rel="noopener noreferrer" className="text-[0.8125rem] text-fg-secondary hover:text-fg transition-colors duration-200">
                  Book a demo
                </a>
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
