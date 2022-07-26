/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "ixaya-primary-900": "#203A4F",
        "ixaya-primary-700": "#2B4D68",
        "ixaya-primary-500": "#40729C",
        "ixaya-primary-200": "#5FAAE8",
      }
    },
  },
  plugins: [],
}
