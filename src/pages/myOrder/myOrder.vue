<template>
  <div>
    <el-menu :default-active="activeIndex" class="nav-orderlist-container" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">全部订单</el-menu-item>
      <el-menu-item index="2">待付款</el-menu-item>
      <el-menu-item index="3">已完成</el-menu-item>
    </el-menu>
    <div class="all-order-container">
      <order-manage>

      </order-manage>
    </div>
  </div>

</template>

<script>
  import orderManage from '../orderManage/orderManage.vue'
  export default {
    data () {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      }
    },
    components: {
      orderManage
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
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
