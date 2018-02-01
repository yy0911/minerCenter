<template>
<div class="deviceMoint-container">
  <div class="trade-record-container">
    <p class="font-weight-500">挖矿统计</p>
    <ul class="record-titles flex fontSize-14 fontcolor-opocity-54 center text-center line-height-22">
      <li class="flex-1">在线设备/总设备数（台）</li>
      <li class="flex-1">今日出币（个）</li>
      <li class="flex-1">昨日出币（个）</li>
      <li class="flex-1">累计出币（个）</li>
    </ul>
    <ul class="record-numbers flex fontSize-38 theme-fontColor text-center line-height-46">
      <li class="flex-1 center">
        <span class="online-device">{{ miningStatisticsData.onLineBox }}</span>
        <span class="fontcolor-opocity-87">{{ miningStatisticsData.allBox }}</span>
      </li>
      <li class="flex-1">
        <span>{{ miningStatisticsData.allTodayCoins }}</span>
      </li>
      <li class="flex-1">
        <span>{{ miningStatisticsData.allYesterdayCoins }}</span>
      </li>
      <li class="flex-1">
        <span>{{ miningStatisticsData.totalMiningCoin }}</span>
      </li>
    </ul>
  </div>
  <div class="my-jewel-box-container">
    <p class="me-box-title font-weight-500">我的宝盒</p>
    <div class="search-container">
      <el-input class="fontcolor-opocity-54"
        placeholder="输入S/N码搜索设备" suffix-icon="el-icon-search" v-model="SNSearchNumber" @input="SearchSNDevice">
      </el-input>
      <div class="jewel-right-container flex">
        <el-input class="fontcolor-opocity-54 console-mac-address-input"
                  placeholder="输入S/N码添加设备" v-model="SNAddNumber">
        </el-input>
        <el-button class="fontSize-14 fontcolor-opocity-54" :plain="true"  @click="BindSNDevice">添加设备</el-button>
      </div>
    </div>
  </div>

  <div class="jewel-table-container">
    <jewel-table  :isSuccess='isSuccess' :searchDeviceData="searchDeviceData"></jewel-table>
  </div>
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
          axios.get('promo/authed/account/allbox/statistics',{
            validateStatus: function (status) {
              if (status === 401 || status === 404) {
                window.location.href = '../pages/login.html'
              }
              return
            }
          })
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
          axios.get('/promo/authed/account/box/search/' + vm.SNSearchNumber, {
            validateStatus: function (status) {
              if (status === 401 || status === 404) {
                window.location.href = '../pages/login.html'
              }
              return
            }
          })
            .then(function (response) {
              if (JSON.stringify(response.data) === '{}') {
                vm.searchDeviceData = []
                return
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
                {boxSN: vm.SNAddNumber}, {
                  validateStatus: function (status) {
                    if (status === 401 || status === 404) {
                      window.location.href = '../pages/login.html'
                    }
                    return
                  }
                })
            .then(function (response) {
              vm.isSuccess = response.data.isSuccess
              if (vm.isSuccess === true) {
                console.log('dsafasfafdsa------')
                vm.$message({
                  message: '设备添加成功',
                  type: 'success',
                  customClass: 'messageLocation'
                })
                return
              }
              vm.$message({
                message: '设备添加失败',
                type: 'error',
                customClass: 'messageLocation'
              })
              console.log(vm.isSuccess)
            })
            .catch(function (error) {
              console.log(error)
            })
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
.online-device:after {
  content: ' ';
  border-right: 2px solid rgba(0,0,0,0.15) ;
  position: absolute;
  left: 100%;
  height: 20px;
  top: 30%;
}
.console-mac-address-input {
  margin-right: 10px;
  width:160px;
}
</style>
