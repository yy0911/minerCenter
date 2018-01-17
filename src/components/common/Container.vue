<template>
  <div id="container">
    <transition name="slide-fade">
      <router-view class="content"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  components: {
  }
}
</script>
<style lang="scss">
.content {
  padding: 10px;
}
</style>
