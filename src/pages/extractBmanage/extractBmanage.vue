<template>
    <div class="extractBmanage-container">
      <div class="mining-statist-container">
        <p>挖矿统计</p>
        <div class="receiver-container">
          <div class="address-container flex">
            <p class="fontSize-14 most-use-fontColor">收货地址：</p>
            <el-input class=" address-input"
                      placeholder=""
                      suffix-icon="el-icon-date">
            </el-input>
          </div>
          <div class="mining-money-container flex">
            <p class="fontSize-14 most-use-fontColor">提币金额：</p>
            <el-input class="mining-money-input"
                      placeholder=""
                      suffix-icon="el-icon-date">
            </el-input>
          </div>
          <p class="instruction-ing-present fontSize-14 most-use-fontColor marginLeft-70">当前CAN <span class="theme-fontColor">23242</span> 个，每次提币固定收取手续费 </p>
          <sure-getb-diag></sure-getb-diag>
        </div>
      </div>
      <div class="mining-record-container">
        <p>提币记录</p>
        <div class="tableMiningRecord-container">
          <table-mining-record></table-mining-record>
        </div>
      </div>

    </div>
</template>

<script>
  import tableMiningRecord from '../table/table2.vue'
  import sureGetbDiag from '../diaglog/sureGetbDiag.vue'
  export default {
    data () {
      return {
      }
    },
    components: {
      tableMiningRecord,
      sureGetbDiag
    }
  }
</script>

<style>
.address-input {
  width:440px;
}
.mining-money-input {
  width:320px;
}

.el-input__inner {
  height: 40px;
}
.marginLeft-70 {
  margin-left: 70px;
}
.mining-btn {
  width:160px;
  height: 40px;
}
</style>
