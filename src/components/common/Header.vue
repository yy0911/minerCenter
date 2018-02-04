<template>
    <div id="header">
      <ul class="logo">
          <a href="#">
            <img src="../../assets/css/icon/logo1.svg" height="30px;">
          </a>
      </ul>
      <ul class="head_l">
        <li class="mainPape"><a href="../index.html">主页</a></li>
        <li><a href="../whitepaper.pdf">白皮书</a></li>
        <li class="productPage flex flex-align-center" @mouseover="isMouseover = false" @mouseout="isMouseover = true">
          <div class="nav-pro-mouse flex flex-align-center">
            产品 <span class="trink-icon"></span>
          </div>
          <div class="product-over-downContainer" :class="{proDisplay:isMouseover}">
            <div class="product-content flex">
              <div class="product-img-list text-center">
                <a href="../pages/product.html">
                  <p class="product-img" style="margin-bottom: 8px">
                    <img src="../../assets/images/pic_device.png" alt="">
                  </p>
                  <span>星际宝盒</span>
                </a>
              </div>
              <p style="padding-top: 26px;padding-left: 64px;color: rgba(255,255,255,.22)">更多产品敬请期待</p>
            </div>
          </div>
        </li>
        <li><a href="../pages/info.html">资讯</a></li>
        <li><a href="../pages/aboutUs.html">关于</a></li>
      </ul>
      <ul class="head_r">
        <li><a id="login" href="../pages/login.html">个人中心</a></li>
        <li style='color: #1890FF;' @click="loginOutMethod">退出</li>
        <li>
          <a href="javascript:void(0);">
            <i class="iconfont icon-ren"></i>English
          </a>
        </li>
      </ul>
    </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        isMouseover: true
      }
    },
    methods: {
      //点击退出
      loginOutMethod () {
        axios.get('/promo/token/logout')
          .then(function (response) {
            if (response.data.isSuccess) {
              window.location.href = '../pages/login.html'
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
</script>
<style type="text/scss">
	#header {
		width: 100%;
		height: 64px;
		position: fixed;
		z-index: 10;
		/*overflow: hidden;*/
		background: #000;
		color: #fff;
		padding-left: 136px;
		padding-right: 118px;
		box-sizing: border-box;
	}
	#header ul {
		list-style: none;
		overflow: hidden;
		float: left;
		padding: 24px 0;
	}
	#header ul li {
		float: left;
		font-size: 16px;
		padding: 0 20px;
		cursor: pointer;
		font-weight: 100;
		transition-duration: all 0.3s;
		color: rgba(255,255,255,0.54);
	}
	#header ul li:hover {
		color: rgba(255,255,255,0.87);
	}
	#header .logo {
		height: 100%;
		margin-right: 30px;
		padding: 0;
	}
	.logo img {
		position: relative;
		top: 17px;
	}
	#header .head_r {
		float: right;
	}
	#header .head_r li:nth-child(1) {
		border-right: 1px solid rgba(255,255,255,0.54);
	}
  .product-over-downContainer {
    height: 142px;
    background: #181818;
    position: absolute;
    top:60px;
    left: 0;
    width: 100%;
    transition:height 2s;
    -moz-transition:height 2s; /* Firefox 4 */
    -webkit-transition:height 2s; /* Safari and Chrome */
    -o-transition:height 2s; /* Opera */
    cursor: pointer;
  }
  .proDisplay {
    display: none;
  }
  .product-content {
    position: absolute;
    top: 20px;
    left: 335px;
  }
  .product-img-list a{
    text-decoration: none;
    color: rgba(255,255,255,.54);
    font-size: 14px;
  }
  .product-img {
    width: 72px;
    height: 72px;
  }
  .product-img img {
    width: 100%;
    height: 100%;
  }
  #header a {
    color: rgba(255,255,255,0.54);
    text-decoration: none !important;
  }
  .trink-icon {
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid rgba(255,255,255,.54);
    margin-left: 8px;
  }
</style>






