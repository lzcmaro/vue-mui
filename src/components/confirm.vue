<template>
  <vui-modal type="confirm" :show="show">
    <slot></slot>
    <template slot="footer">
      <vui-button class="btn-cancel" size="large" @click="onCancel">{{cancelButtonText}}</vui-button>
      <vui-button class="btn-ok" size="large" @click="onConfirm">{{confirmButtonText}}</vui-button>
    </template>
  </vui-modal>
</template>

<script>
import VuiModal from './modal'
import VuiButton from './button'

export default {
  name: 'vui-confirm',
  components: {
    VuiModal,
    VuiButton
  },
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    },
    confirmButtonText: {
      type: String,
      default: '确定'
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    }
  },
  methods: {
    onConfirm($evt) {
      this.$emit('ok', $evt)
    },
    onCancel($evt) {
      this.$emit('cancel', $evt)
    }
  }
}
</script>
