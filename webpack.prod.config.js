const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: "cheap-module-source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "effect-covid-learner-survey"),
    filename: "[name].[chunkhash].js",
    chunkFilename: "[chunkhash].js",
    publicPath: "/effect-covid-learner-survey/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html",
      filename: "index.html",
      inject: "body",
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new LodashModuleReplacementPlugin({
      collections: true,
      paths: true,
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"',
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.less$|\.html$/,
      threshold: 10240,
      minRatio: 0,
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|th/),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  performance: {
    hints: "warning",
    // Calculates sizes of gziped bundles.
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith(".js.gz");
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      (compiler) => {
        new TerserPlugin({
          terserOptions: {
            compress: {},
          },
        }).apply(compiler);
      },
    ],
    moduleIds: "deterministic",
    runtimeChunk: {
      name: "manifest",
    },
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        common: {
          name: "common",
          minChunks: 2,
          chunks: "all",
          priority: 10,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
};
