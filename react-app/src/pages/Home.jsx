import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import FAQ from '../components/FAQ'
import { GeoIcon, SeoIcon, PaidMarketingIcon, ReviewsIcon, AITransformationIcon } from '../components/icons/ProductIcons'

const Home = () => {
  const products = [
    {
      title: 'GEO',
      subtitle: 'Generative Engine Optimization',
      description: 'Dominate AI search results. See how your website compares to competitors and optimize for ChatGPT, Perplexity, Claude, and more.',
      IconComponent: GeoIcon,
      features: ['AI Content Optimization', 'Competitor Analysis', 'Real-time Tracking'],
    },
    {
      title: 'SEO',
      subtitle: 'Search Engine Optimization',
      description: 'Rank #1 on Google. Complete SEO solution with keyword research, technical audits, and competitor tracking.',
      IconComponent: SeoIcon,
      features: ['Keyword Strategy', 'Technical Audits', 'Rank Monitoring'],
    },
    {
      title: 'Paid Marketing',
      subtitle: 'Ad Campaign Management',
      description: 'Maximize your ad ROI. Expert management of Google Ads, Meta, LinkedIn, and TikTok campaigns.',
      IconComponent: PaidMarketingIcon,
      features: ['Multi-Platform Ads', 'A/B Testing', 'Performance Analytics'],
    },
    {
      title: 'Reviews Management',
      subtitle: 'Reputation Management',
      description: 'Build trust and beat competitors. Monitor and manage reviews across all platforms with AI-powered responses.',
      IconComponent: ReviewsIcon,
      features: ['Multi-Platform Monitoring', 'AI Responses', 'Sentiment Analysis'],
    },
    {
      title: 'AI Transformation',
      subtitle: 'Enterprise AI Adoption',
      description: 'Transform your business with AI. Strategic consulting, custom solutions, and team training to accelerate your AI journey.',
      IconComponent: AITransformationIcon,
      features: ['AI Strategy Services', 'Custom AI Solutions', 'Team Training & Support'],
    },
  ]

  const faqItems = [
    {
      question: 'What is GEO (Generative Engine Optimization)?',
      answer: 'GEO is optimization for AI-powered search engines like ChatGPT, Perplexity, and Claude. We help you rank higher in AI search results by analyzing your position against competitors and optimizing your content for maximum AI visibility.',
    },
    {
      question: 'How does AI Insights work?',
      answer: 'Our AI Insights tool analyzes your website and compares it with industry peers using advanced AI models. It provides rankings, recommendations, and actionable insights to improve your online presence.',
    },
    {
      question: 'What products do you offer?',
      answer: 'We offer GEO (Generative Engine Optimization), SEO (Search Engine Optimization), Paid Marketing management, Reviews Management with AI-powered responses, and AI Transformation consulting. All products include competitor analysis to show you exactly where you stand in your category.',
    },
    {
      question: 'How can I get started?',
      answer: 'Simply click the "Get Started" button to schedule a consultation. We\'ll discuss your needs and show you how our products can help you outperform your competition.',
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-6 px-4 py-2 bg-primary-900/30 border border-primary-700 rounded-full text-sm text-primary-400"
            >
              Building for AI-Native Teams
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              The New Internet
              <br />
              <span className="gradient-text">Powered by AI</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed">
              AltorLab helps businesses adapt to the AI-first world with tools for 
              optimization, insights, and seamless AI integration.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" href="https://calendar.app.google/Xh3jbxtMPotCz2pXA">
                Get Started
              </Button>
              <Button size="lg" variant="secondary">
                <Link to="/ai-insights">AI Insights Dashboard</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section-padding bg-dark-300/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Products
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See how your website compares to competitors in your category
            </p>
          </motion.div>

          {/* Grid: 2-2-1 layout for 5 products */}
          <div className="space-y-8">
            {/* First Row - 2 Products Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {products.slice(0, 2).map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card hover className="h-full group">
                    <div className="mb-6">
                      <product.IconComponent className="w-16 h-16" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-sm text-primary-400 mb-3">{product.subtitle}</p>
                    <p className="text-gray-400 leading-relaxed mb-4">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature, idx) => (
                        <span key={idx} className="px-3 py-1 bg-dark-400 border border-gray-800 rounded-full text-sm text-gray-300">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Second Row - 2 Products Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {products.slice(2, 4).map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card hover className="h-full group">
                    <div className="mb-6">
                      <product.IconComponent className="w-16 h-16" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-sm text-primary-400 mb-3">{product.subtitle}</p>
                    <p className="text-gray-400 leading-relaxed mb-4">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature, idx) => (
                        <span key={idx} className="px-3 py-1 bg-dark-400 border border-gray-800 rounded-full text-sm text-gray-300">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Third Row - 1 Product Centered */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <Card hover className="group">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="mb-4 md:mb-0">
                    {(() => {
                      const IconComponent = products[4].IconComponent
                      return <IconComponent className="w-20 h-20" />
                    })()}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
                      {products[4].title}
                    </h3>
                    <p className="text-sm text-primary-400 mb-3">{products[4].subtitle}</p>
                    <p className="text-gray-400 leading-relaxed mb-4">
                      {products[4].description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {products[4].features.map((feature, idx) => (
                        <span key={idx} className="px-3 py-1 bg-dark-400 border border-gray-800 rounded-full text-sm text-gray-300">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: '100+', label: 'Businesses Helped' },
              { number: '10k+', label: 'AI Queries Analyzed' },
              { number: '99%', label: 'Client Satisfaction' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-5xl md:text-6xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-dark-300/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need to know about AltorLab
            </p>
          </motion.div>

          <FAQ items={faqItems} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-primary-900/30 to-purple-900/30 border border-primary-700 rounded-2xl p-12 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Build for the AI-Native Future?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join forward-thinking businesses using AltorLab to optimize for AI search and discovery.
            </p>
            <Button size="lg" href="https://calendar.app.google/Xh3jbxtMPotCz2pXA">
              Schedule a Consultation
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home

