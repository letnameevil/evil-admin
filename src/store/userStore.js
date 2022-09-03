import { defineStore } from 'pinia'
import router from '@/router'
import asyncRoutes from '@/router/asyncRoutes'

import * as Lockr from 'lockr'

import { getMenus } from '@/utils/routeUtils'
// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      // userInfo: {},
      sideBarMenus: [],
    }
  },
  actions: {
    handlerRoutes() {
      // console.log(asyncRoutes) // 过滤路由
      
      // 这里判断一下有没有token, 如果没有token 所有的东西都不执行
      const { token } = Lockr.get('userInfo') || {}
      if (!token) return

      asyncRoutes.forEach((item) => {
        router.addRoute(item)
      })

      // console.log('router.getRoutes()',router.getRoutes())
      this.handlerMenus(asyncRoutes)
    },
    handlerMenus(routes) {
      this.sideBarMenus = getMenus(routes)
    },
  },
})
