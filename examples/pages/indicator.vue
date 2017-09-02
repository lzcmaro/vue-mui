<template>
  <div>
    <vui-header fixed>Indicator</vui-header>

    <page-content>
      <vui-button size="large" @click="openSuccessIndicator">Loading</vui-button>
      <vui-button size="large" @click="visibleSuccess = true">Success</vui-button>
      <vui-button size="large" @click="visibleFailure = true">Failure</vui-button>
      <vui-button size="large" @click="openWarningIndicator">Warning</vui-button>
    </page-content>

    <vui-indicator :show="visibleSuccess" type="success" @hide="visibleSuccess = false">操作成功</vui-indicator>
    <vui-indicator :show="visibleFailure" type="failure" @hide="visibleFailure = false">注册失败</vui-indicator>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visibleLoading: false,
      visibleSuccess: false,
      visibleFailure: false,
      visibleWarning: false
    }
  },
  methods: {
    openSuccessIndicator() {
      // this.$indicator('加载中...', this.$indicator.types.LOADING, function() {
      //   console.log('hidden.')
      // })
      this.$indicator({
        type: this.$indicator.types.LOADING,
        message: '加载中...',
        className: 'my-indicator'
      }, function() {
        console.log('hidden.')
      })
    },
    openWarningIndicator() {
      // 不指定type时，默认为$indicator.types.WARNING
      this.$indicator('信息错误', function() {
        console.log('hidden.')
      })
    },
    onHide(key) {
      this[key] = false
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
