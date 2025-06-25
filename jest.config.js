module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
  testMatch: [
    '**/__tests__/**/*.(test|spec).(js|jsx|ts|tsx)',
    '**/*.(test|spec).(js|jsx|ts|tsx)',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.styles.ts',
    '!src/**/index.ts',
    '!src/**/*.stories.tsx',
    '!src/__tests__/setup.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
transformIgnorePatterns: [
  'node_modules/(?!(jest-)?react-native|@react-native|expo(-router|-asset|-splash-screen|-constants|-font|[\w-]*)|@expo|@unimodules|unimodules|sentry-expo|native-base|react-clone-referenced-element)',
],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
};