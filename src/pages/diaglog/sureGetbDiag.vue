<template>
<div>
  <el-button type="primary" class="mining-btn marginLeft-85 fontSize-16" @click="dialogVisible = true" >立即提币</el-button>
  <el-dialog
  :visible.sync="dialogVisible"
  :before-close="handleClose"
  >
    <template slot="title">
      <i class="el-icon-warning theme-fontColor"></i>
      <span>确认要打币到该地址？</span>
    </template>
  <span class="fontSize-14 fontcolor-opocity-54">提币操作无法撤回，请再次确认您所填写的收币地址及提币金额正确无误。</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="warning" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>
<script>
  export default {
    data () {
      return {
        dialogVisible: false
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
<style scoped>
  .el-dialog--small {
    width:433px;
    height: 192px;
  }
  .marginLeft-85 {
    margin-left: 85px;
  }
  .mining-btn {
    padding:12px 51px;
  }
</style>
