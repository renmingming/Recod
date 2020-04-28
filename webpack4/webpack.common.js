const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    canvas: './example/canvas/index.js',
    canvas_diagram: './example/canvas_diagram/index.js',
  },
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '-'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'vendor',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'modal_dialog',
      filename: __dirname + '/dist/index.html',
      template: __dirname + '/index.html',
      chunks: ['app']
    }),
    new HtmlWebpackPlugin({
      title: 'canvas拖动',
      filename: __dirname + '/dist/canvas.html',
      template: __dirname + '/example/canvas/index.html',
      chunks: ['canvas']
    }),
    new HtmlWebpackPlugin({
      title: 'canvas螺旋图',
      filename: __dirname + '/dist/canvas_diagram.html',
      template: __dirname + '/example/canvas_diagram/index.html',
      chunks: ['canvas_diagram']
    }),
    new webpack.ProvidePlugin({
      _: 'lodash'
    })
  ]
};