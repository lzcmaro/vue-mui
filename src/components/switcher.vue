<template>
  <input class="switcher" type="checkbox" :class="switcherClasses" :disabled="disabled" @click="handleClick" />
</template>
<script>
export default {
  name: 'vui-switcher',
  compontents: {},
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
  data() {
    return {
      visible: this.checked || false
    }
  },
  watch: {
    checked(val) {
      this.visible = val
    }
  },
  computed: {
    switcherClasses() {
      const classes = {
        'switcher-disabled': this.disabled,
        'checked': this.visible
      }
      return classes
    }
  },
  methods: {
    handleClick($event) {
      $event.preventDefault()
      if (this.disabled === true) {
        return
      }
      // this.visible = !this.visible
      this.$emit('change', !this.visible)
    }
  }
}
</script>

