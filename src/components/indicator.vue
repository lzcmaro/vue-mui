<template>
  <div class="indicator" :class="{[`indicator-${type}`]: true}" >
    <vui-overlay v-show="show" :transparent="true"></vui-overlay>
    <vui-toast :show="show" @toggle-visible="toggleVisible">
      <vui-icon :type="type === 'loading' ? 'spinner' : type" slot="icon"></vui-icon>
      <slot></slot>
    </vui-toast>
  </div>    
</template>

<script>
import VuiOverlay from './overlay'
import VuiToast from './toast'
import VuiIcon from './icon'

export default {
  name: 'vui-indicator',
  components: {
    VuiOverlay,
    VuiToast,
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
      required: true,
      validator(value) {
        return [
          'loading',
          'success',
          'failure',
          'warning'
        ].indexOf(value) > -1
      }
    }
  },
  methods: {
    toggleVisible(val) {
      this.$emit('toggle-visible', val)
    }
  }
}
</script>
