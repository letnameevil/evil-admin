import ELRequest from './httpRequest'

export default new ELRequest({
  timeout: 5000,
  baseURL: '',
  interceptors: {
    requestInterceptor: (config) => {
      return config
    },
  },
})
