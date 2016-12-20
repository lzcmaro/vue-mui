<template>
  <div>
    <router-link class="page-back" v-if="visible" :to="'/'">
      <i class="icon icon-left"></i>
    </router-link>
    <router-view></router-view>
  </div>
</template>

<style lang="less">
@import "../src/less/vue-mui.less";

.page-back {
  position: fixed;
  top: 8/@rem-unit;
  left: 20/@rem-unit;
  text-align: center;
  z-index: 99;

  .icon {
    color: #fff;
    font-size: 48/@rem-unit;
  }
}
</style>

<script type="text/babel">
export default {
  computed: {
    visible() {
      return ['/', '/navbar', '/search'].indexOf(this.$route.path) < 0
    }
  }
}
</script>
