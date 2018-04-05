  <template>
    <div class="table1-container">
       <el-table
<<<<<<< HEAD
    :data="deviceDetailData" empty-text="暫無數據"
=======
    :data="deviceDetailData" empty-text="暂无数据"
>>>>>>> 7aa1edb3a421b1fcc925a3cdb29ec1edc04a9562
    style="width:100%">
    <el-table-column
      label="S/N碼"
      prop="boxSN">
    </el-table-column>
    <el-table-column
      label="狀態"
      prop="status">
      <template slot-scope="scope">
<<<<<<< HEAD
        <span class="status-circle color-grey" v-if="scope.row.status == '未連接'"></span>
        <span class="status-circle color-green" v-else-if="scope.row.status == '工作中'"></span>
        <span class="status-circle color-orange" v-else-if="scope.row.status == '待機中'"></span>
=======
        <span class="status-circle color-grey" v-if="scope.row.status == '未连接'"></span>
        <span class="status-circle color-green" v-else-if="scope.row.status == '工作中'"></span>
        <span class="status-circle color-orange" v-else-if="scope.row.status == '待机中'"></span>
>>>>>>> 7aa1edb3a421b1fcc925a3cdb29ec1edc04a9562
        <span class="status-circle color-red" v-else></span>
        {{ scope.row.status }}
      </template>
    </el-table-column>
    <el-table-column
      label="上行帶寬 (Mbps)"
      prop="uplinkBandwidth">
    </el-table-column>
    <el-table-column
      label="存儲 (TB)"
      prop="storageSize">
    </el-table-column>
    <el-table-column
      label="今日出幣 (个)"
      prop="allTodayCoins">
    </el-table-column>
    <el-table-column
      label="操作"
      prop="name">
      <template slot-scope="scope">
        <el-button type="text" size="small" class="pause-btn fontSize-14"  v-html="scope.row.isMining === true ? '停止' : '開始' " @click="isMiningEvent(scope.row.boxSN, scope.row.isMining)"></el-button>
        <el-popover
          ref="unbindDevice"
          placement="top"
          trigger="click"
          width="173"
          v-model="scope.row.visible"
          >
          <span >
            <i class="el-icon-error" style="color: red"></i>
            你確定要解綁該設備？
            <!--Are you sure unbinding this device?-->
          </span>
          <div class="unbindDevice-poppver-content">
            <el-button @click="scope.row.visible=false">
              取 消
              <!--Cancel-->
            </el-button>
            <el-button type="primary" @click="sureUnbindDevice(scope)">
              確 定
              <!--Sure-->
            </el-button>
          </div>
        </el-popover>
        <el-button type="text" size="small" class="unbindDevice-btn fontSize-14" v-popover:unbindDevice>
          解綁
          <!--Unbind-->
        </el-button>
      </template>
    </el-table-column>
  </el-table>
<<<<<<< HEAD
      <!--<div class="more_btn fontcolor-opocity-54 text-center" @click="loadMoreDevices">-->
        <!--點擊加載更多-->
        <!--<br/>-->
        <!--<i class="el-icon-arrow-down"></i>-->
      <!--</div>-->
=======
      <!--<div class="more_btn fontcolor-opocity-54 text-center" @click="loadMoreDevices" v-show="deviceDetailData.length>0 ">-->
        <!--点击加载更多-->
        <!--<br/>-->
        <!--<i class="el-icon-arrow-down"></i>-->
      <!--</div>-->
      <!--==============/分页==============-->
>>>>>>> 7aa1edb3a421b1fcc925a3cdb29ec1edc04a9562
      <div class="pagination-wrapper">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="prev, pager, next, jumper"
          :total="countsNumber"
<<<<<<< HEAD
        >
=======
          >
