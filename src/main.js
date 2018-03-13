// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'normalize.css'
import Element from 'element-ui'
import axios from 'axios'
import '../theme/index.css'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routes from './routes'
import { store } from './store/store'
import { UTIL } from './util/util'
import { http } from './util/http'
Vue.use(Element)
Vue.use(VueRouter)

const router = new VueRouter({
  routes
})
//货比符号转换
Vue.filter('currency', function (value) {
  return '¥ ' + value
})
//日期截取
Vue.filter('subDate', function (value) {
  return value.substring(0, 10)
})
// 状态过滤
Vue.filter('applyCanStatus', function (value) {
    if (value === 'wait') {
      return '等待'
    } else if (value === 'ok') {
      return '成功'
    } else if (value === 'fail') {
      return '失败或者取消'
    } else {
      return '处理中'
    }
})
//对象空值过滤
Vue.filter('nullValueOfArr', function (arr) {
  arr.map(item => {
    for (let [k, v] of Object.entries(item)) {
      if (v === '' || v === null) {
        item[k] = '--'
      }
    }
  })
  return arr
})
/* eslint-disable no-new */
new Vue({
  store,
  router,
  http,
  el: '#app',
  template: '<App/>',
  components: { App }
})
