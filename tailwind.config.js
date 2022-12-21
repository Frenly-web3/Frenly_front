/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/shared/**/*.{js,ts,jsx,tsx}",
    "./src/features/**/*.{js,ts,jsx,tsx}",
    "./src/widgets/**/*.{js,ts,jsx,tsx}",
    "./src/entities/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {},
    fontFamily: {
      // Old
      'sans': ['SF Pro Text'],

      // New
      'compact' : ['SF Compact Display'],
      'mono' : ['SF Mono'],
      'display' : ['SF Pro Display'],
      'rounded' : ['SF Pro Rounded'],
      'text' : ['SF Pro Text'],
    },
    container: {
      center: true,
      padding: 16,
      screens: {
        sm: '600px'
      }
    },
    colors: {
      // Old
      'main': '#248BF2',
      // 'white': '#ffffff',
      'gray': '#71747A',
      'light-gray':'rgba(201, 204, 209, 0.24)',
      'gray-darker': '#81889F',
      'border-color': '#D7DDF3',
      'error': '#FF005C',
      'error-bg': 'rgba(255, 0, 0, 0.1)',
      'light-bg': '#ECF2FF',
      'is-liked': 'rgba(252, 165, 165, 0.8 )',

      // New
      'white': 'hsla(0, 0%, 100%, 100%)',
      'black': 'hsla(0, 0%, 0%, 100%)',

      'background': 'hsla(0, 0%, 100%, 100%)',

      'heading': 'hsla(0, 0%, 0%, 100%)',
      'text': 'hsla(0, 0%, 0%, 80%)',
      'hidden': 'hsla(0, 0%, 0%, 40%)',

      'overlay-1': 'hsla(0, 0%, 100%, 5%)',
      'overlay-2': 'hsla(0, 0%, 100%, 10%)',
      'overlay-3': 'hsla(0, 0%, 100%, 20%)',
      'overlay-1-solid': 'hsla(0, 0%, 95%, 100%)',
      'overlay-2-solid': 'hsla(0, 0%, 90%, 100%)',
      'overlay-3-solid': 'hsla(0, 0%, 80%, 100%)',

      'border': 'hsla(0, 0%, 0%, 20%)',
      'border-solid': 'hsla(0, 0%, 20%, 100%)',

      'success-light': 'hsla(150, 90%, 40%, 100%)',
      'success-dark': 'hsla(150, 90%, 40%, 100%)',
      'success-tint': 'hsla(150, 90%, 40%, 100%)',
      
      'information-light': 'hsla(210, 90%, 55%, 100%)',
      'information-dark': 'hsla(210, 90%, 35%, 100%)',
      'information-tint': 'hsla(210, 90%, 55%, 40%)',
      
      'warning-light': 'hsla(40, 100%, 50%, 100%)',
      'warning-dark': 'hsla(40, 100%, 30%, 100%)',
      'warning-tint': 'hsla(40, 100%, 50%, 400%)',
      
      'error-light': 'hsla(350, 100%, 50%, 100%)',
      'error-dark': 'hsla(350, 100%, 30%, 100%)',
      'error-tint': 'hsla(350, 100%, 50%, 40%)',
    }
  },
  plugins: [require('tw-elements/dist/plugin')],
}