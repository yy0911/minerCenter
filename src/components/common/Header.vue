<template>
	<div id="header">
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
			<li>English</li>
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
		padding-left: 300px;
		padding-right: 100px;
		overflow: hidden;
		background: #000;
		color: #fff;
		box-sizing: border-box;
	}
	#header ul {
		list-style: none;
		overflow: hidden;
	}
	#header ul li {
		float: left;
		font-size: 16px;
		line-height: 64px;
		height: 64px;
		padding: 0 20px;
		cursor: pointer;
		font-weight: 100;
	}
	.head_l {
		float: left;
	}
	.head_r {
		float: right;
	}
</style>






