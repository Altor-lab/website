import { motion } from 'framer-motion'
import ProductHero from '../components/ProductHero'
import FeatureGrid from '../components/FeatureGrid'
import CTASection from '../components/CTASection'

const Reviews = () => {
  const calendarLink = 'https://calendar.app.google/Xh3jbxtMPotCz2pXA'

  const features = [
    {
      icon: '👁️',
      title: 'Multi-Platform Monitoring',
      description: 'Track reviews across Google, Yelp, Trustpilot, and more from a single dashboard.',
    },
    {
      icon: '🤖',
      title: 'AI-Powered Responses',
      description: 'Generate professional, personalized responses to reviews in seconds with AI.',
    },
    {
      icon: '📊',
      title: 'Sentiment Analysis',
      description: 'Understand customer sentiment trends and identify areas for improvement.',
    },
    {
      icon: '🔍',
      title: 'Competitor Review Tracking',
      description: 'Monitor competitor reviews and ratings to see how you compare in your category.',
    },
    {
      icon: '⭐',
      title: 'Review Generation',
      description: 'Automated campaigns to encourage happy customers to leave positive reviews.',
    },
    {
      icon: '📈',
      title: 'Analytics Dashboard',
      description: 'Track your reputation score, response times, and competitive positioning.',
    },
  ]

  const platforms = [
    { name: 'Google', logo: '🔍' },
    { name: 'Yelp', logo: '⭐' },
    { name: 'Trustpilot', logo: '💚' },
    { name: 'Facebook', logo: '📱' },
  ]

  return (
    <div className="min-h-screen bg-dark-900">
      <ProductHero
        title="Build Trust, Beat Competitors"
        subtitle="See how your online reputation compares to competitors in your category. We help you monitor, manage, and improve your reviews across all platforms."
        ctaPrimary={{ text: 'Get Reputation Audit', link: calendarLink }}
        backgroundVariant="gradient"
      />

      {/* Features */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-h2-product font-bold mb-4">
              Complete Reputation Management
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to build and maintain a 5-star reputation
            </p>
          </div>

          <FeatureGrid features={features} columns={3} variant="card" />
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-dark-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-h2-product font-bold mb-4">
              See How You Compare
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Track your ratings against competitors in your category
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-dark-900 border border-gray-800 rounded-xl p-8 md:p-12 max-w-3xl mx-auto"
          >
            <div className="space-y-6">
              {/* Your Rating */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">Your Business</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400 text-xl">★★★★★</span>
                    <span className="text-primary-blue font-bold">4.8</span>
                  </div>
                </div>
                <div className="h-3 bg-dark-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-primary rounded-full" style={{ width: '96%' }} />
                </div>
              </div>

              {/* Competitor Ratings */}
              {[
                { name: 'Competitor A', rating: 4.2, width: 84 },
                { name: 'Competitor B', rating: 3.9, width: 78 },
                { name: 'Competitor C', rating: 3.5, width: 70 },
              ].map((competitor, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">{competitor.name}</span>
                    <span className="text-gray-500">{competitor.rating}</span>
                  </div>
                  <div className="h-3 bg-dark-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gray-700 rounded-full" 
                      style={{ width: `${competitor.width}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-h2-product font-bold mb-4">
              Monitor All Your Review Platforms
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Centralized management for all major review sites
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className="bg-dark-800 border border-gray-800 rounded-xl p-8 text-center hover:border-primary-500/50 transition-colors"
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
        title="Ready to Improve Your Reputation?"
        description="Get a free reputation audit and see how you compare to competitors in your category."
        ctaText="Get Your Free Audit"
        ctaLink={calendarLink}
        variant="gradient"
      />
    </div>
  )
}

export default Reviews

