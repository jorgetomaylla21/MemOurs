/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "media",
  content: [
    "./client/src/**/*.{html,js,ts,tsx}",
    "./client/src/components/**/*.{html,js,ts,tsx}",
    "./client/src/components/pages/**/*.{html,js,ts,tsx}",
    "./client/src/components/modules/**/*.{html,js,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
