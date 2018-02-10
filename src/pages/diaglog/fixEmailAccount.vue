<template>
<div class="fixPass-wrapper">
<el-button  v-show="computedUserEmail" @click="dialogVisible = true" class="pos-abs-right set-common-btn" >设置</el-button>

<el-dialog
  title="设置邮箱"
  :visible.sync="dialogVisible"
  class="commoneStyle-container fixPass-Container" :close-on-click-modal="false" :before-close="handleClose" style="margin-top: 0!important;">
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="">

    <el-form-item prop="emailAdress">
      <el-input type="email" v-model="ruleForm.emailAdress" auto-complete="off" placeholder="输入邮箱地址" ></el-input>
    </el-form-item>

    <el-form-item prop="emailNoteCode" class="phone-note-container commone-note-container">
      <div class="send-note-container">
        <el-input type="tel" v-model="ruleForm.emailNoteCode" auto-complete="off" placeholder="输入邮箱验证码" class="print-note-input" style="width: 178px;float: left"></el-input>
        <el-button type="text" style="width: calc(100% - 178px);" class="send-note-btn"  v-show="isCountDown" @click="countDownMethod">
          发送验证码
        </el-button>
        <span style="width:calc(100% - 178px);" v-show="!isCountDown" class="countdownstyle "> {{ countTotal }}s</span>
      </div>
    </el-form-item>

    <el-form-item prop="accountPass">
      <el-input type="password" v-model="ruleForm.accountPass" auto-complete="off" placeholder="输入账户密码" ></el-input>
    </el-form-item>
    <el-button type="primary" @click="fixCanPassSubmitForm('ruleForm')"  class="sure-fixpassword-btn">确认</el-button>
  </el-form>
</el-dialog>
</div>
</template>
<script>
  import axios from 'axios'
  import identNote from '../../plugins/noteCode/condest.vue'
  export default {
    props: ['userEmail'],
    components: {
      identNote
    },
    computed: {
      computedUserEmail () {
        if (this.userEmail === '' || this.userEmail === null) {
          return true
        } else {
          return false
        }
      }
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
        } else {
          callback()
        }
      }
      // } else if (!this.emailCodeIsRight) {
      //   callback(new Error(this.verifyReturnInfo))
      // }
      //账户密码验证
      var validateAccountPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账户密码'))
        } else {
          callback()
        }
      }
      return {
        isFixSuccess: false,
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
        this.isCountDown = true
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
              })
              .then(function (response) {
                if (response.data.isSuccess) {
                  vm.$message({
                    message: response.data.message,
                    type: 'success'
                  })
                  vm.dialogVisible = false
                  vm.isCountDown = true
                  vm.isFixSuccess = true
                  vm.$emit('listenFixPassSuccess', vm.isFixSuccess)
                  vm.$refs[ 'ruleForm' ].resetFields()
                } else {
                  vm.$message({
                    message: response.data.message,
                    type: 'error'
                  })
                  return false
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
        if (this.ruleForm.emailAdress === '') {
          return false
        }
        const TIME_COUNT = 60
        // 给用户邮箱发送验证吗
        let reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
        if (this.ruleForm.emailAdress !== '' && reg.test(this.ruleForm.emailAdress)) {
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
              email: vm.ruleForm.emailAdress
            })
            .then(function (response) {
              if (response.data.isSuccess) {
                vm.$message({
                  message: '验证码发送成功',
                  type: 'success'
                })
                vm.isCountDown = false
              } else {
                vm.$message({
                  message: response.data.message,
                  type: 'error'
                })
                vm.isCountDown = true
                return false
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
        return
      }
    }
  }
</script>
<style>
.fixPass-Container .el-dialog {
  position: fixed;
  left:50%!important;
  top:40%!important;
  transform: translate(-50%,-50%);
  -webkit-transform: translate(-50%,-50%);
  width:392px;
  height: 380px;
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
  -webkit-transform: translate(0,-50%);
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
