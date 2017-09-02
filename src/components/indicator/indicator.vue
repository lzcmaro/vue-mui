<template>
  <div class="indicator" :class="{[`indicator-${type}`]: true}" >
    <vui-overlay v-show="show" :transparent="true"></vui-overlay>
    <vui-toast ref="toast" :show="show" @hide="$emit('hide')">
      <div class="icon-wrap">
        <vui-spinner v-if="type==='loading'" type="spinner"></vui-spinner>
        <vui-icon v-else :type="type"></vui-icon>
      </div>
      <slot></slot>
    </vui-toast>
  </div>
</template>

<script>
import VuiOverlay from '@/components/overlay'
import VuiToast from '@/components/toast'
import VuiIcon from '@/components/icon'
import VuiSpinner from '@/components/spinner'

export default {
  name: 'vui-indicator',
  components: {
    VuiOverlay,
    VuiToast,
    VuiIcon,
    VuiSpinner
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
  }
}
</script>
