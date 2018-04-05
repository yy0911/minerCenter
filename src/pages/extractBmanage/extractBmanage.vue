<template>
  <!--<div class="extractBmanage-container" v-cloak>-->
    <!--<div class="mining-statist-container">-->
      <!--<p>-->
        <!--CAN提幣-->
      <!--</p>-->
      <!--<p class="instruction-ing-present fontSize-14 fontcolor-opocity-54 marginLeft-85">-->
        <!--當前-->
        <!--<span class="theme-fontColor">{{remainMiningCoin}}</span>數量，-->
        <!--鎖定數量爲-->
        <!--<span>{{lockingCoins}}</span> CAN,-->
        <!--每次提幣固定收取手續費<span>{{fei}}-->
        <!--</span>-->
      <!--</p>-->
      <!--<div class="receiver-container">-->
        <!--<div class="address-container flex">-->
          <!--<p class="fontSize-14 fontcolor-opocity-54">-->
            <!--收幣地址：-->
          <!--</p>-->
          <!--<el-input class="address-input"-->
                    <!--placeholder="輸入收幣地址" v-model="canReceiveAddress" @blur="isNullCanAdress">-->
          <!--</el-input>-->

        <!--</div>-->
        <!--<p v-if="errorAddressTip" class="error_warn">{{errorAddressContent}}</p>-->
        <!--<div class="mining-money-container flex">-->
          <!--<p class="fontSize-14 fontcolor-opocity-54">-->
            <!--提币数额：-->
          <!--</p>-->
          <!--<el-input class="mining-money-input" placeholder="输入数额" v-model.number="amount" @blur="isNullCanNumber"></el-input>-->
          <!--<span class="fontSize-14 fontcolor-opocity-54">CAN</span>-->
        <!--</div>-->
        <!--<p v-if="errorAmountTip" class="error_warn">{{errorAmountContent}}</p>-->


        <!--<el-button type="primary" class="mining-btn marginLeft-85 fontSize-16" @click="commitGetCan" >-->
          <!--立即提幣-->
        <!--</el-button>-->
        <!--<el-dialog-->
          <!--:visible.sync="dialogVisible"-->
          <!--:close-on-click-modal="false"-->
          <!--class="getCandiaglog-container">-->
          <!--<template slot="title">-->
                <!--<span>-->
                  <!--輸入提幣密碼-->
                <!--</span>-->
          <!--</template>-->
          <!--<p class="fontSize-14 fontcolor-opocity-54">-->
            <!--收幣地址：-->
          <!--</p>-->
          <!--<p>{{canReceiveAddress}}</p>-->
          <!--<p class="paddingT-8 fontSize-14 fontcolor-opocity-54">-->
            <!--提幣金額：-->
          <!--</p>-->
          <!--<p><span class="color-red fontSize-16">{{amount}}</span> <span class="fontSize-12 fontcolor-opocity-54">CAN</span></p>-->
          <!--<el-input type="password" class="paddingT-16" v-model.trim="CanPassword"></el-input>-->
          <!--<p v-if="errorCanPasswordTip" class="error_warn_pass">{{errorCanPasswordContent}}</p>-->
          <!--<el-button type="primary" class="margin-top-16" @click="endSureGetCanMethod">-->
            <!--確認-->
          <!--</el-button>-->
        <!--</el-dialog>-->
        <!--&lt;!&ndash;<sure-getb-diag :canReceiveAddress="canReceiveAddress" :amount="amount"></sure-getb-diag>&ndash;&gt;-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="mining-record-container">-->
      <!--<p class="paddingTB-24">-->
        <!--提幣記錄-->
      <!--</p>-->
      <!--<div class="tableMiningRecord-container">-->
        <!--<table-mining-record></table-mining-record>-->
      <!--</div>-->
    <!--</div>-->

  <!--</div>-->
  <div class="" style="text-align: center;margin-top: 200px;color: rgba(0,0,0,0.25)">
    暫未開放
  </div>
</template>

