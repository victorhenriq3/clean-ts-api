module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCovarageFrom: [
    '<rootDir>/src/**/**.ts',
    '!<rootDir>/src/main/**'
  ],
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  preset: '@shelf/jest-mongodb',
}
