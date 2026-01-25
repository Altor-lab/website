import { useState, useEffect } from 'react'
import { content } from '../content'
import Button from './Button'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => (e) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${isScrolled
        ? 'bg-[#0d1117]/95 backdrop-blur-md border-b border-[#21262d]'
        : 'bg-transparent'
        }`}
    >
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <span className="text-xl font-bold text-white tracking-tight">{content.companyName}</span>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#how-it-works"
              onClick={scrollTo('how-it-works')}
              className="text-sm text-[#8b949e] hover:text-white transition-colors"
            >
              How it works
            </a>
            <a
              href="#context-graph"
              onClick={scrollTo('context-graph')}
              className="text-sm text-[#8b949e] hover:text-white transition-colors"
            >
              Context Graph
            </a>
            <a
              href="#who-its-for"
              onClick={scrollTo('who-its-for')}
              className="text-sm text-[#8b949e] hover:text-white transition-colors"
            >
              Who it's for
            </a>
            <a
              href="#faq"
              onClick={scrollTo('faq')}
              className="text-sm text-[#8b949e] hover:text-white transition-colors"
            >
              FAQ
            </a>
          </div>

          {/* CTA Group */}
          <div className="flex items-center gap-3">
            <a
              href={content.hero.tryProduct.url}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-[#e6edf3] bg-[#21262d] border border-[#30363d] hover:bg-[#30363d] hover:border-[#484f58] transition-all duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{content.hero.tryProduct.text}</span>
              <svg className="w-3.5 h-3.5 text-[#8b949e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <Button href={content.hero.primaryCTA.url} size="sm">
              {content.hero.primaryCTA.text}
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
