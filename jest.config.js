module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/test/',
  ],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@schema/(.*)$': '<rootDir>/interface/schema/$1',
    '^@dto/(.*)$': '<rootDir>/interface/dto/$1',
  },
};
