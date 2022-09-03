import router from './router'
import * as Lockr from 'lockr'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  NProgress.start()
  const { token } = Lockr.get('userInfo') || {}
  if (token) {
    next()
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
