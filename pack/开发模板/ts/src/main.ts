// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './polyfills'
import './source'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'

Vue.use(ElementUI)
Vue.config.productionTip = process.env.NODE_ENV === 'production'

/* tslint:disable:no-unused-expression */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
/* tslint:enable:no-unused-expression */
