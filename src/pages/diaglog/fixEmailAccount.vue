<template>
<div class="fixPass-wrapper">
<el-button  @click="dialogVisible = true" class="pos-abs-right set-common-btn">{{ userEmail !== '' ? '修改' : '设置'}}</el-button>

<el-dialog
  :title="userEmail !== '' ? '设置邮箱' : '修改邮箱'"
  :visible.sync="dialogVisible"
  class="commoneStyle-container fixPass-Container" :close-on-click-modal="false" :before-close="handleClose" style="margin-top: 0!important;">
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="">

    <el-form-item prop="emailAdress">
      <el-input type="email" v-model="ruleForm.emailAdress" auto-complete="off" placeholder="输入邮箱地址" ></el-input>
    </el-form-item>

    <el-form-item prop="emailNoteCode" class="phone-note-container commone-note-container">
      <div class="send-note-container">
        <el-input type="tel" v-model="ruleForm.emailNoteCode" auto-complete="off" placeholder="输入邮箱验证码" class="print-note-input" style="width: 178px;float: left" @blur="verifyEmailMethod"></el-input>
        <el-button type="text" style="width: calc(100% - 178px);" class="send-note-btn"  v-show="isCountDown" @click="countDownMethod">
          发送验证码
        </el-button>
        <span style="width:calc(100% - 178px);" v-show="!isCountDown" class="countdownstyle "> {{ countTotal }}s</span>
      </div>
    </el-form-item>

    <el-form-item prop="accountPass">
      <el-input type="password" v-model="ruleForm.accountPass" auto-complete="off" placeholder="输入账户密码" ></el-input>
    </el-form-item>
    <p class="" style="color: red;padding-bottom: 10px">{{ submitError }}</p>
    <el-button type="primary" @click="fixCanPassSubmitForm('ruleForm')"  class="sure-fixpassword-btn">确认</el-button>
  </el-form>
