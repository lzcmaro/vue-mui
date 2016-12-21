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
    padding: @content-spacing;
  }
</style>
