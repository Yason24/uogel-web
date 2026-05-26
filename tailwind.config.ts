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
    },
  },
  plugins: [],
};
export default config;
