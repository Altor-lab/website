import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { content } from '../content'
import Button from './Button'

const ease = [0.25, 0.4, 0.25, 1]

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const go = (id) => (e) => {
    e.preventDefault()
    setMenuOpen(false)
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(`/#${id}`)
    }
  }

  const pageLinks = [
    { label: 'Our Work', to: '/work/support-investigation' },
    { label: 'Tools', to: '/ai-stack' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Team', to: '/team' },
    { label: 'Blog', to: '/blog' },
  ]

  const anchorLinks = [
    ['Our work', 'our-work'],
    ['How we work', 'how-we-work'],
    ['Who we work with', 'who-we-work-with'],
  ]

  return (
    <>
          <div className="fixed inset-x-0 top-0 z-50 border-b border-edge-subtle bg-surface-1/95 backdrop-blur-xl">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 min-h-10 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="text-[0.75rem] sm:text-[0.8125rem] text-fg-secondary">
            Taking on 2–3 new engagements in 2026 — EST &amp; PST hours
          </p>
          <a
            href="mailto:anshul@altorlab.com?subject=New%20Engagement%20%E2%80%94%20Altor%20AI%20Services"
            className="inline-flex items-center gap-1 text-[0.75rem] sm:text-[0.8125rem] font-medium text-accent hover:text-accent/80 transition-colors"
          >
            <span>Start a Conversation</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <header className={`fixed inset-x-0 top-10 z-50 transition-all duration-300 ${
        scrolled ? 'bg-surface-0/80 backdrop-blur-2xl border-b border-edge-subtle' : ''
      }`}>
        <nav className="max-w-[1120px] mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="font-display font-bold text-fg tracking-[-0.02em] text-[1.0625rem]">
            {content.companyName}
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {pageLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="text-[0.8125rem] text-fg-secondary hover:text-fg transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
            {isHome && anchorLinks.map(([label, id]) => (
              <a
                key={id}
                href={`/#${id}`}
                onClick={go(id)}
                className="text-[0.8125rem] text-fg-secondary hover:text-fg transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button href="https://calendly.com/founders-altorlab/30min" size="sm" className="hidden sm:inline-flex">
              Work With Us
            </Button>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col items-center justify-center gap-[5px] min-w-[44px] min-h-[44px] -mr-2"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="block w-[18px] h-px bg-fg origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="block w-[18px] h-px bg-fg"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="block w-[18px] h-px bg-fg origin-center"
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-surface-0/95 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col items-start px-6 pt-28 gap-1">
              {pageLinks.map(({ label, to }, i) => (
                <motion.div key={to} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06, duration: 0.3, ease }}>
                  <Link to={to} onClick={() => setMenuOpen(false)} className="text-[1.25rem] text-fg-secondary hover:text-fg transition-colors py-3 block">
                    {label}
                  </Link>
                </motion.div>
              ))}
              {anchorLinks.map(([label, id], i) => (
                <motion.a
                  key={id}
                  href={`/#${id}`}
                  onClick={go(id)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (pageLinks.length + i) * 0.06, duration: 0.3, ease }}
                  className="text-[1.25rem] text-fg-secondary hover:text-fg transition-colors py-3 w-full"
                >
                  {label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (pageLinks.length + anchorLinks.length) * 0.06, duration: 0.3, ease }}
                className="pt-6 w-full"
              >
                <Button href={content.hero.primaryCTA.url} size="lg" className="w-full">
                  {content.hero.primaryCTA.text}
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
