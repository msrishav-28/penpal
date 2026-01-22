/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // === THE ETHEREAL ARCHIVE COLOR SYSTEM ===
      colors: {
        // Base Layers
        void: '#02040A',
        graphite: '#0A0C14',
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.03)',
          light: 'rgba(255, 255, 255, 0.05)',
          medium: 'rgba(255, 255, 255, 0.08)',
        },
        'glass-border': {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          highlight: 'rgba(255, 255, 255, 0.15)',
          subtle: 'rgba(255, 255, 255, 0.05)',
        },
        // Typography Colors
        'text-primary': '#EDEDED',
        'text-secondary': '#A1A1AA',
        'text-tertiary': '#52525B',
        // Accent Colors (The "Magic")
        accent: {
          violet: '#8B5CF6',
          fuchsia: '#D946EF',
          gold: '#FFD700',
        },
      },

      // === TYPOGRAPHY ===
      fontFamily: {
        display: ['Clash Display', 'system-ui', 'sans-serif'],
        body: ['Geist Sans', 'system-ui', 'sans-serif'],
        accent: ['Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-xl': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-lg': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-md': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-sm': ['1.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
      },

      // === SHADOWS (Colored, not black) ===
      boxShadow: {
        'glow-sm': '0 0 20px -5px rgba(139, 92, 246, 0.2)',
        'glow-md': '0 0 30px -5px rgba(139, 92, 246, 0.3)',
        'glow-lg': '0 0 50px -10px rgba(139, 92, 246, 0.4)',
        'glow-fuchsia': '0 0 30px -5px rgba(217, 70, 239, 0.3)',
        'ethereal': '0 8px 32px rgba(139, 92, 246, 0.15), 0 2px 8px rgba(0, 0, 0, 0.3)',
        'ethereal-hover': '0 16px 48px rgba(139, 92, 246, 0.2), 0 4px 12px rgba(0, 0, 0, 0.4)',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.3)',
      },

      // === BACKDROP BLUR ===
      backdropBlur: {
        xs: '2px',
        ethereal: '20px',
      },

      // === BORDER RADIUS ===
      borderRadius: {
        'card': '1.5rem',
        'element': '0.75rem',
        'button': '0.5rem',
      },

      // === ANIMATIONS ===
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in': 'fade-in 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        'slide-up': 'slide-up 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        'scale-in': 'scale-in 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          'from': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)' },
          'to': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.4)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'slide-up': {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          'from': { opacity: '0', transform: 'scale(0.95)' },
          'to': { opacity: '1', transform: 'scale(1)' },
        },
      },

      // === TRANSITIONS ===
      transitionTimingFunction: {
        'quintic': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },

      // === BACKGROUND IMAGE (for gradients) ===
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-holographic': 'linear-gradient(135deg, #8B5CF6 0%, #D946EF 100%)',
        'gradient-shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
};
