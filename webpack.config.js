'use strict'

const path = require('path');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpackNotifierPlugin = require('webpack-notifier');

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
  entry: {
    main: srcPath('index.jsx'),
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
  module.exports = webpackMerge(common, {
    devtool: 'source-map',
    output: {
      filename: '[name].[chunkhash].js',
    },
    entry: {
      main: ['@babel/polyfill', srcPath('index.jsx')],
    },
  });
} else {
  //
  // Development configuration
  //
  module.exports = webpackMerge(common, {
    devtool: 'cheap-module-source-map',
    output: {
      filename: '[name].js',
    },
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
