// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import { getTokenTime } from './auth'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
}) // 创建一个axios的实例

function isTimeOut() {
  const currentTime = Date.now()
  const tokenTime = getTokenTime()
  const timeout = 2 * 60 * 60 * 1000
  return currentTime - tokenTime > timeout
}

service.interceptors.request.use(async (config) => {
  if (!store.state.user.UserInfo) return config
  if (isTimeOut()) {
    await store.dispatch('user/logout')
    router.push('/login')
    return Promise.reject(new Error('登录过期，请重新登录'))
  } else {
    config.headers.Authorization = store.state.user.UserInfo
  }
  return config
}) // 请求拦截器

service.interceptors.response.use(
  (res) => {
    if (res.config.responseType === 'blob') {
      return res
    }
    if (res.data.success) {
      const { success, msg } = res.data
      if (success) {
        Message.success(msg)
        return res.data
      }
      Message.error(msg)
      return Promise.reject(new Error(msg))
    }
    return res
  },
  async function (error) {
    if (error?.response?.status === 401) {
      Message.error('登录过期')
      await store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
) // 响应拦截器
export default service // 导出axios实例
