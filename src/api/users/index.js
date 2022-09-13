import httpRequest from '../index'

export const getUserList = () => {
  return httpRequest.get({
    url: '/user/getUserList',
    isLoading: true,
  })
}
