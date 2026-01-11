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
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/30 via-black to-black" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Glow orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px]" />

        <div className="container-custom relative z-10 text-center pt-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight max-w-5xl mx-auto">
            {content.hero.headline}
          </h1>

          <div className="flex flex-col gap-3 mb-10 max-w-3xl mx-auto">
            {Array.isArray(content.hero.subhead) ? (
              content.hero.subhead.map((line, i) => (
                <p key={i} className={`text-lg sm:text-xl ${i === 2 ? 'text-white font-medium' : 'text-gray-400'} leading-relaxed`}>
                  {line}
                </p>
              ))
            ) : (
              <p className="text-lg sm:text-xl text-gray-400 leading-relaxed">
                {content.hero.subhead}
              </p>
            )}
          </div>

          {/* Pipeline highlight */}
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 mb-10">
            <span className="text-sm sm:text-base text-gray-300 font-mono tracking-wide">
              {content.hero.highlight}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button href={content.hero.primaryCTA.url} size="lg">
              {content.hero.primaryCTA.text}
            </Button>
            <button
              onClick={scrollTo('how-it-works')}
              className="text-gray-400 hover:text-white transition-colors font-medium flex items-center gap-2"
            >
              {content.hero.secondaryCTA.text} <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-t border-white/5">
        <div className="container-custom">
          <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
            {content.stats.items.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section-padding border-t border-white/5">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">{content.howItWorks.label}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 max-w-4xl mx-auto">
              {content.howItWorks.title}
            </h2>
            <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">{content.howItWorks.subtitle}</p>
          </div>

          {/* Pipeline visualization */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Connection line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-blue-500 to-green-500 hidden md:block" />

              <div className="space-y-8">
                {content.howItWorks.steps.map((step, index) => (
                  <div key={index} className="flex gap-6 group">
                    <div className="flex-shrink-0 relative">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-mono text-sm font-bold shadow-lg shadow-purple-500/20">
                        {step.number}
                      </div>
                    </div>
                    <div className="flex-1 p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 hover:bg-white/[0.04] transition-all duration-300">
                      <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes This Hard Section */}
      <section className="section-padding border-t border-white/5">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-orange-400 uppercase tracking-wider">{content.challenges.label}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 max-w-4xl mx-auto">
              {content.challenges.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {content.challenges.items.map((item, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl bg-orange-500/5 border border-orange-500/10 hover:border-orange-500/30 transition-all duration-300 ${index === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="section-padding border-t border-white/5">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">{content.capabilities.label}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4">
              {content.capabilities.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {content.capabilities.items.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section id="who-its-for" className="section-padding border-t border-white/5">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-green-400 uppercase tracking-wider">{content.whoItsFor.label}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4">
              {content.whoItsFor.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {content.whoItsFor.items.map((item, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-gradient-to-b from-green-500/[0.08] to-transparent border border-green-500/20"
              >
                <h3 className="text-2xl font-bold text-white mb-6">{item.title}</h3>
                <ul className="space-y-3">
                  {item.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-300">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-padding border-t border-white/5">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">{content.faq.label}</span>
          </div>
          <FAQ items={content.faq.items} />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding border-t border-white/5">
        <div className="container-custom">
          <div className="relative max-w-3xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-b from-purple-500/[0.08] to-transparent border border-purple-500/20">
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-purple-500/20 rounded-full blur-[80px]" />

            <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {content.finalCTA.title}
            </h2>
            <p className="relative text-lg text-gray-400 mb-8">
              {content.finalCTA.description}
            </p>
            <div className="relative flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button href={content.finalCTA.buttonUrl} size="lg">
                {content.finalCTA.buttonText}
              </Button>
              <a
                href={`mailto:${content.finalCTA.email}`}
                className="text-gray-400 hover:text-white transition-colors"
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

export default Home
