<template>
  <vui-icon class="spinner" :type="type"></vui-icon>
</template>

<script>
import VuiIcon from './icon'

export default {
  name: 'vui-spinner',
  components: {
    VuiIcon
  },
  props: {
    type: {
      type: String,
      default: 'spinner',
      validator(value) {
        return [
          'spinner',
          'spinner1',
          'spinner2',
          'spinner3'
        ].indexOf(value) > -1
      }
    }
  }
}
</script>
