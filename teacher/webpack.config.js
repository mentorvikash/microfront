const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
    entry: './src/index.jsx',
    mode: 'development',
    devServer: {
        port: 3002,
        static: path.join(__dirname, 'dist'),
        open: false,
    },
    output: {
        publicPath: 'auto'
    },
    module: {
        rules: [
            { test: /\.jsx?$/, loader: "babel-loader", exclude: /node_modules/ },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ]
    },
    resolve: { extensions: ['.js', '.jsx'] },
    plugins: [
        new ModuleFederationPlugin({
            name: 'teacher',
            filename: "remoteEntry.js",
            exposes: { "./TeacherApp": "./src/TeacherApp.jsx" },
            shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
            remotes: {
                shared_ui: "shared_ui@http://localhost:3003/remoteEntry.js"
            }
        }),
        new HtmlWebpackPlugin({ template: './public/index.html' })
    ]
}
