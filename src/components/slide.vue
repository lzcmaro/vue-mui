<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'vui-slide'
}
</script>

<style lang="less" scoped>
  .slide {
    display: inline-block;
    width: 100%;
    height: 100%;
    font-size: 14px;
    vertical-align: top;
  }
</style>