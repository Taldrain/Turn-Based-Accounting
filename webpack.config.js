'use strict'

const path = require('path');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpackNotifierPlugin = require('webpack-notifier');
const webpackExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, 'src');

function srcPath(p) {
  return path.resolve(SRC_DIR, p);
}

const htmlWebpackPluginConfig = {
  template: srcPath('index.html'),
  filename: 'index.html',
  minify: {
    removeComments: true,
    collapseWhitespace: true,
  },
};

// function newWebpackTextPlugin(filename) {
//   return new webpackExtractTextPlugin({ filename, allChunks: true });
// }

// let bundleCSS;
// if (process.env.NODE === 'production') {
//   bundleCSS = newWebpackTextPlugin('main.[contenthash].css');
// } else {
//   bundleCSS = newWebpackTextPlugin('main.css');
// }

//
// Common configuration
//
const common = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  entry: {
    // vendor: srcPath('vendor.js'),
    main: srcPath('index.jsx'),
  },
  module: {
    rules: [
      { test: /\.jsx?$/, include: SRC_DIR, use: [
        { loader: 'babel-loader' },
        { loader: 'eslint-loader' },
      ] },
      // { test: /\.scss$/, include: SRC_DIR, loader:
      //   bundleCSS.extract({ use: [
      //     { loader: 'css-loader' },
      //     { loader: 'sass-loader' }
      //   ] })
      // },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    // bundleCSS,
    new htmlWebpackPlugin(htmlWebpackPluginConfig),
    new CopyWebpackPlugin([
      { from: 'src/lang', to: 'lang', transform: (content => JSON.stringify(JSON.parse(content))) },
    ]),
    // new webpack.optimize.CommonsChunkPlugin({
    //   names: ['vendor', 'manifest'],
    // }),
  ],
};

if (process.env.NODE_ENV === 'production') {
  //
  // Production configuration
  //
  module.exports = webpackMerge(common, {
    devtool: 'source-map',
    output: {
      filename: '[name].[chunkhash].js',
    },
    entry: {
      main: ['babel-polyfill', srcPath('index.jsx')],
    },
  });
} else {
  //
  // Development / Test configuration
  //
  module.exports = webpackMerge(common, {
    devtool: 'cheap-module-source-map',
    output: {
      filename: '[name].js',
    },
    devServer: {
      quiet: false,
      noInfo: false,
      historyApiFallback: false,
      port: 3000,
    },
    plugins: [
      new webpackNotifierPlugin({ alwaysNotify: true }),
    ]
  });
}
