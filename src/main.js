import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import { useUserStore } from '@/store/userStore'

import './permission'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 全局样式
import '@/styles/index.less'

const app = createApp(App)

app.use(ElementPlus)

app.use(createPinia())

// 这里需要放在后面用
const userStore = useUserStore()
// 更新路由相关信息
userStore.handlerRoutes()

app.use(router).mount('#app')
