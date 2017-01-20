<template>
  <vui-modal type="alert" :show="show">
    <template slot="header">
      {{title}}
    </template>
    <slot></slot>
    <template slot="footer">
      <vui-button size="large" @click="handleClick">{{buttonText}}</vui-button>
    </template>
  </vui-modal>
</template>

<script>
import VuiModal from './modal'
import VuiButton from './button'

export default {
  name: 'vui-alert',
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
    title: {
      type: String,
      default: '提示'
    },
    buttonText: {
      type: String,
      default: '确定'
    }
  },
  methods: {
    handleClick($evt) {
      this.$emit('ok', $evt)
    }
  }
}
</script>
