// Professional abstract SVG icons for product cards
// Inspired by Cube.ai design style - minimalist, modern, gradient-based

export const GeoIcon = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="geoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#9b51e0" />
      </linearGradient>
    </defs>
    {/* Abstract AI brain/network representation */}
    <circle cx="32" cy="32" r="28" stroke="url(#geoGradient)" strokeWidth="2" fill="none" opacity="0.3" />
    <circle cx="32" cy="20" r="4" fill="url(#geoGradient)" />
    <circle cx="20" cy="36" r="4" fill="url(#geoGradient)" />
    <circle cx="44" cy="36" r="4" fill="url(#geoGradient)" />
    <circle cx="32" cy="48" r="4" fill="url(#geoGradient)" />
    <line x1="32" y1="24" x2="32" y2="44" stroke="url(#geoGradient)" strokeWidth="2" opacity="0.5" />
    <line x1="24" y1="34" x2="40" y2="34" stroke="url(#geoGradient)" strokeWidth="2" opacity="0.5" />
    <path d="M 28 24 Q 24 28 24 32" stroke="url(#geoGradient)" strokeWidth="2" fill="none" opacity="0.5" />
    <path d="M 36 24 Q 40 28 40 32" stroke="url(#geoGradient)" strokeWidth="2" fill="none" opacity="0.5" />
  </svg>
)

export const SeoIcon = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="seoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#9b51e0" />
      </linearGradient>
    </defs>
    {/* Abstract search/ranking representation - ascending bars with magnifying glass */}
    <rect x="12" y="42" width="8" height="12" rx="2" fill="url(#seoGradient)" opacity="0.4" />
    <rect x="24" y="34" width="8" height="20" rx="2" fill="url(#seoGradient)" opacity="0.6" />
    <rect x="36" y="26" width="8" height="28" rx="2" fill="url(#seoGradient)" opacity="0.8" />
    <circle cx="48" cy="20" r="8" stroke="url(#seoGradient)" strokeWidth="2.5" fill="none" />
    <line x1="54" y1="26" x2="60" y2="32" stroke="url(#seoGradient)" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
)

export const PaidMarketingIcon = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="paidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#9b51e0" />
      </linearGradient>
    </defs>
    {/* Abstract growth/advertising representation - upward arrow with radiating lines */}
    <path d="M 32 48 L 32 16 L 24 24 M 32 16 L 40 24" stroke="url(#paidGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="32" cy="32" r="20" stroke="url(#paidGradient)" strokeWidth="2" fill="none" opacity="0.2" />
    <line x1="32" y1="12" x2="32" y2="8" stroke="url(#paidGradient)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <line x1="46" y1="18" x2="49" y2="15" stroke="url(#paidGradient)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <line x1="52" y1="32" x2="56" y2="32" stroke="url(#paidGradient)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <line x1="18" y1="18" x2="15" y2="15" stroke="url(#paidGradient)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <line x1="12" y1="32" x2="8" y2="32" stroke="url(#paidGradient)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
  </svg>
)

export const ReviewsIcon = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="reviewsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#9b51e0" />
      </linearGradient>
    </defs>
    {/* Abstract star/rating representation */}
    <path 
      d="M 32 12 L 36 26 L 50 26 L 39 35 L 43 49 L 32 40 L 21 49 L 25 35 L 14 26 L 28 26 Z" 
      fill="url(#reviewsGradient)" 
      opacity="0.8"
    />
    <circle cx="32" cy="32" r="26" stroke="url(#reviewsGradient)" strokeWidth="2" fill="none" opacity="0.2" />
  </svg>
)

export const AITransformationIcon = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#9b51e0" />
      </linearGradient>
    </defs>
    {/* Abstract AI transformation - geometric shapes morphing */}
    <rect x="14" y="14" width="16" height="16" rx="2" stroke="url(#aiGradient)" strokeWidth="2" fill="none" opacity="0.6" />
    <circle cx="46" cy="46" r="8" stroke="url(#aiGradient)" strokeWidth="2" fill="none" opacity="0.6" />
    <path d="M 30 22 L 38 38" stroke="url(#aiGradient)" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    <path d="M 30 22 Q 38 22 38 30" stroke="url(#aiGradient)" strokeWidth="2" fill="none" opacity="0.4" />
    <circle cx="22" cy="22" r="3" fill="url(#aiGradient)" />
    <circle cx="46" cy="46" r="3" fill="url(#aiGradient)" />
    {/* Sparkle effects */}
    <path d="M 50 20 L 52 22 L 50 24 L 48 22 Z" fill="url(#aiGradient)" opacity="0.6" />
    <path d="M 18 46 L 20 48 L 18 50 L 16 48 Z" fill="url(#aiGradient)" opacity="0.6" />
  </svg>
)

