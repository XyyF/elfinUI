/**
 * jest.config.js 配置文件
 * 文档：https://jestjs.io/docs/zh-Hans/configuration
 */

module.exports = {
    setupFiles: ['<rootDir>/test/jest.init.js'],
    moduleFileExtensions: ['js', 'json', 'vue'],
    'transform': {
        '.*\\.(vue)$': 'vue-jest',
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
        // '^.+\\.js$': '<rootDir>/test/jest.transform.js',
        ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$": "jest-transform-stub",
    },
    // jest应该搜索的文件列表 [String]
    roots: [
        '<rootDir>/src/',
        '<rootDir>/test/',
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^elfin-ui/(.*)$': '<rootDir>/packages/$1',
    },
    testRegex: '/__tests__/.+?\\.test\\.js$',
    'verbose': true,
    'transformIgnorePatterns': [
        '<rootDir>/node_modules(?![\\/]vue-awesome[\\/]|[\\/]vue-single-select[\\/]|[\\/]meetin-sass-ui[\\/])/',
        '/node_modules/(?!vant/es).+\\.js$',
        '<rootDir>babel.config.js',
    ],
    'modulePathIgnorePatterns': [
        '/node_modules/(?!vant)',
        '/node_modules/(?!@xiaojing0/vant)',
    ],
    'moduleDirectories': [
        '__external-libraries',
        'node_modules',
    ],
    'modulePaths': [
        '<rootDir>/node_modules',
    ],
    'globals': {
        'NODE_ENV': 'test',
    },
}