import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'

class ELRequest {
  constructor(axiosConfig) {
    this.instance = axios.create({
      ...axiosConfig,
    })

    this.isLoading = true
    this.loadingInstance = null

    this.instance.interceptors.request.use(axiosConfig?.interceptors?.requestInterceptor, axiosConfig?.interceptors?.requestInterceptorCatch)
    this.instance.interceptors.response.use(axiosConfig?.interceptors?.responseInterceptor, axiosConfig?.interceptors?.responseInterceptorCatch)

    this.instance.interceptors.request.use(
      (config) => {
        if (this.isLoading) {
          this.loadingInstance = ElLoading.service()
        }
        return config
      },
      (err) => {
        this.loadingInstance?.close()
        console.log('err', err)
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        this.loadingInstance?.close()

        if (res.data.status >= 400) {
          ElMessage({
            message: res.data.message,
            type: 'warning',
          })
        }

        return res.data
      },
      (err) => {
        this.loadingInstance?.close()
        console.log('err', err)
      }
    )
  }

  /**
   * @description:
   * @param {object} options
   * @return {object} Promise 实力
   */
  request(options, method) {
    if (options.interceptors?.requestInterceptor) {
      options = options.interceptors.requestInterceptor(options)
    }

    this.isLoading = options.isLoading ?? true

    return this.instance
      .request({
        ...options,
        method,
      })
      .then((res) => {
        if (options.interceptors?.responseInterceptor) {
          res = config.interceptors.responseInterceptor(res)
        }
        this.isLoading = true
        return res
      })
      .catch((err) => {
        this.isLoading = true
        return err
      })
  }

  /**
   * @description:
   * @param {object} options
   * @return {object} Promise 实力
   */
  get(options) {
    return this.request(options, 'GET')
  }

  post(options) {
    return this.request(options, 'POST')
  }
}

export default ELRequest
