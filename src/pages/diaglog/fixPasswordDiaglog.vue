<template>
<div class="fixPass-wrapper">
<el-button  @click="dialogVisible = true" class="pos-abs-right set-common-btn">修改</el-button>

<el-dialog
  title="修改賬戶密碼"
  :visible.sync="dialogVisible"
  class="commoneStyle-container fixPass-Container" :close-on-click-modal="false" :before-close="handleClose">
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="">
    <el-form-item prop="oldPass">
      <el-input type="password" v-model="ruleForm.oldPass" auto-complete="off" placeholder="輸入原密碼"></el-input>
    </el-form-item>

    <el-form-item prop="pass">
      <el-input type="password" v-model="ruleForm.pass" auto-complete="off" placeholder="輸入新密碼" ></el-input>
    </el-form-item>

    <el-form-item prop="newPass">
      <el-input type="password" v-model="ruleForm.newPass" auto-complete="off" placeholder="再次輸入新密碼" ></el-input>
    </el-form-item>

    <el-form-item prop="identNoteCode" class="commone-note-container">
      <div class="send-note-container">
        <el-input type="tel" v-model="ruleForm.identNoteCode" auto-complete="off" placeholder="短信驗證碼" class="print-note-input" style="width: 178px;float: left"></el-input>
        <el-button type="text" style="width: calc(100% - 178px);" class="send-note-btn"  v-show="isCountDown" @click="countDownMethod">
          發送驗證碼
        </el-button>
        <span style="width:calc(100% - 178px);" v-show="!isCountDown" class="countdownstyle "> {{ countTotal }}s</span>
      </div>
    </el-form-item>


    <el-button type="primary" @click="fixPassSubmitForm('ruleForm')"  class="sure-fixpassword-btn">確認修改</el-button>
  </el-form>
</el-dialog>
</div>
</template>
<script>
  import axios from 'axios'
  import identNote from '../../plugins/noteCode/condest.vue'
  export default {
    components: {
      identNote
    },
    data () {
      //原密码验证
      var isNullValidate = new RegExp("\\s")
      var validateOldPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('請輸入原密碼'))
        } else {
          callback()
        }
      }
      //新密码验证
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('請輸入新密碼'))
        } else if (value.length < 6 || value.length > 20 || isNullValidate.test(value) === true) {
          callback(new Error('密碼長度必須是6到20位的字符，並且不能包含空格'))
        } else {
          if (this.ruleForm.newPass !== '') {
            this.$refs.ruleForm.validateField('newPass')
          }
          callback()
        }
      }
      //新密码一致性验证
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('請再次輸入新密碼'))
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('兩次輸入密碼不一致!'))
        } else {
          callback()
        }
      }
      //验证码验证
      var validateIdentNoteCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('請輸入驗證碼'))
        } else {
          callback()
        }
      }
      return {
        dialogVisible: false,
        ruleForm: {
          oldPass: '',
          pass: '',
          newPass: '',
          identNoteCode: ''
        },
        countTotal: '',
        isCountDown: true,
        rules: {
          oldPass: [
            {validator: validateOldPass, trigger: 'blur'}
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          newPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          identNoteCode: [
            {validator: validateIdentNoteCode, trigger: 'blur'}
          ]
        }
      }
    },
    mounted () {
    },
    methods: {
      handleClose (done) {
        this.isCountDown = true
        this.$refs[ 'ruleForm' ].resetFields()
        done()
      },
      fixPassSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let vm = this
            //确认修改密码
            axios.post('/promo/modify/account/pass/update',
              {
                code: vm.ruleForm.identNoteCode,
                password: vm.ruleForm.pass,
                repassword: vm.ruleForm.newPass,
                oldpassword: vm.ruleForm.oldPass
              })
              .then(function (response) {
                if (response.data.isSuccess) {
                  let successMessage = '賬戶密碼修改成功'
                  vm.$message({
                    message: successMessage,
                    type: 'success'
                  })
                  vm.dialogVisible = false
                  vm.isCountDown = true
                  vm.$refs[ 'ruleForm' ].resetFields()
                } else {
                  let errorMessage
                  if (response.data.code === 11000) {
                    errorMessage = '請輸入有效賬戶信息'
                  } else if (response.data.code === 11002) {
                    errorMessage = '密碼格式錯誤'
                  } else if (response.data.code === 11002) {
                    errorMessage = '請求出錯,稍候重試'
                  } else {
                    errorMessage = '驗證碼錯誤或已失效'
                  }
                  vm.$message({
                    message: errorMessage,
                    type: 'error'
                  })
                  return false
                }
              })
              .catch(function (error) {
                console.log(error)
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      //时间倒计时
      countDownMethod () {
        if (this.ruleForm.oldPass === '' || this.ruleForm.pass === '') {
          return false
        }
        //获取手机验证码
        let vm = this
        axios.post('/promo/modify/account/pass/sendcode',
          {
            oldpassword: vm.ruleForm.oldPass,
            password: vm.ruleForm.pass,
            repassword: vm.ruleForm.newPass
          })
          .then(function (response) {
            console.log(response.data)
            if (response.data.isSuccess) {
              vm.$message({
                message: '驗證碼發送成功',
                type: 'success'
              })
              vm.isCountDown = false
            } else {
              let errorMessage
              if (response.data.code === 11001) {
                errorMessage = '密碼格式錯誤(6-20位)'
              } else if (response.data.code === 11002) {
                errorMessage = '賬戶密碼錯誤'
              } else if (response.data.code === 11003) {
                errorMessage = '短信發送頻率超出限制'
              } else if (response.data.code === 11004) {
                errorMessage = '請求出錯,稍候重試'
              } else {
                errorMessage = '短信發送失敗,稍候重試'
              }
              vm.$message({
                message: errorMessage,
                type: 'error'
              })
              vm.isCountDown = true
              return false
            }
          })
          .catch(function (error) {
            console.log(error)
          })
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
      }
    }
  }
</script>
<style>
  @media screen and (max-width: 768px) {
    .fixPass-Container .el-dialog {
      margin-top: 20rem;
    }
  }
.fixPass-Container .el-dialog {
  position: fixed;
  top:40%!important;
  left:50%!important;
  transform: translate(-50%,-50%);
  -webkit-transform: translate(-50%,-50%);
  width:392px;
  height: 422px;
  box-shadow: 0 4px 12px 0 rgba(0,0,0,0.20);
  border-radius: 4px;
  margin:auto;
  overflow: auto;
  margin-top: 0!important;
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
</style>
