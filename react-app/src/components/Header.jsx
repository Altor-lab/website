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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-black/80 backdrop-blur-xl border-b border-white/10'
        : 'bg-transparent'
        }`}
    >
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent tracking-tight">{content.companyName}</span>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#capabilities"
              onClick={scrollTo('capabilities')}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Capabilities
            </a>
            <a
              href="#who-its-for"
              onClick={scrollTo('who-its-for')}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Who it's for
            </a>
            <a
              href="#how-it-works"
              onClick={scrollTo('how-it-works')}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              How it works
            </a>
            <a
              href="#faq"
              onClick={scrollTo('faq')}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              FAQ
            </a>
          </div>

          {/* CTA Group */}
          <div className="flex items-center gap-4">
            <a
              href={content.hero.tryProduct.url}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300 group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{content.hero.tryProduct.text}</span>
              <svg className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
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
