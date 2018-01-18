<template>
  <div class="order-item-container fontSize-14 fontcolor-opocity-38">
    <div class="flex flex-pack-justify order-header-container paddingLR-24">
      <div class="flex">
        <p class="order-item-time">2018-01-17 19:45</p>
        <p>订单号：
          <span class="fontcolor-opocity-54">11789964832104</span>
        </p>
      </div>
      <p>待付款</p>
    </div>
    <div class="order-main-container  flex">
      <div class="left-shop-introduce-container flex paddingTB-30">
        <div class="img-container"></div>
        <div class="shop-content-container fontSize-12">
          <p class="fontSize-14 goods-container">
            <span class="fontcolor-opocity-87">CAN星际宝盒</span>
            <span class="theme-fontColor">x1</span>
          </p>
          <div class="specific-info-container">
            <p>
              <span>收货人：</span>
              <span>张三</span>
            </p>
            <p>
              <span>联系电话：</span>
              <span>15810786567</span>
            </p>
            <p>
              <span>收货地址：</span>
              <span>北京市 海淀区 中关村南大街1号友谊宾馆苏园写字楼218</span>
            </p>
          </div>
        </div>
      </div>
      <div class="center-price-container paddingTB-30  text-center">
        <div class="transform-vertical-horizontal">
          <p class="fontcolor-opocity-87 total-price-desc">899</p>
          <p class="fontSize-12 freight-desc">含运费 <span>¥25.0</span></p>
        </div>
      </div>
      <div class="right-pay-container paddingTB-30 text-center">
        <div class="transform-vertical-horizontal">
          <p class="line-height-20 cancel-order">取消订单</p>
          <el-button class="goPay-btn theme-fontColor">去付款</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
    }
</script>

<style scoped>
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
  background-color: #CAD5D4;
  margin-right: 24px;
}
.specific-info-container {
  width:400px;
  height: 60px;
  line-height: 20px;
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
  width:calc(100% - (514px + 176px));
  overflow: hidden;
}

.goPay-btn {
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 4px;
}
.el-button {
  padding:8px 22px;
}
.cancel-order {
  padding-bottom: 10px;
}

</style>
