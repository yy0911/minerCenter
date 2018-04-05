<template>
  <div id="header" :class="isProDISPLAY ? 'headerGreyMouse' : 'header000Mouse'">
    <div class="header-container">
      <div style="display: flex;justify-content: left" class="web-head-container">
        <div class="header">
          <ul class="logo">
            <a href="/ftzn/index.html">
              <img src="../../assets/css/icon/logo_white.svg" height="32px;">
            </a>
          </ul>
          <ul class="head_l flex flex-pack-center">
<<<<<<< HEAD
            <li class="mainPape"><a href="/ftzn/index.html">
              主頁
=======
            <li class="mainPape"><a href="/index.html">
              主页
>>>>>>> 7aa1edb3a421b1fcc925a3cdb29ec1edc04a9562
            </a></li>
            <li><a href="/whitepaper.pdf">
              白皮書
            </a></li>
            <li class="productPage" @mouseover="isProDISPLAY = true" @mouseout="isProDISPLAY = false">
              <div class="nav-pro-mouse flex flex-align-center" :class="isProDISPLAY ? 'proColorMouse87' : 'proColorMouse54'">
                產品
                <span class="trink-icon" :class="isProDISPLAY ? 'trinkIconRotate180' : 'trinkIconRotate0e'"></span>
              </div>
              <div class="product-over-downContainer" :class="isProDISPLAY ? 'height206' : 'height0'">
                <div class="product-content flex">
                  <div class="product-img-list text-center" style="width: 72px">
                    <a href="/ftzn/product.html"  class="pro-a-item" :class="isProDISPLAY ? 'boxLeftMouse0' : 'boxLeftMouse80'">
                      <p class="product-img">
                        <img src="../../assets/images/pic_device.png" alt="">
                      </p>
                      <p class="margin-top16">
                        星際寶盒
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li class="news-page"><a href="/ftzn/info.html">
              資訊
            </a></li>
            <li class="aboutUs-page"><a href="/ftzn/aboutUs.html">
              關于
            </a></li>
          </ul>
          <ul class="head_r">
            <li><a id="userCenter" href="#">
              個人中心
            </a></li>
            <li @click="dialogVisible = true"><a>
              退出
            </a></li>
            <!--<li>-->
            <!--<a href="javascript:void(0);" class="noDisableA">-->
            <!--<i class="iconfont icon-ren"></i>简体中文-->
            <!--</a>-->
            <!--</li>-->
          </ul>
        </div>
      </div>
    </div>
    <div class="m-header-container" style="display: none">
      <div class="header flex flex-pack-justify flex-align-center">
        <ul class="logo">
          <a href="/ftzn/index.html">
            <img src="../../assets/css/icon/logo_white.svg" height="32px;">
          </a>
        </ul>
        <div class="m-header-right-btn" @click="mRightBtnMethod">
          <img v-if='downVisble===true' src="../../assets/css/icon/ArtboardCopy.svg" alt="">
          <img v-else-if="downVisble===false" src="../../assets/css/icon/Artboard.svg" alt="">
        </div>
      </div>
      <div class="select-headerdown" v-show="downVisble">
        <ul class="header_select_list">
          <li class="mainPape"><a href="/index.html">
            主頁
          </a></li>
          <li><a href="/whitepaper.pdf">
            白皮書
          </a></li>
          <li class="productPage m-productPage">
            <a href="/ftzn/product.html">
              星際寶盒
            </a>
          </li>
          <li class="news-page"><a href="/ftzn/info.html">
            資訊
          </a></li>
          <li class="aboutUs-page"><a href="/ftzn/aboutUs.html">
            關于
          </a></li>
          <li><a id="userCenter" href="#">
            個人中心
          </a></li>
          <li @click="dialogVisible = true"><a>
            退出
          </a></li>
        </ul>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
    >
      <template slot="title">
        <i class="el-icon-question" style="color: #e6a23c"></i>
<<<<<<< HEAD
        <span>確認要退出登錄嗎？</span>
      </template>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="sureLoginout">確 定</el-button>
=======
        <span>确认要退出登录吗？</span>
      </template>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="sureLoginout">确 定</el-button>
>>>>>>> 7aa1edb3a421b1fcc925a3cdb29ec1edc04a9562
  </span>
    </el-dialog>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        dialogVisible: false,
        isProDISPLAY: false,
        downVisble: false
      }
    },
    mounted () {
      // this.isTokenPastdue()
    },
    methods: {
      //点击退出
      sureLoginout () {
        axios.get('/promo/token/logout')
          .then(function (response) {
            if (response.data.isSuccess) {
              window.location.href = '/ftzn/login.html'
            }
          })
          .catch(function (error) {
            console.log(error)
            if (error.status === 401) {
              window.location.href = '/ftzn/login.html'
            }
          })
      },
      //判断是否cookie过期
      isTokenPastdue () {
        axios.get('/promo/authed/user/account')
          .then(function (response) {
          })
          .catch(function (error) {
            window.location.href = '/ftzn/login.html'
          })
      },
      mRightBtnMethod () {
        this.downVisble = !this.downVisble
      }
    }
  }
</script>

<style type="text/scss">
  #userCenter {
    color: rgba(255,255,255,.87);
  }
  #header {
    width: 100%;
    position: fixed;
    top: 0;
    height: 64px ;
    z-index: 20000;
  }
  #header  .el-dialog {
    position: fixed;
    left:50%!important;
    top:40%!important;
    transform: translate(-50%,-40%);
    -webkit-transform: translate(-50%,-40%);
    width:392px;
    box-shadow: 0 4px 12px 0 rgba(0,0,0,0.20);
    border-radius: 4px;
