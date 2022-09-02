const constRoutes = [
  {
    path: '/',
    name: 'main',
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
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
]

export default constRoutes
