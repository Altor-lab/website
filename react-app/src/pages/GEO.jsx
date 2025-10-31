import { motion } from 'framer-motion'
import ProductHero from '../components/ProductHero'
import FeatureGrid from '../components/FeatureGrid'
import CTASection from '../components/CTASection'

const GEO = () => {
  const calendarLink = 'https://calendar.app.google/Xh3jbxtMPotCz2pXA'

  // Stats data
  const stats = [
    { value: '85%', label: 'Visibility Increase' },
    { value: '10x', label: 'More AI Citations' },
    { value: 'Top 3', label: 'Average Rankings' },
  ]

  // How it works steps
  const steps = [
    {
      number: '01',
      title: 'Analyze Your Position',
      description: 'We scan AI platforms to see how your website ranks compared to competitors in your category.',
      icon: '🔍',
    },
    {
      number: '02',
      title: 'Optimize Content',
      description: 'Our AI analyzes what works for top-ranked sites and optimizes your content for maximum visibility.',
      icon: '⚡',
    },
    {
      number: '03',
      title: 'Track & Improve',
      description: 'Monitor your rankings in real-time and get actionable recommendations to stay ahead.',
      icon: '📈',
    },
  ]

  // Features
  const features = [
    {
      icon: '🎯',
      title: 'AI Content Optimization',
      description: 'Optimize your content specifically for AI search engines like ChatGPT, Perplexity, and Claude.',
    },
    {
      icon: '🔬',
      title: 'Competitor Analysis',
      description: 'See exactly where you stand against competitors in your category and what they\'re doing right.',
    },
    {
      icon: '📊',
      title: 'Real-time Ranking Tracking',
      description: 'Monitor your position across all major AI platforms with daily updates and trend analysis.',
    },
    {
      icon: '💬',
      title: 'Citation Monitoring',
      description: 'Track when and how AI models cite your website, and identify opportunities for more mentions.',
    },
    {
      icon: '✨',
      title: 'Content Recommendations',
      description: 'Get AI-powered suggestions on what content to create to improve your rankings.',
    },
    {
      icon: '📈',
      title: 'Performance Analytics',
      description: 'Comprehensive dashboards showing your GEO performance, trends, and ROI metrics.',
    },
  ]

  // AI Platforms
  const platforms = [
    { name: 'ChatGPT', logo: '🤖' },
    { name: 'Perplexity', logo: '🔮' },
    { name: 'Claude', logo: '🧠' },
    { name: 'Gemini', logo: '✨' },
    { name: 'Copilot', logo: '💡' },
    { name: 'SearchGPT', logo: '🔍' },
  ]

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Hero Section */}
      <ProductHero
        title="Dominate AI Search Results"
        subtitle="See how your website compares to competitors in your category. We categorize websites and show you exactly where you stand in AI-powered search engines."
        ctaPrimary={{ text: 'Book a Demo', link: calendarLink }}
        ctaSecondary={{ text: 'See How It Works', link: '#how-it-works' }}
        backgroundVariant="gradient"
      />

      {/* Stats Section */}
      <section className="py-20 border-t border-gray-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
          >
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-stat-large bg-gradient-primary bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-lg">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-dark-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-h2-product font-bold mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Three simple steps to dominate AI search results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connecting line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary-blue to-transparent -translate-x-1/2" />
                )}
                
                <div className="bg-dark-900 border border-gray-800 rounded-xl p-8 relative z-10">
                  {/* Step number */}
                  <div className="text-6xl font-bold text-gray-800 mb-4">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="text-4xl mb-4">{step.icon}</div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-400">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-h2-product font-bold mb-4">
              Everything You Need to Win
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive tools to optimize, track, and dominate AI search results
            </p>
          </motion.div>

          <FeatureGrid features={features} columns={3} variant="card" />
        </div>
      </section>

      {/* Platform Coverage */}
      <section className="py-20 bg-dark-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-h2-product font-bold mb-4">
              Optimize for All Major AI Platforms
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Track and optimize your presence across every AI search engine that matters
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {platforms.map((platform, index) => (
              <div
                key={index}
                className="bg-dark-900 border border-gray-800 rounded-xl p-6 text-center hover:border-primary-500/50 transition-colors"
              >
                <div className="text-4xl mb-3">{platform.logo}</div>
                <div className="text-sm font-medium text-gray-300">{platform.name}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Comparison Demo Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-h2-product font-bold mb-4">
              See Where You Stand
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Compare your AI search visibility against competitors in your category
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-dark-800 border border-gray-800 rounded-xl p-8 md:p-12"
          >
            <div className="space-y-6">
              {/* Your Score */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">Your Website</span>
                  <span className="text-primary-blue font-bold">92/100</span>
                </div>
                <div className="h-3 bg-dark-900 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-primary rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              {/* Competitor Scores */}
              {[
                { name: 'Competitor A', score: 78 },
                { name: 'Competitor B', score: 65 },
                { name: 'Competitor C', score: 54 },
              ].map((competitor, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">{competitor.name}</span>
                    <span className="text-gray-500">{competitor.score}/100</span>
                  </div>
                  <div className="h-3 bg-dark-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gray-700 rounded-full" 
                      style={{ width: `${competitor.score}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        title="Start Dominating AI Search Today"
        description="Join leading companies who are already winning in the age of AI-powered search. Book a demo to see how we can help you outrank your competition."
        ctaText="Book Your Demo"
        ctaLink={calendarLink}
        variant="gradient"
      />
    </div>
  )
}

export default GEO

