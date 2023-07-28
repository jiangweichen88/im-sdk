const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.base.conf')
const webpack = require('webpack')
module.exports = merge(base, {
  devServer: {
    contentBase: './dist',
    port: '8383',
    inline: true,
    open: true,
    hot: true,
    quiet: true,
    proxy: {
      '/api': {
        // 将以/api开头的请求转发到指定的路由
        target: 'http://192.168.110.87:8085', // 后端服务器的地址
        changeOrigin: true, // 改变请求头中的主机名和端口号
        pathRewrite: {
          '^/api': '' // 重写请求路径
        }
      }
    }
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      DEV: JSON.stringify('dev')
    })
  ]
})
