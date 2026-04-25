import { Link } from 'react-router-dom'

const signals = [
  { label: 'Read-only by default', href: '/security' },
  { label: 'No model training on your data', href: '/security' },
  { label: 'Encrypted in transit', href: '/security' },
  { label: 'DPA available on request', href: '/security' },
  { label: 'Code you own at handover', href: '/security' },
]

export default function TrustBar({ className = '' }) {
  return (
    <div className={`border-y border-edge-subtle bg-surface-1 py-3 ${className}`}>
      <div className="max-w-[1080px] mx-auto px-6">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 justify-center sm:justify-start">
          {signals.map(({ label, href }) => (
            <Link
              key={label}
              to={href}
              className="flex items-center gap-1.5 text-[0.75rem] text-fg-muted hover:text-fg transition-colors group"
            >
              <span className="text-accent text-[0.75rem] group-hover:scale-110 transition-transform">✓</span>
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
