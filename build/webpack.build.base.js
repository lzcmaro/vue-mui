var path = require('path')
var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var webpackConfig = merge(baseWebpackConfig, {
  devtool: undefined,
  entry: undefined,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    library: 'VueMUI',
    libraryTarget: 'umd'
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
