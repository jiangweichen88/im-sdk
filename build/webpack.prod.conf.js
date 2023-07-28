const merge = require('webpack-merge')

const base = require('./webpack.base.conf')

const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin')
module.exports = merge(base, {
  // mode: 'production',
  // entry: {
  //   lib: './src/lib.js',
  // },
  plugins: [
    new webpack.DefinePlugin({
      DEV: JSON.stringify('production')
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          drop_debugger: true, //debugger默认就是true
          drop_console: false //清除console语句，默认是false
        }
      },
      sourceMap: false,
      parallel: true
    }),
    new UnminifiedWebpackPlugin({})
  ]
})
