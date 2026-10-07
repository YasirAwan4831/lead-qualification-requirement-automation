/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        navy: { 50: "#eef3f9", 100: "#d9e3f0", 200: "#b3c6e0", 700: "#14325c", 800: "#0b2545", 900: "#071a33", 950: "#041022" },
        gold: { 300: "#a9b3f6", 400: "#8190f0", 500: "#4f5bd5", 600: "#4049b8", 700: "#323a99" },
      },
      fontFamily: {
        serif: ["Charter", "'Iowan Old Style'", "'Palatino Linotype'", "Palatino", "Georgia", "serif"],
        sans: ["system-ui", "-apple-system", "'Segoe UI'", "Roboto", "'Helvetica Neue'", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
