import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        arch: {
          DEFAULT: '#c9783b',
          dark: '#a85f2a',
          light: '#dba578',
          muted: '#f0dcc8',
        },
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.22s ease both',
        'slide-down': 'slideDown 0.22s cubic-bezier(0.16,1,0.3,1) both',
        'scale-in': 'scaleIn 0.28s cubic-bezier(0.16,1,0.3,1) both',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16,1,0.3,1)',
      },
    },
  },
  plugins: [],
};
export default config;
