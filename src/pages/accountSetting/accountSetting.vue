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
    <div class="account-setItem-container flex flex-align-center">
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
        <p>安全邮箱</p>
        <p class="fontcolor-opocity-38">gongjinye@foxmail.com</p>
      </div>

    </div>
  </div>

</div>
</template>

<script>
    import fixPasswordDiaglog from '../diaglog/fixPasswordDiaglog.vue'
    import bindingPhoneDiaglog from '../diaglog/bindingPhone.vue'

    export default {
      data () {
        return {}
      },
      components: {
        fixPasswordDiaglog,
        bindingPhoneDiaglog
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
