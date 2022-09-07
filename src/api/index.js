import ELRequest from './httpRequest'
import { BASE_URL } from '@/config'
import * as Lockr from 'lockr'

export default new ELRequest({
  timeout: 5000,
  baseURL: BASE_URL,
  interceptors: {
    requestInterceptor: (config) => {
      const { token } = Lockr.get('userInfo') || {}
      if (token) {
        config.headers.Authorization = `${token}`
      }
      return config
    },
  },
})
