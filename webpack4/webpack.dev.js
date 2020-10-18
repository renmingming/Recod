const merge = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    // library: 'webpackNumbers',
    // libraryTarget: 'umd'
  },
  devServer: {
    contentBase: './dist',
    host: '127.0.0.1',
    hot: true
  },
});