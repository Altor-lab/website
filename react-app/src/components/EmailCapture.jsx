import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../lib/utils'

const FORMSPREE_ID = 'xeoodpqz' // Replace with your Formspree form ID

const EmailCapture = ({ className, headline = 'Get a 3-minute walkthrough — no call needed.' }) => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || status === 'sending') return

    // Fire Plausible event
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible('Email Capture', { props: { page: window.location.pathname } })
    }

    setStatus('sending')

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, _subject: 'Walkthrough request from altorlab.com' }),
      })
      if (res.ok) {
        setStatus('sent')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className={cn('max-w-[480px]', className)}>
      <p className="text-fg-secondary text-[0.9375rem] mb-3">{headline}</p>
      <AnimatePresence mode="wait">
        {status === 'sent' ? (
          <motion.p
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent text-[0.875rem] font-medium py-2"
          >
            Got it — we'll send the walkthrough to your inbox.
          </motion.p>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="flex gap-2"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="flex-1 min-w-0 px-4 py-2.5 text-[0.875rem] bg-surface-0 border border-edge rounded-full text-fg placeholder:text-fg-faint focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/40 transition-all duration-200"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="shrink-0 px-5 py-2.5 text-[0.875rem] font-semibold bg-fg text-white rounded-full hover:bg-fg/85 hover:-translate-y-px active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {status === 'sending' ? 'Sending...' : 'Send'}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
      {status === 'error' && (
        <p className="text-red-500 text-[0.8125rem] mt-2">
          Something went wrong. Try <a href="mailto:anshul@altorlab.com" className="underline">emailing us</a> instead.
        </p>
      )}
    </div>
  )
}

export default EmailCapture
