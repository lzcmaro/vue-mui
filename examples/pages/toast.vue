<template>
  <div>
    <vui-header fixed>Toast</vui-header>
    <page-content>
      <vui-button size="large" @click="openToast">弹出Toast</vui-button>
      <vui-button size="large" @click="visibleToast = true">弹出带Icon的Toast</vui-button>
    </page-content>

    <vui-toast :show="visibleToast" @hide="onHidden">
      <vui-icon type="checkmark"></vui-icon>
      Toast
    </vui-toast>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visibleToast: false
    }
  },
  methods: {
    openToast() {
      this.$toast('toast', function() {
        console.log('hidden.')
      })
      // this.$toast({
      //   message: 'toast',
      //   className: 'my-toast',
      //   iconClass: 'icon icon-home',
      //   onHidden: () => {
      //     console.log('hidden.')
      //   }
      // })
    },
    onHidden() {
      this.visibleToast = false
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
