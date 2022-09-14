import httpRequest from '../index'

// 获取用户列表
export const getUserList = () => {
  return httpRequest.get({
    url: '/user/getUserList',
    isLoading: true,
  })
}

// 新增用户
export const addUser = (data) => {
  return httpRequest.post({
    url: '/user/addUser',
    data,
  })
}
