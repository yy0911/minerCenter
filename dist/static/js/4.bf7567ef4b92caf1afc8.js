webpackJsonp([4,5,6],{50:function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(34),o=a(i),r=n(33),c=a(r),s=n(28),l=a(s),d=n(5),p=a(d);e.default={props:["isSuccess","searchDeviceData"],data:function(){return{countsNumber:1,deviceDetailData:[],limit:"1",loadMoreLimit:"",currentPage:1}},computed:{},watch:{isSuccess:function(t){t===!0&&this.GetDeviceList()},searchDeviceData:function(t){return""===t?void this.GetDeviceList():(this.deviceDetailData=this.$options.methods.responseArray(t),this.deviceDetailData)}},created:function(){this.GetDeviceList()},mounted:function(){},methods:{responseArray:function(t){return t.map(function(t){var e=!0,n=!1,a=void 0;try{for(var i,r=(0,l.default)((0,c.default)(t));!(e=(i=r.next()).done);e=!0){var s=(0,o.default)(i.value,2),d=s[0],p=s[1];""===p&&(t[d]="--")}}catch(t){n=!0,a=t}finally{try{!e&&r.return&&r.return()}finally{if(n)throw a}}0===t.status?t.status="未连接":1===t.status?t.status="工作中":2===t.status?t.status="待机中":3===t.status&&(t.status="失败")}),t},fmtLength:function(t,e){var n=t[e.property];return void 0===n?"0":n.length},GetDeviceList:function(){var t=this;p.default.get("/promo/authed/account/box/lists/"+t.limit+"/10").then(function(e){return t.deviceDetailData=t.$options.methods.responseArray(e.data.list),0===Number(e.data.count)?t.countsNumber=1:t.countsNumber=Number(e.data.count),t.deviceDetailData}).catch(function(t){console.log(t)})},sureUnbindDevice:function(t){var e=this,n=t.row.boxSN;p.default.post("/promo/authed/account/box/disconnect",{boxSN:n}).then(function(n){n.data.isSuccess&&(e.$emit("listenUnbindBox",!0),e.GetDeviceList(),t.row.visible=!1)}).catch(function(t){console.log(t)})},isMiningEvent:function(t,e){var n=this;p.default.get("/promo/authed/account/box/stop/mining/"+t+"/"+!e).then(function(t){t.data.isSuccess?n.GetDeviceList():n.$message({message:t.data.reason,type:"error"})}).catch(function(t){console.log(t),console.log(t.response),500===t.response.status&&n.$message({message:"服务器内部错误",type:"error"})})},handleCurrentChange:function(t){console.log(t),document.documentElement.scrollTop=200,console.log(window.scrollTop);var e=this;p.default.get("/promo/authed/account/box/lists/"+t+"/10").then(function(t){var n=e.$options.methods.responseArray(t.data.list);e.deviceDetailData=n}).catch(function(t){console.log(t)})}}}},52:function(t,e,n){t.exports={default:n(53),__esModule:!0}},53:function(t,e,n){var a=n(7),i=a.JSON||(a.JSON={stringify:JSON.stringify});t.exports=function(t){return i.stringify.apply(i,arguments)}},68:function(t,e,n){e=t.exports=n(1)(),e.push([t.id,".table1-container .el-loading-mask{background-color:transparent!important}.table1-container .el-loading-spinner{top:0!important;bottom:20px!important}.table1-container .el-pagination{text-align:right;margin-top:20px}.el-pager li{min-width:30px}.el-pager li.active{background:#108ee9;border-radius:4px;color:#fff}","",{version:3,sources:["/./src/pages/table/table1.vue"],names:[],mappings:"AACA,mCACE,sCAA0C,CAC3C,AACD,sCACE,gBAAgB,AAChB,qBAAuB,CACxB,AACD,iCACE,iBAAkB,AAClB,eAAiB,CAClB,AACD,aACE,cAAgB,CACjB,AACD,oBACE,mBAAoB,AACpB,kBAAmB,AACnB,UAAe,CAChB",file:"table1.vue",sourcesContent:["\n.table1-container .el-loading-mask {\n  background-color:rgba(0,0,0,0) !important;\n}\n.table1-container .el-loading-spinner {\n  top:0!important;\n  bottom: 20px!important;\n}\n.table1-container .el-pagination  {\n  text-align: right;\n  margin-top: 20px;\n}\n.el-pager li {\n  min-width: 30px;\n}\n.el-pager li.active {\n  background: #108EE9;\n  border-radius: 4px;\n  color: #ffffff;\n}\n"],sourceRoot:"webpack://"}])},69:function(t,e,n){e=t.exports=n(1)(),e.push([t.id,'.unbindDevice-btn[data-v-1821eb7a]{padding-left:8px}.pause-btn[data-v-1821eb7a]{position:relative;padding-right:8px}.pause-btn[data-v-1821eb7a]:after{content:" ";border-right:1px solid rgba(0,0,0,.15);position:absolute;left:106%;height:8px;top:36%}.status-circle[data-v-1821eb7a]{display:inline-block;width:8px;height:8px;border-radius:50%}.color-red[data-v-1821eb7a]{background-color:#f5222d}.color-orange[data-v-1821eb7a]{background-color:#ffc64b}.color-grey[data-v-1821eb7a]{background-color:rgba(0,0,0,.22)}.color-green[data-v-1821eb7a]{background-color:#52c41a}.table1-container .el-popover[data-v-1821eb7a]{padding:16px}.unbindDevice-poppver-content[data-v-1821eb7a]{float:right;padding-top:10px}.unbindDevice-poppver-content .el-button[data-v-1821eb7a]{padding:4px 7px}.more_btn[data-v-1821eb7a]{cursor:pointer;padding-top:5rem}',"",{version:3,sources:["/./src/pages/table/table1.vue"],names:[],mappings:"AACA,mCACE,gBAAkB,CACnB,AACD,4BACE,kBAAkB,AAClB,iBAAmB,CACpB,AACD,kCACE,YAAa,AACb,uCAA0C,AAC1C,kBAAmB,AACnB,UAAW,AACX,WAAY,AACZ,OAAS,CACV,AACD,gCACE,qBAAsB,AACtB,UAAU,AACV,WAAY,AACZ,iBAAmB,CACpB,AACD,4BACE,wBAAyB,CAC1B,AACD,+BACE,wBAAyB,CAC1B,AACD,6BACE,gCAAkC,CACnC,AACD,8BACE,wBAAyB,CAC1B,AACD,+CACE,YAAa,CACd,AACD,+CACE,YAAa,AACb,gBAAiB,CAClB,AACD,0DACE,eAAgB,CACjB,AACD,2BACE,eAAgB,AAChB,gBAAkB,CACnB",file:"table1.vue",sourcesContent:["\n.unbindDevice-btn[data-v-1821eb7a] {\n  padding-left: 8px;\n}\n.pause-btn[data-v-1821eb7a] {\n  position:relative;\n  padding-right: 8px;\n}\n.pause-btn[data-v-1821eb7a]:after {\n  content: ' ';\n  border-right: 1px solid rgba(0,0,0,0.15) ;\n  position: absolute;\n  left: 106%;\n  height: 8px;\n  top: 36%;\n}\n.status-circle[data-v-1821eb7a] {\n  display: inline-block;\n  width:8px;\n  height: 8px;\n  border-radius: 50%;\n}\n.color-red[data-v-1821eb7a] {\n  background-color:#F5222D;\n}\n.color-orange[data-v-1821eb7a] {\n  background-color:#FFC64B;\n}\n.color-grey[data-v-1821eb7a] {\n  background-color:rgba(0,0,0,0.22);\n}\n.color-green[data-v-1821eb7a] {\n  background-color:#52C41A;\n}\n.table1-container .el-popover[data-v-1821eb7a] {\n  padding:16px;\n}\n.unbindDevice-poppver-content[data-v-1821eb7a] {\n  float: right;\n  padding-top:10px;\n}\n.unbindDevice-poppver-content .el-button[data-v-1821eb7a] {\n  padding:4px 7px;\n}\n.more_btn[data-v-1821eb7a] {\n  cursor: pointer;\n  padding-top: 5rem;\n}\n"],sourceRoot:"webpack://"}])},78:function(t,e,n){var a=n(68);"string"==typeof a&&(a=[[t.id,a,""]]);n(3)(a,{});a.locals&&(t.exports=a.locals)},79:function(t,e,n){var a=n(69);"string"==typeof a&&(a=[[t.id,a,""]]);n(3)(a,{});a.locals&&(t.exports=a.locals)},81:function(t,e,n){n(78),n(79);var a=n(2)(n(50),n(86),"data-v-1821eb7a",null);t.exports=a.exports},86:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"table1-container"},[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.deviceDetailData,"empty-text":"暂无数据"}},[n("el-table-column",{attrs:{label:"S/N码",prop:"boxSN"}}),t._v(" "),n("el-table-column",{attrs:{label:"状态",prop:"status"},scopedSlots:t._u([{key:"default",fn:function(e){return["未连接"==e.row.status?n("span",{staticClass:"status-circle color-grey"}):"工作中"==e.row.status?n("span",{staticClass:"status-circle color-green"}):"待机中"==e.row.status?n("span",{staticClass:"status-circle color-orange"}):n("span",{staticClass:"status-circle color-red"}),t._v("\n      "+t._s(e.row.status)+"\n    ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"上行带宽 (Mbps)",prop:"uplinkBandwidth"}}),t._v(" "),n("el-table-column",{attrs:{label:"存储 (TB)",prop:"storageSize"}}),t._v(" "),n("el-table-column",{attrs:{label:"今日出币 (个)",prop:"allTodayCoins"}}),t._v(" "),n("el-table-column",{attrs:{label:"操作",prop:"name"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{staticClass:"pause-btn fontSize-14",attrs:{type:"text",size:"small"},domProps:{innerHTML:t._s(e.row.isMining===!0?"停止":"开始")},on:{click:function(n){t.isMiningEvent(e.row.boxSN,e.row.isMining)}}}),t._v(" "),n("el-popover",{ref:"unbindDevice",attrs:{placement:"top",trigger:"click",width:"173"},model:{value:e.row.visible,callback:function(n){t.$set(e.row,"visible",n)},expression:"scope.row.visible"}},[n("span",[n("i",{staticClass:"el-icon-error",staticStyle:{color:"red"}}),t._v("\n          你确定要解绑该设备？\n          ")]),t._v(" "),n("div",{staticClass:"unbindDevice-poppver-content"},[n("el-button",{on:{click:function(t){e.row.visible=!1}}},[t._v("\n            取 消\n            ")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:function(n){t.sureUnbindDevice(e)}}},[t._v("\n            确 定\n            ")])],1)]),t._v(" "),n("el-button",{directives:[{name:"popover",rawName:"v-popover:unbindDevice",arg:"unbindDevice"}],staticClass:"unbindDevice-btn fontSize-14",attrs:{type:"text",size:"small"}},[t._v("\n        解绑\n        ")])]}}])})],1),t._v(" "),n("div",{staticClass:"pagination-wrapper"},[n("el-pagination",{attrs:{"current-page":t.currentPage,layout:"prev, pager, next, jumper",total:t.countsNumber},on:{"current-change":t.handleCurrentChange}})],1)],1)},staticRenderFns:[]}},193:function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(52),o=a(i),r=n(5),c=a(r),s=n(81),l=a(s);e.default={data:function(){return{SNSearchNumber:"",SNAddNumber:"",isSuccess:!0,searchDeviceData:"",bindNewOneDevice:{},miningStatisticsData:""}},components:{jewelTable:l.default},mounted:function(){this.GetMiningStatistics()},methods:{GetMiningStatistics:function(){var t=this;c.default.get("/promo/authed/account/allbox/statistics").then(function(e){t.miningStatisticsData=e.data}).catch(function(t){console.log(t)})},SearchSNDevice:function(){var t=this;return""===this.SNSearchNumber?void(this.searchDeviceData=""):void c.default.get("/promo/authed/account/box/search/"+t.SNSearchNumber).then(function(e){return"{}"===(0,o.default)(e.data)?(t.searchDeviceData=[],!1):void(t.searchDeviceData=Array.isArray(e.data)?e.data:[e.data])}).catch(function(t){console.log(t)})},BindSNDevice:function(){var t=this;return""===this.SNAddNumber?void(this.isSuccess=!0):(this.isSuccess=!1,void c.default.post("/promo/authed/account/box/connect",{boxSN:t.SNAddNumber}).then(function(e){return t.isSuccess=e.data.isSuccess,t.isSuccess===!0?(t.$message({message:"设备添加成功",type:"success",customClass:"messageLocation"}),void t.GetMiningStatistics()):(t.$message({message:e.data.reason,type:"error",customClass:"messageLocation"}),void console.log(t.isSuccess))}).catch(function(t){console.log(t)}))},iconSearchClick:function(){this.$options.methods.SearchSNDevice.bind(this)()},listenUnbindBox:function(t){console.log(t),t&&this.GetMiningStatistics()}}}},261:function(t,e,n){e=t.exports=n(1)(),e.push([t.id,".record-titles[data-v-10ccc130]{padding-top:24px;padding-bottom:16px}.me-box-title[data-v-10ccc130]{padding-top:32px;padding-bottom:24px}.el-input[data-v-10ccc130],.el-input__inner[data-v-10ccc130]{width:243px}.jewel-right-container[data-v-10ccc130]{float:right}.deveice-adrress[data-v-10ccc130]{width:200px;padding:0 6px;margin:0;margin-right:10px;border-radius:4px}.jewel-table-container[data-v-10ccc130]{margin-top:16px}.online-device[data-v-10ccc130]{position:relative}.deveice-after-line[data-v-10ccc130]{display:inline-block;height:20px;border-right:2px solid rgba(0,0,0,.15)}.console-mac-address-input[data-v-10ccc130]{margin-right:10px;width:160px}","",{version:3,sources:["/./src/pages/deviceMoint/deviceMoint.vue"],names:[],mappings:"AACA,gCACE,iBAAiB,AACjB,mBAAqB,CACtB,AACD,+BACE,iBAAiB,AACjB,mBAAqB,CACtB,AACD,6DACE,WAAY,CACb,AACD,wCACE,WAAY,CACb,AACD,kCACE,YAAY,AACZ,cAAc,AACd,SAAS,AACT,kBAAmB,AACnB,iBAAmB,CACpB,AACD,wCACE,eAAgB,CACjB,AACD,gCACE,iBAAmB,CAEpB,AASD,qCACE,qBAAsB,AACtB,YAAa,AACb,sCAA0C,CAC3C,AACD,4CACE,kBAAmB,AACnB,WAAY,CACb",file:"deviceMoint.vue",sourcesContent:["\n.record-titles[data-v-10ccc130] {\n  padding-top:24px;\n  padding-bottom: 16px;\n}\n.me-box-title[data-v-10ccc130] {\n  padding-top:32px;\n  padding-bottom: 24px;\n}\n.el-input[data-v-10ccc130], .el-input__inner[data-v-10ccc130] {\n  width:243px;\n}\n.jewel-right-container[data-v-10ccc130] {\n  float:right;\n}\n.deveice-adrress[data-v-10ccc130] {\n  width:200px;\n  padding:0 6px;\n  margin:0;\n  margin-right: 10px;\n  border-radius: 4px;\n}\n.jewel-table-container[data-v-10ccc130] {\n  margin-top:16px;\n}\n.online-device[data-v-10ccc130] {\n  position: relative;\n  /*padding-right: 10px;*/\n}\n/*.online-device::after {*/\n  /*content: ' ';*/\n  /*border-right: 2px solid rgba(0,0,0,0.15) ;*/\n  /*position: absolute;*/\n  /*right: 0px;*/\n  /*height: 20px;*/\n  /*top: 30%;*/\n/*}*/\n.deveice-after-line[data-v-10ccc130] {\n  display: inline-block;\n  height: 20px;\n  border-right: 2px solid rgba(0,0,0,0.15) ;\n}\n.console-mac-address-input[data-v-10ccc130] {\n  margin-right: 10px;\n  width:160px;\n}\n"],sourceRoot:"webpack://"}])},299:function(t,e,n){var a=n(261);"string"==typeof a&&(a=[[t.id,a,""]]);n(3)(a,{});a.locals&&(t.exports=a.locals)},343:function(t,e,n){n(299);var a=n(2)(n(193),n(355),"data-v-10ccc130",null);t.exports=a.exports},355:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{"text-align":"center","margin-top":"200px",color:"rgba(0,0,0,0.25)"}},[t._v("\n  暂未开放\n")])},staticRenderFns:[]}}});
//# sourceMappingURL=4.bf7567ef4b92caf1afc8.js.map