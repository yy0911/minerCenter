<template>
<div class="deviceMoint-container">
  <div class="trade-record-container">
    <p>挖矿统计</p>
    <ul class="record-titles flex fontSize-14 most-use-fontColor center text-center line-height-22">
      <li class="flex-1">在线设备/总设备数（台）</li>
      <li class="flex-1">今日出币（个）</li>
      <li class="flex-1">昨日出币（个）</li>
      <li class="flex-1">累计出币（个）</li>
    </ul>
    <ul class="record-numbers flex fontSize-38 theme-fontColor text-center line-height-46">
      <li class="flex-1 center">
        <span class="online-device">89</span>
        <span class="most-use-fontColor">80</span>
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
    <p>我的宝盒</p>
    <div class="search-container">
      <el-input class="most-use-fontColor"
        placeholder="输入MAC地址搜索设备"
        suffix-icon="el-icon-date">
      </el-input>
      <div class="jewel-right-container flex line-height-32">
        <p class="deveice-adrress border-1px-themeColor">74:56:23:32</p>
        <el-button class="fontSize-14 most-use-fontColor">添加设备</el-button>
      </div>
    </div>
  </div>
  <div class="jewel-table-container">
    <jewel-table></jewel-table>
  </div>
</div>
</template>

<script>
    import jewelTable from '../table/table1.vue'

    export default {
      data () {
        return {
        }
      },
      components: {
        jewelTable
      }
    }
</script>

<style scoped>
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
  margin-top:10px;
}
.online-device {
  position: relative;
}
.online-device:after {
  content: ' ';
  border-right: 2px solid rgba(0,0,0,0.15) ;
  position: absolute;
  left: 47px;
  height: 20px;
  top: 14px;
}
</style>
