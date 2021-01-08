import request from '@/utils/request'
import requestOnly from '@/utils/requestNotIntercetor'

/**
 * @param params pageName:string
 */
export function getSomeOne(params) {
  return requestOnly({
    url:'/talk/getTalkContentRandom',
    method:'get',
    params:params
  })
}

/**
 * 是否存在页面
 * @param params pageName:string
 * @return {data:true}
 */
export function hasPageByName(params) {
  return request({
    url:'/talk/hasPageByName',
    method:'get',
    params:params
  })
}
