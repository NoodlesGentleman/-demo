import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import api from '@/api'
import fetch from '@/api/fetch'

Vue.use(iView)

Vue.config.productionTip = false

Object.defineProperty(Vue.prototype, '$api', {value: api})
Object.defineProperty(Vue.prototype, '$axios', {value: fetch.axios})
Object.defineProperty(Vue.prototype, '$config', {value: fetch.config})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
