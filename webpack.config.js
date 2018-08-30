var path = require("path");

module.exports = {
    entry: {
        main: path.resolve(__dirname, "./src/javascript/main.js"),
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    plugins: [
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 4000,
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }
};
