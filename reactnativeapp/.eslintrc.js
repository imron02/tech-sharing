module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'react-native/no-inline-styles': 'off',
  },
  overrides: [
    {
      files: ['**/*.spec.js', '**/*.spec.jsx'],
      env: {
        jest: true,
      },
    },
  ],
};
