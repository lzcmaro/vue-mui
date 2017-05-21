<template>
  <button 
    :class="btnClasses"
    :type="nativeType"
    :disabled="disabled"
    @click="$emit('click', $event)">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'vui-button',
  props: {
    disabled: Boolean,
    nativeType: String,
    plain: Boolean,
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
    },
    size: {
      type: String,
      default: 'normal',
      validator(value) {
        return [
          'small',
          'normal',
          'large'
        ].indexOf(value) > -1
      }
    }
  },
  computed: {
    btnClasses() {
      const classes = {
        'btn': true,
        [`btn-${this.type}`]: true,
        [`btn-${this.size}`]: true,
        'btn-plain': this.plain,
        'btn-disabled': this.disabled
      }
      return classes
    }
  }
}
</script>
