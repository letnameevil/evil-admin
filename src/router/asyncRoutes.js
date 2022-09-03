const asyncRoutes = [
  {
    path: '/article',
    name: 'article',
    component: () => import('@/pages/layout'),
    meta: {
      title: '文章管理',
    },
    children: [
      {
        path: 'article-list',
        name: 'articleList',
        component: () => import('@/pages/article/article-list'),
        meta: {
          title: '文章列表',
        },
        hidden: true,
      },
      {
        path: 'article-del',
        name: 'articleDel',
        component: () => import('@/pages/article/article-del'),
        meta: {
          title: '删除文章',
        },
      },
    ],
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('@/pages/layout'),
    meta: {
      title: '新增操作',
    },
    children: [
      {
        path: 'add-article',
        name: 'addArticle',
        component: () => import('@/pages/add/add-article'),
        meta: {
          title: '新增文章',
        },
      },
      {
        path: 'add-user',
        name: 'addUser',
        component: () => import('@/pages/add/add-user'),
        meta: {
          title: '新增用户',
        },
      },
    ],
  },
]

export default asyncRoutes
