<template>
  <div class="root">
    <router-link class="page-back" v-if="visible" :to="'/'">
      <i class="icon icon-left"></i>
    </router-link>
    <router-view class="page"></router-view>
  </div>
</template>

<style lang="less">
@import "../src/less/vue-mui.less";

body {
  background-color: #ebebec;
}

.page-back {
  position: fixed;
  top: 10px;
  left: 10px;
  text-align: center;
  z-index: 99;

  .icon {
    color: #fff;
    font-size: 24px;
  }
}
</style>

<script type="text/babel">
export default {
  computed: {
    visible() {
      return ['/', '/header', '/search'].indexOf(this.$route.path) < 0
    }
  }
}
</script>
