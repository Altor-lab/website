import { cn } from '../lib/utils'

const Button = ({ children, variant = 'primary', size = 'md', className, onClick, href, ...props }) => {
  const base = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0'

  const variants = {
    primary: 'bg-fg text-white hover:bg-fg/85 hover:-translate-y-px active:translate-y-0 active:bg-fg/80 font-semibold rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.12)]',
    secondary: 'border border-edge text-fg hover:border-edge-hover hover:bg-surface-2 hover:-translate-y-px active:translate-y-0 rounded-full',
  }

  const sizes = {
    sm: 'px-4 py-1.5 text-[0.8125rem]',
    md: 'px-6 py-2.5 text-[0.875rem]',
    lg: 'px-8 py-3 text-[0.9375rem]',
  }

  const classes = cn(base, variants[variant], sizes[size], className)

  const isExternal = href && (href.startsWith('http') || href.startsWith('//'))
  if (href) return <a href={href} className={classes} {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...props}>{children}</a>
  return <button className={classes} onClick={onClick} {...props}>{children}</button>
}

export default Button
