import request from '@/utils/request.js'

//获取二级分类列表
export const categoryGetCategoryDataAPI = (id) => {
  return request.get('/category', {
    params: {
      id
    }
  })
}

//获取面包屑导航数据
export const categoryGetCategoryFilterAPI = (id) => {
  return request.get('/category/sub/filter', {
    params: {
      id
    }
  })
}

//获取分类商品列表
// data:{
//   categoryId,
//   page,
//   pageSize,
//   sortField
// }
export const categoryGetSubGoodListAPI = (data) => {
  return request.post('/category/goods/temporary', data)
}
