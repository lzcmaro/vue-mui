<template>
  <div>
    <vui-header fixed>Header</vui-header>
    <page-content class="header-section clearfix">
      <vui-header>
        <vui-link slot="left" to="/" @click="clickHandler"><vui-icon type="left" /></vui-link>
        Header
      </vui-header>
      <vui-header>
        <label slot="right">More</label>
        Header
      </vui-header>
      <vui-header>
        <vui-link slot="left" to="/"><vui-icon type="left" /></vui-link>
        <vui-link slot="right"><vui-icon type="more" /></vui-link>
        Header
      </vui-header>
    </page-content>
  </div>
</template>

<script>
export default {
  methods: {
    clickHandler($evt) {
      console.log('clickHandler...', $evt, this)
    }
  }
}
</script>

<style lang="less" scoped>
  .header-section .header {
    margin-top: 15px;
  }
</style>
