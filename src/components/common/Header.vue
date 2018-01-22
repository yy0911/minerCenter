<template>
	<div id="header">
		<ul class="logo">
			<img src="../../assets/images/logo.png" height="30px;">
		</ul>
		<ul class="head_l">
			<li>主页</li>
			<li>白皮书</li>
			<li>项目</li>
			<li>通知</li>
			<li>CAN星际宝盒</li>
		</ul>
		<ul class="head_r">
			<li>个人中心</li>
			<li>退出</li>
			<li><i class="iconfont icon-ren"></i>English</li>
		</ul>
	</div>
</template>
<script>
  export default {
    data () {
      return {
        activeIndex2: '1'
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
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
		overflow: hidden;
		background: #000;
		color: #fff;
		padding-left: 143px;
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
</style>






