<template>
  <transition name="slide">
  <div class="order-item-container fontSize-14 fontcolor-opocity-38" >
    <div class="flex flex-pack-justify order-header-container paddingLR-24">
      <div class="flex">
        <p class="order-item-time">{{ childOrderData.createdAt }}</p>
        <p>订单号：
          <span class="fontcolor-opocity-54">{{ childOrderData.tradeNumber }}</span>
        </p>
      </div>
      <p>{{ childOrderData.status_ }}</p>
    </div>
    <div class="order-main-container flex">
      <div class="left-shop-introduce-container flex paddingTB-30">
        <div class="img-container">
          <img src="../../assets/images/Rectangle16.png" alt="">
        </div>
        <div class="shop-content-container fontSize-12">
          <p class="fontSize-14 goods-container">
            <span class="fontcolor-opocity-87" style="padding-right: 16px">CAN星际宝盒</span>
            <span class="theme-fontColor">x<span>{{ childOrderData.buyAmount }}</span></span>
          </p>
          <div class="specific-info-container">
            <p>
              <span>收货人：</span>
              <span>{{ childOrderData.userName }}</span>
            </p>
            <p>
              <span>联系电话：</span>
              <span>{{ childOrderData.userTel }}</span>
            </p>
            <p class="address-recevier-content">
              <span>收货地址：</span>
              <span>{{ childOrderData.receivingAddress }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="center-price-container paddingTB-30  text-center">
        <div class="transform-vertical-horizontal">
          <p class="fontcolor-opocity-87 total-price-desc">{{ childOrderData.totalRmb | currency}}</p>
          <p class="fontSize-12 freight-desc">含运费 <span>¥25.0</span></p>
        </div>
      </div>
      <div class="right-pay-container paddingTB-30 text-center">
        <div class="transform-vertical-horizontal" v-if="childOrderData.status === 'wait'">
          <el-button type="primary" class="order-dispose-btn payMon-btn" @click="payagain(childOrderData)">去付款</el-button>
          <el-button class="order-dispose-btn fontcolor-opocity-38" @click="cancel()">取消订单</el-button>
        </div>
        <div class="transform-vertical-horizontal" v-else-if="childOrderData.status === 'ok'">
          <p class="fontcolor-opocity-38">{{ childOrderData.status_ }}</p>
        </div>
        <div class="transform-vertical-horizontal" v-else-if="childOrderData.status === 'refund'">
          <p class="fontcolor-opocity-38">{{ childOrderData.status_ }}</p>
        </div>
        <div class="transform-vertical-horizontal" v-else-if="childOrderData.status === 'sendout'">
          <p class="Logistics-name"> {{childOrderData.logisticsName}}</p>
          <p class="fontcolor-opocity-54 Logistics-number">{{childOrderData.logisticsNumber}}</p>
        </div>
        <div class="transform-vertical-horizontal" v-else-if="childOrderData.status === 'finish'">
          <p class="fontcolor-opocity-38">{{ childOrderData.status_ }}</p>
        </div>
        <div class="transform-vertical-horizontal" v-else>
          <p class="fontcolor-opocity-38">{{ childOrderData.status_ }}</p>
        </div>
      </div>

      <el-dialog
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
      >
        <template slot="title">
          <i class="el-icon-question" style="color: #e6a23c"></i>
          <span  class="fontcolor-opocity-87">确认要取消订单？</span>
        </template>
        <span class="fontSize-14 fontcolor-opocity-54" style="margin-left: 16px">取消订单后不可撤回，请再次确认您的操作。</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="sureCancelOrder(childOrderData)">确 定</el-button>
  </span>
      </el-dialog>
    </div>
  </div>
  </transition>
</template>

<script>
    import axios from 'axios'
    export default {
      props: ['childOrderData'],
      data () {
        return {
          dialogVisible: false,
          tellParentCancelOrder: false
        }
      },
      methods: {
        handleClose (done) {
          done()
        },
        // 代支付订单
        payagain (item) {
          let vm = this
          axios.post('/promo/alipay/coupon/order/payagain',
            {
              tradeNumber: item.tradeNumber
            })
            .then(function (response) {
              window.location.href = response.data.httpurl
            })
            .catch(function (error) {
              console.log(error.response)
            })
        },
        //取消订单
        cancel () {
          this.dialogVisible = true
        },
        //取消订单
        sureCancelOrder (item) {
          let vm = this
          axios.post('/promo/alipay/order/cancel',
            {
              tradeNumber: item.tradeNumber
            })
            .then(function (response) {
              vm.dialogVisible = false
              vm.tellParentCancelOrder = true
              vm.$emit('listenCancelOrderUser', vm.tellParentCancelOrder)
            })
            .catch(function (error) {
              vm.dialogVisible = false
              console.log(error.response.data)
            })
        }
      }
    }
</script>
<style>
  .order-item-container .el-dialog {
    top:50%!important;
    transform: translate(0,-50%);
    width:433px;
    height: 192px;
    box-shadow: 0 0px 0px 0 rgba(0,0,0,0.10);
    border-radius: 4px;
    margin:auto;
    overflow: auto;
    margin-top: 0!important;
  }
</style>
<style scoped>
  .slide-fade-enter-active {
  transition: all .3s ease;
  }
  .slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
  }
.order-item-container {
  height: 184px;
  border: 1px solid #E9E9E9;
  overflow: hidden;
  margin-top: 20px;
}
.order-header-container {
  height: 40px;
  line-height: 40px;
  background-color: #FAFAFA;
}
.paddingLR-24 {
  padding-left:24px;
  padding-right:24px;
}
.paddingTB-30 {
  padding-top:30px;
  padding-bottom:30px;
}
.order-item-time {
  padding-right: 20px;
}
.order-main-container {
  padding-left:24px;
}
.img-container {
  width:90px;
  height: 90px;
  margin-right: 24px;
}
.img-container img {
  width: 100%;
  height: 100%;
}
.specific-info-container {
  width:376px;
  padding-right: 24px;
  height: 60px;
  line-height: 20px;
}
.address-recevier-content {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.goods-container {
  line-height: 30px;
}
.center-price-container {
  width:176px;
  box-shadow: inset -1px 0 0 0 #E9E9E9, inset 1px 0 0 0 #E9E9E9;
  position:relative;
}
.total-price-desc {
  line-height: 22px;
}
.freight-desc {
  line-height: 20px;
}
.right-pay-container {
  position:relative;
  width: 152px;
  overflow: hidden;
}

.order-dispose-btn {
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 4px;
}
.el-button {
  width: 89px;
  height: 32px;
  padding:0;
  margin-left: 0;
}
.payMon-btn {
  margin-bottom: 16px;
}
.more_btn {
  line-height: 50px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
  padding: 0 20px;
  position: absolute;
}
.Logistics-name {
  color:#F08802;
  font-size: 12px;
  line-height: 22px;
}
.Logistics-number {
  font-size: 12px;
  margin: 0 30px;
  line-height: 22px;
  word-wrap: break-word;
  word-break: normal;
  width: 120px;
}
</style>
