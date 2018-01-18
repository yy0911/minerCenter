<template lang="html">
  <el-menu default-active="1" id="nav-menu" theme="orange"  :default-openeds="['1']">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-news"></i>
        星际宝盒
      </template>

      <el-menu-item index="1-1">
        <router-link to="/" class="nav-link">
          设备监控
        </router-link>
      </el-menu-item>

      <el-menu-item index="1-2">
        <router-link to="/extractBmanage" class="nav-link">
          提币管理
        </router-link>
      </el-menu-item>

    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-tickets"></i>
        订单管理
      </template>
      <el-menu-item index="2-1">
        <router-link to="/myOrder" class="nav-link">
          我的订单
        </router-link>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-setting"></i>
        个人信息
      </template>
      <el-menu-item index="3-1">
        <router-link to="/accountSetting" class="nav-link">
          账户设置
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
    }
  }
</script>
