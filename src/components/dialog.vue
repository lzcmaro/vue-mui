<template>
  <vui-modal type="dialog" :show="show" @click-backdrop="$emit('close')">
    <template slot="header" v-if="title || closeButton">
      {{title}}
      <vui-icon class="btn-close" type="cross2" @click="$emit('close')"></vui-icon>
    </template>
    <slot></slot>
    <template slot="footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </template>
  </vui-modal>
</template>

<script>
import VuiModal from './base-modal'
import VuiButton from './button'
import VuiIcon from './icon'

import modalMixins from '../mixins/modalMixins'

export default {
  name: 'vui-dialog',
  components: {
    VuiModal,
    VuiButton,
    VuiIcon
  },
  mixins: [modalMixins]
}
</script>
