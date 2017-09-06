<template>
  <div class="modal">
    <vui-overlay v-if="backdrop" v-show="show" @click="$emit('click-backdrop', $event)"></vui-overlay>
    <transition :name="transition">
      <div :class="{[type]: !!type, [transition]: true}" class="modal-dialog" :style="{zIndex: zIndex}" v-show="show">
        <div class="modal-content">
          <div class="modal-header" v-if="$slots.header"><slot name="header"></slot></div>
          <div class="modal-body"><slot></slot></div>
          <div class="modal-footer" v-if="$slots.footer"><slot name="footer"></slot></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import VuiOverlay from './overlay'
import modalMixins from '@/mixins/modalMixins'
import toggleClass from '@/utils/toggleClass'

let zIndex = 999

export default {
  name: 'vui-base-modal',
  components: {
    VuiOverlay
  },
  mixins: [modalMixins],
  props: {
    type: String,
    transition: {
      type: String,
      default: 'fade',
      validator(value) {
        return [
          'fade', // 淡入淡出
          'slide-up', // 从下往上滑出
          'slide-left' // 从右往左滑出
        ].indexOf(value) > -1
      }
    }
  },
  data() {
    return {
      zIndex: zIndex
    }
  },
  watch: {
    show(val) {
      this.zIndex = val ? (++zIndex) : (--zIndex)
      toggleClass(document.body, 'modal-open', val)
    }
  },
  mounted() {
    if (this.show) {
      this.zIndex = (++zIndex)
    }
    toggleClass(document.body, 'modal-open', this.show)
  }
}
</script>
