const HtmlWebpackPlugin = require("html-webpack-plugin")
const { ModuleFederationPlugin } = require("webpack").container;
const path = require('path')

module.exports = {
    entry: './src/index.jsx',
    mode: 'development',
    devServer: {
        port: 3000,
        historyApiFallback: true,
        static: path.join(__dirname, 'dist'),
        open: false
    },
    output: {
        publicPath: 'auto'
    },
    module: {
        rules: [
            { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ]
    },
    resolve: { extensions: ['.js', '.jsx'] },
    plugins: [
        new ModuleFederationPlugin({
            name: 'shell',
            remotes: {
                student: 'student@http://localhost:3001/remoteEntry.js',
                teacher: 'teacher@http://localhost:3002/remoteEntry.js',
                shared_ui: "shared_ui@http://localhost:3003/remoteEntry.js"
            },
            shared: { react: { singleton: true, requiredVersion: '^18.0.0' }, 'react-dom': { singleton: true, requiredVersion: '^18.0.0' } }
        }),
        new HtmlWebpackPlugin({ template: './public/index.html' })
    ]
}
