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
 * data是body里的提交内容
 */
export function deleteTalkContent(params,data) {
  return request({
    url:'/talk/deleteTalkContent',
    method:'post',
    params:params,
    data:data
  })
}

/**
 * @return token
 * @param params name:"name",password:"password"
 */
export function login(params) {
  return request({
    url:'/talk/login',
    method:'get',
    params:params
  })
}

/**
 *
 * 插入语句内容
 * @param params
 * @returns
 */
export function insertTalkContentByPageName(params) {
  return request({
    url:'/talk/insertTalkContentByPageName',
    method:'post',
    params:params
  })
}

/**
 * 删除页面
 * @param params,name
 * @param data:(id,name,password,tid)
 * @returns
 */
export function deletePage(params,data) {
  return request({
    url:'/talk/deletePage',
    method:'post',
    params:params,
    data:data
  })
}

