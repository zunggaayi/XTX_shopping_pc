import request from '@/utils/request'

export const testApiService = () => {
  return request.get('home/category/head')
}
