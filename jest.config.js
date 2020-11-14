module.exports = {
  preset: 'jest-puppeteer',
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  setupFiles: ['jest-localstorage-mock'],
  transform: {
    '^.+\\.vue$': '<rootDir>/node_modules/vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.(js|jsx)?$': 'babel-jest',
    '\\.worker.js': '<rootDir>/test/__mocks__/workerMock.js',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!vue-pdf/|vue-resize-sensor/)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^element-ui/(.*)\\.(css)$': '<rootDir>/node_modules/element-ui',
  },
  snapshotSerializers: ['jest-serializer-vue'],
  moduleDirectories: ['node_modules'],
  testMatch: ['**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'],
  testURL: 'http://localhost/',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js', '<rootDir>/test/jestUnitTestSetup']
}
