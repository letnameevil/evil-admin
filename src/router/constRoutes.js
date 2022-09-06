const constRoutes = [
  {
    path: '/',
    name: 'main',
    redirect: '/home',
    component: () => import('@/pages/layout'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/pages/home'),
        meta: {
          title: '欢迎页面',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login'),
    meta: {
      title: '登录',
    },
  },
  { path: '/404', name: 'notFound', component: () => import('@/pages/err-page/404') },
]

export default constRoutes
