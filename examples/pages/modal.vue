<template>
  <div>
    <vui-header fixed>Modal</vui-header>

    <page-content>
      <vui-button size="large" @click="alertVisibled = !alertVisibled">Alert</vui-button>
      <vui-button size="large">Confirm</vui-button>
      <vui-button size="large">Prompt</vui-button>
      <vui-button size="large">Dialog</vui-button>

      <vui-alert :show="alertVisibled" title="提示" buttonText="我知道了" @ok="onHideAlert">Alert Alert Alert</vui-alert>
    </page-content>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alertVisibled: false
    }
  },
  methods: {
    onHideAlert() {
      this.alertVisibled = false
    }
  }
}
</script>
