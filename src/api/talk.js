import request from '@/utils/request'

/**
 *
 * @param params name:"name"
 */
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
    method:'get',
    params:params
  })
}

/**
 * 删除页面内容，data:list
 */
export function deleteTalkContent(params,data) {
  return request({
    url:'/talk/deleteTalkContent',
    method:'post',
    params:params,
    data:data
  })
}

