var webpack = require("webpack");
var path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

// variables
var sourcePath = path.join(__dirname, "./src/frontend");
var outPath = path.join(__dirname, "./dist/frontend");

// plugins
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  context: sourcePath,
  entry: {
    main: "./index.ts"
  },
  output: {
    path: outPath,
    filename: "[name].js",
    chunkFilename: "[name].js", // or whatever other format you want.
    publicPath: "/"
  },

  target: "web",
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // (jsnext:main directs not usually distributable es6 format, but es6 sources)
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
  optimization: {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: sourcePath
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      template: "assets/index.html",
      inject: "body",
      filename: "index.html"
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
    // new BundleAnalyzerPlugin()
  ],
  node: {
    // workaround for webpack-dev-server issue
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs: "empty",
    net: "empty"
  }
};
