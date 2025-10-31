import ProductHero from '../components/ProductHero'
import FeatureGrid from '../components/FeatureGrid'
import CTASection from '../components/CTASection'

const PaidMarketing = () => {
  const calendarLink = 'https://calendar.app.google/Xh3jbxtMPotCz2pXA'

  const features = [
    {
      icon: '🎯',
      title: 'Google Ads Management',
      description: 'Maximize ROI with data-driven Google Ads campaigns that outperform your competitors.',
    },
    {
      icon: '📱',
      title: 'Social Media Advertising',
      description: 'Run high-converting campaigns on Facebook, Instagram, LinkedIn, and TikTok.',
    },
    {
      icon: '💼',
      title: 'LinkedIn Advertising',
      description: 'Reach decision-makers with targeted B2B campaigns that drive qualified leads.',
    },
    {
      icon: '🔬',
      title: 'Competitor Ad Analysis',
      description: 'See what ads your competitors are running and identify opportunities to outbid them.',
    },
    {
      icon: '🧪',
      title: 'A/B Testing',
      description: 'Continuously test and optimize ad creative, copy, and targeting for better results.',
    },
    {
      icon: '📊',
      title: 'Performance Tracking',
      description: 'Real-time dashboards showing ROI, conversions, and how you stack up against competitors.',
    },
  ]

  const platforms = [
    { name: 'Google Ads', logo: '🔍' },
    { name: 'Meta Ads', logo: '📱' },
    { name: 'LinkedIn', logo: '💼' },
    { name: 'TikTok', logo: '🎵' },
  ]

  return (
    <div className="min-h-screen bg-dark-900">
      <ProductHero
        title="Maximize Your Ad ROI"
        subtitle="See how your ad performance compares to competitors in your category. We optimize every dollar spent to ensure you're getting the best results in your market."
        ctaPrimary={{ text: 'Get Free Ad Audit', link: calendarLink }}
        backgroundVariant="gradient"
      />

      {/* Features */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-h2-product font-bold mb-4">
              Full-Service Paid Marketing
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive paid advertising management across all major platforms
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
              Advertise Where Your Customers Are
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Multi-platform campaigns optimized for your target audience
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
        title="Ready to Outperform Your Competition?"
        description="Get a free ad performance audit and see how you compare to competitors in your category."
        ctaText="Get Your Free Audit"
        ctaLink={calendarLink}
        variant="gradient"
      />
    </div>
  )
}

export default PaidMarketing

