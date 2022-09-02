import httpRequest from '../index'

export const login = (data) => {
  return httpRequest.post({
    url: '/api/user/login',
    data,
    interceptors: {
      requestInterceptor(config) {
        return config
      },
    },
    isLoading: false,
  })
}
