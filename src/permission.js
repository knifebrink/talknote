import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import {getToken, getUserName} from '@/utils/auth' // 验权

const whiteList = ['/login','/404'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  if(to.name==="page"){
    next()
    return ;
  }
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      console.log("to /");
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.routers.length === 0) {
        let username=getUserName();
        console.log("beforeEach");
        store.dispatch('GenerateRoutes', { username }).then(() => { // 生成可访问的路由表
          console.log("beforeEach: gen:next");
          next()
        })

      } else {
        console.log("beforeEach: next");
        next()

      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 去的地址在白名单内
      console.log("has white");
      next()
    } else {
      console.log("to /login");
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
