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
};
