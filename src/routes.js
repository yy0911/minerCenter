export default [
  {
    // 设备监控
    path: '/',
    redirect: '/myOrder'
  },
  {
    // 设备监控
    path: '/deviceMoint',
    component: resolve => require(['./pages/deviceMoint/deviceMoint'], resolve)
  },
  {
    // 提币管理
    path: '/extractBmanage',
    component: resolve => require(['./pages/extractBmanage/extractBmanage'], resolve)
  },
  {
    // 我的订单
    path: '/myOrder',
    component: resolve => require(['./pages/myOrder/myOrder'], resolve)
  },
  {
    // 账户设置
    path: '/accountSetting',
    component: resolve => require(['./pages/accountSetting/accountSetting'], resolve)
  },
  {
    path: '/table',
    component: resolve => require(['./pages/table/table1'], resolve)
  }
]
