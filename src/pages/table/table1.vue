  <template>
    <div class="table1-container">

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
        <el-button type="text" size="small" class="pause-btn fontSize-14">停止</el-button>
        <el-popover
          ref="unbindDevice"
          placement="top"
          trigger="click"
          width="173"
          v-model="scope.row.visible"
          >
          <span >
            <i class="el-icon-error" style="color: red"></i>
            你确定要解绑该设备？
          </span>
          <div class="unbindDevice-poppver-content">
            <el-button @click="scope.row.visible=false">取 消</el-button>
            <el-button type="primary" @click="sureUnbindDevice(scope)">确 定</el-button>
          </div>
        </el-popover>
        <el-button type="text" size="small" class="unbindDevice-btn fontSize-14" v-popover:unbindDevice >解绑</el-button>
      </template>
    </el-table-column>

  </el-table>



</div>
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
          zip: 200333,
          visible: false
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
        }]
      }
    },
    methods: {
      sureUnbindDevice (scope) {
        scope.row.visible = false
      }
    }
  }
</script>
  <style scoped>
    .unbindDevice-btn {
      padding-left: 8px;
    }
    .pause-btn {
      position:relative;
      padding-right: 8px;
    }
    .pause-btn:after {
      content: ' ';
      border-right: 1px solid rgba(0,0,0,0.15) ;
      position: absolute;
      left: 106%;
      height: 8px;
      top: 36%;
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
    .table1-container .el-popover {
      padding:16px;
    }
    .unbindDevice-poppver-content {
      float: right;
      padding-top:10px;
    }
    .unbindDevice-poppver-content .el-button {
      padding:4px 7px;
    }

  </style>
