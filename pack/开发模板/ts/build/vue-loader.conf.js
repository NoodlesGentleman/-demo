'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  loaders: Object.assign(utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }), {
    // 不论是webpack loader还是vue-loader都是遵循自下而上的读取顺序
    ts: [
      {
        loader: 'babel-loader'
      },
      {
        loader: 'ts-loader'
      },
      {
        loader: 'tslint-loader',
        options: {
          emitErrors: true
        }
      }
    ],
    tsx: [
      {
        loader: 'babel-loader'
      },
      {
        loader: 'ts-loader'
      },
      {
        loader: 'tslint-loader',
        options: {
          emitErrors: true
        }
      }
    ]
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