<<<<<<< HEAD
    font-size: 14px;
=======
>>>>>>> 7aa1edb3a421b1fcc925a3cdb29ec1edc04a9562
    margin-top: 0!important;
  }
  #header  .el-dialog .el-button {
    padding: 8px 20px;
  }
  .header {
    width: 100%;
<<<<<<< HEAD
    /*width: 1440px!important;*/
=======
    min-width: 800px;
>>>>>>> 7aa1edb3a421b1fcc925a3cdb29ec1edc04a9562
    height: 64px;
    position: fixed;
    z-index: 2001;
    background: rgba(0,0,0,1);
    color: #fff;
    box-sizing: border-box;
    transition: all 1s ease-in-out;
    padding-left: 150px;
    padding-right: 150px;
  }
  .header ul {
    list-style: none;
    overflow: hidden;
    float: left;
    padding: 22px 0;
    line-height: 22px;
  }
  .header .head_l {
    height: 100%;
    line-height: 64px;
    padding:0;
    width: calc(100% - 258px);
  }
  .header ul li {
    float: left;
    font-size: 14px;
    padding-left: 32px;
    padding-right: 24px;
    cursor: pointer;
    font-weight: 400;
    transition: all 0.3s;
    color: rgba(255,255,255,0.54);
  }
  .header ul li a {
    color: rgba(255,255,255,0.54);
  }
  .header ul li a:hover{
    color: rgba(255,255,255,0.87);
    font-weight: 500;
  }
  .header .logo {
    height: 100%;
    margin-right: 32px;
    padding: 0;
  }
  .logo img {
    position: relative;
    top: 17px;
  }
  .header .head_r {
    float: right;
  }
  .header .head_r li:nth-child(1) {
    padding-right: 32px;
  }
  .header .head_r li:nth-child(2){
    position: relative;
    padding-left: 0px;
    padding-right: 0px;
  }
  .header .head_r li:nth-child(3){
    position: relative;
    /*padding-left: 32px;*/
  }
  .header .head_r li:nth-child(2)::after{
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 8px;
    background-color: rgba(255,255,255,.15);
  }

  .trink-icon {
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid rgba(255,255,255,.54);
    margin-left: 8px;
    transition: all 0.2s linear;
  }
  .product-over-downContainer {
    transition:height 0.5s ease-in-out;
    height: 0px;
    background: rgba(24,24,24,1);
    position: absolute;
    top: 0;
    left: 0%;
    width: 100%;
    cursor: pointer;
    overflow: hidden;
    z-index: -1;
  }
  .product-content {
    position: absolute;
    left: 47%;
    height: 100%;
  }
  .product-img-list {
    position: relative;
  }
  .product-img-list a{
    text-decoration: none;
    color: rgba(255,255,255,.54);
    font-size: 14px;
    position: absolute;
    top: 90px;
    line-height: 24px;
    transition:all 0.5s ease-in-out;
  }
  .boxLeftMouse80 {
    left:80px;
  }
  .boxLeftMouse0 {
    left:0px;
  }
  .product-img-list a:hover {
    color: rgba(255,255,255,.54) !important;
  }
  .product-img {
    width: 72px;
  }
  .product-img img {
    width: 100%;
  }
  .height0 {
    height: 0px;
  }
  .height206 {
    height: 206px;
  }
  .trinkIconRotate180 {
    border-top-color: rgba(255,255,255,.87);
    transform: rotate(180deg);
  }
  .trinkIconRotate0 {
    border-top-color: rgba(255,255,255,.54);
    transform: rotate(0deg);
  }
  .proColorMouse87 {
    color:rgba(255,255,255,.87)
  }
  .proColorMouse54 {
    color:rgba(255,255,255,.54)
  }

  .headerGreyMouse {
    background-color: rgba(24,24,24,1);
  }
  .header000Mouse {
    background-color: #000;
  }

  @media screen and (max-width: 768px){
    .web-head-container {
      display: none!important;
    }
    .m-header-container {
      display: block!important;
    }
    .m-header-right-btn {
      text-align: right;
    }
    .m-header-right-btn img {
      width: 3rem;
    }
    .m-header-container .header {
      width: 100%!important;
      padding: 0 10px;
      z-index: 999999;
    }
    .header_select_list {
      padding-top: 64px;
      position: fixed;
      width: 100%;
      z-index: 99999;
      background: #1a1a1a!important;
    }
    .header_select_list>li {
      width: 100%;
      padding:15px;
      text-align: left!important;
    }
    .header_select_list>li a {
      width: 100%;
      display: block;
      color: rgba(255,255,255,0.54);
    }
    .header_select_list>li:hover {
      /*background: rgba(255,255,255,.87);*/
    }
    .product-img {
      max-width: 36px!important;
    }
    .can-main-container {
      width: 100%!important;
    }
    .font-size48 {
      font-size: 24px!important;
    }
    .font-size18 {
      font-size: 16px!important;
    }
    .index-can-content {
      width: 100% !important;
      padding:0 15px;
      text-indent: 2em;
    }
    .swiper_banner_one {
      width: 100%!important;
    }
    .qrcord_downIcon img {
      margin-top: -1px;
    }
    .aboutUs-btn {
      width: 90%!important;
    }
    .header ul li {
      padding-left: 0;
    }
  }

</style>






