var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

delete baseWebpackConfig.entry

var webpackConfig = merge(baseWebpackConfig, {
  devtool: '#source-map',
  entry: {
    'vue-mui': './src/index.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    library: 'VueMui',
    libraryTarget: 'umd'
  },
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  externals: [{
    vue: {
      root: 'Vue',
      commonjs2: 'vue',
      commonjs: 'vue',
      amd: 'vue'
    }
  }],
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': config.build.env
    }),
    // extract css into its own file
    new ExtractTextPlugin('css/[name].css')
  ]
})

module.exports = webpackConfig
