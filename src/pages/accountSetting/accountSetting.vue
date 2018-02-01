<template>
<div>
  <p class="accout-set-title">账户设置</p>
  <div class="account-main-container fontSize-14">
    <div class="account-setItem-container flex flex-align-center">
      <div class="flex">
        <p>账户密码：</p>
          <fix-password-diaglog></fix-password-diaglog>
      </div>

    </div>
    <div class="account-setItem-container flex flex-align-center" style="display: none">
      <div>
        <div class="" style="float: left;">
          <p>安全手机</p>
          <p class="theme-fontColor">未绑定</p>
        </div>
         <binding-phone-diaglog></binding-phone-diaglog>
      </div>
    </div>
    <div class="account-setItem-container flex flex-align-center">
      <div>
        <div class="" style="float: left;">
          <p>提币密码</p>
          <p class="theme-fontColor">{{ isHaveCapitalPass ? '已设置' : '未设置'}}</p>
        </div>
        <set-canpass-diaglog :isHaveCapitalPass="isHaveCapitalPass"></set-canpass-diaglog>
      </div>
    </div>
    <div class="account-setItem-container flex flex-align-center">
      <div>
        <div class="" style="float: left;">
          <p>邮箱账号</p>
          <p class="theme-fontColor">{{ userEmail !== '' ? userEmail : '未设置'}}</p>
        </div>
        <fix-email-diaglog :userEmail="userEmail"></fix-email-diaglog>
      </div>
    </div>
  </div>

</div>
</template>

<script>
    import axios from 'axios'
    import fixPasswordDiaglog from '../diaglog/fixPasswordDiaglog.vue'
    import bindingPhoneDiaglog from '../diaglog/bindingPhone.vue'
    import setCanpassDiaglog from '../diaglog/setCanPass.vue'
    import fixEmailDiaglog from '../diaglog/fixEmailAccount.vue'
    export default {
      data () {
        return {
          userEmail: '',
          isHaveCapitalPass: false
        }
      },
      components: {
        fixPasswordDiaglog,
        bindingPhoneDiaglog,
        setCanpassDiaglog,
        fixEmailDiaglog
      },
      mounted () {
        this.getUserIsBindingAccountData()
      },
      methods: {
        // 获取用户是否绑定邮箱或者资金账户密码接口请求
        getUserIsBindingAccountData () {
          let vm = this
          axios.get('/promo/authed/account/can/status', {
            validateStatus: function (status) {
              if (status === 401 || status === 404) {
                window.location.href = '../pages/login.html'
              }
              return
            }
          })
            .then(function (response) {
              console.log(response.data)
              vm.userEmail = response.data.email
              vm.isHaveCapitalPass = response.data.isHaveCapitalPass
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      }
    }
</script>

<style scoped>
.accout-set-title {
  padding-bottom: 24px;
}
.account-main-container>div {
  height: 88px;
  line-height: 22px;
  box-shadow: inset 0 -1px 0 0 rgba(0,0,0,0.10);
  position: relative;
}
</style>
