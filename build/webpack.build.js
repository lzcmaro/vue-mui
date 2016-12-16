var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.build.base')

var webpackConfig = merge(baseWebpackConfig, {
  devtool: '#source-map',
  entry: {
    'vue-mui': ['./src/index.js', './src/less/vue-mui.less']
  },
  module: {
    loaders: utils.styleLoaders({ sourceMap: true, extract: true })
  },
  vue: {
    loaders: utils.cssLoaders({ sourceMap: true, extract: true })
  }
})

module.exports = webpackConfig
