/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#576cbc",
        secondary: "#19376d",
        dark: "#0b2447",
        background: "#04152d",
        text: "#ffffff",
        accent: "#8294C4",
        highlight: "#ACB1D6",
      },
      fontFamily: {
        sans: ["Outfit", "Arial", "sans-serif"],
        heading: ["Roboto", "sans-serif"],
      },
      animation: {
        'float': 'floating 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
      },
    },
  },
  plugins: [],
}
