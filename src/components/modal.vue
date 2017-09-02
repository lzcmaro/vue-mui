<template>
  <vui-base-modal :show="show" :transition="transition" @click-backdrop="$emit('click-backdrop', $event)">
    <template slot="header" v-if="title || closeButton">
      <a href="javascript:;" class="btn-close" @click.prevent="$emit('close', $event)" v-if="closeButton">{{closeButtonText}}</a>
      {{title}}
    </template>
    <slot></slot>
    <template slot="footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </template>
  </vui-base-modal>
</template>

<script>
import VuiBaseModal from './base-modal'
import VuiButton from './button'
import VuiIcon from './icon'

import modalMixins from '../mixins/modalMixins'

export default {
  name: 'vui-modal',
  components: {
    VuiBaseModal,
    VuiButton,
    VuiIcon
  },
  mixins: [modalMixins],
  props: {
    closeButtonText: {
      type: String,
      default: '取消'
    }
  }
}
</script>
