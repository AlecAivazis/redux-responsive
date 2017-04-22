/**
 * Webpack configuration for source builds.
 */

// webpack imports
var webpack = require('webpack')
// local imports
var projectPaths = require('./projectPaths')


// default to using development configuration
var devtool = 'source-map'
var plugins = []
// if we are in a production environment
if (process.env.NODE_ENV === 'production') {
    // use production configuration instead
    devtool = ''
    plugins.push(
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin()
    )
}

var babelPlugins = []
// if we are building in a dev environment
if (process.env.NODE_ENV === 'dev' || process.env.TRAVIS) {
    babelPlugins.push('istanbul')
}


// export webpack configuration object
module.exports = {
    module: {
        // preLoaders: [
        //     {
        //         test: /\.js$/,
        //         loader: 'eslint',
        //         include: projectPaths.sourceDir,
        //     },
        //     ----> config???
        // ],
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    projectPaths.sourceDir,
                    projectPaths.exampleDir,
                ],
                query: {
                    extends: projectPaths.babelConfig,
                    // instrument the build for coverage on travis
                    plugins: babelPlugins,
                },
            },
        ],
    },
    resolve: {
        modules: [
            projectPaths.sourceDir,
            'node_modules',
        ],
    },
    output: {
        libraryTarget: 'commonjs2',
    },
    externals: {
        React: 'React',
        redux: 'redux',
        'react-redux': 'react-redux',
    },
    plugins: plugins,
    devtool: devtool,
}


// end of file
