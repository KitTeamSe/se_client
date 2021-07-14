module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'airbnb',
    'prettier',
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'import/no-named-as-default': 0,
    // ./reportWebVitals.js 에러 예외
    'import/no-named-as-default-member': 0,
    'no-param-reassign': [
      'error',
      // immer 의 draft 사용을 위한 예외
      // https://github.com/reduxjs/redux-toolkit/issues/521
      { props: true, ignorePropertyModificationsFor: ['draft'] }
    ],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx']
      }
    ],
    'no-console': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    'react/prop-types': 'off'
  },
  settings: {
    'import/resolver': { node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] } }
  }
};
