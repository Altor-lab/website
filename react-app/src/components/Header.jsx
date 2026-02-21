import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { content } from '../content'
import Button from './Button'

const ease = [0.25, 0.4, 0.25, 1]

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const links = [
    ['How it works', 'how-it-works'],
    ['Integrations', 'the-stack'],
    ['Trust', 'trust'],
    ['FAQ', 'faq'],
  ]

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-surface-0/80 backdrop-blur-2xl border-b border-edge-subtle' : ''
      }`}>
        <nav className="max-w-[1120px] mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="font-display font-bold text-fg tracking-[-0.02em] text-[1.0625rem]">
            {content.companyName}
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map(([label, id]) => (
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

          <div className="flex items-center gap-4">
            <a
              href={content.hero.tryProduct.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline text-[0.8125rem] text-fg-secondary hover:text-fg transition-colors"
            >
              {content.hero.tryProduct.text}
            </a>
            <Button href={content.hero.primaryCTA.url} size="sm" className="hidden sm:inline-flex">
              {content.hero.primaryCTA.text}
            </Button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
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
            <nav className="flex flex-col items-start px-6 pt-20 gap-1">
              {links.map(([label, id], i) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={go(id)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3, ease }}
                  className="text-[1.25rem] text-fg-secondary hover:text-fg transition-colors py-3 w-full"
                >
                  {label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: links.length * 0.06, duration: 0.3, ease }}
                className="pt-6 flex flex-col gap-3 w-full"
              >
                <Button href={content.hero.primaryCTA.url} size="lg" className="w-full">
                  {content.hero.primaryCTA.text}
                </Button>
                <a
                  href={content.hero.tryProduct.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.9375rem] text-fg-secondary hover:text-fg transition-colors text-center py-2"
                >
                  {content.hero.tryProduct.text}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
