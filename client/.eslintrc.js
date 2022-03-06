module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    eqeqeq: 0,
    'max-len': ['error', { code: 1120 }],
    'no-return-assign': 0,
    'consistent-return': 0,
    'no-shadow': 0,
    'no-unused-expressions': 0,
    'no-inner-declarations': 0,
    'no-unused-vars': 0,
    'prefer-destructuring': 0,
    'array-callback-return': 0,
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
