<template>
  <div>
    <el-menu :default-active="activeIndex" class="nav-orderlist-container" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">全部订单</el-menu-item>
      <el-menu-item index="2">待付款</el-menu-item>
      <el-menu-item index="3">已完成</el-menu-item>
    </el-menu>

      <div class="all-order-container" v-if="menuIndex == 1">
          <order-manage v-for="item in items" :childOrderData="item"  ></order-manage>
      </div>

      <div class="wait-order-container" v-else-if="menuIndex == 2" >
        <order-manage  v-for="item in waitPayOrdersComputed" :childOrderData="item"></order-manage>
      </div>
      <div class="end-pay-order-container" v-else>
        <order-manage  v-for="item in endPayOrderComputed" :childOrderData="item"></order-manage>
      </div>

  </div>


</template>

<script>
  import orderManage from '../orderManage/orderManage.vue'
  export default {
    data () {
      return {
        activeIndex: '1',
        menuIndex: 1,
        //状态1是已付款 状态2 是未付款
        items: [{
          date: '2018-1-23',
          consignee: 'henry',
          orderNumber: 201783732232,
          numTotal: 5,
          phoneNumber: 13834738983,
          priceTotal: 988,
          status: 1,
          statusTitle: '已完成',
          address: '北京市昌平区国风美唐小区'
        }, {
          date: '2018-1-23',
          consignee: 'henry',
          orderNumber: 201783732232,
          numTotal: 5,
          phoneNumber: 13834738983,
          priceTotal: 988,
          status: 2,
          statusTitle: '带付款',
          address: '北京市昌平区国风美唐小区全宇宙疯狂王者浪迹天涯者仰天长啸都是淡淡的'
        }, {
          date: '2018-1-23',
          consignee: 'henry',
          orderNumber: 201783732232,
          numTotal: 8,
          phoneNumber: 13834738983,
          priceTotal: 988,
          status: 3,
          statusTitle: '代付款',
          address: '北京市昌平区国风美唐小区'
        }]
      }
    },
    computed: {
      waitPayOrdersComputed () {
        return this.items.filter(item => {
          return item.status !== 1
        })
      },
      endPayOrderComputed () {
        return this.items.filter(function (item) {
          return item.status === 1
        })
      }
    },
    components: {
      orderManage
    },
    methods: {
      handleSelect (key, keyPath) {
        this.menuIndex = key
      }
    }
  }
</script>
<style scoped>
.nav-orderlist-container {
  padding-bottom: 0;
  margin-bottom: 10px;
}
</style>
