/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nature: {
          50: '#f2f9f3',
          100: '#e1f2e5',
          200: '#c4e5cc',
          300: '#97d1a5',
          400: '#63b578',
          500: '#3d9954',
          600: '#2d7c41',
          700: '#256235',
          800: '#214e2d',
          900: '#1c4127',
          950: '#0b2313',
        },
        earth: {
          50: '#faf7f2',
          100: '#f3ece2',
          200: '#e6d8c4',
          300: '#d5bfa0',
          400: '#c3a17c',
          500: '#b4895f',
          600: '#a37452',
          700: '#865b44',
          800: '#6d4a3b',
          900: '#593e33',
        },
        moss: '#557153',
        amberwood: '#d97706',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
