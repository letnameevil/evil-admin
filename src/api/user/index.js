import httpRequest from '../index'

export const login = (data) => {
  return httpRequest.post({
    url: '/user/login',
    data,
    interceptors: {
      requestInterceptor(config) {
        return config
      },
    },
    isLoading: true,
  })
}
