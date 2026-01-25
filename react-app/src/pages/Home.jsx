import { content } from '../content'
import Button from '../components/Button'
import FAQ from '../components/FAQ'

const Home = () => {
  const scrollTo = (id) => (e) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="bg-[#0d1117]">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] via-[#0d1117] to-[#161b22]" />
        
        {/* Grid pattern - subtle */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />

        <div className="container-custom relative z-10 py-16">
          <div className="max-w-4xl">
            {/* Main headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              {content.hero.headline}
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-[#8b949e] mb-4 max-w-2xl leading-relaxed">
              {content.hero.subhead}
            </p>
            <p className="text-base text-[#6e7681] mb-10 font-mono">
              {content.hero.alternateSubhead}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-start mb-12">
              <Button href={content.hero.primaryCTA.url} size="lg">
                {content.hero.primaryCTA.text}
              </Button>
              <button
                onClick={scrollTo('how-it-works')}
                className="text-[#8b949e] hover:text-white transition-colors font-medium flex items-center gap-2 py-3"
              >
                {content.hero.secondaryCTA.text} 
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Social proof */}
            <p className="text-sm text-[#6e7681] font-mono">
              {content.metrics.socialProof}
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Bar */}
      <section className="py-12 border-y border-[#21262d] bg-[#161b22]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.metrics.items.map((metric, index) => (
              <div key={index} className="text-center md:text-left">
                <div className="text-3xl sm:text-4xl font-bold text-emerald-400 mb-2 font-mono">
                  {metric.value}
                </div>
                <div className="text-sm text-[#8b949e] uppercase tracking-wider">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section id="the-problem" className="section-padding border-b border-[#21262d]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Section header */}
            <div className="mb-12">
              <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider font-mono">{content.theProblem.label}</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
                {content.theProblem.title}
              </h2>
              <p className="text-lg text-[#8b949e]">{content.theProblem.subtitle}</p>
            </div>

            {/* Broken workflow visualization */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-8 mb-8">
              <div className="space-y-4 font-mono text-base">
                {content.theProblem.steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="text-orange-400 w-6">{step.arrow}</span>
                    <span className="text-[#e6edf3]">{step.text}</span>
                  </div>
                ))}
              </div>
              
              {/* Conclusion */}
              <div className="mt-8 pt-6 border-t border-[#30363d]">
                <p className="text-lg text-orange-400 font-semibold">
                  {content.theProblem.conclusion}
                </p>
              </div>
            </div>

            {/* Impact list */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {content.theProblem.impact.map((item, index) => (
                <div key={index} className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 text-center">
                  <span className="text-sm text-[#8b949e]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Pipeline Visualization */}
      <section id="how-it-works" className="section-padding border-b border-[#21262d]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono">{content.howItWorks.label}</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
              {content.howItWorks.title}
            </h2>
            <p className="text-lg text-[#8b949e] max-w-2xl mx-auto">{content.howItWorks.subtitle}</p>
          </div>

          {/* 5-Step Pipeline - Horizontal on desktop */}
          <div className="hidden lg:block mb-12">
            <div className="flex items-start justify-between relative">
              {/* Connection line */}
              <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-emerald-500/50 via-emerald-500/30 to-emerald-500/50" />
              
              {content.howItWorks.steps.map((step, index) => (
                <div key={index} className="relative flex-1 px-3">
                  {/* Step number */}
                  <div className="w-16 h-16 rounded-lg bg-[#161b22] border border-[#30363d] flex items-center justify-center text-emerald-400 font-mono text-xl font-bold mb-4 relative z-10 mx-auto">
                    {step.number}
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-white mb-2">{step.shortTitle}</h3>
                    <p className="text-xs text-[#8b949e] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet - Vertical layout */}
          <div className="lg:hidden space-y-6">
            {content.howItWorks.steps.map((step, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-[#161b22] border border-[#30363d] flex items-center justify-center text-emerald-400 font-mono font-bold">
                    {step.number}
                  </div>
                  {index < content.howItWorks.steps.length - 1 && (
                    <div className="w-px h-12 bg-[#30363d] mx-auto mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-[#8b949e] leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Context Graph Section */}
      <section id="context-graph" className="section-padding border-b border-[#21262d] bg-[#161b22]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider font-mono">{content.contextGraph.label}</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
                {content.contextGraph.title}
              </h2>
              <p className="text-lg text-[#8b949e]">{content.contextGraph.subtitle}</p>
            </div>

            {/* Context Graph Features */}
            <div className="grid sm:grid-cols-2 gap-4">
              {content.contextGraph.features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 p-4 rounded-lg bg-[#0d1117] border border-[#30363d] hover:border-[#484f58] transition-colors"
                >
                  <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <ContextIcon type={feature.icon} />
                  </div>
                  <p className="text-sm text-[#e6edf3] leading-relaxed">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Moat Section */}
      <section className="section-padding border-b border-[#21262d]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono">{content.theMoat.label}</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-6">
              {content.theMoat.title}
            </h2>
            <p className="text-lg text-[#8b949e] mb-8">
              {content.theMoat.description}
            </p>
            <div className="p-6 rounded-lg bg-[#161b22] border border-[#30363d]">
              <p className="text-base text-[#e6edf3] font-mono leading-relaxed">
                "{content.theMoat.oneLiner}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section id="who-its-for" className="section-padding border-b border-[#21262d]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono">{content.whoItsFor.label}</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
              {content.whoItsFor.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {content.whoItsFor.items.map((item, index) => (
              <div
                key={index}
                className="p-8 rounded-lg bg-[#161b22] border border-[#30363d]"
              >
                <h3 className="text-xl font-bold text-white mb-6">{item.title}</h3>
                <ul className="space-y-3">
                  {item.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-[#8b949e]">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-padding border-b border-[#21262d]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider font-mono">{content.faq.label}</span>
          </div>
          <FAQ items={content.faq.items} />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {content.finalCTA.title}
            </h2>
            <p className="text-lg text-[#8b949e] mb-8">
              {content.finalCTA.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button href={content.finalCTA.buttonUrl} size="lg">
                {content.finalCTA.buttonText}
              </Button>
              <a
                href={`mailto:${content.finalCTA.email}`}
                className="text-[#8b949e] hover:text-white transition-colors font-mono text-sm"
              >
                {content.finalCTA.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Context Graph Icon Component
const ContextIcon = ({ type }) => {
  const icons = {
    chat: (
      <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    ticket: (
      <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    pattern: (
      <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
    git: (
      <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    code: (
      <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  }
  return icons[type] || icons.code
}

export default Home
