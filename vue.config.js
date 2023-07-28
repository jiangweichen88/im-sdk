const path = require('path') // 引入path模块
function resolve(dir) {
  return path.join(__dirname, dir) // path.join(__dirname)设置绝对路径
}
module.exports = {
  publicPath: './',
  css: {
    extract: false,
    sourceMap: false
  },
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://dev-im.arccocc.com', // 代理目标服务器的地址
        changeOrigin: true, // 是否改变请求头中 Origin 字段
        pathRewrite: {
          '^/api': '' // 将请求路径中的 /api 替换为空字符串
        }
      }
    }
  },
  // productionSourceMap: false, // 关闭文件映射，避免生产环境F12看到源码
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('./src')).set('components', resolve('./src/components')).set('assets', resolve('./src/assets'))
    // set第一个参数：设置的别名，第二个参数：设置的路径
  }
}
