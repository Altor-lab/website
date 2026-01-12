import ProductHero from '../components/ProductHero'
import FeatureGrid from '../components/FeatureGrid'
import CTASection from '../components/CTASection'

const SEO = () => {
  const calendarLink = 'https://calendly.com/founders-altorlab/30min'

  const features = [
    {
      icon: '🔍',
      title: 'Keyword Research & Strategy',
      description: 'Identify high-value keywords your competitors are ranking for and build a winning strategy.',
    },
    {
      icon: '🔧',
      title: 'Technical SEO Audits',
      description: 'Fix critical issues that prevent search engines from properly indexing your site.',
    },
    {
      icon: '✍️',
      title: 'Content Optimization',
      description: 'Optimize existing content and create new pages that outrank your competition.',
    },
    {
      icon: '🔗',
      title: 'Backlink Analysis',
      description: 'Build high-quality backlinks and monitor your link profile against competitors.',
    },
    {
      icon: '📊',
      title: 'Competitor Tracking',
      description: 'See exactly what your competitors are doing and identify opportunities to outrank them.',
    },
    {
      icon: '📈',
      title: 'Rank Monitoring',
      description: 'Track your rankings daily and get alerts when competitors make moves.',
    },
  ]

  return (
    <div className="min-h-screen bg-dark-900">
      <ProductHero
        title="Rank #1 on Google"
        subtitle="See how your website compares to competitors in your category. We analyze your SEO performance and show you exactly what it takes to outrank the competition."
        ctaPrimary={{ text: 'Get Your SEO Audit', link: calendarLink }}
        backgroundVariant="gradient"
      />

      {/* Features */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-h2-product font-bold mb-4">
              Complete SEO Solution
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to dominate search results in your category
            </p>
          </div>

          <FeatureGrid features={features} columns={3} variant="card" />
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Outrank Your Competition?"
        description="Get a free SEO audit and see exactly where you stand against competitors in your category."
        ctaText="Schedule Your Audit"
        ctaLink={calendarLink}
        variant="gradient"
      />
    </div>
  )
}

export default SEO

