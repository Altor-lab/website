import { motion } from 'framer-motion'
import Button from './Button'

const CTASection = ({ 
  title, 
  description, 
  ctaText, 
  ctaLink,
  variant = 'gradient' 
}) => {
  const backgroundClasses = {
    gradient: 'bg-gradient-primary',
    solid: 'bg-dark-800',
  }

  const textColorClasses = {
    gradient: 'text-white',
    solid: 'text-white',
  }

  return (
    <section className="py-20 border-t border-gray-800">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`${backgroundClasses[variant]} rounded-2xl p-12 md:p-16 text-center`}
        >
          <h2 className={`text-3xl md:text-h2-product font-bold mb-4 ${textColorClasses[variant]}`}>
            {title}
          </h2>
          
          <p className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto ${
            variant === 'gradient' ? 'text-white/90' : 'text-gray-300'
          }`}>
            {description}
          </p>
          
          <Button
            href={ctaLink}
            variant={variant === 'gradient' ? 'secondary' : 'primary'}
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
            className={variant === 'gradient' ? 'border-white text-white hover:bg-white hover:text-black' : ''}
          >
            {ctaText}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection

