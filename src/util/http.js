import axios from 'axios'
import {UTIL} from './util'

// const ACCESS_TOKEN = new Promise(function (resolve, reject) {
//   // 13012345678 pass:12
//   let formParams = 'username=18810083326&password=654321&grant_type=password'
//   axios({
//     url: '/promo/token',
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Authorization': 'Basic cHJvbW9zZXJ2ZXI6ZTYxOTcyMDViYTZmOWM2'
//     },
//     data: formParams
//   })
//     .then(function (response) {
//       resolve(response)
//     })
//     .catch(function (reason) {
//     })
// })
//   .then(function (response) {
//     const AUTH_HEADER = 'Bearer '
//     let sdaf = UTIL.SetCookie('auth', AUTH_HEADER + response.data.access_token, 1000000)
//     //从cookie里面获取auth
//   })
//   .catch(function (reason) {
//     console.log(reason)
//   })
//   .then(function () {
//     const AUTH_TOKEN = UTIL.GetCookie('auth')
//     axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
//     axios.defaults.headers['Content-Type'] = 'application/json'
//   })

// 从官网里面获取cookie
const bear = 'Bearer '
const AUTH_TOKEN = UTIL.GetCookie('Authorization')
axios.defaults.headers.common['Authorization'] = bear + AUTH_TOKEN
axios.defaults.headers['Content-Type'] = 'application/json'
// 定义axios拦截器，当cookie、失效时候导向登陆页面

axios.interceptors.response.use(
  response => {
    //response.status===401是我和后台约定的权限丢失或者权限不够返回的状态码，这个可以自己和后台约定，约定返回某个自定义字段也是可以的
    if (response.status === 401 || response.status === 404 || response.status === 400) {
      window.location.href = '/pages/login.html'
    }
    return response
  },
  error => {
    if (error.response.status === 401 || error.response.status === 404 || error.status === 400) {
      window.location.href = '/pages/login.html'
    }
    return Promise.reject(error.response.data)
  })
export default axios
