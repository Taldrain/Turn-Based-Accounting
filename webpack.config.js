'use strict'

const path = require('path');

const webpack = require('webpack');
const { merge } = require('webpack-merge');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpackNotifierPlugin = require('webpack-notifier');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, 'src');

const commitHash = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString();

function srcPath(p) {
  return path.resolve(SRC_DIR, p);
}

const htmlWebpackPluginConfig = {
  template: srcPath('index.html'),
  filename: 'index.html',
  minify: {
    removeComments: true,
    collapseWitespace: true,
  },
};

//
// Common configuration
//
const common = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      { test: /\.jsx?$/, include: SRC_DIR, use: [
        { loader: 'babel-loader' },
        { loader: 'eslint-loader' },
      ] },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new htmlWebpackPlugin(htmlWebpackPluginConfig),
    new webpack.DefinePlugin({
      __COMMIT__HASH__: JSON.stringify(commitHash),
    }),
  ],
};

if (process.env.NODE_ENV === 'production') {
  //
  // Production configuration
  //
  module.exports = merge(common, {
    devtool: 'source-map',
    mode: 'production',
    output: {
      filename: '[name].[chunkhash].js',
    },
    plugins: [
      new CleanWebpackPlugin(),
    ],
  });
} else {
  //
  // Development configuration
  //
  module.exports = merge(common, {
    devtool: 'cheap-module-source-map',
    mode: 'development',
    devServer: {
      quiet: false,
      noInfo: false,
      historyApiFallback: true,
      port: 3000,
    },
    plugins: [
      new webpackNotifierPlugin({ alwaysNotify: true }),
    ],
  });
}
