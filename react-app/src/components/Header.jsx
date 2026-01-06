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

          {/* CTA */}
          <Button href={content.hero.primaryCTA.url} size="sm">
            {content.hero.primaryCTA.text}
          </Button>
        </div>
      </nav>
    </header>
  )
}

export default Header
