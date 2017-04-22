// local imports
import baseConfig from '../webpack'

export default Object.assign({}, baseConfig, {
    entry: 'index.js',

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.EnvironmentPlugin({
            NODE_ENV: process.env.NODE_ENV || 'dev',
        }),
    ]
})
