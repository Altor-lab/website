/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // GitHub-inspired dark theme colors
        bg: {
          primary: '#0d1117',
          secondary: '#161b22',
          tertiary: '#1c2129',
        },
        border: {
          default: '#30363d',
          muted: '#21262d',
          emphasis: '#484f58',
        },
        text: {
          primary: '#e6edf3',
          secondary: '#8b949e',
          muted: '#6e7681',
        },
        accent: {
          green: '#34d399',
          blue: '#58a6ff',
          orange: '#f59e0b',
          red: '#f87171',
        },
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }],
        'display-sm': ['2.5rem', { lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.02em' }],
        'heading': ['2rem', { lineHeight: '1.25', fontWeight: '600', letterSpacing: '-0.01em' }],
        'subheading': ['1.25rem', { lineHeight: '1.5', fontWeight: '500' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        'beam-horizontal': 'beam-horizontal 3s linear infinite',
        'beam-vertical': 'beam-vertical 3s linear infinite',
        'spotlight': 'spotlight 2s ease .75s 1 forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'border-beam': {
          '100%': { 'offset-distance': '100%' },
        },
        'beam-horizontal': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(400%)' },
        },
        'beam-vertical': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(400%)' },
        },
        spotlight: {
          '0%': { opacity: 0, transform: 'translate(-72%, -62%) scale(0.5)' },
          '100%': { opacity: 1, transform: 'translate(-50%,-40%) scale(1)' },
        },
        shimmer: {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [],
}

