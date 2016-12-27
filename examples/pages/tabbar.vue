<template>
  <div>
    <vui-header fixed>Tabbar</vui-header>
    <vui-tabbar :activeKey="activeKey" @on-select-item="onSelectItem">
      <vui-tab-item eventKey="home"><vui-icon type="home" slot="icon" />Home</vui-tab-item>
      <vui-tab-item eventKey="search"><vui-icon type="account" />Search</vui-tab-item>
      <vui-tab-item eventKey="account"><vui-icon type="account" slot="icon" />Account</vui-tab-item>
    </vui-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeKey: 'home'
    }
  },
  methods: {
    onSelectItem($evt, eventKey) {
      this.activeKey = eventKey
    }
  }
}
</script>
