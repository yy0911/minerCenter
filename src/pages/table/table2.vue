<template>
  <div>
    <el-table
      :data="applyCANRecordList"
      style="width:100%">
      <el-table-column
        label="日期"
        >
        <template slot-scope="scope">
          <p class="">{{ scope.row.createdAt | subDate }}</p>
        </template>
      </el-table-column>
      <el-table-column
      label="收币地址"
      prop="canReceiveAddress">
      </el-table-column>
      <el-table-column
        label="提币数 (个)"
        prop="amount">
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <p class="theme-fontColor">{{ scope.row.status | applyCanStatus }}</p>
        </template>
      </el-table-column>
    </el-table></div>
</template>

<script>
  import axios from 'axios'
  import { UTIL } from '../../util/util'
  export default {
    data () {
      return {
        applyCANRecordList: []
      }
    },
    mounted () {
      this.applyRecordDataRequest()
    },
    methods: {
      // 提币申请记录查询接口
      applyRecordDataRequest () {
        let vm = this
        axios.get('promo/authed/account/coins/extract/lists/1/5', {
          validateStatus: function (status) {
            if (status === 401 || status === 404) {
              window.location.href = '../pages/login.html'
            }
            return
          }
        })
          .then(function (response) {
            console.log(response.data)
            vm.applyCANRecordList = UTIL.fliterNullArr(response.data)
          }).catch(function (error) {
            console.log(error)
          })
      }
    }
  }
</script>
<style scoped>

</style>
