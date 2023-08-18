import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useCartStore = defineStore(
  'xtx_cart',
  () => {
    // 购物车列表
    const cartList = ref([])
    // 本模块将购物车分为登陆前和登陆后的状态
    // 先实现本地购物车添加删除等功能
    // 登录后再合并到服务器
    //添加购物车功能(未登录=>本地)
    const addCart = (goods) => {
      // 已有：+1
      // 没有：push
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        //存在
        item.count += goods.count
      } else {
        cartList.value.push(goods)
      }
    }
    //删除购物车
    const removeCart = (skuId) => {
      // 1.通过findIndex找到要删除的索引，然后用splice从列表删除
      const index = cartList.value.findIndex((item) => item.skuId === skuId)
      cartList.value.splice(index, 1)
      // 2.用filter过滤数组
      // cartList.value = cartList.value.filter((item) => item.skuId !== skuId)
    }
    //单选功能
    const singleCheck = (skuId, selected) => {
      const item = cartList.value.find((item) => item.skuId === skuId)
      item.selected = selected
    }
    //全选功能
    const allCheck = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected))
    }

    //修改购物车数量
    const changeCount = (skuId, val) => {
      const item = cartList.value.find((item) => item.skuId === skuId)
      item.count = val
    }

    //getters 计算购物车总数
    const totalCount = computed(() => {
      return cartList.value.reduce((prev, current) => prev + current.count, 0)
    })
    const totalPrice = computed(() => {
      return cartList.value
        .reduce((prev, current) => prev + current.price * current.count, 0)
        .toFixed(2)
    })
    const totalSelPrice = computed(() => {
      return cartList.value
        .reduce(
          (prev, current) =>
            current.selected ? prev + current.price * current.count : prev + 0,
          0
        )
        .toFixed(2)
    })
    const totalSel = computed(() => {
      return cartList.value.reduce(
        (prev, current) => (current.selected ? prev + current.count : prev + 0),
        0
      )
    })
    const isAll = computed(() => {
      return cartList.value.every((item) => item.selected)
    })
    return {
      cartList,
      addCart,
      removeCart,
      totalCount,
      totalPrice,
      totalSelPrice,
      totalSel,
      singleCheck,
      isAll,
      allCheck,
      changeCount
    }
  },
  {
    persist: true
  }
)
