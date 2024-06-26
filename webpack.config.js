const path = require("path")

module.exports = {
    entry: "./src/signup.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    devtool: "eval-source-map"
}