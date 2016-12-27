<template>
  <section>
    <vui-list v-for="group in navs">
      <span slot="title">{{group.title}}</span>
      <vui-list-item v-for="item in group.list" :to="item.path" navigate>
        {{ item.name }}
      </vui-list-item>
    </vui-list>
  </section>
</template>

<script type="text/babel">
import navs from './navs.json'

export default {
  data() {
    return {
      navs: []
    }
  },

  created() {
    this.navs = navs
  }
}
</script>

<style lang="less" scoped>
  @import "../src/less/variables.less";
  .list {
    margin-top: @content-spacing;
  }
</style>