>>>>>>> 7aa1edb3a421b1fcc925a3cdb29ec1edc04a9562
        </el-pagination>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
  export default {
    props: ['isSuccess', 'searchDeviceData'],
    data () {
      return {
        countsNumber: 1,
        deviceDetailData: [],
        limit: '1',
        loadMoreLimit: '',
<<<<<<< HEAD
        countsNumber: 1,
=======
>>>>>>> 7aa1edb3a421b1fcc925a3cdb29ec1edc04a9562
        currentPage: 1
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
            item.status = '未連接'
          } else if (item.status === 1) {
            item.status = '工作中'
          } else if (item.status === 2) {
            item.status = '待機中'
          } else if (item.status === 3) {
            item.status = '失敗'
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
        axios.get('/promo/authed/account/box/lists/' + vm.limit + '/10')
          .then(function (response) {
            vm.deviceDetailData = vm.$options.methods.responseArray(response.data.list)
            if (Number(response.data.count) === 0) {
              vm.countsNumber = 1
            } else {
              vm.countsNumber = Number(response.data.count)
            }
            return vm.deviceDetailData
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
            if (response.data.isSuccess) {
              vm.$emit('listenUnbindBox', true)
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
        let vm = this
        axios.get('/promo/authed/account/box/stop/mining/' + boxSN + '/' + !isMining)
          .then(function (response) {
            if (response.data.isSuccess) {
              vm.GetDeviceList()
            } else {
              vm.$message({
                message: response.data.reason,
                type: 'error'
              })
            }
            return
          })
          .catch(function (error) {
            console.log(error)
            console.log(error.response)
            if (error.response.status === 500) {
                vm.$message({
                  message: '服務器內部錯誤',
                  type: 'error'
                })
            }
          })
      },
      // 点击加载更多
      // loadMoreDevices () {
      //   this.limit ++
<<<<<<< HEAD
      //   if (this.loadMoreLimit > 4) {
      //     this.$message({
      //       message: '提示次數上限 ',
      //       type: 'warning'
      //     })
      //     return false
      //   }
=======
>>>>>>> 7aa1edb3a421b1fcc925a3cdb29ec1edc04a9562
      //   let vm = this
      //   axios.get('/promo/authed/account/box/lists/' + vm.limit + '/5')
      //     .then(function (response) {
      //       if (JSON.stringify(response.data) === '[]') {
      //         vm.loading = false
      //         vm.$message({
<<<<<<< HEAD
      //           message: '沒有更多設備了 ',
=======
      //           message: '没有更多设备了 ',
>>>>>>> 7aa1edb3a421b1fcc925a3cdb29ec1edc04a9562
      //           type: 'warning'
      //         })
      //         vm.loadMoreLimit = Number(vm.limit)
      //         return
      //       } else {
      //         let moreData = vm.$options.methods.responseArray(response.data)
      //         vm.deviceDetailData = vm.deviceDetailData.concat(moreData)
      //         return
      //       }
      //     })
      //     .catch(function (error) {
      //       console.log(error)
      //     })
<<<<<<< HEAD
      // }
=======
      // },
>>>>>>> 7aa1edb3a421b1fcc925a3cdb29ec1edc04a9562
      handleCurrentChange (val) {      // 分页加载
        console.log(val)
        document.documentElement.scrollTop = 200
        console.log(window.scrollTop)
        let vm = this
        axios.get('/promo/authed/account/box/lists/' + val + '/10')
          .then(function (response) {
<<<<<<< HEAD
            let moreData = vm.$options.methods.responseArray(response.data.list)
            vm.deviceDetailData = moreData
            return
=======
              let moreData = vm.$options.methods.responseArray(response.data.list)
              vm.deviceDetailData = moreData
              return
>>>>>>> 7aa1edb3a421b1fcc925a3cdb29ec1edc04a9562
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
</script>
  <style>
    .table1-container .el-loading-mask {
      background-color:rgba(0,0,0,0) !important;
    }
    .table1-container .el-loading-spinner {
      top:0!important;
      bottom: 20px!important;
    }
    .table1-container .el-pagination  {
      text-align: right;
      margin-top: 20px;
    }
    .el-pager li {
      min-width: 30px;
    }
    .el-pager li.active {
      background: #108EE9;
      border-radius: 4px;
      color: #ffffff;
    }
  </style>
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
