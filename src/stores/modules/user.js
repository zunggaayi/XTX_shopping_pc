import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/login.js'
export const useUserStore = defineStore(
  'xtx_user',
  () => {
    const userInfo = ref({})
    const getUserInfo = async ({ account, password }) => {
      const {
        data: { result }
      } = await loginAPI({ account, password })
      userInfo.value = result
    }
    const removeUserInfo = () => {
      userInfo.value = {}
    }
    return {
      userInfo,
      getUserInfo,
      removeUserInfo
    }
  },
  // 开启本地持久化
  {
    persist: true
  }
)
