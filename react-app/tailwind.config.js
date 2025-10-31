/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          blue: '#0ea5e9',
          purple: '#9b51e0',
        },
        dark: {
          50: '#18181b',
          100: '#0f0f12',
          200: '#09090b',
          300: '#050507',
          400: '#030303',
          900: '#030303',
          800: '#050507',
          700: '#09090b',
          600: '#0f0f12',
          500: '#18181b',
        },
        accent: {
          green: '#00d084',
          yellow: '#fcb900',
          red: '#cf2e2e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
        display: ['Inter Display', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'h1-product': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'h2-product': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h3-product': ['1.75rem', { lineHeight: '1.3', fontWeight: '600' }],
        'stat-large': ['4rem', { lineHeight: '1', fontWeight: '700' }],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0ea5e9 0%, #9b51e0 100%)',
        'gradient-dark': 'linear-gradient(180deg, #030303 0%, #09090b 100%)',
        'gradient-radial': 'radial-gradient(circle at center, #0f0f12 0%, #030303 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
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
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

