/**
 * Provides a single, consistent place for js files to get
 * relevant paths, globs, etc pertaining to the project structure.
 */

// node imports
var path = require('path')


// project root directory
var rute = path.join(__dirname, '..')
// source directory
var sourceDir = path.join(rute, 'src')
// tests directory
var testsDir = path.join(rute, 'tests')
// build directory
var buildDir = path.join(rute, 'build')
// configuration directory
var configDir = path.join(rute, 'config')


// export the project paths|globs object
module.exports = {
    // directories
    rootDir: rute,
    sourceDir: sourceDir,
    testsDir: testsDir,
    buildDir: buildDir,
    // entry points
    entry: path.join(sourceDir, 'index.js'),
    // globs
    testsGlob: path.join(testsDir, 'test_*.js'),
    // configuration files
    eslintConfig: path.join(configDir, 'eslint.json'),
    karmaConfig: path.join(configDir, 'karma.js'),
    webpackConfig: path.join(configDir, 'webpack.js'),
}


// end of file
