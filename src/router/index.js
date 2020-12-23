import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
/* Layout */
import Layout from '../views/layout/Layout'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/404', component: () => import('@/views/404'),hidden:true},
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      hidden:true

    },
    {
      path: '/pgms',
      component: Layout,
      name: 'pgms',
      children: [
        {
        path: 'pages/:manager',
        name: 'pages',
        component: () => import('@/views/pgms/pages/index'),
        meta: {title: '商品列表', icon: 'product-list'},
          hidden:true
        }

      ]},
    {
      path: '/cms',
      component: Layout,
      name: 'cms',
      children: [
        {
          path: 'content/:pageName',
          name: 'content',
          component: () => import('@/views/cms/index'),
          meta: {title: '订单列表', icon: 't-list'},
          hidden:true
        }

      ]}
  ]
})
