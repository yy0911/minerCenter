<template>
  <!--<div class="userAssetCount-container" v-cloak>-->
    <!--<div class="mining-statist-container">-->
      <!--<p>-->
        <!--我的資産-->
      <!--</p>-->
      <!--&lt;!&ndash;<p class="instruction-ing-present fontSize-14 fontcolor-opocity-54 marginLeft-85">&ndash;&gt;-->
        <!--&lt;!&ndash;当前&ndash;&gt;-->
        <!--&lt;!&ndash;<span class="theme-fontColor">{{remainMiningCoin}}</span>数量，&ndash;&gt;-->
        <!--&lt;!&ndash;锁定数量为&ndash;&gt;-->
        <!--&lt;!&ndash;<span>{{lockingCoins}}</span> CAN,&ndash;&gt;-->
        <!--&lt;!&ndash;每次提币固定收取手续费<span>{{fei}}&ndash;&gt;-->
        <!--&lt;!&ndash;</span>&ndash;&gt;-->
      <!--&lt;!&ndash;</p>&ndash;&gt;-->
      <!--<div class="kindsof-bi-wrapper">-->
        <!--<div class="canBi-Wrapper flex flex-align-center">-->
          <!--<div class="bi-left-wrapper flex  flex-align-center">-->
            <!--<img src="../../assets/images/Oval.png" alt="">-->
            <!--<p>CAN</p>-->
          <!--</div>-->
          <!--<div class="bi-center-wrapper">-->
            <!--<p class="font-size20">{{remainMiningCoin}}</p>-->
            <!--<div class="tip-article-biAccount flex flex-align-center">-->
              <!--<i class="el-icon-warning" v-if="!allTrue"></i>-->
              <!--<p v-if="allTrue">賬戶已綁定<span>{{allBoxSize}}</span>  台設備，設備正常運作需保持賬戶余額不低于  <span>{{allBoxNeedCoins}} </span>CAN</p>-->
              <!--<p v-else>余幣不足以維持全部設備運作，<span>{{allBoxSize}}</span> 台設備所需運作幣 <span>{{allBoxNeedCoins}} </span>CAN</p>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="bi-right-wrapper">-->
            <!--<el-button class="recharge-account-btn" @click="rechargeMethod">充值</el-button>-->
            <!--<el-button class="getBi-btn" type="primary" @click="commitGetCan">提幣</el-button>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="wmBi-Wrapper flex flex-align-center">-->
          <!--<div class="bi-left-wrapper flex  flex-align-center">-->
            <!--<img src="../../assets/images/Oval_Copy.png" alt="">-->
            <!--<p>WMC</p>-->
          <!--</div>-->
          <!--<div class="bi-center-wrapper">-->
            <!--<p class="font-size20">{{totalWaiMaiCoin}}</p>-->
            <!--<div class="tip-article-biAccount flex flex-align-center">-->
              <!--<p>暫未開放，敬請期待！</p>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->

      <!--</div>-->
    <!--</div>-->
    <!--<div class="mining-record-container">-->
      <!--<p class="paddingTB-24">-->
        <!--收支記錄-->
      <!--</p>-->
      <!--<div class="tableMiningRecord-container">-->
        <!--<table-mining-record></table-mining-record>-->
      <!--</div>-->
    <!--</div>-->
    <!--<el-dialog-->
      <!--:visible.sync="dialogVisible"-->
      <!--:close-on-click-modal="false"-->
      <!--class="getCandiaglog-container">-->
      <!--<template slot="title">-->
                <!--<span>-->
                  <!--CAN提幣-->
                <!--</span>-->
      <!--</template>-->
      <!--<p class="fontSize-14 fontcolor-opocity-54">-->
        <!--收幣地址：-->
      <!--</p>-->
      <!--<el-input class="address-input"-->
                <!--placeholder="輸入收幣地址" v-model="canReceiveAddress" @blur="isNullCanAdress">-->
      <!--</el-input>-->
      <!--<p v-if="errorAddressTip" class="error_warn">{{errorAddressContent}}</p>-->
      <!--<p class="paddingT-8 fontSize-14 fontcolor-opocity-54">-->
        <!--提幣金額：-->
      <!--</p>-->
      <!--<el-input class="mining-money-input" placeholder="輸入數額" v-model.number="amount" @blur="isNullCanNumber"></el-input>-->
      <!--<span class="fontSize-14 fontcolor-opocity-54">CAN</span>-->
      <!--<p class="instruction-ing-present fontSize-14 fontcolor-opocity-54">-->
        <!--當前可提-->
        <!--<span class="warn-fontColor">{{availableCoin}}</span> CAN，每次提幣固定收取手續費<span class="warn-fontColor">{{fei}}</span> CAN-->
      <!--</p>-->
      <!--<p v-if="errorAmountTip" class="error_warn">{{errorAmountContent}}</p>-->
      <!--<p class="paddingT-8 fontSize-14 fontcolor-opocity-54">-->
        <!--提幣密碼：-->
      <!--</p>-->
      <!--<el-input type="password" class="" v-model.trim="CanPassword" placeholder="輸入提幣密碼"></el-input>-->

      <!--<p v-if="errorCanPasswordTip" class="error_warn_pass">{{errorCanPasswordContent}}</p>-->
      <!--<el-button type="primary" class="margin-top-16 tibi-btn-dialog" @click="endSureGetCanMethod">-->
        <!--確認-->
      <!--</el-button>-->
    <!--</el-dialog>-->
    <!--<el-dialog-->
      <!--:visible.sync="dialogVisible2"-->
      <!--:close-on-click-modal="false"-->
      <!--class="getCandiaglog-container">-->
      <!--<template slot="title">-->
                <!--<span>-->
                  <!--CAN充值-->
                <!--</span>-->
      <!--</template>-->
      <!--<p class="fontSize-14 fontcolor-opocity-54">-->
        <!--充值地址：-->
      <!--</p>-->
      <!--<p class="paddingT-8 fontSize-14 fontcolor-opocity-54">{{userAddress}}</p>-->

      <!--<div class="qrCode-wrapper flex flex-align-center" id="qrcode">-->
        <!--<img :src="qrcodeImgUrl" alt="" id="QrcodeImg">-->
      <!--</div>-->

      <!--<el-button type="primary" class="margin-top-16 tibi-btn-dialog" @click="endQrMethod">-->
        <!--確認-->
      <!--</el-button>-->
    <!--</el-dialog>-->
  <!--</div>-->
  <div class="" style="text-align: center;margin-top: 200px;color: rgba(0,0,0,0.25)">
    暫未開放
  </div>
