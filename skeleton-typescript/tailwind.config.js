/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: true,
  content: [
    "./client/src/**/*.{html,js,ts,tsx}",
    "./client/src/components/**/*.{html,js,ts,tsx}",
    "./client/src/components/pages/**/*.{html,js,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
