import httpRequest from '../index'
import qs from 'qs'

const getArticleLists = (params) => {
  return httpRequest.get({
    url: '/article/getArticleList',
    params,
    isLoading: true, // 不写默认就会加载
  })
}

// articleId 有可能是一个数组(批量)， 也有可能是一个数字(单个)
export const delArticle = (params) => {
  return httpRequest.get({
    url: '/article/delArticle',
    params,
    paramsSerializer: function (params) {
      // axios中参数带数组的转换
      // http://localhost:8080/api/article/delArticle?articleId=16&articleId=15
      // console.log(qs.stringify(params, { arrayFormat: 'repeat' })) key=value&key=value
      return qs.stringify(params, { arrayFormat: 'repeat' })
    },
  })
}

export { getArticleLists }
