export default [
  {
    // 设备监控
    path: '/',
    component: resolve => require(['./pages/deviceMoint/deviceMoint'], resolve)
  },
  {
    // 提币管理
    path: '/extractBmanage',
    component: resolve => require(['./pages/extractBmanage/extractBmanage'], resolve)
  },
  {
    path: '/user',
    component: resolve => require(['./pages/user'], resolve)
  },
  {
    path: '/table',
    component: resolve => require(['./pages/table/table1'], resolve)
  }
]
