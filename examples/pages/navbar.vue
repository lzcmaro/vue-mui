<template>
  <div>
    <vui-navbar fixed>Header</vui-navbar>
    <div class="navbar-section clearfix">
      <vui-navbar>Header</vui-navbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header'
}
</script>

<style lang="less">
  .navbar-section .nav {
    margin-top: 15px;
  }
</style>
