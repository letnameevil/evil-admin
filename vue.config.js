const { defineConfig } = require('@vue/cli-service')
// 配合nginx实现.zp的静态压缩（压缩好了，nginx自动返回）------ 动态压缩，每次请求服务器都会在线压缩资源，浪费性能（动态压缩前端不需要做任何处理）
const CompressionPlugin = require('compression-webpack-plugin')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
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
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      var externals = {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        'element-plus': 'ElementPlus',
        // TODO: pinia vue-demi ，这两个有关联，但是在打包后会出现报错问题
        // 'vue-demi':'VueDemi',
        // pinia: 'pinia',
        lodash: '_',
      }

      config.externals(externals)
      const cdn = {
        // js: [
        //   // vue
        //   'https://unpkg.com/vue@3.2.38/dist/vue.global.js',
        //   // vue-router
        //   'https://unpkg.com/vue-router@4.1.5/dist/vue-router.global.js',
        //   // element-plus
        //   'https://unpkg.com/element-plus@2.2.16/dist/index.full.js',
        //   // vue-demi
        //   // 'https://unpkg.com/vue-demi@0.13.11/lib/index.iife.js',
        //   // pinia
        //   // 'https://unpkg.com/pinia@2.0.21/dist/pinia.iife.js',
        //   // lodash
        //   'https://unpkg.com/lodash@4.17.21/lodash.js',
        // ],
        
        // cdn到自己的服务器上
        js: [
          'http://121.40.238.136/cdn/vue.js',
          'http://121.40.238.136/cdn/vue-router.js',
          'http://121.40.238.136/cdn/element.js',
          'http://121.40.238.136/cdn/lodash.js',
        ],
      }
      config.plugin('html').tap((args) => {
        args[0].cdn = cdn
        return args
      })
    }
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            algorithm: 'gzip', // 使用gzip压缩
            minRatio: 0.8, // 压缩率小于1才会压缩
            test: /\.js$|\.css$|\.html$|\.ttf$|\.eot$|\.woff$/,
            threshold: 10240, // 单位是Byte
            deleteOriginalAssets: false, // 是否删除原文件
          }),
        ],
      }
    }
  },
})
