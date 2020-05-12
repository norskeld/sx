module.exports = {
  root: true,
  env: {
    node: true,
    es2020: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: ['babel'],
  extends: ['eslint:recommended'],
  rules: {
    'semi': ['error', 'never'],
    'quotes': ['error', 'single', { allowTemplateLiterals: true }],
    'no-unused-vars': ['warn', { args: 'after-used', argsIgnorePattern: '_' }]
  }
}
