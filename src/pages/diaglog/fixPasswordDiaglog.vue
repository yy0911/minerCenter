<template>
<div class="fixPass-wrapper">
<el-button  @click="dialogVisible = true" class="pos-abs-right set-common-btn">修改</el-button>

<el-dialog
  title="修改密码"
  :visible.sync="dialogVisible"
  :before-close="handleClose" class="commoneStyle-container fixPass-Container">
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
    <el-form-item prop="identNoteCode" style="float: left">
      <el-input  auto-complete="off" placeholder="请输入验证码" style="width: 204px;" v-model="ruleForm.identNoteCode"></el-input>
    </el-form-item>
    <ident-note style="float: right" @useIdentPlugin="getNoteCodeData"></ident-note>

    <el-button type="warning" @click="fixPassSubmitForm('ruleForm')"  class="sure-fixpassword-btn">确认修改</el-button>
  </el-form>
</el-dialog>
</div>
</template>
<script>
  import identNote from '../plugins/condest.vue'
  export default {
    components: {
      identNote
    },
    data () {
      //原密码验证
      var validateOldPass = (rule, value, callback) => {
        if (value === '') {
          console.log('dasfasfa')
          return callback(new Error('请输入原密码'))
        } else {
          callback()
        }
      }
      //新密码验证
      var validatePass = (rule, value, callback) => {
        console.log(callback)
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm.newPass !== '') {
            this.$refs.ruleForm.validateField('newPass')
          }
          callback()
        }
      }
      //新密码一致性验证
      var validatePass2 = (rule, value, callback) => {
        console.log(value)
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
        console.log(value)
        console.log(this.ruleFormidentNoteCode)
        if (value === '') {
          callback(new Error('请输入验证码'))
        } else if (value !== this.ruleForm.identNoteCode) {
          callback(new Error('验证码错误!'))
        } else {
          console.log('success')
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
      this.getNoteCodeData()
    },
    methods: {
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
      fixPassSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      getNoteCodeData (msg) {
        this.ruleForm.identifyCode = msg
        console.log(this.ruleForm.identifyCode)
      }
    }
  }
</script>
<style>
.fixPass-Container .el-dialog {
  top:50%!important;
  transform: translate(0,-50%);
}
.fixPass-Container .el-dialog.el-dialog--small {
  width:392px;
  height: 422px;
  box-shadow: 0 4px 12px 0 rgba(0,0,0,0.20);
  border-radius: 4px;
  margin:auto;
  overflow: auto;
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
.commoneStyle-container .el-input__inner:focus {
  border:1px solid #F08802;
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
</style>
