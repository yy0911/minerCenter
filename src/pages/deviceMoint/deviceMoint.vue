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
        <span class="online-device">89</span>
        <span class="fontcolor-opocity-87">80</span>
      </li>
      <li class="flex-1">
        <span>8.88</span>
      </li>
      <li class="flex-1">
        <span>9.00</span>
      </li>
      <li class="flex-1">
        <span>43343.23</span>
      </li>
    </ul>
  </div>
  <div class="my-jewel-box-container">
    <p class="me-box-title font-weight-500">我的宝盒</p>
    <div class="search-container">
      <el-input class="fontcolor-opocity-54"
        placeholder="输入S/N码搜索设备" suffix-icon="el-icon-search">
      </el-input>
      <div class="jewel-right-container flex">
        <el-input class="fontcolor-opocity-54 console-mac-address-input"
                  placeholder="输入S/N码搜索设备">
        </el-input>
        <el-button class="fontSize-14 fontcolor-opocity-54" :plain="true"  @click="addDeviceSuccess">添加设备</el-button>
      </div>
    </div>
  </div>

  <div class="jewel-table-container">
    <jewel-table></jewel-table>
  </div>
</div>

</template>

<script>
    import axios from 'axios'
    import jewelTable from '../table/table1.vue'
    export default {
      data () {
        return {
          testMock: ''
        }
      },
      components: {
        jewelTable
      },
      mounted () {
        this.getMockData()
      },
      methods: {
        addDeviceSuccess () {
          this.$message({
            message: '设备添加成功',
            type: 'success',
            customClass: 'messageLocation'
            // duration: 0
          })
        },
        getMockData () {
          let _this = this
          axios.get('http://localhost:8081/mock/mockdata1.json')
            .then(function (response) {
              console.log(response)
              _this.testMock = response.data.posts
              console.log((Array.isArray(_this.testMock)))
            })
            .catch(function (error) {
              this.testMock = 'throw new Error' + error
            })
        }

      }
    }
</script>
<style>
.el-message {
  width:138px;
  height: 40px;
  min-width: 0;
  font-size: 14px;
  background: #FFFFFF;
  box-shadow: 0 4px 12px 0 rgba(0,0,0,0.15);
  border-radius: 4px;
  padding:14px;
  color: rgba(0,0,0,0.65);
  letter-spacing: 0;
  line-height: 22px;
  top:76px;
}
.el-message img {
  width:14px;
  height: 14px;
  border-radius: 50%;
  margin-right: 10px;
}
.el-message--success {
  border: 0;
}
.el-message--success .el-message__content {
  color: rgba(0,0,0,0.65);
}
</style>
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
