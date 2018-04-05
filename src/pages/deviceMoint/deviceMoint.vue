<template>
  <!--<div class="deviceMoint-container" >-->
    <!--<div class="trade-record-container">-->
      <!--<p class="font-weight-500">-->
        <!--出幣統計-->
      <!--</p>-->
      <!--<ul class="record-titles flex fontSize-14 fontcolor-opocity-54 center text-center line-height-22">-->
        <!--<li class="flex-1">-->
          <!--在線設備/總設備數（台）-->
        <!--</li>-->
        <!--<li class="flex-1">-->
          <!--今日出幣（個）-->
        <!--</li>-->
        <!--<li class="flex-1">-->
          <!--昨日出幣（個）-->
        <!--</li>-->
        <!--<li class="flex-1">-->
          <!--累計出幣（個）-->
        <!--</li>-->
      <!--</ul>-->
      <!--<ul class="record-numbers flex fontSize-38 theme-fontColor text-center line-height-46">-->
        <!--<li class="flex-1 center">-->
          <!--<span class="online-device">{{ miningStatisticsData.onLineBox }}</span>-->
          <!--<span class="deveice-after-line"></span>-->
          <!--<span class="fontcolor-opocity-87">{{ miningStatisticsData.allBox }}</span>-->
        <!--</li>-->
        <!--<li class="flex-1">-->
          <!--<span>{{ miningStatisticsData.allTodayCoins }}</span>-->
        <!--</li>-->
        <!--<li class="flex-1">-->
          <!--<span>{{ miningStatisticsData.allYesterdayCoins }}</span>-->
        <!--</li>-->
        <!--<li class="flex-1">-->
          <!--<span>{{ miningStatisticsData.totalMiningCoin }}</span>-->
        <!--</li>-->
      <!--</ul>-->
    <!--</div>-->
    <!--<div class="my-jewel-box-container">-->
      <!--<p class="me-box-title font-weight-500">-->
        <!--我的寶盒-->
      <!--</p>-->
      <!--<div class="search-container">-->
        <!--<el-input class="fontcolor-opocity-54"-->
                  <!--placeholder="輸入S/N碼搜索設備"-->
                  <!--v-model="SNSearchNumber" @input="SearchSNDevice">-->
          <!--<i slot="suffix" class="el-input__icon el-icon-search" @click="iconSearchClick"></i>-->
        <!--</el-input>-->
        <!--<div class="jewel-right-container flex">-->
          <!--<el-input class="fontcolor-opocity-54 console-mac-address-input"-->
                    <!--placeholder="輸入S/N碼添加設備" v-model="SNAddNumber">-->
          <!--</el-input>-->
          <!--<el-button class="fontSize-14 fontcolor-opocity-54" :plain="true"  @click="BindSNDevice">-->
            <!--添加設備-->
          <!--</el-button>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->

    <!--<div class="jewel-table-container">-->
      <!--<jewel-table  :isSuccess='isSuccess' :searchDeviceData="searchDeviceData" ref="jewelTable" @listenUnbindBox="listenUnbindBox"></jewel-table>-->
    <!--</div>-->
  <!--</div>-->
  <div class="" style="text-align: center;margin-top: 200px;color: rgba(0,0,0,0.25);">
    暫未開放
  </div>
</template>

<script>
    import axios from 'axios'
    import jewelTable from '../table/table1.vue'
    export default {
      data () {
        return {
          SNSearchNumber: '',
          SNAddNumber: '',
          isSuccess: true,
          searchDeviceData: '',
          bindNewOneDevice: {},
          miningStatisticsData: ''
        }
      },
      components: {
        jewelTable
      },
      mounted () {
        this.GetMiningStatistics()
      },
      methods: {
        //获取挖矿统计接口请求
        GetMiningStatistics () {
          let vm = this
          axios.get('/promo/authed/account/allbox/statistics')
            .then(function (response) {
              vm.miningStatisticsData = response.data
            }).catch(function (error) {
              console.log(error)
            })
        },
        //查询设备sn接口请求
        SearchSNDevice () {
          let vm = this
          if (this.SNSearchNumber === '') {
            this.searchDeviceData = ''
            return
          }
          axios.get('/promo/authed/account/box/search/' + vm.SNSearchNumber)
            .then(function (response) {
              if (JSON.stringify(response.data) === '{}') {
                vm.searchDeviceData = []
                return false
              }
              vm.searchDeviceData = Array.isArray(response.data) ? response.data : [response.data]
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        BindSNDevice () {
          //绑定设备接口请求======
          let vm = this
          if (this.SNAddNumber === '') {
            this.isSuccess = true
            return
          }
          this.isSuccess = false
          axios.post('/promo/authed/account/box/connect',
                {boxSN: vm.SNAddNumber})
            .then(function (response) {
              vm.isSuccess = response.data.isSuccess
              if (vm.isSuccess === true) {
                vm.$message({
                  message: '設備添加成功',
                  type: 'success',
                  customClass: 'messageLocation'
                })
                vm.GetMiningStatistics()
                return
              }
              vm.$message({
                message: response.data.reason,
                type: 'error',
                customClass: 'messageLocation'
              })
              console.log(vm.isSuccess)
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        iconSearchClick () {
          this.$options.methods.SearchSNDevice.bind(this)()
        },
        listenUnbindBox (msg) {
          console.log(msg)
          if (msg) {
            this.GetMiningStatistics()
          }
        }
      }
    }
</script>
<style scoped>
.record-titles {
  padding-top:24px;
  padding-bottom: 16px;
}
.me-box-title {
  padding-top:32px;
  padding-bottom: 24px;
}
.el-input, .el-input__inner {
  width:243px;
}
.jewel-right-container {
  float:right;
}
.deveice-adrress {
  width:200px;
  padding:0 6px;
  margin:0;
  margin-right: 10px;
  border-radius: 4px;

}
.jewel-table-container {
  margin-top:16px;
}
.online-device {
  position: relative;
  padding-right: 10px;
}
/*.online-device:after {*/
  /*content: ' ';*/
  /*border-right: 2px solid rgba(0,0,0,0.15) ;*/
  /*position: absolute;*/
  /*right: 0;*/
  /*height: 20px;*/
  /*top: 30%;*/
/*}*/
.deveice-after-line {
  display: inline-block;
  height: 20px;
  border-right: 2px solid rgba(0,0,0,0.15) ;
}
.console-mac-address-input {
  margin-right: 10px;
  width:160px;
}
</style>
