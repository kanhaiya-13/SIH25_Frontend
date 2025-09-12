/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#0a0f1e",
          800: "#0f1a38",
          700: "#13244f",
          neon: "#39d2ff",
          accent: "#8aa5ff",
          pink: "#ff6bd6",
        },
      },
      boxShadow: {
        neon:
          "0 0 20px rgba(57,210,255,.45), inset 0 0 20px rgba(57,210,255,.15)",
      },
      fontFamily: {
        display: [
          "Inter",
          "system-ui",
          "ui-sans-serif",
          "Segoe UI",
          "Roboto",
        ],
      },
    },
  },
  plugins: [],
};
