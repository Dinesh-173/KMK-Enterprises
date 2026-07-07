/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1F3A',
          light: '#112848',
          dark: '#060f1e',
        },
        teal: {
          DEFAULT: '#00A896',
          light: '#00c4ae',
          dark: '#007a6e',
        },
        purple: {
          brand: '#7B2FBE',
          light: '#9B4FDE',
          dark: '#5a1f8e',
        },
        amber: {
          brand: '#F4A100',
          light: '#FFB830',
          dark: '#c07d00',
        },
        slate: {
          muted: '#8896A5',
        },
      },
      fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2s ease-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'shimmer': 'shimmer 2s infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'bounce-subtle': 'bounceSutble 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '1' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        bounceSutble: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'teal-glow': '0 0 30px rgba(0, 168, 150, 0.4)',
        'teal-glow-lg': '0 0 60px rgba(0, 168, 150, 0.5)',
        'purple-glow': '0 0 30px rgba(123, 47, 190, 0.4)',
        'amber-glow': '0 0 30px rgba(244, 161, 0, 0.4)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
};
