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
        rules: [
             {
                test: /\.jsx?$/,
                enforce: "pre",
                exclude: /node_modules/,
                use:[{loader: 'eslint-loader', options: {
                    configFile: projectPaths.eslintConfig
                }}]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    projectPaths.sourceDir,
                    projectPaths.exampleDir,
                ],
                query: {
                    extends: projectPaths.babelConfig,
                },
            },
        ],
    },
    resolve: {
        modules: [
            'node_modules',
            projectPaths.sourceDir,
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
