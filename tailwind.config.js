/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#FAF9F6',
        soft: '#F4F1EA',
        muted: '#EAE5D9',
        panel: '#FFFFFF',
        navy: '#0A192F',
        royal: {
          primary: '#0B4F9C',
          mid: '#1D70B8',
          bright: '#2563EB',
          light: '#60A5FA',
          subtle: '#E0F2FE',
        },
        silver: {
          dark: '#475569',
          mid: '#64748B',
          bright: '#94A3B8',
        },
        text: {
          heading: '#0A192F',
          body: '#334155',
          muted: '#64748B',
          royal: '#0B4F9C',
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(11,79,156,0.08)',
        'card-hover': '0 16px 48px rgba(11,79,156,0.18)',
        royal: '0 0 40px rgba(11,79,156,0.3)',
        btn: '0 4px 20px rgba(11,79,156,0.35)',
      },
      borderRadius: {
        'card': '1.25rem', // 20px
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
};
