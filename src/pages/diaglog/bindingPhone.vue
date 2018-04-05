<template>

  <div class="bindingPhone-wrapper">
    <el-button  @click="dialogVisible = true" class="pos-abs-right set-common-btn">綁定</el-button>
    <el-dialog
      title="綁定手機"
      :visible.sync="dialogVisible"
      class="commoneStyle-container bindingPhone-container" :close-on-click-modal="false" :before-close="handleClose">
      <el-form :model="ruleForm2" status-icon :rules="rules" ref="ruleForm2">
        <el-form-item prop="telphone">
          <el-input type="telphone" placeholder="輸入您要綁定的手機號碼" v-model="ruleForm2.telphone"></el-input>
        </el-form-item>
        <el-form-item prop="noteCode commone-note-container">
          <div class="send-note-container">
            <el-input type="text" placeholder="輸入驗證碼" style="width: 178px;float: left" class="print-note-input" v-model="ruleForm2.noteCode"></el-input>
            <el-button type="text" style="width: calc(100% - 178px);" class="send-note-btn"  v-show="isCountDown" @click="countDownMethod">
              發送驗證碼
            </el-button>
            <span style="width:calc(100% - 178px);" v-show="!isCountDown" class="countdownstyle "> {{ countTotal }}s發送驗證碼</span>
          </div>
        </el-form-item>
        <el-form-item prop="accountPassword">
          <el-input type="password" placeholder="輸入賬戶密碼" auto-complete="off" v-model="ruleForm2.accountPassword"></el-input>
        </el-form-item>
        <el-button type="primary"  class="sure-fixpassword-btn">確認綁定</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      var validateTelphone = (rule, value, callback) => {
        if (value !== '') {
          callback(new Error(''))
        } else {
        }
      }
      var validateNoteCode = (rule, value, callback) => {
      }
      var validateAccountPassword = (rule, value, callback) => {
      }
      return {
        dialogVisible: false,
        isCountDown: true,
        countTotal: '',
        timer: null,
        ruleForm2: {
          telphone: '',
          noteCode: '',
          accountPassword: ''
        },
        rules: {
          telphone: [
            {validator: validateTelphone, trigger: 'blur'}
          ],
          noteCode: [
            { validator: validateNoteCode, trigger: 'blur' }
          ],
          accountPassword: [
            { validator: validateAccountPassword, trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
    },
    methods: {
      handleClose (done) {
        this.$refs[ 'ruleForm2' ].resetFields()
        done()
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
  -webkit-transform: translate(0,-50%);
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
  color: rgba(0,0,0,.54);
  position: absolute;
  right: 0;
  text-align: center;
  z-index: 9999!important;
}
@media screen and (max-width: 768px) {
  .bindingPhone-container .el-dialog {
    margin-top: 20rem;
  }
}
</style>
