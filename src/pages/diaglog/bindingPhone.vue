<template>

  <div class="bindingPhone-container">
    <el-button  @click="dialogVisible = true" class="pos-abs-right set-common-btn">绑定</el-button>
    <el-dialog
      title="绑定手机"
      :visible.sync="dialogVisible"
      :before-close="handleClose" class="bindingPhone-container">
      <el-form :model="ruleForm" status-icon  ref="ruleForm"  class="">
        <el-form-item >
          <el-input type="telphone" placeholder="输入您要绑定的手机号码"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="send-note-container">
            <el-input type="text" placeholder="输入验证码" style="width: 204px;float: left" class="print-note-input"></el-input>
            <el-button type="text" style="width: 84px;float: right" class="send-note-btn">发送验证码</el-button>
          </div>
        </el-form-item>
        <el-form-item >
          <el-input type="password" placeholder="输入账户密码" auto-complete="off"></el-input>
        </el-form-item>
        <el-button type="warning"  class="sure-fixpassword-btn">确认绑定</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        dialogVisible: false,
        ruleForm: {
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
      }
    }
  }
</script>
<style>
.bindingPhone-container .el-dialog {
  top:50%!important;
  transform: translate(0,-50%);
}
.bindingPhone-container .el-dialog.el-dialog--small {
  width:392px;
  height: 366px;
  box-shadow: 0 4px 12px 0 rgba(0,0,0,0.20);
  border-radius: 4px;
  margin:auto;
  overflow: auto;
}
.bindingPhone-container .print-note-input .el-input__inner {
  border:0!important;
  position: relative;
}
.send-note-container {
  border:1px solid rgba(0,0,0,.15);
  height: 40px;
  border-radius: 4px;
}
.send-note-btn.el-button {
  font-size: 14px;
}
.bindingPhone-container .print-note-input::after {
  content: '';
  position: absolute;
  right: 0;
  height: 20px;
  top:20%;
  border-right: 1px solid rgba(0,0,0,0.15);
}
</style>
