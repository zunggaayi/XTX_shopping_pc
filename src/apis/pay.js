import request from '@/utils/request.js'

//获取订单数据
export const payGetOrderAPI = (id) => {
  return request.get(`/member/order/${id}`)
}
