import { motion } from 'framer-motion'
import Card from '../components/Card'
import Button from '../components/Button'
import { CompetitionIcon, InsightsIcon, StrategyIcon, HeroOrb } from '../components/icons/AIInsightsIcons'

const AIInsights = () => {
  const features = [
    {
      title: 'Competition Analysis',
      description: 'Understand how your brand performs against competitors in AI search results. We analyze visibility across ChatGPT, Perplexity, Claude, and other AI platforms to show you exactly where you stand.',
      IconComponent: CompetitionIcon,
    },
    {
      title: 'Industry Insights',
      description: 'Get data-driven insights specific to your industry. Our AI models track trends, identify opportunities, and reveal what content strategies are winning in your category.',
      IconComponent: InsightsIcon,
    },
    {
      title: 'Tailored Strategy Execution',
      description: 'Receive customized optimization strategies based on your competitive position. We execute proven tactics to improve your AI search rankings and drive measurable results.',
      IconComponent: StrategyIcon,
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
            {/* Hero Orb Graphic */}
            <div className="flex justify-center mb-8">
              <HeroOrb className="w-32 h-32 md:w-40 md:h-40" />
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Lead Your Industry
              </span>
              <br />
              in AI Search
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Dominate AI-powered search engines with data-driven insights and proven optimization strategies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
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
              How We Help You Win
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our comprehensive approach to AI search optimization
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover className="h-full group text-center">
                  <div className="flex justify-center mb-6">
                    <feature.IconComponent className="w-20 h-20" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <Card className="max-w-3xl mx-auto text-center bg-gradient-to-r from-primary-900/30 to-purple-900/30 border-primary-700">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Dominate AI Search?
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Schedule a consultation to discover how we can help you outrank your competitors in AI-powered search engines.
              </p>
              <Button href="https://calendly.com/founders-altorlab/30min" className="text-lg px-8 py-4">
                Get Started Today
              </Button>
            </motion.div>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default AIInsights

