import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import FAQ from '../components/FAQ'
import { GeoIcon, SeoIcon, PaidMarketingIcon, ReviewsIcon, AITransformationIcon } from '../components/icons/ProductIcons'

const Home = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitStatus, setSubmitStatus] = useState('') // 'success' or 'error'

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')
    setSubmitStatus('')

    try {
      // Use FormData instead of JSON to avoid CORS preflight
      const formData = new FormData()
      formData.append('email', email)

      await fetch('https://script.google.com/macros/s/AKfycbwwlOM3AQKOTrsYM4b68RsbU7H-9uWlgT9cAh5Xg5l_8D4q9iT8ocia7oMLCfIe8vhv/exec', {
        method: 'POST',
        body: formData,
      })

      // Show success message
      setSubmitStatus('success')
      setSubmitMessage('Thank you! Your report will be sent shortly.')
      setEmail('')
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage('Failed to submit. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const products = [
    {
      title: 'GEO',
      subtitle: 'Generative Engine Optimization',
      description: 'Dominate AI search results. See how your website compares to competitors and optimize for ChatGPT, Perplexity, Claude, and more.',
      IconComponent: GeoIcon,
      features: ['AI Content Optimization', 'Competitor Analysis', 'Real-time Tracking'],
      accentColor: 'blue',
    },
    {
      title: 'SEO',
      subtitle: 'Search Engine Optimization',
      description: 'Rank #1 on Google. Complete SEO solution with keyword research, technical audits, and competitor tracking.',
      IconComponent: SeoIcon,
      features: ['Keyword Strategy', 'Technical Audits', 'Rank Monitoring'],
      accentColor: 'green',
    },
    {
      title: 'Paid Marketing',
      subtitle: 'Ad Campaign Management',
      description: 'Maximize your ad ROI. Expert management of Google Ads, Meta, LinkedIn, and TikTok campaigns.',
      IconComponent: PaidMarketingIcon,
      features: ['Multi-Platform Ads', 'A/B Testing', 'Performance Analytics'],
      accentColor: 'purple',
    },
    {
      title: 'Reviews Management',
      subtitle: 'Reputation Management',
      description: 'Build trust and beat competitors. Monitor and manage reviews across all platforms with AI-powered responses.',
      IconComponent: ReviewsIcon,
      features: ['Multi-Platform Monitoring', 'AI Responses', 'Sentiment Analysis'],
      accentColor: 'orange',
    },
    {
      title: 'AI Transformation',
      subtitle: 'Enterprise AI Adoption',
      description: 'Transform your business with AI. Strategic consulting, custom solutions, and team training to accelerate your AI journey.',
      IconComponent: AITransformationIcon,
      features: ['AI Strategy Services', 'Custom AI Solutions', 'Team Training & Support'],
      accentColor: 'pink',
    },
  ]

  // Color configurations for each product
  const colorConfig = {
    blue: {
      glow: 'from-blue-600/0 via-blue-500/0 to-blue-600/0 group-hover:from-blue-600/8 group-hover:via-blue-500/8 group-hover:to-blue-600/8',
      iconBg: 'from-blue-900/20 to-blue-800/20',
      iconBorder: 'border-blue-700/20 group-hover:border-blue-600/40',
      titleHover: 'group-hover:text-blue-400',
      subtitle: 'text-blue-400/80',
    },
    green: {
      glow: 'from-green-600/0 via-emerald-500/0 to-green-600/0 group-hover:from-green-600/8 group-hover:via-emerald-500/8 group-hover:to-green-600/8',
      iconBg: 'from-green-900/20 to-emerald-800/20',
      iconBorder: 'border-green-700/20 group-hover:border-green-600/40',
      titleHover: 'group-hover:text-green-400',
      subtitle: 'text-green-400/80',
    },
    purple: {
      glow: 'from-purple-600/0 via-violet-500/0 to-purple-600/0 group-hover:from-purple-600/8 group-hover:via-violet-500/8 group-hover:to-purple-600/8',
      iconBg: 'from-purple-900/20 to-violet-800/20',
      iconBorder: 'border-purple-700/20 group-hover:border-purple-600/40',
      titleHover: 'group-hover:text-purple-400',
      subtitle: 'text-purple-400/80',
    },
    orange: {
      glow: 'from-orange-600/0 via-amber-500/0 to-orange-600/0 group-hover:from-orange-600/8 group-hover:via-amber-500/8 group-hover:to-orange-600/8',
      iconBg: 'from-orange-900/20 to-amber-800/20',
      iconBorder: 'border-orange-700/20 group-hover:border-orange-600/40',
      titleHover: 'group-hover:text-orange-400',
      subtitle: 'text-orange-400/80',
    },
    pink: {
      glow: 'from-pink-600/0 via-rose-500/0 to-pink-600/0 group-hover:from-pink-600/8 group-hover:via-rose-500/8 group-hover:to-pink-600/8',
      iconBg: 'from-pink-900/20 to-rose-800/20',
      iconBorder: 'border-pink-700/20 group-hover:border-pink-600/40',
      titleHover: 'group-hover:text-pink-400',
      subtitle: 'text-pink-400/80',
    },
  }

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
              Autonomous Marketing Agents
              <br />
              <span className="gradient-text">Powered by Marketing Intelligence API</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed">
              Unlock infinite marketing potential and increase your revenue
            </p>

            {/* Email Capture Form - Enhanced Visibility */}
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onSubmit={handleEmailSubmit}
              className="max-w-2xl mx-auto mb-8"
            >
              {/* Prominent container with subtle glow */}
              <div className="relative">
                {/* Subtle glow effect behind form */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-purple-500/10 to-primary-500/10 blur-2xl rounded-2xl" />

                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-2">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your company email"
                      required
                      className="flex-1 px-6 py-4 bg-white text-gray-900 placeholder-gray-500 border-2 border-transparent rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200 font-medium shadow-sm"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 hover:scale-[1.02]"
                    >
                      {isSubmitting ? 'Submitting...' : 'Get Report'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Success/Error Message */}
              {submitMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-4 rounded-xl text-sm font-medium ${
                    submitStatus === 'success'
                      ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                      : 'bg-red-500/10 border border-red-500/30 text-red-400'
                  }`}
                >
                  {submitMessage}
                </motion.div>
              )}
            </motion.form>

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
              Autonomous AI agents approved by our experts
            </h2>
            {/* <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See how your website compares to competitors in your category
            </p> */}
          </motion.div>

          {/* Grid: 2-2-1 layout for 5 products */}
          <div className="space-y-6">
            {/* First Row - 2 Products Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.slice(0, 2).map((product, index) => {
                const colors = colorConfig[product.accentColor]
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="relative h-full">
                      {/* Subtle colored glow effect on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${colors.glow} rounded-2xl blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100`} />

                      <div className="relative h-full bg-dark-400/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 transition-all duration-300 group-hover:border-gray-700/50 group-hover:bg-dark-400/70 group-hover:scale-[1.02]">
                        {/* Icon with colored gradient background */}
                        <div className={`mb-6 inline-flex p-3 bg-gradient-to-br ${colors.iconBg} border ${colors.iconBorder} rounded-xl transition-colors duration-300`}>
                          <product.IconComponent className="w-12 h-12" />
                        </div>

                        <h3 className={`text-2xl font-bold mb-2 ${colors.titleHover} transition-colors duration-300`}>
                          {product.title}
                        </h3>
                        <p className={`text-sm font-medium ${colors.subtitle} mb-4`}>{product.subtitle}</p>
                        <p className="text-gray-400 leading-relaxed mb-6 text-[15px]">
                          {product.description}
                        </p>

                        {/* Refined feature tags */}
                        <div className="flex flex-wrap gap-2">
                          {product.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 bg-dark-300/50 border border-gray-700/50 rounded-lg text-xs font-medium text-gray-300 group-hover:border-gray-600/50 group-hover:bg-dark-300/70 transition-all duration-300"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Second Row - 2 Products Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.slice(2, 4).map((product, index) => {
                const colors = colorConfig[product.accentColor]
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="relative h-full">
                      {/* Subtle colored glow effect on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${colors.glow} rounded-2xl blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100`} />

                      <div className="relative h-full bg-dark-400/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 transition-all duration-300 group-hover:border-gray-700/50 group-hover:bg-dark-400/70 group-hover:scale-[1.02]">
                        {/* Icon with colored gradient background */}
                        <div className={`mb-6 inline-flex p-3 bg-gradient-to-br ${colors.iconBg} border ${colors.iconBorder} rounded-xl transition-colors duration-300`}>
                          <product.IconComponent className="w-12 h-12" />
                        </div>

                        <h3 className={`text-2xl font-bold mb-2 ${colors.titleHover} transition-colors duration-300`}>
                          {product.title}
                        </h3>
                        <p className={`text-sm font-medium ${colors.subtitle} mb-4`}>{product.subtitle}</p>
                        <p className="text-gray-400 leading-relaxed mb-6 text-[15px]">
                          {product.description}
                        </p>

                        {/* Refined feature tags */}
                        <div className="flex flex-wrap gap-2">
                          {product.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 bg-dark-300/50 border border-gray-700/50 rounded-lg text-xs font-medium text-gray-300 group-hover:border-gray-600/50 group-hover:bg-dark-300/70 transition-all duration-300"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Third Row - 1 Product Centered */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto group"
            >
              {(() => {
                const product = products[4]
                const colors = colorConfig[product.accentColor]
                return (
                  <div className="relative">
                    {/* Subtle colored glow effect on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.glow} rounded-2xl blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100`} />

                    <div className="relative bg-dark-400/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 transition-all duration-300 group-hover:border-gray-700/50 group-hover:bg-dark-400/70 group-hover:scale-[1.01]">
                      <div className="flex flex-col md:flex-row items-start gap-8">
                        {/* Icon with colored gradient background */}
                        <div className={`inline-flex p-4 bg-gradient-to-br ${colors.iconBg} border ${colors.iconBorder} rounded-xl transition-colors duration-300`}>
                          <product.IconComponent className="w-16 h-16" />
                        </div>

                        <div className="flex-1">
                          <h3 className={`text-3xl font-bold mb-2 ${colors.titleHover} transition-colors duration-300`}>
                            {product.title}
                          </h3>
                          <p className={`text-sm font-medium ${colors.subtitle} mb-4`}>{product.subtitle}</p>
                          <p className="text-gray-400 leading-relaxed mb-6 text-[15px]">
                            {product.description}
                          </p>

                          {/* Refined feature tags */}
                          <div className="flex flex-wrap gap-2">
                            {product.features.map((feature, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1.5 bg-dark-300/50 border border-gray-700/50 rounded-lg text-xs font-medium text-gray-300 group-hover:border-gray-600/50 group-hover:bg-dark-300/70 transition-all duration-300"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()}
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

