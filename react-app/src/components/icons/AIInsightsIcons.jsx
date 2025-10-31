// AI Insights Page Icons - Abstract gradient SVG components

// Competition Analysis Icon - Two overlapping circles representing comparison
export const CompetitionIcon = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="competitionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#9b51e0" />
      </linearGradient>
    </defs>
    {/* Left circle */}
    <circle cx="24" cy="32" r="16" stroke="url(#competitionGradient)" strokeWidth="2.5" fill="none" opacity="0.6" />
    {/* Right circle */}
    <circle cx="40" cy="32" r="16" stroke="url(#competitionGradient)" strokeWidth="2.5" fill="none" opacity="0.6" />
    {/* Intersection highlight */}
    <path d="M32 20 L32 44" stroke="url(#competitionGradient)" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
    {/* Comparison arrows */}
    <path d="M18 28 L14 32 L18 36" stroke="url(#competitionGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M46 28 L50 32 L46 36" stroke="url(#competitionGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
)

// Industry Insights Icon - Bar chart with upward trend
export const InsightsIcon = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="insightsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#9b51e0" />
      </linearGradient>
    </defs>
    {/* Base line */}
    <line x1="12" y1="52" x2="52" y2="52" stroke="url(#insightsGradient)" strokeWidth="2" opacity="0.4" />
    {/* Bar 1 - shortest */}
    <rect x="14" y="42" width="6" height="10" fill="url(#insightsGradient)" opacity="0.5" rx="1" />
    {/* Bar 2 - medium */}
    <rect x="24" y="34" width="6" height="18" fill="url(#insightsGradient)" opacity="0.6" rx="1" />
    {/* Bar 3 - tall */}
    <rect x="34" y="24" width="6" height="28" fill="url(#insightsGradient)" opacity="0.7" rx="1" />
    {/* Bar 4 - tallest */}
    <rect x="44" y="16" width="6" height="36" fill="url(#insightsGradient)" opacity="0.8" rx="1" />
    {/* Trend line */}
    <path d="M17 45 L27 37 L37 27 L47 19" stroke="url(#insightsGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
    {/* Sparkle/insight indicator */}
    <circle cx="47" cy="19" r="3" fill="url(#insightsGradient)" opacity="1" />
    <path d="M47 12 L47 16 M47 22 L47 26 M41 19 L45 19 M49 19 L53 19" stroke="url(#insightsGradient)" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
  </svg>
)

// Strategy Execution Icon - Target with arrow hitting bullseye
export const StrategyIcon = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="strategyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#9b51e0" />
      </linearGradient>
    </defs>
    {/* Outer target ring */}
    <circle cx="36" cy="36" r="20" stroke="url(#strategyGradient)" strokeWidth="2" fill="none" opacity="0.3" />
    {/* Middle target ring */}
    <circle cx="36" cy="36" r="14" stroke="url(#strategyGradient)" strokeWidth="2" fill="none" opacity="0.5" />
    {/* Inner target ring */}
    <circle cx="36" cy="36" r="8" stroke="url(#strategyGradient)" strokeWidth="2" fill="none" opacity="0.7" />
    {/* Bullseye */}
    <circle cx="36" cy="36" r="3" fill="url(#strategyGradient)" opacity="1" />
    {/* Arrow shaft */}
    <line x1="10" y1="10" x2="32" y2="32" stroke="url(#strategyGradient)" strokeWidth="2.5" strokeLinecap="round" />
    {/* Arrow head */}
    <path d="M32 32 L28 30 M32 32 L30 28" stroke="url(#strategyGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Arrow fletching */}
    <path d="M12 12 L8 14 M12 12 L14 8" stroke="url(#strategyGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
  </svg>
)

// Hero Graphic - ChatGPT-style circular gradient orb
export const HeroOrb = ({ className = "w-32 h-32" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Radial gradient for orb effect */}
      <radialGradient id="orbGradient1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#9b51e0" stopOpacity="0.9" />
        <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.1" />
      </radialGradient>
      <radialGradient id="orbGradient2" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
        <stop offset="40%" stopColor="#0ea5e9" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#9b51e0" stopOpacity="0.2" />
      </radialGradient>
      <linearGradient id="orbRing" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="50%" stopColor="#7c3aed" />
        <stop offset="100%" stopColor="#9b51e0" />
      </linearGradient>
    </defs>
    
    {/* Outer glow */}
    <circle cx="64" cy="64" r="60" fill="url(#orbGradient1)" opacity="0.3" />
    
    {/* Main orb */}
    <circle cx="64" cy="64" r="48" fill="url(#orbGradient2)" />
    
    {/* Highlight overlay */}
    <ellipse cx="52" cy="52" rx="20" ry="24" fill="url(#orbGradient1)" opacity="0.4" />
    
    {/* Outer ring */}
    <circle cx="64" cy="64" r="54" stroke="url(#orbRing)" strokeWidth="2" fill="none" opacity="0.6" />
    
    {/* Inner ring */}
    <circle cx="64" cy="64" r="42" stroke="url(#orbRing)" strokeWidth="1.5" fill="none" opacity="0.4" />
    
    {/* Sparkle effects */}
    <circle cx="90" cy="40" r="2" fill="#ffffff" opacity="0.8" />
    <circle cx="38" cy="90" r="1.5" fill="#ffffff" opacity="0.6" />
    <circle cx="100" cy="70" r="1" fill="#ffffff" opacity="0.7" />
    
    {/* Rotating arc accents */}
    <path d="M 64 16 A 48 48 0 0 1 100 36" stroke="url(#orbRing)" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round" />
    <path d="M 28 92 A 48 48 0 0 1 16 64" stroke="url(#orbRing)" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round" />
  </svg>
)

