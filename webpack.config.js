var webpack = require("webpack");
var path = require("path");

var HtmlWebpackPlugin = require("html-webpack-plugin");

// variables
var sourcePath = path.join(__dirname, "./src/frontend");
var outPath = path.join(__dirname, "./dist/frontend");

// plugins
module.exports = {
  mode: "development",
  context: sourcePath,
  entry: {
    main: ["webpack-hot-middleware/client?reload=true", "./index.ts"]
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, path.resolve(__dirname, "dist"))
  },
  target: "web",
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    mainFields: ["module", "browser", "main"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["awesome-typescript-loader"]
      },
      // static assets
      { test: /\.html$/, use: "html-loader" },
      { test: /\.png$/, use: "url-loader?limit=10000" },
      { test: /\.jpg$/, use: "file-loader" }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: sourcePath
      }
    }),
    new HtmlWebpackPlugin({
      template: "assets/index.html",
      inject: "body",
      filename: "index.html"
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  node: {
    fs: "empty",
    net: "empty"
  }
};
