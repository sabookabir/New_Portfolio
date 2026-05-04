/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#0A0A0A', // Pure Black
          900: '#121212', // Near Black
        },
        surface: {
          900: '#1A1A1A', // Dark Gray
          800: '#262626',
          700: '#404040',
          500: '#737373',
          400: '#A3A3A3',
          200: '#E5E5E5',
        },
        primary: '#FFD700', // Premium Gold
        secondary: '#EF4444', // Clean Tech Red
        'gold-soft': 'rgba(255, 215, 0, 0.1)',
        'red-soft': 'rgba(239, 68, 68, 0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
