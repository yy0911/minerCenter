  <template>
    <div class="table1-container">
       <el-table
    :data="deviceDetailData" empty-text="No data"
    style="width:100%">
    <el-table-column
      label="S/N码"
      prop="boxSN">
    </el-table-column>
    <el-table-column
      label="状态"
      prop="status">
      <template slot-scope="scope">
        <span class="status-circle color-grey" v-if="scope.row.status == 'Ununited'"></span>
        <span class="status-circle color-green" v-else-if="scope.row.status == 'Active'"></span>
        <span class="status-circle color-orange" v-else-if="scope.row.status == 'Idle'"></span>
        <span class="status-circle color-red" v-else></span>
        {{ scope.row.status }}
      </template>
    </el-table-column>
    <el-table-column
      label="上行带宽 (Mbps)"
      prop="uplinkBandwidth">
    </el-table-column>
    <el-table-column
      label="存储 (TB)"
      prop="storageSize">
    </el-table-column>
    <el-table-column
      label="今日出币 (个)"
      prop="allTodayCoins">
    </el-table-column>
    <el-table-column
      label="操作"
      prop="name">
      <template slot-scope="scope">
        <el-button type="text" size="small" class="pause-btn fontSize-14"  v-html="scope.row.isMining === true ? 'stop' : 'begin' " @click="isMiningEvent(scope.row.boxSN, scope.row.isMining)"></el-button>
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
            <!--Are you sure unbinding this device?-->
          </span>
          <div class="unbindDevice-poppver-content">
            <el-button @click="scope.row.visible=false">
              取 消
              <!--Cancel-->
            </el-button>
            <el-button type="primary" @click="sureUnbindDevice(scope)">
              确 定
              <!--Sure-->
            </el-button>
          </div>
        </el-popover>
        <el-button type="text" size="small" class="unbindDevice-btn fontSize-14" v-popover:unbindDevice >
          解绑
          <!--Unbind-->
        </el-button>
      </template>
    </el-table-column>
  </el-table>
      <div class="more_btn fontcolor-opocity-54 text-center" @click="loadMoreDevices">
      <!--点击加载更多-->
      Click load more<br/>
        <i class="el-icon-arrow-down"></i>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
  export default {
    props: ['isSuccess', 'searchDeviceData'],
    data () {
      return {
        deviceDetailData: [],
        limit: '1'
      }
    },
    computed: {
    },
    watch: {
      isSuccess (newdata) {
        if (newdata === true) {
          this.GetDeviceList()
        }
        return
      },
      searchDeviceData (newdata) {
        if (newdata === '') {
          this.GetDeviceList()
          return
        }
        this.deviceDetailData = this.$options.methods.responseArray(newdata)
        return this.deviceDetailData
      }
    },
    created () {
      this.GetDeviceList()
    },
    mounted () {
    },
    methods: {
      // 公共方法，根据响应状态码返回不同的中文
      responseArray (array) {
        array.map(item => {
          for (let [k, v] of Object.entries(item)) {
            if (v === '') {
               item[k] = '--'
            }
          }
          if (item.status === 0) {
            item.status = 'Ununited'
          } else if (item.status === 1) {
            item.status = 'Active'
          } else if (item.status === 2) {
            item.status = 'Idle'
          } else if (item.status === 3) {
            item.status = 'Error'
          }
        })
        return array
      },
      fmtLength (row, column) {
        const arr = row[column.property]
        /* 这里的 if(arr === undefined)
         * 是根据自己的需求，决定arr长度为0时的判断条件
         * 可以和这个不同
         */
        if (arr === undefined) {
          return '0'
        } else {
          return arr.length
        }
      },
      GetDeviceList () {
        //获取设备列表接口请求======
        let vm = this
        axios.get('/promo/authed/account/box/lists/1/' + vm.limit)
          .then(function (response) {
            vm.deviceDetailData = vm.$options.methods.responseArray(response.data)
            return
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      //解绑设备接口请求
      sureUnbindDevice (scope) {
        let vm = this
        let boxUnbindDeviceSN = scope.row.boxSN
        axios.post('/promo/authed/account/box/disconnect',
          {boxSN: boxUnbindDeviceSN})
          .then(function (response) {
            console.log(response.data.isSuccess)
            if (response.data.isSuccess) {
              vm.GetDeviceList()
              scope.row.visible = false
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      //停止或者开始挖矿接口请求
      isMiningEvent (boxSN, isMining) {
        console.log(isMining)
        let vm = this
        axios.get('/promo/authed/account/box/stop/mining/' + boxSN + '/' + !isMining)
          .then(function (response) {
            if (response.data.isSuccess) {
              vm.GetDeviceList()
            }
            return
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      // 点击加载更多
      loadMoreDevices () {
        this.limit ++
        this.GetDeviceList()
        if (this.deviceDetailData.length <= 1) {
          this.$message({
            message: '没有更多设备了 ',
            type: 'warning'
          })
        }
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
      background-color:#F5222D;
    }
    .color-orange {
      background-color:#FFC64B;
    }
    .color-grey {
      background-color:rgba(0,0,0,0.22);
    }
    .color-green {
      background-color:#52C41A;
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
    .more_btn {
      cursor: pointer;
      padding-top: 5rem;
    }
  </style>
