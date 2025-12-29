/** @type {import('jest').Config} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }],
  },
  setupFiles: ['<rootDir>/test/test-setup.ts'],
  moduleNameMapper: {
    '^dotenv$': '<rootDir>/test/mocks/dotenv.cjs', // Mock dotenv globally
  },

  // testMatch: [
  //   '**/__tests__/**/*.ts', // Finds your unit tests
  //   '**/tests/**/*.test.ts', // Finds your integration tests
  // ],
};
