<template>
  <div>
    <vui-navbar fixed>Header</vui-navbar>
    <div class="navbar-section clearfix">
      <vui-navbar>
        <vui-link slot="left" to="/"><vui-icon type="left" /></vui-link>
        Header
      </vui-navbar>
      <vui-navbar>
        <label slot="right">More</label>
        Header
      </vui-navbar>
      <vui-navbar>
        <vui-link slot="left" to="/"><vui-icon type="left" /></vui-link>
        <vui-link slot="right"><vui-icon type="more" /></vui-link>
        Header
      </vui-navbar>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less">
  .navbar-section .nav {
    margin-top: 15px;
  }
</style>
