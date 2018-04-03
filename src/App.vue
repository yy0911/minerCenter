<template>
  <div id="app" ref="app">
    <el-container style="width: 100%;">
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-row class="main-container">
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
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style type="text/css">
	.main-container {
    width: 100%;
		display: flex;
		padding: 24px 150px;
		background: #f2f2f2;
	}
  .el-footer {
    width: 100%;
    height: 200px !important;
    padding: 0;
  }
  .footer {
    height: 200px;
    padding: 0;
    background: #f2f2f2;
  }
  .el-header {
    padding: 0;
  }
  .el-container {
    width: 100%;
    min-height: 2400px;
  }
</style>
