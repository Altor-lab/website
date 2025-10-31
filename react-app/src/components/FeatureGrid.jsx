import { motion } from 'framer-motion'
import Card from './Card'

const FeatureGrid = ({ 
  features, 
  columns = 3,
  variant = 'card' 
}) => {
  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  if (variant === 'list') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className={`grid ${gridClasses[columns]} gap-6`}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex items-start space-x-3"
          >
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-green/20 flex items-center justify-center mt-1">
              <svg className="w-4 h-4 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    )
  }

  // Card variant (default)
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`grid ${gridClasses[columns]} gap-6`}
    >
      {features.map((feature, index) => (
        <motion.div key={index} variants={itemVariants}>
          <Card className="h-full p-6 hover:border-primary-500/50 transition-colors">
            {/* Icon */}
            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
              <span className="text-2xl">{feature.icon}</span>
            </div>
            
            {/* Title */}
            <h3 className="text-xl font-semibold text-white mb-3">
              {feature.title}
            </h3>
            
            {/* Description */}
            <p className="text-gray-400 leading-relaxed">
              {feature.description}
            </p>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default FeatureGrid

