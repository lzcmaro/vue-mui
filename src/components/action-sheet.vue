<template>
  <vui-modal type="actionsheet" transition="slide-up" :show="show" @click-backdrop="$emit('cancel')">
    <slot></slot>
    <template slot="footer" v-if="cancelButton">
      <vui-action-sheet-button @click="$emit('cancel', $event)">{{cancelButtonText}}</vui-action-sheet-button>
    </template>
  </vui-modal>
</template>

<script>
import VuiModal from './base-modal'
import VuiActionSheetButton from './action-sheet-button'

export default {
  name: 'vui-action-sheet',
  components: {
    VuiModal,
    VuiActionSheetButton
  },
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    },
    cancelButton: {
      type: Boolean,
      default: true
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    }
  }
}
</script>
