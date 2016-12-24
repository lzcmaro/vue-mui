<template>
  <div>
    <vui-header fixed>Tabs</vui-header>
    <vui-tabs :activeKey="activeKey">
      <vui-tab-item :key="'0'">All</vui-tab-item>
      <vui-tab-item :key="'1'">Todo</vui-tab-item>
      <vui-tab-item :key="'2'">Done</vui-tab-item>
    </vui-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeKey: 0
    }
  }
}
</script>
