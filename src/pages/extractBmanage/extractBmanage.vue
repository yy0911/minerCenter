<template>
    <div class="extractBmanage-container">
      <div class="mining-statist-container">
        <p>CAN提币</p>
        <p class="instruction-ing-present fontSize-14 fontcolor-opocity-54 marginLeft-85">当前 <span class="theme-fontColor">23242</span> CAN，每次提币固定收取手续费 </p>
        <div class="receiver-container">
            <div class="address-container flex">
              <p class="fontSize-14 fontcolor-opocity-54">收币地址：</p>
              <el-input class=" address-input"
                        placeholder="输入收币地址" v-model="canReceiveAddress">
              </el-input>
            </div>
            <div class="mining-money-container flex">
                <p class="fontSize-14 fontcolor-opocity-54">提币数额：</p>
                <el-input class="mining-money-input" placeholder="输入数额" v-model.number="amount"></el-input>
                <span class="fontSize-14 fontcolor-opocity-54">CAN</span>
            </div>
          <sure-getb-diag :canReceiveAddress="canReceiveAddress" :amount="amount"></sure-getb-diag>
        </div>
      </div>
      <div class="mining-record-container">
        <p class="paddingTB-24">提币记录</p>
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
        canReceiveAddress: '',
        amount: ''
      }
    },

    components: {
      tableMiningRecord,
      sureGetbDiag
    },
    methods: {
    }
  }
</script>

<style scoped>
.address-input {
  width:440px;
}
.mining-money-input {
  width:160px;
  margin-right: 8px;
}

.el-input__inner {
  height: 40px;
}
.marginLeft-85 {
  margin-left: 85px;
}

.address-container,.mining-money-container {
  line-height: 40px;
  margin-bottom: 16px;
}
.address-input,.mining-money-input {
  margin-left: 16px;
}
.instruction-ing-present {
  padding-top:24px;
  padding-bottom: 24px;
}
.paddingTB-24 {
  padding-top:24px;
  padding-bottom: 24px;
}
</style>
