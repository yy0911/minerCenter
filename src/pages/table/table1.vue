  <template>
    <div>
  <el-table
    :data="tableData3"
    style="width:100%">
    <el-table-column
      label="MAC地址"
      prop="date">
    </el-table-column>
    <el-table-column
      label="状态"
      prop="name">
      <template slot-scope="scope">
        <span class="status-circle color-red" v-if="scope.row.name == 1"></span>
        <span class="status-circle color-blue" v-else-if="scope.row.name == 2"></span>
        <span class="status-circle color-grey" v-else-if="scope.row.name == 3"></span>
        <span class="status-circle color-black" v-else></span>
        {{ scope.row.name }}
      </template>
    </el-table-column>
    <el-table-column
      label="上行带宽 (Mbps)"
      prop="name">
    </el-table-column>
    <el-table-column
      label="存储 (TB)"
      prop="name">
    </el-table-column>
    <el-table-column
      label="今日出币 (个)"
      prop="name">
    </el-table-column>

    <el-table-column
      label="操作"
      prop="name">
      <template slot-scope="scope">
        <el-button type="text" size="small" class="pause-btn">停止</el-button>
        <el-button type="text" size="small">解绑</el-button>
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
    .pause-btn {
      position:relative;
    }
    .pause-btn:after {
      content: ' ';
      border-right: 1px solid rgba(0,0,0,0.15) ;
      position: absolute;
      left: 30px;
      height: 10px;
      top: 8px;
    }
    .status-circle {
      display: inline-block;
      width:8px;
      height: 8px;
      border-radius: 50%;
    }
    .color-red {
      background-color:red;
    }
    .color-blue {
      background-color:blue;
    }
    .color-grey {
      background-color:gray;
    }
    .color-black {
      background-color:black;
    }
  </style>
