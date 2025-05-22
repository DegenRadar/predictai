/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // or 'media' if you prefer system settings
  theme: {
    extend: {
      colors: {
        'light-bg': '#F8F9FB',
        'light-sidebar': '#FFFFFF',
        'light-text': '#222222',
        'light-text-secondary': '#666666',
        'light-card-bg': '#FFFFFF',
        'light-border': '#E5E7EB',

        'dark-bg': '#121212',
        'dark-sidebar': '#1A1A1A',
        'dark-text': '#FFFFFF',
        'dark-text-secondary': '#B0B0B0',
        'dark-card-bg': '#1F2937',
        'dark-border': '#374151',

        'accent': '#56eced', // Your PredictAI accent color
        'accent-hover': '#47C8D0',
        'highlight': '#34D399',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
} 