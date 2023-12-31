const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    publicPath: "/",
    globalObject: "this",
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [new Dotenv()],
};
