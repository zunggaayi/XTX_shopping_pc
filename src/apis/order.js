import request from '@/utils/request.js'
//获取单个订单详情
export const orderGetCheckInfoAPI = () => {
  return request.get('/member/order/pre')
}
//创建订单
export const orderCreateOrderAPI = (data) => {
  return request.post('/member/order', data)
}

//获取全部订单（用户个人中心界面）
// params:{
//     orderState,
//     page,
//     pageSize
//   }
export const orderGetUserOrder = ({ orderState, page, pageSize }) => {
  return request.get('/member/order', {
    params: {
      orderState,
      page,
      pageSize
    }
  })
}

// export const orderGetUserOrder = (params) => {
//   return request({
//     url: '/member/order',
//     method: 'GET',
//     params
//   })
// }
