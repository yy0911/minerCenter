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
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
Vue.use(Element)
Vue.use(VueRouter)
Vue.prototype.$http = axios

const router = new VueRouter({
  routes
})
// 定义登陆时候存储的acdess_token
const ACCESS_TOKEN = new Promise(function (resolve, reject) {
  let formParams = 'username=18810083326&password=555555&grant_type=password'
  axios({
    url: '/promo/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic cHJvbW9zZXJ2ZXI6ZTYxOTcyMDViYTZmOWM2'
    },
    data: formParams
  })
    .then(function (response) {
      resolve(response)
    })
    .catch(function (reason) {
    })
})
  .then(function (response) {
    const AUTH_HEADER = 'Bearer '
    let sdaf = UTIL.SetCookie('auth', AUTH_HEADER + response.data.access_token, 1000000)
    //从cookie里面获取auth
  })
  .catch(function (reason) {
    console.log(reason)
  })
  .then(function () {
    const AUTH_TOKEN = UTIL.GetCookie('auth')
    axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
    axios.defaults.headers['Content-Type'] = 'application/json'
  })
// 定义axios拦截器，当cookie、失效时候导向登陆页面
// axios.interceptors.response.use((response) => {
//   const data = response.data
// }, (err) => {
//     if (err && err.response) {
//       switch (err.response.status) {
//         case 400:
//           err.message = '请求错误'
//           break
//
//         case 401:
//           err.message = '未授权，请登录'
//           window.location.href = '/pages/login.html'
//           break
//
//         case 403:
//           err.message = '拒绝访问'
//           break
//
//         case 404:
//           err.message = `请求地址出错: ${err.response.config.url}`
//           window.location.href = '/pages/login.html'
//           break
//
//         case 408:
//           err.message = '请求超时'
//           break
//
//         case 500:
//           err.message = '服务器内部错误'
//           break
//
//         case 501:
//           err.message = '服务未实现'
//           break
//
//         case 502:
//           err.message = '网关错误'
//           break
//
//         case 503:
//           err.message = '服务不可用'
//           break
//
//         case 504:
//           err.message = '网关超时'
//           break
//
//         case 505:
//           err.message = 'HTTP版本不受支持'
//           break
//
//         default:
//       }
//     }
//   return Promise.reject(err)
// })

//从官网里面获取cookie
// const AUTH_TOKEN = UTIL.GetCookie('auth')
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
// axios.defaults.headers['Content-Type'] = 'application/json'
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
  el: '#app',
  template: '<App/>',
  components: { App }
})
