import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import HelloWorld from '@/components/HelloWorld'
/* Layout */
// import Layout from '../views/layout/Layout'



console.log("-----不可能啊")
console.log(Router)
export default new Router({
  routes: [
    {path: '/404', component: () => import('@/views/404'),hidden:true},
    {
      path: '/123',
      name: 'HelloWorld',
      component: HelloWorld,
      hidden:true

    }
    ,
    {
      path: '/pgms',
      component: Layout,
      name: 'pgms',
      children: [
        {
        path: 'pages',
        name: 'pages',
        component: () => import('@/views/pgms/pages/index'),
        meta: {title: '商品列表', icon: 'product-list'},
          hidden:true
        }

      ]}
    ]
})
