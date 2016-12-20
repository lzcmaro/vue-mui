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
    position: absolute;
    top: 12px;
    left: 10px;
    text-align: center;
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
