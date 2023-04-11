/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        '3xl': '1600px',
        '4xl': '1920px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

