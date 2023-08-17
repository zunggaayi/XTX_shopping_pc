import request from '@/utils/request.js'

// 获取商品详情
export const goodGetGoodsDetailAPI = (id) => {
  return request.get('/goods', {
    params: {
      id
    }
  })
}

//获取热榜数据
export const goodGetHotGoodsAPI = ({ id, type, limit = 3 }) => {
  return request.get('/goods/hot', {
    params: {
      id,
      type,
      limit
    }
  })
}
