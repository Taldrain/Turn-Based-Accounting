const path = require('path');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const htmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const webpackNotifierPlugin = require('webpack-notifier');
const webpackExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, 'src');

const htmlWebpackPluginConfig = {
  template: path.resolve(SRC_DIR, 'index.html'),
  filename: 'index.html',
  minify: {
    removeComments: true,
    collapseWhitespace: true,
  },
};

function newWebpackTextPlugin(filename) {
  return new webpackExtractTextPlugin({ filename, allChunks: true });
}

let bundleCSS;
if (process.env.NODE === 'production') {
  bundleCSS = newWebpackTextPlugin('main.[contenthash].css');
} else {
  bundleCSS = newWebpackTextPlugin('main.css');
}

//
// Common configuration
//
const common = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/tba/',
  },
  entry: {
    vendor: path.resolve(SRC_DIR, 'vendor.js'),
    main: path.resolve(SRC_DIR, 'index.jsx'),
  },
  module: {
    rules: [
      { test: /\.jsx?$/, include: SRC_DIR, use: [
        { loader: 'babel-loader' },
        { loader: 'eslint-loader' },
      ] },
      { test: /\.scss$/, include: SRC_DIR, loader:
        bundleCSS.extract({ use: [
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ] })
      },
      // font-awesome
      // TODO: extract it to the vendor css
      { test: /\.woff(2)?(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/, include: /font-awesome/, use: [
        { loader: 'url-loader?limit=100000&mimetype=application/font-woff' }
      ] },
      { test: /\.(ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/, include: /font-awesome/, use: [
        { loader: 'file-loader' }
      ] },
    ],
  },
  plugins: [
    bundleCSS,
    new htmlWebpackPlugin(htmlWebpackPluginConfig),
    new CopyWebpackPlugin([
      { from: 'src/lang', to: 'lang', transform: (content => JSON.stringify(JSON.parse(content))) },
    ]),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
  ],
};

if (process.env.NODE_ENV === 'production') {
  //
  // Production configuration
  //
  module.exports = webpackMerge(common, {
    devtool: 'cheap-module-source-map',
    output: {
      filename: '[name].[chunkhash].js',
    },
  });
} else {
  //
  // Development / Test configuration
  //
  module.exports = webpackMerge(common, {
    devtool: 'cheap-eval-source-map',
    output: {
      filename: '[name].js',
    },
    devServer: {
      quiet: false,
      noInfo: false,
      historyApiFallback: true,
      port: 3000,
    },
    externals: {
      'Config': JSON.stringify(require('./config/config.json')),
    },
    plugins: [
      new DashboardPlugin(),
      new webpackNotifierPlugin({ alwaysNotify: true }),
    ]
  });
}
