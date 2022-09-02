import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 全局样式
import '@/styles/index.less'

const app = createApp(App)

app.use(ElementPlus)

app.use(router).mount('#app')
