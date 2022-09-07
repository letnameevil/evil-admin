const asyncRoutes = [
  {
    path: '/article',
    name: 'article',
    component: () => import('@/pages/layout'),
    meta: {
      title: '文章管理',
      icon: 'icon-24'
    },
    children: [
      {
        path: 'article-list',
        name: 'articleList',
        component: () => import('@/pages/article/article-list'),
        meta: {
          title: '文章列表',
        },
        hidden: false,
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
      icon: 'icon-wenjianshangchuan'
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
  {
    path: '/upload',
    name: 'upload',
    component: () => import('@/pages/layout'),
    meta: {
      title: '文件上传',
      icon: 'icon-shangchuan'
    },
    children: [
      {
        path: 'upload-avatar',
        name: 'uploadAvatar',
        component: () => import('@/pages/upload/upload-avatar'),
        meta: {
          title: '上传图片',
        },
      },
      {
        path: 'upload-file',
        name: 'uploadFile',
        component: () => import('@/pages/upload/upload-file'),
        meta: {
          title: '上传文件',
        },
      },
    ], 
  },
  // 错误路由必须放到最后
  {
    path: '/:pathMatch(.*)*',
    // component: () => import('@/pages/err-page/404'),
    name: 'errPage',
    // meta: {
    //   title: 'NOT FOUND',
    // },
    redirect: '/404', // 这里的redirect会触发路由前置守卫，但是那个之前输入的那个错误的地址不会触发路由守卫
    hidden: true,
  },
]

export default asyncRoutes
