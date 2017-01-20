<template>
  <vui-modal type="dialog" :show="show">
    <template slot="header" v-if="title || closeButton">
      {{title}}
      <vui-icon class="btn-close" type="cross2" @click="handleClick"></vui-icon>
    </template>
    <slot></slot>
    <template slot="footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </template>
  </vui-modal>
</template>

<script>
import VuiModal from './modal'
import VuiButton from './button'
import VuiIcon from './icon'

export default {
  name: 'vui-dialog',
  components: {
    VuiModal,
    VuiButton,
    VuiIcon
  },
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    },
    title: String,
    closeButton: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleClick($evt) {
      this.$emit('close')
    }
  }
}
</script>
