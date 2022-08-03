// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
}) // 创建一个axios的实例
service.interceptors.request.use((config) => {
  if (store.state.user.UserInfo) {
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
  function (error) {
    Message.error('登录异常')
    return Promise.reject(error)
  }
) // 响应拦截器
export default service // 导出axios实例
