const HtmlWebPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require("webpack").container
const path = require('path')

module.exports = {
    entry: "./src/index",
    mode: "development",
    devServer: {
        port: 3003,
        static: path.join(__dirname, "dist"),
        open: false
    },
    output: { publicPath: "auto" },
    module: {
        rules: [
            { test: /\.jsx?$/, loader: "babel-loader", excludes: /node_modules/ },
            { test: /\.css$/, use: ["css-loader", "style-loader"] }
        ]
    },
    resolve: { extensions: [".js", ".jsx"] },
    plugins: [
        new ModuleFederationPlugin({
            name: "shared_ui",
            filename: "remoteEntry.js",
            exposes: {
                "./Button": "./src/components/Button",
                "./Card": "./src/components/Card"
            },
            shared: {
                react: { singleton: true, requiredVersion: "^18.2.0" },
                "react-dom": { singleton: true, requiredVersion: "^18.2.0" }
            }
        }),
        new HtmlWebPlugin({
            template: "./public/index.html"
        })
    ]
}