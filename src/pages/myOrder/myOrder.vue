<template>
  <div>
    <el-menu :default-active="activeIndex" class="nav-orderlist-container" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">全部订单</el-menu-item>
      <el-menu-item index="2">待付款</el-menu-item>
      <el-menu-item index="3">已完成</el-menu-item>
      <el-menu-item index="4">交易关闭</el-menu-item>
    </el-menu>

      <div class="all-order-container">
          <order-manage v-for="item in sellRecordList" :childOrderData="item"  ></order-manage>
      </div>
      <div class="text-center" v-show="sellRecordList == '' || sellRecordList.length<=0 " style="margin-top: 100px"><p>暂无订单</p></div>
      <!--<div class="wait-order-container" v-else-if="menuIndex == 2" >-->
        <!--<order-manage  v-for="item in waitPayOrdersComputed" :childOrderData="item"></order-manage>-->
      <!--</div>-->
      <!--<div class="end-pay-order-container" v-else>-->
        <!--<order-manage  v-for="item in endPayOrderComputed" :childOrderData="item"></order-manage>-->
      <!--</div>-->

  </div>


</template>

<script>
  import axios from 'axios'
  import orderManage from '../orderManage/orderManage.vue'
  export default {
    data () {
      return {
        activeIndex: '1',
        menuIndex: 1,
        curPage: 1,
        //状态all是全部 状态2未付款 状态三是已完成 状态四四取消付款  all;waitPay;ok;cancleOrrefund
        sellRecordList: '',
        sellListStatus: 'all'//默认未全部订单
      }
    },
    watch: {
      statusTitleComputed () {
        this.getSellRecordList()
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
      },
      statusTitleComputed () {
        this.sellListStatus = 'all'
         if (this.menuIndex === 1) {
            return this.sellListStatus = 'all'
         } else if (this.menuIndex === 2) {
           return this.sellListStatus = 'waitPay'
         } else if (this.menuIndex === 3) {
           return this.sellListStatus = 'ok'
         } else {
           return this.sellListStatus = 'cancleOrrefund'
         }
      }
    },
    mounted () {
      this.getSellRecordList()
    },
    components: {
      orderManage
    },
    methods: {
      handleSelect (key, keyPath) {
        this.menuIndex = Number(key)
      },
      getSellRecordList () {
        let vm = this
        axios.post('/promo/authed/account/get/selllist/bystatus',
          {
            status: vm.statusTitleComputed,
            curPage: vm.curPage
          }, {
            validateStatus: function (status) {
              if (status === 401 || status === 404) {
                window.location.href = '../pages/login.html'
              }
              return
            }
          })
          .then(function (response) {
            vm.sellRecordList = response.data.data
            console.log(response.data.data)
          })
          .catch(function (error) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          })
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
