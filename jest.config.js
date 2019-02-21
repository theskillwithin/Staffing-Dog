module.exports = {
  rootDir: './',
  coverageDirectory: '<rootDir>/public/_coverage',
  moduleDirectories: ['node_modules', 'src'],
  coveragePathIgnorePatterns: ['<rootDir>/config'],
  testRegex: '(/__tests__/.*|\\.(spec))\\.(jsx?)$',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\theme.(css)$': 'identity-obj-proxy',
    '\\.(css)$': '<rootDir>/__mocks__/styleMock.js',
    '^@sd': '<rootDir>/src',
    '^@sdog': '<rootDir>/src',
    '^@scene': '<rootDir>/src/scenes',
    '^@store': '<rootDir>/src/store',
    '^@api': '<rootDir>/src/api',
    '^@component': '<rootDir>/src/components',
    '^@util': '<rootDir>/src/utils',
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx'],
  setupFiles: ['<rootDir>/config/jest.polyfills.js', '<rootDir>/config/jest.setup.js'],
  setupFilesAfterEnv: [
    'jest-dom/extend-expect',
    'react-testing-library/cleanup-after-each',
  ],
}
