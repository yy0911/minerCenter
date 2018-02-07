<template>
<div class="fixPass-wrapper">
<el-button  @click="dialogVisible = true" class="pos-abs-right set-common-btn">修改</el-button>

<el-dialog
  title="修改密码"
  :visible.sync="dialogVisible"
  class="commoneStyle-container fixPass-Container" :close-on-click-modal="false" :before-close="handleClose">
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="">
    <el-form-item prop="oldPass">
      <el-input type="password" v-model="ruleForm.oldPass" auto-complete="off" placeholder="输入原密码"></el-input>
    </el-form-item>

    <el-form-item prop="pass">
      <el-input type="password" v-model="ruleForm.pass" auto-complete="off" placeholder="输入新密码" ></el-input>
    </el-form-item>

    <el-form-item prop="newPass">
      <el-input type="password" v-model="ruleForm.newPass" auto-complete="off" placeholder="再次输入新密码" ></el-input>
    </el-form-item>

    <el-form-item prop="identNoteCode commone-note-container">
      <div class="send-note-container">
        <el-input type="tel" v-model="ruleForm.identNoteCode" auto-complete="off" placeholder="短信验证码" class="print-note-input" style="width: 178px;float: left"></el-input>
        <el-button type="text" style="width: calc(100% - 178px);" class="send-note-btn"  v-show="isCountDown" @click="countDownMethod">
          发送验证码
        </el-button>
        <span style="width:calc(100% - 178px);" v-show="!isCountDown" class="countdownstyle "> {{ countTotal }}s发送验证码</span>
      </div>
    </el-form-item>

    <!--<el-form-item prop="identNoteCode" style="float: left">-->
      <!--<el-input  auto-complete="off" placeholder="请输入验证码" style="width: 204px;" v-model="ruleForm.identNoteCode"></el-input>-->
    <!--</el-form-item>-->
    <!--<ident-note style="float: right" @useIdentPlugin="getNoteCodeData"></ident-note>-->

    <el-button type="primary" @click="fixPassSubmitForm('ruleForm')"  class="sure-fixpassword-btn">确认修改</el-button>
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
      var validateOldPass = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入原密码'))
        } else {
          callback()
        }
      }
      //新密码验证
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入密码'))
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
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      //验证码验证
      var validateIdentNoteCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'))
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
      //获取图形验证码
      // getNoteCodeData (msg) {
      //   this.ruleForm.identifyCode = msg
      //   console.log(this.ruleForm.identifyCode)
      // },
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
        axios.get('/promo/modify/account/pass/sendcode')
          .then(function (response) {
            console.log(response.data)
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
