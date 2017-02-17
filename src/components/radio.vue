<template>
  <label @click="changeRadio">
    <i class="v-radio-icon icon" :class="iconClasses" :disabled="disabled"></i>
    <slot>{{value}}</slot>
  </label>
</template>

<script>
import VuiIcon from './icon'
export default {
  name: 'vui-radio',
  compontents: {
    VuiIcon
  },
  props: {
    value: {
      type: [String, Number]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean
    }
  },
  data() {
    return {
      selected: false,
      group: false
    }
  },
  mounted() {
    if (this.$parent.$options.name === 'vui-radio-group') {
      this.group = true
    }
  },
  computed: {
    iconClasses() {
      const classes = {
        'disabled': this.disabled,
        'icon-radio-checked-fill': this.checked || this.$parent.model === this.value,
        'icon-radio-unchecked': !(this.checked || this.$parent.model === this.value)
      }
      return classes
    }
  },
  methods: {
    changeRadio() {
      if (this.disabled || this.checked) {
        return false
      }
      if (this.group) {
        this.$parent.$emit('change', this.value)
      } else {
        this.$emit('change', !this.checked)
      }
    }
  }
}
</script>
