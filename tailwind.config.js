const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gruvbox: {
        background: '#262626',
        foreground: '#ebdbb2',
        yellow: '#D79921',
        green: '#98971a',
        gray: '#a89984',
        blue: '#458588',
      },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
