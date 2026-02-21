import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Item = ({ q, a, open, toggle }) => (
  <div className="border-b border-edge">
    <button onClick={toggle} className="w-full py-5 flex justify-between items-start text-left group" aria-expanded={open}>
      <span className="text-[0.9375rem] text-fg font-medium pr-8 leading-snug group-hover:text-accent transition-colors duration-200">{q}</span>
      <span className={`mt-1 text-fg-muted transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M7 1v12M1 7h12" />
        </svg>
      </span>
    </button>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
          className="overflow-hidden"
        >
          <p className="text-fg-secondary text-[0.875rem] leading-relaxed pb-5 max-w-[52ch]">{a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)

const FAQ = ({ items }) => {
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <div className="max-w-2xl">
      {items.map((item, i) => (
        <Item key={i} q={item.q} a={item.a} open={openIdx === i} toggle={() => setOpenIdx(openIdx === i ? null : i)} />
      ))}
    </div>
  )
}

export default FAQ
