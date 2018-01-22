<template>
<div class="fixpassword-container">
<el-button  @click="dialogVisible = true" class="pos-abs-right set-common-btn">修改</el-button>

<el-dialog
  title="修改密码"
  :visible.sync="dialogVisible"
  :before-close="handleClose" class="fixPassword-container">
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

    <el-form-item>
      <el-input  auto-complete="off" placeholder="请输入验证码" style="width: 204px;float: left"></el-input>
      <el-button type="text" style="width: 84px;float: right">4n4d</el-button>
    </el-form-item>

    <el-button type="warning" @click="fixPassSubmitForm('ruleForm')" class="sure-fixpassword-btn">确认修改</el-button>
  </el-form>
</el-dialog>
</div>
</template>
<script>
  export default {
    data () {
      var validateOldPass = (rule, value, callback) => {
        if (value === '') {
          console.log('dasfasfa')
          return callback(new Error('请输入原密码'))
        } else {
          callback()
        }
      }
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
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        dialogVisible: false,
        ruleForm: {
          oldPass: '',
          pass: '',
          newPass: ''
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
          ]
        }
      }
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
      }
    }
  }
</script>
<style>
.fixPassword-container .el-dialog {
  top:50%!important;
  transform: translate(0,-50%);
}
.fixPassword-container .el-dialog.el-dialog--small {
  width:392px;
  height: 422px;
  box-shadow: 0 4px 12px 0 rgba(0,0,0,0.20);
  border-radius: 4px;
  margin:auto;
  overflow: auto;
}
.fixPassword-container .el-dialog__header {
  padding:15px 24px;
  line-height: 24px;
  box-shadow: inset 0 -1px 0 0 rgba(0,0,0,0.09);
}
.fixPassword-container .el-dialog__headerbtn {
  top:17px;
  right:24px;
}
.fixPassword-container .el-input__inner {
  font-size: 16px;
  border:1px solid rgba(0,0,0,.15);
}
.fixPassword-container .el-input__inner:focus {
  border:1px solid #F08802;
}
.fixPassword-container .el-input__inner::-webkit-input-placeholder { /* WebKit browsers */
  color: rgba(0,0,0,.38);
}
.fixPassword-container .el-input__inner:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: rgba(0,0,0,.38);
}
.fixPassword-container .el-input__inner::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: rgba(0,0,0,.38);
}
.fixPassword-container .el-input__inner-ms-input-placeholder { /* Internet Explorer 10+ */
  color: rgba(0,0,0,.38);
}
.fixPassword-container .el-dialog__title {
  font-size: 16px;
}
.fixPassword-container .el-form-item {
  margin-bottom: 0;
}
.set-common-btn.el-button {
 padding:8px 29px;
}
.fixPassword-container .el-button {
  width: 100%;
  font-size: 16px;
}
.pos-abs-right {
  position: absolute;
  right: 0;
  top:50%;
  transform: translate(0,-50%);
}
.fixPassword-container .el-dialog__body {
  padding:25px 48px;
}
.fixPassword-container .el-input__inner {
  margin-bottom: 16px;
}
.el-form-item__error {
  position: relative;
  padding-bottom: 16px;
}
</style>
