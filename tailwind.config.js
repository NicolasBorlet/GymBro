/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", ".app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      main: ["Poppins", "sans-serif"],
    },
    colors: {
      black: "#1D1617",
      pink: {
        100: "#CC8FED",
        200: "#EEA4CE",
        300: "#C150F6",
      },
      purple: {
        100: "#6B50F6",
      },
      gray: {
        100: "#7B6F72",
        200: "#ADA4A5",
        300: "#DDDADA",
      },
      border_color: "#F7F8F8",
    },
  },
  plugins: [],
};
