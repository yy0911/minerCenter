<template lang="html">
  <el-menu default-active="1" id="nav-menu" theme="orange"  :default-openeds="['1']">
    <!--<div class="logo">-->
      <!--<router-link to="/">-->
        <!--<img src="../../assets/images/vector_space_illust.svg" />-->
        <!--<p>tmpbook</p>-->
      <!--</router-link>-->
    <!--</div>-->

    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-plus"></i>
        星际宝盒
      </template>

      <el-menu-item index="1-1">
        <router-link to="/deviceMoint" class="nav-link">
          设备监控
        </router-link>
      </el-menu-item>

      <el-menu-item index="1-2">
        <router-link to="/extractBmanage" class="nav-link">
          提币管理
        </router-link>
      </el-menu-item>

    </el-submenu>

    <el-menu-item index="2">
      <router-link to="/myOrder" class="nav-link">
        <i class="el-icon-document"></i>我的订单
      </router-link>
    </el-menu-item>

    <el-menu-item index="3">
      <router-link to="/accountSet" class="nav-link">
        <i class="el-icon-document"></i>账户设置
      </router-link>
    </el-menu-item>
  </el-menu>
</template>
<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>
