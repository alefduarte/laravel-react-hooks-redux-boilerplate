/* eslint-disable max-len */
// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    // An array of file extensions your modules use
    moduleFileExtensions: ['js', 'json', 'jsx'],

    // The test environment that will be used for testing
    testEnvironment: 'jsdom',

    // The glob patterns Jest uses to detect test files. testMatch and testRegex cannot be used together
    // testMatch: ['**/resources/js/test/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
    testRegex: 'resources/js/__test__/.*.test.js$',

    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/vendor/"],

    // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
    testURL: 'http://localhost:8000',

    // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
    transformIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/vendor/"],

    // Indicates whether each individual test should be reported during the run
    verbose: true,
};