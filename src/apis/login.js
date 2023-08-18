import request from '@/utils/request.js'

export const loginAPI = ({ account, password }) => {
  return request.post('/login', {
    account,
    password
  })
}
