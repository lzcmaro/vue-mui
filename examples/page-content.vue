<template>
  <div class="page-content">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'page-content'
}
</script>

<style lang="less">
  @import "../src/less/variables.less";
  .page-content {
    position: relative;
    padding: @content-spacing;
  }

  .header-fixed + .page-content {
    margin-top: @header-height;
  }
</style>
