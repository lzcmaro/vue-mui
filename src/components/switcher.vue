<template>
  <input class="switcher" type="checkbox" :class="switcherClasses" :disabled="disabled" :readonly="readonly?'readonly':''" @click="handleClick" />
</template>
<script>
export default {
  name: 'vui-switcher',
  compontents: {},
  props: {
    checkedState: Boolean,
    disabled: Boolean,
    readonly: Boolean
  },
  data() {
    return {
      visible: this.checkedState || false
    }
  },
  watch: {
    checkedState(val) {
      this.visible = val
    }
  },
  computed: {
    switcherClasses() {
      const classes = {
        'switcher-disabled': this.disabled,
        'switcher-readonly': this.readonly,
        'checked': this.visible
      }
      return classes
    }
  },
  methods: {
    handleClick($event) {
      $event.preventDefault()
      // this.visible = !this.visible
      this.$emit('change', !this.visible)
    }
  }
}
</script>

