import request from '@/utils/request.js'
// 获取轮播图
export const homeGetBannerListAPI = (id) => {
  return request.get('/home/banner', {
    params: {
      id
    }
  })
}

//获取新鲜好物
export const homeGetNewListAPI = (limit) => {
  return request.get('/home/new', {
    params: {
      limit
    }
  })
}

//人气推荐
export const homeGetPopularListAPI = () => {
  return request.get('/home/hot')
}

//商品模块列表
export const homeGetGoodsListAPI = () => {
  return request.get('/home/goods')
}
