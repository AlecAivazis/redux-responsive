/**
 * Karma configuration.
 *   references:
 *     http://karma-runner.github.io/0.13/config/configuration-file.html
 */

// local imports
var projectPaths = require('./projectPaths')
var webpackConfig = require(projectPaths.webpackConfig)


// annoying hack to be able to dynamically set keys on object
var preprocessors = {}
preprocessors[projectPaths.testsGlob] = ['webpack', 'sourcemap']

module.exports = function (config) {
    var configuration = {
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: projectPaths.rootDir,

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [
            'mocha',
            'sinon-chai',
        ],

        // list of files / patterns to load in the browser
        files: [
            projectPaths.testsGlob,
        ],

        // // list of files to exclude
        // exclude: [
        // ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: preprocessors,

        // configure webpack using settings from development webpack config
        webpack: {
            module: {
                loaders: webpackConfig.module.loaders
            },
            resolve: webpackConfig.resolve,
            devtool: 'inline-source-map',
        },

        webpackMiddleware: {
            noInfo: true,
        },

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [
            'Chrome',
        ],

        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            },
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha'],

        // web server port
        port: 9876,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        // logLevel: config.LOG_DISABLE,
    }


    // if running in travis
    if (process.env.TRAVIS) {
        // use the custom browser
        configuration.browsers = ['Chrome_travis_ci'];
    }

    // add coverage reports in dev environments
    if (process.env.NODE_ENV === 'dev' || process.env.TRAVIS) {
        // add the coverage reporters
        configuration.coverageReporter = {
            dir: 'coverage/',
            includeAllSources: true,
            reporters: [
                {type: 'html'},
                {type: 'lcov'},
                {type: 'text-summary'},
            ]
        }

        // add the coverage reporters
        configuration.reporters.push('coverage', 'coveralls')
    }

    config.set(configuration)
}


// end of file
