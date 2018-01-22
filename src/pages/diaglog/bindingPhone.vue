<template>

  <div class="bindingPhone-wrapper">
    <el-button  @click="dialogVisible = true" class="pos-abs-right set-common-btn">绑定</el-button>
    <el-dialog
      title="绑定手机"
      :visible.sync="dialogVisible"
      :before-close="handleClose" class="commoneStyle-container bindingPhone-container">
      <el-form :model="ruleForm" status-icon  ref="ruleForm"  class="">
        <el-form-item >
          <el-input type="telphone" placeholder="输入您要绑定的手机号码"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="send-note-container">
            <el-input type="text" placeholder="输入验证码" style="width: 204px;float: left" class="print-note-input"></el-input>
            <el-button type="text" style="width: calc(100% - 204px);" class="send-note-btn"  v-show="isCountDown" @click="countDownMethod">
              发送验证码
            </el-button>
            <span  style="width:calc(100% - 204px);" v-show="!isCountDown" class="countdownstyle "> {{ countTotal }}s</span>
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
        isCountDown: true,
        noteMsg: '',
        countTotal: '',
        timer: null,
        ruleForm: {
        }
      }
    },
    computed: {
    },
    methods: {
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
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
.commoneStyle-container .print-note-input .el-input__inner {
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
.send-note-btn {
  position: relative;
}
.commoneStyle-container .send-note-btn::before {
  content: '';
  position: absolute;
  left:0px;
  height: 20px;
  top:20%;
  border-left: 1px solid rgba(0,0,0,0.15);
  z-index: 888;
}
.countdownstyle {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background-color: rgba(0,0,0,0.15);
  color: #ffffff;
  position: absolute;
  right: 0;
  text-align: center;
  z-index: 9999!important;

}
</style>
