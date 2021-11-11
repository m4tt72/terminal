const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      gruvbox: {
        background: '#262626',
        foreground: '#ebdbb2',
        yellow: '#D79921',
        green: '#98971a',
        gray: '#a89984',
      },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
