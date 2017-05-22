<template>
  <div>
    <vui-header fixed>Icons</vui-header>
    <page-content class="icon-list">
      <ul>
        <li v-for="icon in icons">
          <vui-icon :type="icon"></vui-icon>
          <div>icon-{{icon}}</div>
        </li>
      </ul>
    </page-content>
  </div>
</template>

<script>
import icons from './icons.json'

export default {
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
.icon-list {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;

    li {
      float: left;
      width: 29%;
      height: 110px;
      text-align: center;
      list-style: none;
      margin-left: 10px;
    }
    .icon {
      font-size: 24px;
    }
  }   
}
</style>
