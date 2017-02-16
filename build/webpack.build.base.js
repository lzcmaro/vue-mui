var path = require('path')
var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

baseWebpackConfig.entry = undefined

var webpackConfig = merge(baseWebpackConfig, {
  output: {
    path: config.build.assetsRoot,
    // 组件库不同于站点的 publicPath='/'
    // 这里的publicPath需要使用相对路径，以便build后的css url()能正确指向相关资源文件（如图片等）
    publicPath: '../',
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
