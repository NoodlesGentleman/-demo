import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  routes,
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  // 判断是否登录
  if (to.path === '/') {
    if (localStorage.getItem('userInfo')) {
      next('/home')
    } else {
      next('/login')
    }
  } else if (to.path !== '/' && to.path !== "/login" && !localStorage.getItem('userInfo')) {
    next('/login')
  } else {
    next()
  }
})

export default router
