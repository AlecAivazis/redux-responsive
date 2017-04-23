// webpack imports
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
// local imports
var projectPaths = require('../config/projectPaths')
var baseConfig = require(projectPaths.webpackConfig)

// export webpack configuration object
module.exports = Object.assign({}, baseConfig, {
    entry: [
      'react-hot-loader/patch',
      './example/index.js',
    ],
    externals: {},
    output: {},
    plugins: [
        new HtmlWebpackPlugin({
            template: './example/index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.EnvironmentPlugin({
            NODE_ENV: process.env.NODE_ENV || 'dev',
        }),
    ],
})


// end of file
