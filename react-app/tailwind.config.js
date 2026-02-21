/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          0: '#f6f1eb',
          1: '#ffffff',
          2: '#ede9e3',
          3: '#e3dfda',
          4: '#d9d5d0',
        },
        edge: {
          DEFAULT: 'rgba(0,0,0,0.10)',
          subtle: 'rgba(0,0,0,0.06)',
          hover: 'rgba(0,0,0,0.18)',
        },
        fg: {
          DEFAULT: '#1a1a1a',
          secondary: '#6b6b6b',
          muted: '#9a9a9a',
          faint: '#bcbcbc',
        },
        accent: {
          DEFAULT: '#1a6b5a',
          dim: 'rgba(26,107,90,0.08)',
        },
      },
      fontFamily: {
        display: ['Satoshi', 'system-ui', 'sans-serif'],
        sans: ['Geist', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