</template>

<script>
  import axios from 'axios'
  import tableMiningRecord from '../table/table2.vue'
  import sureGetbDiag from '../diaglog/sureGetbDiag.vue'
  import QRCode from 'qrcode'
  export default {
    data () {
      return {
        dialogVisible: false,
        dialogVisible2: false,
        canReceiveAddress: '',
        amount: '',
        errorAddressTip: false,
        errorAmountTip: false,
        errorCanPasswordTip: false,
        errorAmountContent: '提幣數額不能爲空',
        errorAddressContent: '收幣地址不能爲空',
        errorCanPasswordContent: '',
        remainMiningCoin: '',
        totalWaiMaiCoin: '',
        lockingCoins: '',
        fei: '',
        CanPassword: '',
        allTrue: true,
        allBoxSize: '',
        allBoxNeedCoins: '',
        userAddress: '',
        qrcodeImgUrl: '',
        availableCoin: '',
        addressStatus: ''
      }
    },
    components: {
      tableMiningRecord,
      sureGetbDiag,
      QRCode
    },
    mounted () {
      this.getCanAmountMethod()
      this.getQrUrlMethod()
    },
    methods: {
      isNullCanNumber () {
        if (this.amount === '') {
          this.errorAmountTip = true
          return false
        } else {
          this.errorAmountTip = false
          return true
        }
      },
      isNullCanAdress () {
        if (this.canReceiveAddress === '') {
          this.errorAddressTip = true
        } else if (this.canReceiveAddress.substr(0, 2) !== '0x' || this.canReceiveAddress.length !== 42) {
          this.errorAddressTip = true
          this.errorAddressContent = '輸入錯誤，地址爲一串0x開頭的42位字符'
          return false
        } else {
          this.errorAddressTip = false
          return true
        }
      },
      getCanAmountMethod () {
        let vm = this
        axios.get('/promo/authed/account/can/status')
          .then(function (response) {
            vm.remainMiningCoin = response.data.remainMiningCoin    //can总数
            vm.totalWaiMaiCoin = response.data.totalWaiMaiCoin      //wm币数量
            vm.allTrue = response.data.allTrue  //设备是否都正常运转boolean
            vm.lockingCoins = response.data.lockingCoins //锁定can数量
            vm.fei = response.data.fei  //费率
            vm.allBoxSize = response.data.allBoxSize
            vm.allBoxNeedCoins = response.data.allBoxNeedCoins
            vm.availableCoin = response.data.availableCoin //可提数
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      commitGetCan () {
        this.dialogVisible = true
      },
      rechargeMethod () {
        if (this.addressStatus) {
          this.dialogVisible2 = true
        } else {
          this.$message({
            message: '獲取地址失敗',
            type: 'error'
          })
        }
      },
      //提取can的接口
      endSureGetCanMethod () {
        let vm = this
        let isNullValidate = new RegExp("\\s")
        if (this.isNullCanAdress() && this.isNullCanNumber()) {
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
                  message: '提幣成功',
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
      },
      getQrUrlMethod () {
        let vm = this
        axios.get('/promo/authed/account/generate/address')
          .then(function (response) {
            vm.addressStatus = response.data.isSuccess
            if (response.data.isSuccess) {
              vm.userAddress = response.data.address
              vm.qrcode(response.data.address)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      qrcode (url) {
        let vm = this
        QRCode.toDataURL(url)
          .then(url => {
            console.log(url)
            vm.qrcodeImgUrl = url
          })
          .catch(err => {
            console.error(err)
          })
      },
      endQrMethod () {
        this.dialogVisible2 = false
      }

    }
  }
</script>
<style>
  .userAssetCount-container .el-dialog {
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
  .userAssetCount-container .el-dialog__header {
    padding: 16px 0 16px 24px;
    border-bottom: 1px solid rgba(0,0,0,0.09);
  }
  .userAssetCount-container .el-dialog__body {
    padding: 30px 48px;
  }
  .getCandiaglog-container .el-button {
    width: 100%;
  }
  .userAssetCount-container .el-button {
    padding: 8px 29px;
  }
</style>
<style scoped>


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
.bi-left-wrapper {
  margin-right: 30px;
  width: 100px;
}
.bi-center-wrapper {
  width: 55%;
  position: relative;
}
.tip-article-biAccount {
  position: absolute;
  top:28px;
  left: 0;
  font-size: 14px;
  color: rgba(0,0,0,0.54);
  line-height: 22px;
}
.tip-article-biAccount > i {
  margin-right: 8px;
}
.tip-article-biAccount > p span {
  color: #F08802;
}
.bi-left-wrapper > img {
  width: 48px;
  height: 48px;
  margin-right: 8px;
}
.kindsof-bi-wrapper > div {
  padding: 20px  0;
  position: relative;
}
.bi-right-wrapper {
  position: absolute;
  right: 0;
}
.mining-record-container {
  margin-top: 32px;
}
.userAssetCount-container .error_warn {
  margin-left: 0;
}
.userAssetCount-container .tibi-btn-dialog {
  padding: 12px 29px;
}
.qrCode-wrapper {
  width: 240px;
  height: 240px;
  border: 1px solid rgba(0,0,0,0.12);
  margin: 24px  auto  ;
}
#qrcode > img {
  width: 100%;
  height: 100%;
}
</style>
