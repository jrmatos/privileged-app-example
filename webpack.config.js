var path = require("path"),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        controller: path.resolve(__dirname, "./src/javascript/controller.js"),
        view: path.resolve(__dirname, "./src/javascript/view.js")
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "controller.html",
            template: "./src/html/controller.html",
            inject: false
        }),
        new HtmlWebpackPlugin({
            filename: "view.html",
            template: "./src/html/view.html",
            inject: false
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 4000,
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }
};
