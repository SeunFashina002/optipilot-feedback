import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#44ca92',
          light: '#e6faf3',
          dark: '#36a97a',
          opti: '#181c21',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
