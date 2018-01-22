<template>
	<div class="footer">
		<div>
			<span class="iconfont icon-ren"></span>
			<span class="iconfont icon-ren"></span>
			<span class="iconfont icon-ren"></span>
		</div>
		<p>Copyright © 2017 MobiPromo Ltd.</p>
	</div>
</template>
<script>
  export default {
    data () {
      return {
        
      }
    }
  }
</script>
<style>
	.footer {
		background: #f2f2f2;
		text-align: center;
		overflow: hidden;
		height: calc(100% - 438px);
		min-height: 160px;
	}
	.footer div {
		width: 100%;
		padding: 0 auto;
		overflow: hidden;
		margin-top: 52px;
		margin-bottom: 17px;
		padding-left: calc(50% - 70px);
	}
	.footer div span {
		padding: 0 15px;
		border-right: 1px solid rgba(0,0,0,0.38);
		font-size: 12px;
		float: left;
		cursor: pointer;
	}
	.footer div span:last-child {
		border-right: none;
	}
	.footer p {
		font-size: 14px;
		color: rgba(0,0,0,0.38);
		line-height: 22px;
	}
</style>






