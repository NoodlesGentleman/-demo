// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routes from './router'
import { routerMode } from './config/env'  // 打包项目要把mode: history注释掉
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import wx from 'wx'
import 'animate.css'
// const Vconsole = require('./../vconsole.min.js')
// const vconsole = new Vconsole()
// console.log(vconsole)
/* eslint-disble no-unused-vars */
import 'common/js/usermsg.js'

import 'common/stylus/index.styl'
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

// 解决移动端300毫秒的延迟
fastclick.attach(document.body)

Vue.use(VueRouter)
Vue.prototype.wx = wx

const router = new VueRouter({
  routes,
  mode: routerMode, // 打包项目要把mode: history注释掉
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})
/* router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
}) */
/* Vue.directive('title', {
  inserted: (el, binding) => {
    document.title = binding.value
  },
  update: (el, binding) => {
    document.title = binding.value
  }
}) */
// 替换图
Vue.use(VueLazyload, {
  loading: require('common/image/default.jpg')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
