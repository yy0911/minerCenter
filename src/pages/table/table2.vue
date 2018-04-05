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
        label="收幣地址"
        prop="canReceiveAddress">
      </el-table-column>
      <el-table-column
<<<<<<< HEAD
        label="金額 (CAN)">
=======
        label="金额 (CAN)">
>>>>>>> 7aa1edb3a421b1fcc925a3cdb29ec1edc04a9562
        <template slot-scope="scope">
          <p class="inCanClass" v-if="scope.row.inOrOut === 'in'"><span>+</span>{{ scope.row.amount }}</p>
          <p class="outCanClass" v-else><span>-</span>{{ scope.row.amount }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="狀態">
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
        axios.get('/promo/authed/account/coins/extract/lists/1/5')
          .then(function (response) {
            vm.applyCANRecordList = UTIL.fliterNullArr(response.data)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
</script>
<style scoped>
<<<<<<< HEAD
  .inCanClass {
    color:#52C41A
  }
  .outCanClass {
    color:#F5222D
  }
  .inCanClass span {
    margin-right: 4px;
  }
  .outCanClass span {
    margin-right: 4px;
  }
=======
.inCanClass {
  color:#52C41A
}
.outCanClass {
  color:#F5222D
}
.inCanClass span {
  margin-right: 4px;
}
.outCanClass span {
  margin-right: 4px;
}
>>>>>>> 7aa1edb3a421b1fcc925a3cdb29ec1edc04a9562
</style>
