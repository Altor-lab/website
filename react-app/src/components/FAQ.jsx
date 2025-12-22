import { useState } from 'react'

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-start text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors pr-8">{question}</span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-blue-500/20 border-blue-500/30 rotate-180' : 'group-hover:bg-white/10'}`}>
          <svg
            className={`w-4 h-4 text-gray-400 ${isOpen ? 'text-blue-400' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
        <p className="text-gray-400 leading-relaxed">{answer}</p>
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
