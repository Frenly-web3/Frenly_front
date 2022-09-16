/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['SF Pro Text']
    },
    container: {
      center: true,
      padding: 16,
      screens: {
        sm: '600px'
      }
    },
    colors: {
      'main': '#248BF2',
      'white': '#ffffff',
      'gray': '#71747A'
    }
  },
  plugins: [],
}