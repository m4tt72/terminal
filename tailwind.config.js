const { colors } = require('./config.json');
module.exports = {
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      light: {
        background: '#FBF1C9',
        foreground: '#3C3836',
        yellow: '#D79921',
        green: '#98971a',
        gray: '#7C6F64',
        blue: '#458588',
      },
      dark: {
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
