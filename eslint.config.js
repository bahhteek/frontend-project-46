// eslint.config.js
import js from '@eslint/js';
import pluginJest from 'eslint-plugin-jest';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      jest: pluginJest,
    },
    rules: {
      'no-unused-vars': 'warn',
    },
  },
]
