<template>
  <input class="switcher" type="checkbox" :class="switcherClasses" :disabled="disabled" @click.prevent="handleClick" />
</template>

<script>
export default {
  name: 'vui-switcher',
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    switcherClasses() {
      const classes = {
        'disabled': this.disabled,
        'checked': this.checked
      }
      return classes
    }
  },
  methods: {
    handleClick($event) {
      if (this.disabled === true) {
        return
      }
      this.$emit('change', !this.checked)
    }
  }
}
</script>

