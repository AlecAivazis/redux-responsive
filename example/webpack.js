// webpack imports
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
// local imports
var projectPaths = require('../config/projectPaths')

// export webpack configuration object
module.exports = {
    entry: './example/index.js',
    module: {
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
    plugins: [
        new HtmlWebpackPlugin({
            template: './example/index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.EnvironmentPlugin({
            NODE_ENV: process.env.NODE_ENV || 'dev',
        }),
    ],
}


// end of file
