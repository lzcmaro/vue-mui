<template>
  <div>
    <vui-header fixed>Modals</vui-header>

    <page-content>
      <vui-button size="large" @click="modalVisibled1 = !modalVisibled1">Modal(fade)</vui-button>
      <vui-button size="large" @click="modalVisibled2 = !modalVisibled2">Modal(slide_in_up)</vui-button>
      <vui-button size="large" @click="modalVisibled3 = !modalVisibled3">Modal(slide_in_right)</vui-button>
      <vui-button size="large" @click="dialogVisibled = !dialogVisibled">Dialog</vui-button>

      <vui-modal :show="modalVisibled1" title="Modal" closeButtonText="Cancel" @close="onCloseModal('modalVisibled1')">
        <div>
          <p>Modal contents.</p>
          <vui-button size="large" type="primary" @click="onCloseModal('modalVisibled1')">Close Modal</vui-button>
        </div>
        <div slot="footer">Footer</div>
      </vui-modal>
      <vui-modal :show="modalVisibled2" title="Modal" transition="slide-up" @close="onCloseModal('modalVisibled2')">
        <p>Modal contents.</p>
      </vui-modal>
      <vui-modal :show="modalVisibled3" title="Modal" transition="slide-left" @close="onCloseModal('modalVisibled3')">
        <p>Modal contents.</p>
      </vui-modal>
      <vui-dialog class="dlg-login" :show="dialogVisibled" @close="onCloseDialog" transition="slide-up">
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
      modalVisibled1: false,
      modalVisibled2: false,
      modalVisibled3: false,
      dialogVisibled: false
    }
  },
  methods: {
    onCloseModal(key) {
      this[key] = false
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
      width: 130px;
      height: 130px;
      margin: 0 auto 30px;
      border-radius: 50%;
      overflow: hidden;
      background-color: #e5e5e5;

      > img {
        width: 130px;
        height: 130px;
        border: none;
      }
    }

    input, button {
      margin-top: @content-spacing;
    }

    input {
      width: 100%;
      height: 40px;
      border: @border-default;
      border-radius: @border-radius-default;
    }
  }

  .btn + .btn {
    margin-top: 15px;
  }
</style>
