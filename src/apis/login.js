import request from '@/utils/request.js'

export const loginAPI = ({ account, password }) => {
  return request.post('/login', {
    account,
    password
  })
}

// 获取猜你喜欢，个人中心界面
export const getLikeListAPI = ({ limit = 4 }) => {
  return request({
    url: '/goods/relevant',
    params: {
      limit
    }
  })
}
