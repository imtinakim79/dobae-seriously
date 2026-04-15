import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fef9f0',
          100: '#fdf0d5',
          200: '#f9dea5',
          300: '#f5c66a',
          400: '#f0a832',
          500: '#e8900f',
          600: '#cc7009',
          700: '#a8550b',
          800: '#894310',
          900: '#703810',
          950: '#3f1c05',
        },
        neutral: {
          850: '#1f2023',
        },
      },
      fontFamily: {
        sans: ['var(--font-noto)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
