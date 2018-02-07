<template>
<div class="fixPass-wrapper">
<el-button  @click="dialogVisible = true" class="pos-abs-right set-common-btn">{{ isHaveCapitalPass ? '修改' : '设置'}}</el-button>

<el-dialog
  :title="isHaveCapitalPass ? '设置密码' : '修改密码'"
  :visible.sync="dialogVisible"
  class="commoneStyle-container fixPass-Container" :close-on-click-modal="false" :before-close="handleClose" style="margin-top: 0!important;">
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="">

    <el-form-item prop="canPass">
      <el-input type="password" v-model="ruleForm.canPass" auto-complete="off" placeholder="输入提币密码" ></el-input>
    </el-form-item>

    <el-form-item prop="canRepaPass">
      <el-input type="password" v-model="ruleForm.canRepaPass" auto-complete="off" placeholder="确认提币密码" ></el-input>
    </el-form-item>

    <el-form-item prop="phoneNoteCode" class="phone-note-container commone-note-container" :inline="true">
      <div class="send-note-container">
        <el-input type="tel" v-model="ruleForm.phoneNoteCode" auto-complete="off" placeholder="短信验证码" class="print-note-input" style="width: 178px;float: left"></el-input>
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
  import identNote from '../../plugins/noteCode/condest.vue'
  export default {
    props: ['isHaveCapitalPass'],
    components: {
      identNote
    },
    data () {
      //提币密码验证
      var validateCanPass = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入提币密码'))
        } else {
          if (this.ruleForm.canRepaPass !== '') {
            this.$refs.ruleForm.validateField('canRepaPass')
          }
          callback()
        }
      }
      //提币新密码验证
      var validateCanRepaPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入提币密码'))
        } else if (value !== this.ruleForm.canPass) {
          callback(new Error('两次输入提币密码不一致!'))
        } else {
          callback()
        }
      }
      //手机验证码验证
      var validatePhoneNoteCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机验证码'))
        } else if (value !== this.rightCode) {
          callback(new Error('手机验证码错误'))
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
          canPass: '',
          canRepaPass: '',
          phoneNoteCode: '',
          accountPass: ''
        },
        rightCode: '',
        countTotal: '',
        isCountDown: true,
        submitError: '',
        rules: {
          canPass: [
            {validator: validateCanPass, trigger: 'blur'}
          ],
          canRepaPass: [
            { validator: validateCanRepaPass, trigger: 'blur' }
          ],
          phoneNoteCode: [
            { validator: validatePhoneNoteCode, trigger: 'blur' }
          ],
          accountPass: [
            {validator: validateAccountPass, trigger: 'blur'}
          ]
        }
      }
    },
    watch: {
      isHaveCapitalPass (newdata) {
        this.isHaveCapitalPass = newdata
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
            //确认修改密码
            axios.post('/promo/modify/capitalpass/update',
              {
                code: vm.ruleForm.phoneNoteCode,
                password: vm.ruleForm.canPass,
                repassword: vm.ruleForm.canRepaPass,
                accountpassword: vm.ruleForm.accountPass
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
      //验证验证码
      validateReciveCode () {
        let vm = this
        axios.post('/promo/modify/capitalpass/verifycode',
          {
            code: vm.phoneNoteCode
          })
          .then(function (response) {
            console.log(response.data)
            vm.rightCode = response.data.code
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      //时间倒计时
      countDownMethod () {
        const TIME_COUNT = 60
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
        //获取手机验证码
        let vm = this
        axios.get('/promo/modify/capitalpass/sendcode')
          .then(function (response) {
            console.log(response.data)
            vm.$options.methods.validateReciveCode()
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
.commone-note-container .el-form-item__error {
  left: -60%;
  padding-top: 14px;
}
</style>
