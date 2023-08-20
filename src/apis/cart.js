import request from '@/utils/request.js'

// 添加购物车
export const cartAddCartAPI = ({ skuId, count }) => {
  return request.post('/member/cart', {
    skuId,
    count
  })
}

// 获取购物车列表
export const cartGetCartListAPI = () => {
  return request.get('/member/cart')
}

//合并购物车
//data为skuId,selected,count组成的数组
export const cartMergeCartAPI = (data) => {
  return request.post('/member/cart/merge', data)
}

//删除购物车商品 ??报参数格式有误错误？？
// export const cartRemoveCartAPI = (ids) => {
//   return request.delete('/member/cart', { ids })
// }
export const cartRemoveCartAPI = (ids) => {
  return request({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids
    }
  })
}

//修改购物车全选/取消
// ids是商品id的数组集合
export const cartSelectedCartAPI = (selected, ids) => {
  return request.put('/member/cart/selected', {
    selected,
    ids
  })
}
//修改购物车商品数量
export const cartChangeCountAPI = (skuId, count) => {
  return request.put(`/member/cart/${skuId}`, {
    count
  })
}
