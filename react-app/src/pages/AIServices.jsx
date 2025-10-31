import ProductHero from '../components/ProductHero'
import FeatureGrid from '../components/FeatureGrid'
import CTASection from '../components/CTASection'

const AIServices = () => {
  const calendarLink = 'https://calendar.app.google/Xh3jbxtMPotCz2pXA'

  const features = [
    {
      icon: '🎯',
      title: 'AI Strategy Consulting',
      description: 'Develop a comprehensive AI adoption strategy tailored to your business goals and industry.',
    },
    {
      icon: '⚡',
      title: 'Workflow Automation',
      description: 'Identify and automate repetitive tasks to free up your team for high-value work.',
    },
    {
      icon: '🛠️',
      title: 'Custom AI Solutions',
      description: 'Build custom AI tools and integrations specific to your business needs.',
    },
    {
      icon: '📚',
      title: 'Team Training',
      description: 'Upskill your team with hands-on AI training and best practices.',
    },
    {
      icon: '🔌',
      title: 'Integration Support',
      description: 'Seamlessly integrate AI tools into your existing workflows and systems.',
    },
    {
      icon: '📈',
      title: 'Ongoing Optimization',
      description: 'Continuously improve your AI implementations for maximum ROI.',
    },
  ]

  const platforms = [
    { name: 'OpenAI', logo: '🤖' },
    { name: 'Anthropic', logo: '🧠' },
    { name: 'Google AI', logo: '✨' },
    { name: 'Microsoft', logo: '💡' },
  ]

  return (
    <div className="min-h-screen bg-dark-900">
      <ProductHero
        title="AI Adoption Made Simple"
        subtitle="Transform your business with AI. We help you identify opportunities, implement solutions, and train your team to work smarter, not harder."
        ctaPrimary={{ text: 'Start Your AI Journey', link: calendarLink }}
        backgroundVariant="gradient"
      />

      {/* Features */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-h2-product font-bold mb-4">
              End-to-End AI Services
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From strategy to implementation, we guide you through every step of AI adoption
            </p>
          </div>

          <FeatureGrid features={features} columns={3} variant="card" />
        </div>
      </section>

      {/* Platforms */}
      <section className="py-20 bg-dark-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-h2-product font-bold mb-4">
              Powered by Leading AI Platforms
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We work with the best AI technologies to deliver results
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className="bg-dark-900 border border-gray-800 rounded-xl p-8 text-center hover:border-primary-500/50 transition-colors"
              >
                <div className="text-5xl mb-3">{platform.logo}</div>
                <div className="text-sm font-medium text-gray-300">{platform.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Transform Your Business with AI?"
        description="Book a consultation to discover how AI can streamline your workflows and give you a competitive edge."
        ctaText="Book a Consultation"
        ctaLink={calendarLink}
        variant="gradient"
      />
    </div>
  )
}

export default AIServices

