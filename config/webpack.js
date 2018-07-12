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

var entry = {
    react: projectPaths.reactEntry,
    index: projectPaths.entry
}

// if we are in a production environment
if (process.env.NODE_ENV === 'production') {
    // use production configuration instead
    devtool = ''

    // optmize the build for production
    plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        })
    )

    // add the min extensions
    entry = {
        'react.min': projectPaths.reactEntry,
        'index.min': projectPaths.entry
    }
}

// export webpack configuration object
module.exports = {
    entry: entry,
    output: {
        filename: '[name].js',
        library: 'redux-responsive',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                enforce: 'pre',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [projectPaths.sourceDir, projectPaths.exampleDir],
                query: {
                    extends: projectPaths.babelConfig
                }
            }
        ]
    },
    resolve: {
        modules: ['node_modules', projectPaths.sourceDir]
    },
    externals: {
        React: 'React',
        redux: 'redux',
        'react-redux': 'react-redux'
    },
    plugins: plugins,
    devtool: devtool
}

// end of file
