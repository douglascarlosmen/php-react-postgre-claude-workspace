/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#DC2626',
          gold: '#D97706',
          dark: '#0F172A',
          card: '#1E293B',
          border: '#334155',
        },
      },
    },
  },
  plugins: [],
}
