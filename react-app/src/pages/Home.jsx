import { content } from '../content'
import Button from '../components/Button'
import FAQ from '../components/FAQ'
import { NumberTicker } from '../components/magicui/number-ticker'
import { DotPattern } from '../components/magicui/dot-pattern'
import { Spotlight } from '../components/magicui/spotlight'
import { BorderBeam } from '../components/magicui/border-beam'
import { cn } from '../lib/utils'

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
        {/* Spotlight effect */}
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#34d399" />
        
        {/* Dot pattern background */}
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)] opacity-40"
        />

        <div className="container-custom relative z-10 py-16">
          <div className="max-w-4xl">
            {/* Main headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              <span className="inline-block">Customer meeting</span>{' '}
              <span className="text-emerald-400">→</span>{' '}
              <span className="inline-block">merged PR in hours</span>
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
              <div className="relative">
                <Button href={content.hero.primaryCTA.url} size="lg">
                  {content.hero.primaryCTA.text}
                </Button>
              </div>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#161b22] border border-[#30363d]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-sm text-[#8b949e] font-mono">
                {content.metrics.socialProof}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Bar */}
      <section className="py-16 border-y border-[#21262d] bg-[#161b22] relative overflow-hidden">
        <DotPattern
          width={32}
          height={32}
          className="opacity-20"
        />
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            {/* 9 hours metric */}
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-emerald-400 mb-2 font-mono">
                <NumberTicker value={9} /> hours
              </div>
              <div className="text-sm text-[#8b949e] uppercase tracking-wider">
                median meeting → PR
              </div>
            </div>
            
            {/* 85% metric */}
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-emerald-400 mb-2 font-mono">
                <NumberTicker value={85} />%
              </div>
              <div className="text-sm text-[#8b949e] uppercase tracking-wider">
                feature overlap across customers
              </div>
            </div>
            
            {/* 2-4 weeks metric */}
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-orange-400 mb-2 font-mono">
                2-4 weeks
              </div>
              <div className="text-sm text-[#8b949e] uppercase tracking-wider">
                typical deployment without Altor
              </div>
            </div>
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
            <div className="relative bg-[#161b22] border border-[#30363d] rounded-lg p-8 mb-8 overflow-hidden">
              <BorderBeam size={250} duration={12} colorFrom="#f59e0b" colorTo="#ef4444" />
              
              <div className="space-y-4 font-mono text-base">
                {content.theProblem.steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <span className="text-orange-400 w-6 group-hover:translate-x-1 transition-transform">{step.arrow}</span>
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
                <div key={index} className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 text-center hover:border-orange-500/30 transition-colors">
                  <span className="text-sm text-[#8b949e]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Pipeline Visualization */}
      <section id="how-it-works" className="section-padding border-b border-[#21262d] relative overflow-hidden">
        <DotPattern
          width={24}
          height={24}
          className="opacity-10"
        />
        <div className="container-custom relative z-10">
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
              {/* Connection line with animated beam effect */}
              <div className="absolute top-8 left-[8%] right-[8%] h-[2px] overflow-hidden">
                <div className="absolute inset-0 bg-[#30363d]" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500 to-transparent w-1/4 animate-beam-horizontal" />
              </div>
              
              {content.howItWorks.steps.map((step, index) => (
                <div key={index} className="relative flex-1 px-3 group">
                  {/* Step number */}
                  <div className="w-16 h-16 rounded-lg bg-[#161b22] border-2 border-[#30363d] group-hover:border-emerald-500/50 flex items-center justify-center text-emerald-400 font-mono text-xl font-bold mb-4 relative z-10 mx-auto transition-colors">
                    {step.number}
                  </div>
                  <div className="text-center">
                    <h3 className="text-base font-semibold text-white mb-2">{step.shortTitle}</h3>
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
                <div className="flex-shrink-0 relative">
                  <div className="w-12 h-12 rounded-lg bg-[#161b22] border-2 border-[#30363d] flex items-center justify-center text-emerald-400 font-mono font-bold">
                    {step.number}
                  </div>
                  {index < content.howItWorks.steps.length - 1 && (
                    <div className="absolute left-1/2 top-12 w-[2px] h-10 -translate-x-1/2 overflow-hidden">
                      <div className="absolute inset-0 bg-[#30363d]" />
                      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500 to-transparent h-1/2 animate-beam-vertical" />
                    </div>
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

            {/* Context Graph Features - Bento-style grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {content.contextGraph.features.map((feature, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "flex items-start gap-4 p-5 rounded-lg bg-[#0d1117] border border-[#30363d] hover:border-blue-500/40 transition-all group",
                    index === 0 && "sm:col-span-2 lg:col-span-1"
                  )}
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
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
      <section className="section-padding border-b border-[#21262d] relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono">{content.theMoat.label}</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-6">
              {content.theMoat.title}
            </h2>
            <p className="text-lg text-[#8b949e] mb-8">
              {content.theMoat.description}
            </p>
            <div className="relative p-6 rounded-lg bg-[#161b22] border border-[#30363d] overflow-hidden">
              <BorderBeam size={200} duration={10} delay={2} />
              <p className="text-base text-[#e6edf3] font-mono leading-relaxed relative z-10">
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
                className="p-8 rounded-lg bg-[#161b22] border border-[#30363d] hover:border-emerald-500/30 transition-colors"
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
      <section className="section-padding relative overflow-hidden">
        <Spotlight className="-top-40 -right-40" fill="#34d399" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {content.finalCTA.title}
            </h2>
            <p className="text-lg text-[#8b949e] mb-8">
              {content.finalCTA.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="relative">
                <Button href={content.finalCTA.buttonUrl} size="lg">
                  {content.finalCTA.buttonText}
                </Button>
              </div>
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
      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    ticket: (
      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    pattern: (
      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
    git: (
      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    code: (
      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  }
  return icons[type] || icons.code
}

export default Home
