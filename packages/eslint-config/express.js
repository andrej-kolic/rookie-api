import { config as baseConfig } from './base.js';
import globals from 'globals';

export { disableTypeCheck } from './base.js';

/**
 * A custom ESLint configuration for expressjs.
 *
 * @type {import("eslint").Linter.Config} */
export const config = [
  ...baseConfig,

  {
    files: ['**/*.test.ts', '**/*.spec.ts'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
];
