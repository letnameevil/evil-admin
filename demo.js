const arr = [
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
        path: 'article-del',
        name: 'articleDel',
        component: () => import('@/pages/article/article-del'),
        meta: {
          title: '删除文章',
        },
      },
    ],
  },
  // {
  //   path: '/add',
  //   name: 'add',
  //   component: () => import('@/pages/layout'),
  //   meta: {
  //     title: '新增操作',
  //   },
  //   children: [
  //     {
  //       path: 'add-article',
  //       name: 'addArticle',
  //       component: () => import('@/pages/add/add-article'),
  //       meta: {
  //         title: '新增文章',
  //       },
  //     },
  //     {
  //       path: 'add-user',
  //       name: 'addUser',
  //       component: () => import('@/pages/add/add-user'),
  //       meta: {
  //         title: '新增用户',
  //       },
  //     },
  //   ],
  // },
]

function getMenus(arr) {
  const newArr = []
  arr.forEach((item, idx) => {
    newArr.push({
      link: item.path,
      title: item.meta.title,
      hidden: item.hidden,
    })

    if (item.children) {
      // console.log(newArr, 8888)

      item.children.forEach((item) => {
        item.path = newArr[idx].link + '/' + item.path
      })

      // console.log(item.children, 99999)

      let children = getMenus(item.children)

      // children.forEach((item) => {
      //   item.link = newArr[idx].link + '/' + item.link
      // })

      newArr[idx].children = children
    } else {
      return newArr
    }
  })
  return newArr
}

// [
//   {
//     link: '/article/article-list/article-list',
//     title: '文章列表',
//     hidden: true
//   },
//   {
//     link: '/article/article-list/article-del',
//     title: '删除文章',
//     hidden: undefined
//   }
// ]
// [
//   {
//     link: '/article/article-list',
//     title: '文章列表',
//     hidden: true,
//     children: [ [Object], [Object] ]
//   },
//   { link: '/article/article-del', title: '删除文章', hidden: undefined }
// ]
// [
//   {
//     link: '/article',
//     title: '文章管理',
//     hidden: undefined,
//     children: [ [Object], [Object] ]
//   }
// ]

console.log('getMenus(arr)',getMenus(arr))
