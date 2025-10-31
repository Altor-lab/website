import { motion } from 'framer-motion'

const Card = ({ children, className = '', hover = true, ...props }) => {
  const baseClasses = 'bg-dark-300 border border-gray-800 rounded-xl p-6'
  const hoverClasses = hover ? 'hover:border-gray-700 transition-all duration-300' : ''
  
  return (
    <motion.div
      className={`${baseClasses} ${hoverClasses} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card

