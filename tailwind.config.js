/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
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
      sans: ["SF Pro Text, sans-serif"],

      // New
      compact: ["SF Compact Display, sans-serif"],
      mono: ["SF Mono, sans-serif"],
      display: ["SF Pro Display, sans-serif"],
      rounded: ["SF Pro Rounded, sans-serif"],
      text: ["SF Pro Text, sans-serif"],
      icon: ["var(--font-icon)", ...fontFamily.sans],
    },
    fontSize: {
      xmicro: "8px",
      micro: "11px",

      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    container: {
      center: true,
      padding: 16,
      screens: {
        sm: "600px",
      },
    },
    colors: {
      // Old
      main: "#248BF2",
      // 'white': '#ffffff',
      gray: "#71747A",
      "light-gray": "rgba(201, 204, 209, 0.24)",
      "gray-darker": "#81889F",
      "border-color": "#D7DDF3",
      error: "#FF005C",
      "error-bg": "rgba(255, 0, 0, 0.1)",
      "light-bg": "#ECF2FF",
      "is-liked": "rgba(252, 165, 165, 0.8 )",

      // New
      white: "hsla(0, 0%, 100%, 100%)",
      black: "hsla(0, 0%, 0%, 100%)",

      "grey-secondary": "#F2F2F2",

      background: "#EFF5FF",

      heading: "hsla(0, 0%, 0%, 100%)",
      text: "hsla(0, 0%, 0%, 80%)",
      hidden: "hsla(0, 0%, 0%, 40%)",

      "overlay-1": "hsla(0, 0%, 100%, 5%)",
      "overlay-2": "hsla(0, 0%, 100%, 10%)",
      "overlay-3": "hsla(0, 0%, 100%, 20%)",
      "overlay-1-solid": "hsla(0, 0%, 95%, 100%)",
      "overlay-2-solid": "hsla(0, 0%, 90%, 100%)",
      "overlay-3-solid": "hsla(0, 0%, 80%, 100%)",

      border: "hsla(0, 0%, 0%, 20%)",
      "border-solid": "hsla(0, 0%, 20%, 100%)",

      "frenly-light": "hsla(220, 80%, 90%, 100%)",
      "frenly-dark": "hsla(220, 80%, 70%, 100%)",
      "frenly-tint": "hsla(220, 80%, 90%, 100%)",

      "success-light": "hsla(150, 90%, 40%, 100%)",
      "success-dark": "hsla(150, 90%, 20%, 100%)",
      "success-tint": "hsla(150, 90%, 40%, 100%)",

      "information-light": "hsla(210, 90%, 55%, 100%)",
      "information-dark": "hsla(210, 90%, 35%, 100%)",
      "information-tint": "hsla(210, 90%, 55%, 40%)",

      "warning-light": "hsla(40, 100%, 50%, 100%)",
      "warning-dark": "hsla(40, 100%, 30%, 100%)",
      "warning-tint": "hsla(40, 100%, 50%, 400%)",

      "error-light": "hsla(350, 100%, 50%, 100%)",
      "error-dark": "hsla(350, 100%, 30%, 100%)",
      "error-tint": "hsla(350, 100%, 50%, 40%)",

      "notification-chat": "hsla(36, 67%, 49%, 1)",
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
