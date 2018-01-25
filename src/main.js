// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'normalize.css'
// import './assets/theme_variable.scss'
// import 'element-ui/lib/theme-default/index.css'
import Element from 'element-ui'
import axios from 'axios'
import '../theme/index.css'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routes from './routes'
import { store } from './store/store'

Vue.use(Element)
Vue.use(VueRouter)
Vue.prototype.$http = axios

const router = new VueRouter({
  routes
})
const AUTH_TOKEN = 'Bearer 0a6bf4edb9b9d03503fada1fe749deffdf2c7413'
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
axios.defaults.headers['Content-Type'] = 'application/json'
Vue.filter('currency', function (value) {
  return '¥ ' + value
})
/* eslint-disable no-new */
new Vue({
  store,
  router,
  el: '#app',
  template: '<App/>',
  components: { App }
})
