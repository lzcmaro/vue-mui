<template>
  <div>
    <vui-header fixed>Modal</vui-header>

    <page-content>
      <vui-button size="large" @click="alertVisibled = !alertVisibled">Alert</vui-button>
      <vui-button size="large" @click="confirmVisibled = !confirmVisibled">Confirm</vui-button>
      <vui-button size="large" @click="dialogVisibled = !dialogVisibled">Dialog</vui-button>

      <vui-alert :show="alertVisibled" title="提示" buttonText="我知道了" @ok="onHideAlert">Alert Alert Alert</vui-alert>
      <vui-confirm :show="confirmVisibled" @ok="onOk" @cancel="onCancel">Confirm Confirm Confirm</vui-confirm>
      <vui-dialog class="dlg-login" :show="dialogVisibled" @close="onCloseDialog">
        <div class="login-img">
          <img src="../assets/yoga.b124d4aa1794ed4ac0ec0be1879afdaa.jpg"/>
        </div>
        <form>
          <input type="text" name="">
          <input type="text" name="">
          <vui-button nativeType="reset" type="primary" size="large">Submit</vui-button>
        </form>
      </vui-dialog>
    </page-content>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alertVisibled: false,
      confirmVisibled: false,
      dialogVisibled: false
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
    },
    onCloseDialog() {
      this.dialogVisibled = false
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../src/less/variables.less";
  .dlg-login {
    .login-img {
      display: block;
      width: 260/@rem-unit;
      height: 260/@rem-unit;
      margin: 0 auto 30px;
      border-radius: 50%;
      overflow: hidden;
      background-color: #e5e5e5;

      > img {
        width: 260/@rem-unit;
        height: 260/@rem-unit;
        border: none;
      }
    }

    input, button {
      margin-top: @content-spacing;
    }

    input {
      width: 100%;
      height: 80/@rem-unit;
      border: @border-default;
      border-radius: @border-radius-default;
    }
  }
</style>
