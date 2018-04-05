<template lang="html">
  <el-menu  id="nav-menu" theme="orange"  :default-openeds="['1']">
    <el-submenu index="1" >
      <template slot="title">
        <div @click="handleSelect">
          <img src="../../assets/css/icon/ic_device.svg">
          <span>
            星際寶盒
          </span>
        </div>
      </template>
      <el-menu-item index="1_1">
        <router-link to="/deviceMoint" class="nav-link">
          設備監控
        </router-link>
      </el-menu-item>

      <!--<el-menu-item index="1_2">-->
        <!--<router-link to="/extractBmanage" class="nav-link">-->
          <!--提幣管理-->
        <!--</router-link>-->
      <!--</el-menu-item>-->

      <el-menu-item index="1_2">
<<<<<<< HEAD
        <router-link to="/userAssetCount" class="nav-link">
          我的資産
=======
        <!--<router-link to="/extractBmanage" class="nav-link">-->
          <!--提币管理-->
        <!--</router-link>-->
        <router-link to="/userAssetCount" class="nav-link">
          我的资产
>>>>>>> 7aa1edb3a421b1fcc925a3cdb29ec1edc04a9562
        </router-link>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <img src="../../assets/css/icon/ic_order.svg">
        訂單管理
      </template>
      <el-menu-item index="2_1">
        <router-link to="/myOrder" class="nav-link">
          我的訂單
        </router-link>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <img src="../../assets/css/icon/ic_archive.svg">
        個人信息
      </template>
      <el-menu-item index="3_1">
        <router-link to="/accountSetting" class="nav-link">
          賬戶設置
        </router-link>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      handleSelect () {
        // this.$message({
        //   message: '该功能暂未开放',
        //   type: 'warning'
        // })
      }
    }
  }
</script>
