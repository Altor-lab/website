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
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-black to-black" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Glow orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />

        <div className="container-custom relative z-10 text-center pt-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight max-w-5xl mx-auto">
            {content.hero.headline}
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            {content.hero.subhead}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button href={content.hero.primaryCTA.url} size="lg">
              {content.hero.primaryCTA.text}
            </Button>
            <button
              onClick={scrollTo('how-we-work')}
              className="text-gray-400 hover:text-white transition-colors font-medium flex items-center gap-2"
            >
              {content.hero.secondaryCTA.text} <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="section-padding border-t border-white/5">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">{content.whatWeDo.label}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4">
              {content.whatWeDo.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {content.whatWeDo.items.map((item, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20 flex items-center justify-center mb-6">
                  <span className="text-blue-400 font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section id="how-we-work" className="section-padding border-t border-white/5">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">{content.howWeWork.label}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4">
              {content.howWeWork.title}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6 mb-12">
              {content.howWeWork.steps.map((step, index) => (
                <div key={index} className="flex gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
                      {index + 1}
                    </div>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-lg font-semibold text-white mb-1">{step.phase}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 text-center">
              <p className="text-gray-300">{content.howWeWork.summary}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="section-padding border-t border-white/5">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">{content.security.label}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              {content.security.title}
            </h2>
            <p className="text-xl text-gray-400">
              {content.security.description}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-padding border-t border-white/5">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">{content.faq.label}</span>
          </div>
          <FAQ items={content.faq.items} />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding border-t border-white/5">
        <div className="container-custom">
          <div className="relative max-w-3xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10">
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-blue-500/20 rounded-full blur-[80px]" />

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
