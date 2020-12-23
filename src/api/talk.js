import request from '@/utils/request'

export function getTalkUserPage(params) {
  return request({
    url:'/talk/getTalkUserPage',
    method:'get',
    params:params
  })
}

export function createTalkUserPage(params) {
  return request({
    url:'/talk/createTalkPage',
    method:'post',
    params:params
  })
}

/**
 * 获取页面内容
 */
export function getTalkContentByPageName(params) {
  return request({
    url:'/talk/getTalkContentByPageName',
    method:'post',
    params:params
  })
}