<script>
  import axios from 'axios'
  import tableMiningRecord from '../table/table2.vue'
  import sureGetbDiag from '../diaglog/sureGetbDiag.vue'
  export default {
    data () {
      return {
        dialogVisible: false,
        canReceiveAddress: '',
        amount: '',
        errorAddressTip: false,
        errorAmountTip: false,
        errorCanPasswordTip: false,
        errorAmountContent: '提幣數額不能爲空',
        errorAddressContent: '收幣地址不能爲空',
        errorCanPasswordContent: '',
        remainMiningCoin: '',
        lockingCoins: '',
        fei: '',
        CanPassword: ''
      }
    },
    components: {
      tableMiningRecord,
      sureGetbDiag
    },
    mounted () {
      this.getCanAmountMethod()
    },
    methods: {
      isNullCanNumber () {
        if (this.amount === '') {
          this.errorAmountTip = true
        } else {
          this.errorAmountTip = false
        }
      },
      isNullCanAdress () {
        if (this.canReceiveAddress === '') {
          this.errorAddressTip = true
        } else {
          this.errorAddressTip = false
        }
      },
      getCanAmountMethod () {
        let vm = this
        axios.get('/promo/authed/account/can/status')
          .then(function (response) {
            vm.remainMiningCoin = response.data.remainMiningCoin
            vm.lockingCoins = response.data.lockingCoins
            vm.fei = response.data.fei
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      commitGetCan () {
        const regeMinNumber = 200
        if (this.canReceiveAddress === '' && this.amount === '') {
          return false
        } else if (this.canReceiveAddress.substr(0, 2) !== '0x' || this.canReceiveAddress.length !== 42) {
          this.errorAddressTip = true
          this.errorAddressContent = '輸入錯誤，地址爲一串0x開頭的42位字符'
          return false
        } else if (isNaN(this.amount)) {
          this.errorAmountTip = true
            this.errorAmountContent = '金額必須爲數字'
          return false
        } else if (Number(this.amount) < regeMinNumber) {
          this.errorAmountTip = true
          this.errorAmountContent = '金額必須大于' + regeMinNumber
          return false
        } else if (Number(this.amount) > Number(this.remainMiningCoin)) {
          this.errorAmountTip = true
          this.errorAmountContent = '提幣金額超出範圍'
          return false
        } else {
          this.dialogVisible = true
        }
      },
      //提取can的接口
      endSureGetCanMethod () {
        let vm = this
        let isNullValidate = new RegExp("\\s")
        if (this.CanPassword === '') {
          this.errorCanPasswordTip = true
          this.errorCanPasswordContent = '密碼不能爲空'
          return false
        } else if (isNullValidate.test(this.CanPassword) === true) {
          this.errorCanPasswordTip = true
          this.errorCanPasswordContent = '密碼不能包含空格'
          return false
        } else {
          this.errorCanPasswordTip = false
        }
        axios.post('/promo/authed/account/coins/extract',
          {
            canReceiveAddress: vm.canReceiveAddress,
            amount: vm.amount,
            minerfee: 2,
            password: vm.CanPassword
          })
          .then(function (response) {
            if (response.data.isSuccess) {
              //提币申请提交成功
              vm.$message({
                message: 'The application was submitted successfully.',
                type: 'success'
              })
              vm.dialogVisible = false
              return
            }
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
<style>
  .extractBmanage-container .el-dialog {
    top:50%!important;
    transform: translate(0,-50%);
    width:409px;
    height: 371px;
    box-shadow: 0 4px 12px 0 rgba(0,0,0,0.20);
    border-radius: 4px;
    margin:auto;
    overflow: auto;
    margin-top: 0!important;
  }
  .extractBmanage-container .el-dialog__header {
    padding: 16px 0 16px 24px;
    border-bottom: 1px solid rgba(0,0,0,0.09);
  }
  .extractBmanage-container .el-dialog__body {
    padding: 30px 48px;
  }
  .getCandiaglog-container .el-button {
    width: 100%;
  }
</style>
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
.mining-btn {
  padding:11px 47px;
}
.error_warn_pass {
  text-align: left;
  padding-bottom: 10px;
  color: #F5222D ;
  font-size: 14px;
}
</style>
