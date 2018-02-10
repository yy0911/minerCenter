<template>
<div>
  <el-button type="primary" class="mining-btn marginLeft-85 fontSize-16" @click="commitGetCan" >立即提币</el-button>
  <el-dialog
  :visible.sync="dialogVisible"
  :close-on-click-modal="false"
  >
    <template slot="title">
      <i class="el-icon-warning theme-fontColor"></i>
      <span>确认要提币到该地址？</span>
    </template>
  <span class="fontSize-14 fontcolor-opocity-54">提币操作无法撤回，请再次确认您所填写的收币地址及提币金额正确无误。</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="warning" @click="sureGetCANBI">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>
<script>
  import axios from 'axios'
  export default {
    props: ['canReceiveAddress', 'amount'],
    data () {
      return {
        dialogVisible: false
      }
    },
    watch: {
      canReceiveAddress (newData) {
      },
      amount (newData) {
      }
    },
    methods: {
      commitGetCan () {
        if (this.canReceiveAddress === '' && this.amount === '') {
          return false
        } else {
          this.dialogVisible = true
        }
      },
      //提取can的接口
      sureGetCANBI () {
        console.log(this.canReceiveAddress)
        let vm = this
        axios.post('/promo/authed/account/coins/extract',
          {
            canReceiveAddress: vm.canReceiveAddress,
            amount: vm.amount,
            minerfee: 2
          })
          .then(function (response) {
            if (response.data.isSuccess) {
              vm.$message({
                message: '提币成功',
                type: 'success'
              })
              vm.dialogVisible = false
              return
            }
            vm.dialogVisible = false
            vm.$message({
              message: response.data.reason,
              type: 'error'
            })
          })
          .catch(function (error) {
            console.log(error)
          })
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
    padding:11px 47px;
  }
</style>
