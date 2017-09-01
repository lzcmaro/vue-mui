<template>
  <div>
    <vui-header fixed>Indicator</vui-header>

    <page-content>
      <vui-button size="large" @click="openIndicator('visibleLoading')">Loading</vui-button>
      <vui-button size="large" @click="openIndicator('visibleSuccess')">Success</vui-button>
      <vui-button size="large" @click="openIndicator('visibleFailure')">Failure</vui-button>
      <vui-button size="large" @click="openIndicator('visibleWarning')">Warning</vui-button>
    </page-content>

    <vui-indicator :show="visibleLoading" type="loading" @hide="onHide('visibleLoading')">加载中...</vui-indicator>
    <vui-indicator :show="visibleSuccess" type="success" @hide="onHide('visibleSuccess')">操作成功</vui-indicator>
    <vui-indicator :show="visibleFailure" type="failure" @hide="onHide('visibleFailure')">注册失败</vui-indicator>
    <vui-indicator :show="visibleWarning" type="warning" @hide="onHide('visibleWarning')">信息错误</vui-indicator>
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
