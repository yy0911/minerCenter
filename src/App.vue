<template>
	<div id="app">
		<el-row>
	  		<Header></Header>
		</el-row>
  		<el-row class="container">
		    <NavMenu></NavMenu>
		    <Container></Container>
  		</el-row>
  	</div>
</template>
<script>
import './assets/css/style.scss'
import './assets/css/common.css'
import Header from './components/common/Header'
import NavMenu from './components/common/NavMenu.vue'
import Container from './components/common/Container.vue'

export default {
  name: 'app',
  components: {
  	Header,
    NavMenu,
    Container
  }
}
</script>
<style type="text/css">
	.container {
		display: flex;
		width: 100%;
		padding: 24px 136px;
		background: #f2f2f2;
		margin-top: 64px;
	}
	#container {
		background: #fff;
	}
</style>
