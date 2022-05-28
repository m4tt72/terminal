module.exports = {
  plugins: ['prettier'],
  extends: ['next/core-web-vitals'],
  rules: {
    'no-console': 'error',
    'prettier/prettier': 'warn',
    'react-hooks/exhaustive-deps': 'off',
    'react/display-name': 'off',
    'import/no-anonymous-default-export': 'off',
  },
};
