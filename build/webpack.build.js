var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.build.base')

var webpackConfig = merge(baseWebpackConfig, {
  devtool: '#source-map',
  entry: {
    // 为方便，同时编译less文件
    // 这里需要注意的是，在编译后的JS文件中，其默认导出的是最后一个入口，即这里的./src/index.js，见dist/vue-mui.js
    'vue-mui': ['./src/less/vue-mui.less', './src/index.js']
  },
  module: {
    loaders: utils.styleLoaders({ sourceMap: true, extract: true })
  },
  vue: {
    loaders: utils.cssLoaders({ sourceMap: true, extract: true })
  }
})

module.exports = webpackConfig
