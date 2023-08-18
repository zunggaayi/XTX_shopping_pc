// axios封装
import axios from 'axios'
import { useUserStore } from '@/stores'
import router from '@/router'
const instance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net/',
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 请求头携带token
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    if (token) {
      // 这里按照后端的要求
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误统一弹窗提醒
    const userStore = useUserStore()
    if (error.response.status === 401) {
      userStore.removeUserInfo()
      ElMessage.warning('登录校验失败，请重新登陆')
      router.push('/login')
      return
    }
    ElMessage.error(error.response.data.message)
    return Promise.reject(error)
  }
)

export default instance
