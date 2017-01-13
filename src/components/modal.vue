<template> 
  <div class="modal">
    <vui-overlay v-if="backdrop" v-show="show"></vui-overlay>
    <transition name="modal-pop">
      <div :class="{[type]: !!type}" class="modal-dialog" v-show="show">
        <div class="modal-header" v-if="$slots.header"><slot name="header"></slot></div>
        <div class="modal-body"><slot></slot></div>
        <div class="modal-footer" v-if="$slots.footer"><slot name="footer"></slot></div>
      </div>
    </transition> 
  </div>
</template>

<script>
import VuiOverlay from './overlay'
import $ from '../utils/NodeList.js'

// const noop = () => {}
let zIndex = 999;

export default {
  name: 'vui-modal',
  components: {
    VuiOverlay
  },
  props: {
    show: Boolean,
    type: {
      type: String,
      required: true
    },
    backdrop: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      zIndex: zIndex
    }
  },
  mounted() {
    if (this.show) {
      this.zIndex = (++zIndex)
    }
    $(document.body).toggleClass('modal-open', this.show)
  },
  watch: {
    show(val) {
      this.zIndex = val ? (++zIndex) : (--zIndex)
      $(document.body).toggleClass('modal-open', val)
    }
  }
}
</script>
