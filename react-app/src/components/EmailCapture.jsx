import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '../lib/utils'

const EmailCapture = ({
  className,
  headline = 'Get weekly support engineering insights',
  emailAddress = 'anshul@altorlab.com',
  subject = 'Altor Newsletter Signup',
  buttonLabel = 'Subscribe',
  placeholder = 'Your work email',
  bodyPrefix = 'Please sign me up for weekly support engineering insights.',
}) => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return

    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible('Email Capture', { props: { page: window.location.pathname } })
    }

    const mailtoHref = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${bodyPrefix}\n\nEmail: ${email}`)}`

    if (typeof window !== 'undefined') {
      window.location.href = mailtoHref
    }

    setStatus('sent')
  }

  return (
    <div className={cn('max-w-[480px]', className)}>
      {headline ? <p className="text-fg-secondary text-[0.9375rem] mb-3">{headline}</p> : null}
      <AnimatePresence mode="wait">
        {status === 'sent' ? (
          <motion.p
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent text-[0.875rem] font-medium py-2"
          >
            Your email app should open with the signup request.
          </motion.p>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              className="flex-1 min-w-0 px-4 py-2.5 text-[0.875rem] bg-surface-0 border border-edge rounded-full text-fg placeholder:text-fg-faint focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/40 transition-all duration-200"
            />
            <button
              type="submit"
              className="shrink-0 px-5 py-2.5 text-[0.875rem] font-semibold bg-fg text-white rounded-full hover:bg-fg/85 hover:-translate-y-px active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {buttonLabel}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
      <p className="text-fg-faint text-[0.75rem] mt-2">Opens your email app with your address prefilled.</p>
    </div>
  )
}

export default EmailCapture
