<template>
  <div id="myOrderWrapper" >
    <el-menu :default-active="activeIndex" class="nav-orderlist-container" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">
        全部订单
      </el-menu-item>
      <el-menu-item index="2">
        待付款
      </el-menu-item>
      <el-menu-item index="3">
        已付款
      </el-menu-item>
      <el-menu-item index="4">
        交易关闭
      </el-menu-item>
    </el-menu>
    <div class="all-order-container" ref="myOrderWrapper">
      <order-manage v-for="item in sellRecordList" :childOrderData="item"  @listenCancelOrderUser="listenCancelOrderUser"></order-manage>
    </div>
    <div class="text-center fontSize-14 fontcolor-opocity-38" v-show="sellRecordList == '' || sellRecordList.length<=0 " style="margin-top: 100px"><p>
      暂无订单
    </p></div>
    <div class="more_btn fontcolor-opocity-87" @click="loadMoreOrder" v-show="sellRecordList.length>0">
      点击加载更多
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import orderManage from '../orderManage/orderManage.vue'
  import infiniteScroll from 'vue-infinite-scroll'
  export default {
    components: {
      orderManage
    },
    directives: {
      infiniteScroll
    },
    data () {
      return {
        busy: false,
        loading: false,
        flag: false,
        receiveChildCancelOrder: false,
        activeIndex: '1',
        menuIndex: 1,
        curPage: 1,
        //状态all是全部 状态2未付款 状态三是已完成 状态四四取消付款  all;waitPay;ok;cancle
        sellRecordList: '',
        sellListStatus: 'all',//默认未全部订单
        limit: 1 //点击加载更多,
      }
    },
    watch: {
      statusTitleComputed () {
        this.getSellRecordList()
      },
      receiveChildCancelOrder () {
        if (this.receiveChildCancelOrder === true) {
          this.getSellRecordList()
        }
        return
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
      // this.getSellRecordList()
    },
    methods: {
      handleSelect (key, keyPath) {
        this.limit = 1
        this.menuIndex = Number(key)
        this.flag = false
      },
      getSellRecordList () {
        let vm = this
        axios.post('/promo/authed/account/get/selllist/bystatus',
          {
            status: vm.statusTitleComputed,
            curPage: vm.curPage
          })
          .then(function (response) {
            vm.sellRecordList = response.data.data
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      loadMoreOrder () {
        // this.limit ++
        let vm = this
        axios.post('/promo/authed/account/get/selllist/bystatus',
          {
            status: vm.statusTitleComputed,
            curPage: vm.limit
          })
          .then(function (response) {
            if (vm.flag) {
              if (JSON.stringify(response.data.data) === '[]') {
                vm.loading = false
                vm.$message({
                  message: '没有更多订单了',
                  type: 'warning'
                })
                return false
              } else {
                vm.sellRecordList = vm.sellRecordList.concat(response.data.data)
              }
            } else {
              vm.sellRecordList = response.data.data
              vm.busy = false
              vm.flag = true
            }
            setTimeout(function () {
              vm.loading = false
            }, 800)
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      listenCancelOrderUser (msg) {
        this.receiveChildCancelOrder = msg
      },
      loadMore () {
        // 多次加载数据
        this.busy = false
        setTimeout(() => {
          if (this.flag) {
            this.loading = true
            this.limit ++
          }
          this.loadMoreOrder()
        }, 1000)
      }
    }
  }
</script>
<style scoped>
.nav-orderlist-container {
  padding-bottom: 0;
  margin-bottom: 10px;
}
.more_btn {
  padding-top: 40px;
  text-align: center;
  cursor: pointer;
}
.overflowYClass {
  overflow-y: auto;
}
</style>
