const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  href,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-[#0d1117]'

  const variants = {
    primary: 'bg-emerald-500 text-[#0d1117] hover:bg-emerald-400 font-semibold',
    secondary: 'bg-[#21262d] border border-[#30363d] text-[#e6edf3] hover:bg-[#30363d] hover:border-[#484f58]',
    ghost: 'text-[#8b949e] hover:text-white hover:bg-[#21262d]',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

export default Button
