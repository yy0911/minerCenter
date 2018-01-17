<template>
  <div>
    <el-table
      :data="tableData3"
      style="width:100%">
      <el-table-column
        label="日期"
        prop="date">
      </el-table-column>
      <el-table-column
      label="收币地址"
      prop="name">
      </el-table-column>
      <el-table-column
        label="提币数 (个)"
        prop="name">
      </el-table-column>
      <el-table-column
        label="状态"
        prop="name"
      >
        <template slot-scope="scope">
          <p class="theme-fontColor">{{ scope.row.city }}</p>
        </template>
      </el-table-column>
    </el-table></div>
</template>

<script>
  export default {
    data () {
      return {
        tableData3: [{
          date: '2016-05-03',
          name: 1,
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          detailAddress: '金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: 2,
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          detailAddress: '金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: 3,
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          detailAddress: '金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: 4,
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          detailAddress: '金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          detailAddress: '金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          detailAddress: '金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          detailAddress: '金沙江路 1518 弄',
          zip: 200333
        }]
      }
    }
  }
</script>
<style scoped>

</style>
