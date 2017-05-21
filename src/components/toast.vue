<template>
  <div class="toast">
    <transition name="toast-pop">
      <div class="toast-inner" v-show="visible">
        <div class="toast-icon-wrap" v-if="$slots.icon"><slot name="icon"></slot></div><label class="toast-text"><slot></slot></label>
      </div>
    </transition>
  </div>
</template>

<script>
import VuiIcon from './icon'

export default {
  name: 'vui-toast',
  compontents: {
    VuiIcon
  },
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    },
    duration: {
      type: Number,
      default: 2500
    }
  },
  data() {
    return {
      visible: false
    }
  },
  watch: {
    show(val) {
      this.visible = val
      this.timer && clearTimeout(this.timer)

      // 因为toast组件，默认是自动隐藏的，这里避免外部在toggle-visible处理后，重新传值过来，而导致死循环的问题
      if (val === true) {
        this.timer = setTimeout(() => {
          this.visible = !val
          this.$emit('toggle-visible', !val)
        }, this.duration)
      }
    }
  }
}
</script>
