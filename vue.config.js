const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8888',
        changeOrigin: true, //创建虚拟服务器
        ws: true, //websocket代理
        pathRewrite: {
          '/api': '',
        },
      },
    },
  },
})
