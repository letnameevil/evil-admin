import { createRouter, createWebHashHistory } from 'vue-router'

import constRoutes from './constRoutes'
// import asyncRoutes from './asyncRoutes'

const router = createRouter({
  history: createWebHashHistory(),
  routes: constRoutes,
})

// export const resetRouter = () => {
//   const newRouter = createRouter({
//     history: createWebHashHistory(),
//     routes: [...constRoutes],
//   })
// }

export default router
