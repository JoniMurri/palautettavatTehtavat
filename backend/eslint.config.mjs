
export default {
  env: {
    browser: true,
    es2021: true,
    node: true 
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    "react/react-in-jsx-scope": "off", // React does not need to be in scope when using JSX
    "no-unused-vars": ["error", { "varsIgnorePattern": "^React$" }],
    'eqeqeq': 'error', //
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
        'error', 'always'
    ],
    'arrow-spacing': [
        'error', { 'before': true, 'after': true }
    ]
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  languageOptions: {
    sourceType: "module",
    globals: {
      ...globals.browser,
      process: "readonly"
    }
  },
  overrides: [
    {
      files: ["**/*.js"],
      languageOptions: {
        sourceType: "commonjs"
      }
    }
  ]
};
