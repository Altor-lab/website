import { motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-surface-0">
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        className="flex-grow"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  )
}

export default Layout