</el-dialog>
</div>
</template>
<script>
  import axios from 'axios'
  import identNote from '../plugins/condest.vue'
  export default {
    props: ['userEmail'],
    components: {
      identNote
    },
    data () {
      //邮箱地址验证
      var validateEmailAdress = (rule, value, callback) => {
        let reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
        if (value === '') {
          return callback(new Error('请输入邮箱地址'))
        } else if (!reg.test(this.ruleForm.emailAdress)) {
          return callback(new Error('邮箱地址格式错误'))
        } else {
          callback()
        }
      }
      //邮箱验证码验证
      var validateEmailNoteCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱验证码'))
          return
        } else if (!this.emailCodeIsRight) {
          callback(new Error(this.verifyReturnInfo))
        } else {
          callback()
        }
      }
      //账户密码验证
      var validateAccountPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账户验证码'))
        } else {
          callback()
        }
      }
      return {
        dialogVisible: false,
        ruleForm: {
          emailAdress: '',
          emailNoteCode: '',
          accountPass: ''
        },
        emailCodeIsRight: '',
        verifyReturnInfo: '',
        countTotal: '',
        isCountDown: true,
        submitError: '',
        rules: {
          emailAdress: [
            {validator: validateEmailAdress, trigger: 'blur'}
          ],
          emailNoteCode: [
            { validator: validateEmailNoteCode, trigger: 'blur' }
          ],
          accountPass: [
            {validator: validateAccountPass, trigger: 'blur'}
          ]
        }
      }
    },
    watch: {
      userEmail (newdata) {
        this.userEmail = newdata
        return
      }
    },
    mounted () {
    },
    methods: {
      handleClose (done) {
        this.$refs[ 'ruleForm' ].resetFields()
        done()
      },
      fixCanPassSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let vm = this
            //确认修改邮箱
            axios.post('/promo/modify/account/email/update',
              {
                code: vm.ruleForm.emailNoteCode,
                password: vm.ruleForm.accountPass
              }, {
                validateStatus: function (status) {
                  if (status === 401 || status === 404) {
                    window.location.href = '../pages/login.html'
                  }
                  return
                }
              })
              .then(function (response) {
                console.log(response)
                if (response.data.isSuccess) {
                  vm.$message({
                    message: '确认成功',
                    type: 'success'
                  })
                  vm.dialogVisible = false
                  vm.$refs[ 'ruleForm' ].resetFields()
                } else {
                  vm.submitError = response.data.message
                }
              })
              .catch(function (error) {
                vm.$message({
                  message: '确认失败',
                  type: 'error'
                })
                console(error)
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      //发送验证码按钮
      countDownMethod () {
        const TIME_COUNT = 60
        // 给用户邮箱发送验证吗
        let reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
        if (this.emailAdress !== '' && reg.test(this.emailAdress)) {
          if (!this.timer) {
            this.countTotal = TIME_COUNT
            this.isCountDown = false
            this.timer = setInterval(() => {
              if (this.countTotal > 0 && this.countTotal <= TIME_COUNT) {
                this.countTotal--
              } else {
                this.isCountDown = true
                clearInterval(this.timer)
                this.timer = null
              }
            }, 1000)
          }
          let vm = this
          axios.post('/promo/modify/account/email/sendcode',
            {
              email: vm.emailAdress
            }, {
              validateStatus: function (status) {
                if (status === 401 || status === 404) {
                  window.location.href = '../pages/login.html'
                }
                return
              }
            })
            .then(function (response) {
              console.log(response.data)
            })
            .catch(function (error) {
              console.log(error)
            })
        }
        return
      },
      //验证code 当blur的时候
      verifyEmailMethod () {
        let vm = this
        axios.post('/promo/modify/account/email/verifycode',
          {
            code: vm.ruleForm.emailNoteCode
          }, {
            validateStatus: function (status) {
              if (status === 401 || status === 404) {
                window.location.href = '../pages/login.html'
              }
              return
            }
          })
          .then(function (response) {
            console.log(response.data)
            vm.emailCodeIsRight = response.data.isSuccess
            vm.verifyReturnInfo = response.data.message
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
</script>
<style>
.fixPass-Container .el-dialog {
  top:50%!important;
  transform: translate(0,-50%);
  width:392px;
  height: 422px;
  box-shadow: 0 4px 12px 0 rgba(0,0,0,0.20);
  border-radius: 4px;
  margin:auto;
  overflow: auto;
}
.el-input__suffix {
  height: 40px;
}
.commoneStyle-container .el-dialog__header {
  padding:15px 24px;
  line-height: 24px;
  box-shadow: inset 0 -1px 0 0 rgba(0,0,0,0.09);
}
.commoneStyle-container .el-dialog__headerbtn {
  top:17px;
  right:24px;
}
.commoneStyle-container .el-input__inner {
  font-size: 16px;
  border:1px solid rgba(0,0,0,.15);
}
.commoneStyle-container .el-input__inner::-webkit-input-placeholder { /* WebKit browsers */
  color: rgba(0,0,0,.38);
}
.commoneStyle-container .el-input__inner:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: rgba(0,0,0,.38);
}
.commoneStyle-container .el-input__inner::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: rgba(0,0,0,.38);
}
.commoneStyle-container .el-input__inner-ms-input-placeholder { /* Internet Explorer 10+ */
  color: rgba(0,0,0,.38);
}
.commoneStyle-container .el-dialog__title {
  font-size: 16px;
}
.commoneStyle-container .el-form-item {
  margin-bottom: 0;
}
.set-common-btn.el-button {
 padding:8px 29px;
}
.commoneStyle-container .el-button {
  width: 100%;
  font-size: 16px;
}
.pos-abs-right {
  position: absolute;
  right: 0;
  top:50%;
  transform: translate(0,-50%);
}
.commoneStyle-container .el-dialog__body {
  padding:25px 48px;
}
.commoneStyle-container .el-input__inner {
  margin-bottom: 16px;
}
.el-form-item__error {
  position: relative;
  padding-bottom: 16px;
}
.send-note-container {
  border:1px solid rgba(0,0,0,.15);
  height: 40px;
  border-radius: 4px;
}
.borderred {
  border:1px solid red;
}
.phone-note-container .el-form-item__error {
  left: -60%;
  padding-top: 14px;
}
</style>
