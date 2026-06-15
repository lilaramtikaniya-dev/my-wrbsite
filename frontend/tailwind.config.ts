import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00d4ff',
        'neon-purple': '#8b5cf6',
        'neon-pink': '#f0abfc',
        'cyber-yellow': '#fbbf24',
        'dark-bg': '#05050f',
        'dark-card': '#0d0d1a',
        'dark-border': 'rgba(139,92,246,0.3)',
        'glass': 'rgba(255,255,255,0.04)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(135deg, #00d4ff 0%, #8b5cf6 50%, #f0abfc 100%)',
        'gradient-dark': 'linear-gradient(135deg, #05050f 0%, #0d0d1a 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(0,212,255,0.05) 0%, rgba(139,92,246,0.05) 100%)',
        'gradient-hero': 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(0,212,255,0.15) 0%, transparent 60%), radial-gradient(ellipse 80% 80% at 80% 50%, rgba(139,92,246,0.1) 0%, transparent 60%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'spin-slow': 'spin 8s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'blink': 'blink 0.7s step-end infinite',
        'border-flow': 'border-flow 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(0,212,255,0.3)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(0,212,255,0.6)' },
        },
        'slide-up': {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        typing: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'border-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(0,212,255,0.4)',
        'neon-purple': '0 0 20px rgba(139,92,246,0.4)',
        'neon-blue-lg': '0 0 40px rgba(0,212,255,0.3)',
        'glass': '0 8px 32px rgba(0,0,0,0.4)',
        'card': '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      backdropBlur: {
        'glass': '16px',
      },
    },
  },
  plugins: [],
}

export default config
