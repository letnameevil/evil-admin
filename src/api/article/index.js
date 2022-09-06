import httpRequest from '../index'

const getArticleLists = (params) => {
  return httpRequest.get({
    url: '/article/getArticleList',
    params,
    isLoading: true,  // 不写默认就会加载
  })
}

export const delArticle = (params) => {
  return httpRequest.get({
    url: '/article/delArticle',
    params,
  })
}

export { getArticleLists }
