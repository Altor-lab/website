import { motion } from 'framer-motion'
import Button from './Button'

const ProductHero = ({ 
  title, 
  subtitle, 
  ctaPrimary, 
  ctaSecondary = null,
  backgroundVariant = 'gradient' 
}) => {
  const backgroundClasses = {
    gradient: 'bg-gradient-radial',
    solid: 'bg-dark-900',
  }

  return (
    <section className={`relative ${backgroundClasses[backgroundVariant]} pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden`}>
      {/* Decorative gradient overlay */}
      {backgroundVariant === 'gradient' && (
        <div className="absolute inset-0 bg-gradient-to-b from-primary-purple/10 via-transparent to-transparent pointer-events-none" />
      )}
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Title with gradient text */}
          <h1 className="text-4xl md:text-h1-product font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            {title}
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {subtitle}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              href={ctaPrimary.link}
              variant="primary"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              {ctaPrimary.text}
            </Button>
            
            {ctaSecondary && (
              <Button
                href={ctaSecondary.link}
                variant="secondary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                {ctaSecondary.text}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductHero

