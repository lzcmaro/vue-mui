<template>
  <div>
    <vui-navbar fixed>Icons</vui-navbar>
    <ul class="icon-list">
      <li v-for="icon in icons">
        <vui-icon :type="icon"></vui-icon>
        <div>icon-{{icon}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import icons from './icons.json'

export default {
  name: 'icon',
  data() {
    return {
      icons: []
    }
  },

  created() {
    this.icons = icons
  }
}
</script>

<style lang="less">
@import "../../src/less/variables.less";
.icon-list {
  padding: @content-spacing;
  list-style: none;
  overflow: hidden;

  li {
    float: left;
    width: 160/@rem-unit;
    height: 220/@rem-unit;
    text-align: center;
    list-style: none;
    margin-left: 20/@rem-unit;
  }
  .icon {
    font-size: 48/@rem-unit;
  }
}
</style>
