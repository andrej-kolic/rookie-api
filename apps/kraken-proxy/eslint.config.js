import {
  config as expressConfig,
  // disableTypeCheck,
} from '@repo/eslint-config/express';

/** @type {import("eslint").Linter.Config} */
export default [
  ...expressConfig,

  // Disable strict type checking for test files due to Jest global types
  // This is a common pattern when using strict TypeScript with Jest
  // disableTypeCheck(['**/*.test.ts', '**/*.spec.ts', 'test/**']),
];
