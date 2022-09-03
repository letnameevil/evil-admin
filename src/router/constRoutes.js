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
      },
    ],
  },
  { path: '/login', name: 'login', component: () => import('@/pages/login') },
  { path: '/404', name: 'notFound', component: () => import('@/pages/err-page/404') },
]

export default constRoutes
