import request from '@/utils/request'

export function getUserService(id) {
  return request({
    url: '/api/user-service/user/' + id
  })
}
