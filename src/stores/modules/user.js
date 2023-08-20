import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/login.js'
import { cartMergeCartAPI } from '@/apis/cart'
import { useCartStore } from './cart'
export const useUserStore = defineStore(
  'xtx_user',
  () => {
    const cartStore = useCartStore()
    const userInfo = ref({})
    const getUserInfo = async ({ account, password }) => {
      const {
        data: { result }
      } = await loginAPI({ account, password })
      userInfo.value = result
      // 合并购物车操作
      await cartMergeCartAPI(
        cartStore.cartList.map((item) => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count
          }
        })
      )
      cartStore.updateCartList()
    }
    const removeUserInfo = () => {
      userInfo.value = {}
      cartStore.clearCart()
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
