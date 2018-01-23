<template>
	<div id="app">
		<el-container style="width: 100%;">
			<el-header>
			  	<Header></Header>
			</el-header>
			<el-container>
		  		<el-row class="container">
				    <NavMenu></NavMenu>
				    <Container></Container>
		  		</el-row>
			</el-container>
	  		<el-footer>
	  			<Footer></Footer>
	  		</el-footer>
		</el-container>
  	</div>
</template>
<script>
import './assets/css/style.scss'
import './assets/css/common.css'
import Header from './components/common/Header'
import NavMenu from './components/common/NavMenu.vue'
import Container from './components/common/Container.vue'
import Footer from './components/common/Footer.vue'
export default {
  name: 'app',
  components: {
  	Header,
    NavMenu,
    Container,
    Footer
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
