<template>
  <vui-button class="btn-actionsheet" :type="type" size="large" :disabled="disabled" @click="$emit('click', $event)">
    <slot></slot>
  </vui-button>
</template>

<script>
import VuiButton from './button'
export default {
  name: 'vui-action-sheet-button',
  components: {
    VuiButton
  },
  props: {
    disabled: Boolean,
    type: {
      type: String,
      default: 'default',
      validator(value) {
        return [
          'default',
          'danger',
          'primary'
        ].indexOf(value) > -1
      }
    }
  }
}
</script>
