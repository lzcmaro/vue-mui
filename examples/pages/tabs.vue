<template>
  <div>
    <vui-header fixed>Tabs</vui-header>
    <vui-tabs :activeKey="activeKey" @change="onChange">
      <vui-tab-item eventKey="all">All<div slot="content">All</div></vui-tab-item>
      <vui-tab-item eventKey="todo">Todo<div slot="content">Todo</div></vui-tab-item>
      <vui-tab-item eventKey="done">Done<div slot="content">Done</div></vui-tab-item>
    </vui-tabs>

    <vui-tabs :activeKey="activeKey2" @change="onChange2">
      <vui-tab-item eventKey="home"><vui-icon type="home"/> Home</vui-tab-item>
      <vui-tab-item eventKey="search"><vui-icon type="search"/> Search</vui-tab-item>
      <vui-tab-item eventKey="account"><vui-icon type="account"/> Account</vui-tab-item>
    </vui-tabs>

    <component :is="tabContent" class="tab-content"></component>
  </div>
</template>

<script>
const tabContent = {
  home: {
    template: '<div>Home</div>'
  },
  search: {
    template: '<div>Search</div>'
  },
  account: {
    template: '<div>Account</div>'
  }
}

export default {
  data() {
    return {
      activeKey: 'all',
      activeKey2: 'home',
      tabContent: tabContent['home']
    }
  },
  methods: {
    onChange($evt, eventKey) {
      this.activeKey = eventKey
    },
    onChange2($evt, eventKey) {
      this.activeKey2 = eventKey
      this.tabContent = tabContent[eventKey]
    }
  }
}
</script>

<style lang="less">
  @import "../../src/less/variables.less";

  .header + .nav-tabs {
    margin-top: @header-height;
  }
  .nav-tabs + .nav-tabs {
    margin-top: 20px;
  }
  .tab-content {
    text-align: center;
  }
</style>
