import Vue from 'vue'
import Router from 'vue-router'
import { routerBeforeEach } from '../shared/interceptor/routerInterceptor'
import { children } from './children'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: r => require(['../view/user/login/index.vue'], r)
    },
    {
      path: '/home',
      name: 'Home',
      component: r => require(['../view/home/index'], r),
      children
    },
    {
      path: '*', redirect: '/login'
    }
  ]
})

router.beforeEach(routerBeforeEach)

export default router
