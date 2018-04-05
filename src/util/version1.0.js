
const versionController = function () {
  // 判断苹果手机
  let pla = ismobile(1)
  if (Number(pla) === 0) {
    console.log('is apple')
    let meta = document.getElementsByTagName('meta')[1]
    meta.parentNode.removeChild(meta)
  }
  const version = '1.1.0'
  const links = document.getElementsByTagName('link')
  const scripts = document.getElementsByTagName('script')
  // es6可以换种语法针对domlist集合做处理
  for (let i = 0; i < links.length; i++) {
    let linkItem
    linkItem = links[i].getAttribute('href')
      if (linkItem !== null) {
          links[i].setAttribute('href', linkItem + '?version=' + version)
      } else {
          // console.log('true is null')
      }
  }
  for (let i = 0; i < scripts.length; i++) {
    let scriptItem
    scriptItem = scripts[i].getAttribute('src')
      if (scriptItem !== null) {
          scripts[i].setAttribute('src', scriptItem + '?version=' + version)
      } else {
          // console.log('true is null')
      }
  }
}
const ieBrowserVersion = function () {
  var isIE = navigator.userAgent.indexOf('compatible') > -1 && navigator.userAgent.indexOf('MSIE') > -1 //判断是否IE浏览器
  if (isIE) {
    var reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(navigator.userAgent)
    var fIEVersion = parseFloat(RegExp['$1'])
    if (fIEVersion < 10) {
      window.location.href = '/common/versionOutDated.html'
    }
  }
}
function ismobile (test) {
  let u = navigator.userAgent, app = navigator.appVersion
  if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
    if (window.location.href.indexOf('?mobile') < 0) {
      try {
        if (/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
          return '0'
        } else {
          return '1'
        }
      } catch (e) {}
    }
  } else if (u.indexOf('iPad') > -1) {
    return '0'
  } else {
    return '1'
  }
};
export {versionController, ieBrowserVersion}
