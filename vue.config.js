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
        js: [
          // vue
          'https://unpkg.com/vue@3.2.38/dist/vue.global.js',
          // vue-router
          'https://unpkg.com/vue-router@4.1.5/dist/vue-router.global.js',
          // element-plus
          'https://unpkg.com/element-plus@2.2.16/dist/index.full.js',
          // vue-demi
          // 'https://unpkg.com/vue-demi@0.13.11/lib/index.iife.js',
          // pinia
          // 'https://unpkg.com/pinia@2.0.21/dist/pinia.iife.js',
          // lodash
          'https://unpkg.com/lodash@4.17.21/lodash.js',
        ],
      }
      config.plugin('html').tap((args) => {
        args[0].cdn = cdn
        return args
      })
    }
  },
})
