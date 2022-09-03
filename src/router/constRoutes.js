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
]

export default constRoutes
