<template>
  <div id="myOrderWrapper">
    <el-menu :default-active="activeIndex" class="nav-orderlist-container" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">
        全部訂單
      </el-menu-item>
      <el-menu-item index="2">
        待付款
      </el-menu-item>
      <el-menu-item index="3">
        已付款
      </el-menu-item>
      <el-menu-item index="4">
        已發貨
      </el-menu-item>
      <el-menu-item index="5">
        已完成
      </el-menu-item>
      <el-menu-item index="6">
        交易關閉
      </el-menu-item>
    </el-menu>
    <!--v-infinite-scroll="loadMore"-->
    <!--infinite-scroll-disabled="busy"-->
    <!--infinite-scroll-distance="10"-->
    <!--v-loading="loading"-->
    <!--element-loading-text="拼命加载中"-->
    <!--element-loading-spinner="el-icon-loading"-->
    <!--element-loading-background="rgba(0, 0, 0, 0.8)"-->
    <div class="all-order-container"
         ref="myOrderWrapper">
      <order-manage v-for="item in sellRecordList" :childOrderData="item"  @listenCancelOrderUser="listenCancelOrderUser"></order-manage>
    </div>
    <div class="text-center fontSize-14 fontcolor-opocity-38" v-show="sellRecordList == '' || sellRecordList.length<=0 " style="margin-top: 100px"><p>
      暫無訂單
    </p></div>
    <div class="more_btn fontcolor-opocity-54 text-center" @click="loadMoreOrder" v-show="moreOrder && secondLoad">
      點擊加載更多
      <br/>
      <i class="el-icon-arrow-down"></i>
    </div>
    <div class="more_btn fontcolor-opocity-54 text-center" v-show="secondLoad === false" style="cursor: default">
      沒有更多訂單了
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import orderManage from '../orderManage/orderManage.vue'
  import infiniteScroll from 'vue-infinite-scroll'
  import {UTIL} from '../../util/util'
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
        // loading: false,
        // flag: false,
        receiveChildCancelOrder: false,
        activeIndex: '1',
        menuIndex: 1,
        curPage: 1,
        //状态all是全部 状态2未付款 状态三是已完成 状态四四取消付款  all;waitPay;ok;cancle
        sellRecordList: '',
        sellListStatus: 'all',//默认未全部订单
        limit: 1 ,//点击加载更多,
        moreOrder: false,
        secondLoad: true
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
      statusTitleComputed () {
        this.sellListStatus = 'all'
         if (this.menuIndex === 1) {
           return this.sellListStatus = 'all'
         } else if (this.menuIndex === 2) {
           return this.sellListStatus = 'waitPay'
         } else if (this.menuIndex === 3) {
           return this.sellListStatus = 'ok'
         } else if (this.menuIndex === 4) {
           return this.sellListStatus = 'sendout'
         } else if (this.menuIndex === 5) {
           return this.sellListStatus = 'finish'
         } else {
           return this.sellListStatus = 'cancleOrrefund'
         }
      }
    },
    mounted () {
      this.getSellRecordList()
    },
    methods: {
      handleSelect (key, keyPath) {
        // console.log(key)
        this.menuIndex = Number(key)
        // switch (Number(key)) {
        //   case 1:
        //     if (UTIL.GetCookie('all') === '') {
        //       this.curPage = 1
        //     } else {
        //       this.curPage = UTIL.GetCookie('all')
        //     }
        //     break
        //   case 2:
        //     if (UTIL.GetCookie('waitPay') === '') {
        //       this.curPage = 1
        //     } else {
        //       this.curPage = UTIL.GetCookie('waitPay')
        //     }
        //     break
        //   case 3:
        //     if (UTIL.GetCookie('ok') === '') {
        //       this.curPage = 1
        //     } else {
        //       this.curPage = UTIL.GetCookie('ok')
        //     }
        //     break
        //   default:
        //     if (UTIL.GetCookie('cancleOrrefund') === '') {
        //       this.curPage = 1
        //     } else {
        //       this.curPage = UTIL.GetCookie('cancleOrrefund')
        //     }
        //     break
        // }
      },
      getSellRecordList () {
        console.log(this.curPage)
        let vm = this
        axios.post('/promo/authed/account/get/selllist/bystatus',
          {
            status: vm.statusTitleComputed,
            curPage: 1
          })
          .then(function (response) {
            if (JSON.stringify(response.data.data) === '[]') {
              vm.moreOrder = false
              vm.secondLoad = true
            } else {
              vm.moreOrder = true
              vm.secondLoad = false
              vm.readySecondLoadList()
            }
            vm.sellRecordList = response.data.data
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      loadMoreOrder () {
        this.limit ++
        let vm = this
        axios.post('/promo/authed/account/get/selllist/bystatus',
          {
            status: vm.statusTitleComputed,
            curPage: vm.limit
          })
          .then(function (response) {
            vm.loading = false
            if (JSON.stringify(response.data.data) === '[]') {
              vm.loading = false
              vm.$message({
                message: '沒有更多訂單了',
                type: 'warning'
              })
              vm.secondLoad = false
              return false
            } else {
              vm.secondLoad = true
              UTIL.SetCookie(vm.statusTitleComputed, vm.limit, 600)
              vm.sellRecordList = vm.sellRecordList.concat(response.data.data)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      // 刚开始也请求第二页，判断是否还有数据，没有数据给用户提示
      readySecondLoadList () {
        let vm = this
        axios.post('/promo/authed/account/get/selllist/bystatus',
          {
            status: vm.statusTitleComputed,
            curPage: 2
          })
          .then(function (response) {
            vm.loading = false
            if (JSON.stringify(response.data.data) === '[]') {
              vm.secondLoad = false
            } else {
              vm.secondLoad = true
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      listenCancelOrderUser (msg) {
        this.receiveChildCancelOrder = msg
      }
    }
  }
</script>
<style>
#myOrderWrapper .el-loading-mask {
  background-color:rgba(0,0,0,0) !important;
}
#myOrderWrapper .el-loading-spinner {
  top:0!important;
  bottom: 20px!important;
}
</style>
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
