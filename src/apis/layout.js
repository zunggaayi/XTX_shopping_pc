import request from '@/utils/request.js'
//首页获取全部分类（导航分类）
export const layoutGetCategoryAPI = () => {
  return request.get('/home/category/head')
}
