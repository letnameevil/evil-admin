import ELRequest from './httpRequest'
import { BASE_URL } from '@/config'
console.log('BASE_URL',BASE_URL)

export default new ELRequest({
  timeout: 5000,
  baseURL: BASE_URL,
  interceptors: {
    requestInterceptor: (config) => {
      return config
    },
  },
})
