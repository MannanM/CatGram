/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ec4899', // pink-500 for cat theme
        danger: '#ef4444',
        warning: '#eab308',
        success: '#22c55e',
      },
      animation: {
        'spin-slow': 'spin 4s linear infinite',
        'marquee': 'marquee 5s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }
    },
  },
  plugins: [],
}
