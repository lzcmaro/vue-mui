<template>
  <div>
    <vui-header fixed>Toast</vui-header>
    <page-content>
      <vui-button size="large" @click="openToast('visible1')">弹出Toast</vui-button>
      <vui-button size="large" @click="openToast('visible2')">弹出带Icon的Toast</vui-button>

      
    </page-content>
    <vui-toast :show="visible1" @toggle-visible="toggleVisible1">Toast</vui-toast>
    <vui-toast :show="visible2" @toggle-visible="toggleVisible2">
      <vui-icon slot="icon" type="checkmark" :style="{fontSize: '48px'}"></vui-icon>
      Toast
    </vui-toast>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible1: false,
      visible2: false
    }
  },
  methods: {
    openToast(key) {
      this[key] = !this[key]
    },
    toggleVisible1(val) {
      this.visible1 = val
    },
    toggleVisible2(val) {
      this.visible2 = val
    }
  }
}
</script>

<style lang="less" scoped>
  .page-content {
    .btn {
      margin-top: 15px;
    }
  }
</style>
