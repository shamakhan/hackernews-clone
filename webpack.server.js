const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  entry: [
    '@babel/polyfill',
    './server/app.js'
  ],
  mode: 'production',
  target: 'node',

  externals: [nodeExternals()],

  output: {
    path: path.resolve('server-build'),
    filename: 'index.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDevelopment ? '"development"' : '"production"',
      'process.env.BROWSER': JSON.stringify(true),
      __DEV__: isDevelopment
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-react',
            ['@babel/env', { targets: { browsers: ['last 2 versions'] } }]
          ],
          plugins: [
            // '@babel/plugin-transform-runtime',
            // '@babel/plugin-transform-async-to-generator',
            // 'dynamic-import-node',
            // '@babel/plugin-transform-modules-commonjs'
          ]
        }
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
      }, {
          loader: 'css-loader'
      }, {
          loader: 'sass-loader'
      }]
      }
    ]
  }
};