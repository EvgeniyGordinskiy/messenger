module.exports = {
  root: true,
  env: {
    jest: true,
    node: true,
    browser: true,
    es6: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-tabs': 2,
    'comma-dangle': 'off',
    'import/first': 'off',
    'vue/require-prop-types': 'off',
    'vue/max-attributes-per-line': 'off',
    'space-before-function-paren': 'off',
    'vue/no-side-effects-in-computed-properties': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'err' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'err' : 'warn',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'err' : 'warn',
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
}
