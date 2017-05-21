<template>
  <div>
    <vui-header fixed>Indicator</vui-header>

    <page-content>
      <vui-button size="large" @click="openIndicator('visibleLoading')">Loading</vui-button>
      <vui-button size="large" @click="openIndicator('visibleSuccess')">Success</vui-button>
      <vui-button size="large" @click="openIndicator('visibleFailure')">Failure</vui-button>
      <vui-button size="large" @click="openIndicator('visibleWarning')">Warning</vui-button>
    </page-content>

    <vui-indicator :show="visibleLoading" type="loading" @toggle-visible="toggleVisible1">加载中...</vui-indicator>
    <vui-indicator :show="visibleSuccess" type="success" @toggle-visible="toggleVisible2">操作成功</vui-indicator>
    <vui-indicator :show="visibleFailure" type="failure" @toggle-visible="toggleVisible3">注册失败</vui-indicator>
    <vui-indicator :show="visibleWarning" type="warning" @toggle-visible="toggleVisible4">信息错误</vui-indicator>
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
    openIndicator(key) {
      this[key] = !this[key]
    },
    toggleVisible1(val) {
      this.visibleLoading = val
    },
    toggleVisible2(val) {
      this.visibleSuccess = val
    },
    toggleVisible3(val) {
      this.visibleFailure = val
    },
    toggleVisible4(val) {
      this.visibleWarning = val
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
