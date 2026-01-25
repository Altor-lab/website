import { useState } from 'react'

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-[#21262d]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-start text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-[#e6edf3] group-hover:text-white transition-colors pr-8">{question}</span>
        <div className={`flex-shrink-0 w-6 h-6 rounded-md bg-[#21262d] border border-[#30363d] flex items-center justify-center transition-all duration-200 ${isOpen ? 'bg-emerald-500/10 border-emerald-500/30' : 'group-hover:bg-[#30363d]'}`}>
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'text-emerald-400 rotate-180' : 'text-[#8b949e]'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}>
        <p className="text-[#8b949e] leading-relaxed text-sm">{answer}</p>
      </div>
    </div>
  )
}

const FAQ = ({ items }) => {
  return (
    <div className="max-w-3xl mx-auto">
      {items.map((item, index) => (
        <FAQItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  )
}

export default FAQ
