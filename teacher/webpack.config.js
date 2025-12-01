const HtmlWebpackPlugin = requrie("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
    entry: './src/index.jsx',
    mode: 'devlopment',
    devServer: {
        port: 3002,
        static: path.join(__dirname, 'dist'),
        open: false,
    },
    output: {
        publicPath: 'auot'
    },
    module: {
        rules: [
            { test: '/\.jsx?$/', loader: "babel-loader", exclude: "node_modules" },
            { test: '/\.css$/', use: ['css-loader', 'style-loader'] }
        ]
    },
    resolve: { extensions: ['.js', '.jsx'] },
    plugin: [
        new ModuleFederationPlugin({
            name: 'teacher',
            fileName: "remoteEntry.js",
            exposes: { "Teacher.jsx": "./src/Teacher.jsx" },
            shared: { react: { singleton: true }, 'react-dom': { singleton: true } }
        }),
        new HtmlWebpackPlugin({ template: './public/index.html' })
    ]
}
