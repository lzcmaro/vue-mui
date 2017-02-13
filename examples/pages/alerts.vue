<template>
  <div>
    <vui-header fixed>Alerts</vui-header>

    <page-content>
      <vui-button size="large" @click="alertVisibled = !alertVisibled">Alert</vui-button>
      <vui-button size="large" @click="confirmVisibled = !confirmVisibled">Confirm</vui-button>

      <vui-alert :show="alertVisibled" title="提示" buttonText="我知道了" @ok="onHideAlert">Alert Alert Alert</vui-alert>
      <vui-confirm :show="confirmVisibled" @ok="onOk" @cancel="onCancel">Confirm Confirm Confirm</vui-confirm>
    </page-content>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alertVisibled: false,
      confirmVisibled: false
    }
  },
  methods: {
    onHideAlert() {
      this.alertVisibled = false
    },
    onOk() {
      console.log('onOk')
      this.confirmVisibled = false
    },
    onCancel() {
      this.confirmVisibled = false
    }
  }
}
</script>

<style lang="less" scoped>
  .btn + .btn {
    margin-top: 15px;
  }
</style>
