import { Link } from 'react-router-dom'
import Button from '../components/Button'

const NotFound = () => (
  <section className="pt-32 pb-24 px-6">
    <div className="max-w-[1120px] mx-auto">
      <p className="font-mono text-fg-muted text-[0.8125rem] mb-4">404</p>
      <h1 className="font-display text-[2rem] font-bold text-fg tracking-[-0.03em] leading-[1.1]">
        Page not found
      </h1>
      <p className="text-fg-secondary text-[1rem] mt-4 max-w-[48ch] leading-relaxed">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/"><Button size="lg">Back to homepage</Button></Link>
        <Button variant="secondary" size="lg" href="https://calendly.com/founders-altorlab/30min">
          Book a demo
        </Button>
      </div>
    </div>
  </section>
)

export default NotFound
