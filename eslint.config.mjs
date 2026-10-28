import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['dist/**', 'node_modules/**', 'test-results/**', 'playwright-report/**', '.superpowers/**'] },
  js.configs.recommended,
  { languageOptions: { globals: globals.node } },
  { files: ['src/client.js'], languageOptions: { globals: globals.browser } },
  { files: ['tests/**/*.spec.mjs'], languageOptions: { globals: { ...globals.node, ...globals.browser } } },
];
