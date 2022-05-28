const Themes = require('./themes.json');

const colors = Themes.reduce(
  (acc, { name, ...theme }) => ({
    ...acc,
    [name.toLowerCase()]: theme,
  }),
  {},
);

const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      ...colors,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

module.exports = config;
