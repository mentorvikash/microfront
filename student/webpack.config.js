const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const path = require('path')

module.exports = {
    entry: './scr/index',
    devServer: {
        port: 3001,
        static: path.join(__dirname, 'dist'),
        open: false,
    },
    output: { publicPath: 'auto' },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: { extensions: ['.js', '.jsx'] },
    plugins: [
        new ModuleFederationPlugin({
            name: 'student',
            filename: 'remoteEntry.js',
            exposes: { './StudentApp': './scr/StudentApp' },
            shared: { react: { singleton: true }, 'react-dom': { singleton: true } }
        }),
        new HtmlWebpackPlugin({ template: './public/index.html' })
    ]
}

