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


// export webpack configuration object
module.exports = {
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint',
                include: projectPaths.sourceDir,
            },
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: [
                    projectPaths.sourceDir,
                    projectPaths.testsDir,
                ],
                query: {extends:projectPaths.babelConfig},
            },
        ],
    },
    resolve: {
        extensions: ['', '.js'],
        root: [projectPaths.sourceDir],
    },
    eslint: {
        configFile: projectPaths.eslintConfig,
        failOnError: true,
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
