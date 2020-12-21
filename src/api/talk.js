import request from '@/utils/request'
export function getTalkUserPage(params) {
  return request({
    url:'/talk/getTalkUserPage',
    method:'get',
    params:params
  })
}
