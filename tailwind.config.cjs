const daisyui = require("daisyui");
const typography = require("@tailwindcss/typography");

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: 'class',

  theme: {
    extend: {}
  },

  plugins: [typography, daisyui],
  daisyui: {
    themes: ["light", "dark"]

  },
};

module.exports = config;