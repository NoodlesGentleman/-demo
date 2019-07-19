/**
 * Created by slipkinem on 12/29/2017 at 4:25 PM.
 */
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

let vendor = [
  'vue',
  'element-ui'
]

module.exports = {
  entry: {
    vendor
  },
  output: {
    path: path.join(__dirname, '../static/dll'),
    filename: '[name].[chunkhash].dll.js',
    library: '[name]_[chunkhash]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '..', '[name]-manifest.json'),
      name: '[name]_[chunkhash]',
      context: __dirname
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      },
      comments: false,
      minimize: true
    })
  ]
}
