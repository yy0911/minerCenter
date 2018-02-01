<template>
  <transition name="slide">
  <div class="order-item-container fontSize-14 fontcolor-opocity-38" >
    <div class="flex flex-pack-justify order-header-container paddingLR-24">
      <div class="flex">
        <p class="order-item-time">{{ childOrderData.updatedAt }}</p>
        <p>订单号：
          <span class="fontcolor-opocity-54">{{ childOrderData.tradeNumber }}</span>
        </p>
      </div>
      <p>{{ childOrderData.status_ }}</p>
    </div>
    <div class="order-main-container flex">
      <div class="left-shop-introduce-container flex paddingTB-30">
        <div class="img-container">
          <img src="../../assets/images/pic_device.png" alt="">
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
        <div class="transform-vertical-horizontal" v-if="childOrderData.status !== 1">
          <el-button type="primary" class="order-dispose-btn payMon-btn">去付款</el-button>
          <el-button class="order-dispose-btn fontcolor-opocity-38">取消订单</el-button>
        </div>
        <div class="transform-vertical-horizontal" v-else>
          <el-button class="order-dispose-btn fontcolor-opocity-38">删除订单</el-button>
        </div>
      </div>
    </div>
    <div class="more_btn">点击加载更多<i class="icons" style="color: rgb(51, 51, 51); font-size: 12px;"></i></div>
  </div>
  </transition>
</template>

<script>
    export default {
      props: ['childOrderData'],
      data () {
        return {
        }
      }
    }
</script>

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
}
</style>
