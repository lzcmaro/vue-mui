<template>
  <transition-group name="toast-pop">
    <vui-overlay key="overlay" v-show="visible" :transparent="true"></vui-overlay>
    <div key="toast" class="toast" :class="type ? ('toast-' + type) : ''" v-show="visible">
      <div class="icon-wrap" v-if="$slots.icon || type"><slot name="icon"><vui-icon :type="type" /></slot></div><label class="text"><slot></slot></label>
    </div>
  </transition-group>
</template>

<script>
import VuiOverlay from './overlay'
import VuiIcon from './icon'

export default {
  name: 'vui-toast',
  compontents: {
    VuiOverlay,
    VuiIcon
  },
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    },
    type: {
      type: String,
      validator(value) {
        return [
          'success',
          'failure'
        ].indexOf(value) > -1
      }
    },
    duration: {
      type: Number,
      default: 3000
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
