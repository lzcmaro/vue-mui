<template>
  <div>
    <vui-header fixed>Header</vui-header>
    <div class="header-section clearfix">
      <vui-header>
        <vui-link slot="left" to="/"><vui-icon type="left" /></vui-link>
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
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less">
  .header-section .header {
    margin-top: 15px;
  }
</style>
