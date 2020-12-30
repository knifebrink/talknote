import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
import Layout from '../views/layout/Layout'
Vue.use(Router)
export const constantRouterMap = [
  {path: '/404', component: () => import('@/views/404'),hidden:false, meta: {title: '商品列表', icon: 'product-list'}},
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld,
    hidden:false,
    meta: {title: '商品列表', icon: 'product-list'},

  },
  {
    path: '/pgms',
    component: Layout,
    name: 'pgms',
    meta: {title: '商品列表', icon: 'product-list'},
    children: [
      {
        path: 'pages/:manager',
        name: 'pages',
        component: () => import('@/views/pgms/pages/index'),
        meta: {title: '商品列表2', icon: 'product-list'},
        hidden:false
      }

    ]},
  {
    path: '/cms',
    component: Layout,
    name: 'cms',
    meta: {title: '订单列表', icon: 't-list'},
    children: [
      {
        path: 'content/:pageName',
        name: 'content',
        component: () => import('@/views/cms/index'),
        meta: {title: '订单列表2', icon: 't-list'},
        hidden:false
      }

    ]},
  {path: '*', redirect: '/404', hidden: true}
]
export default new Router({
  routes: constantRouterMap
})
