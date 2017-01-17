<template>
  <label>
    <span :class="wrapClasses">
        <i class="icon" :class="iconClasses"></i>
        <input 
          type="radio"
          class="mui-radio-input"
          :disabled="disabled"
          :checked="group ? $parent.model === value : checked"
          @change="changeRadio">
    </span>
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
    wrapClasses() {
      if (this.disabled) {
        return 'vui-radio-disabled'
      }
    },
    iconClasses() {
      if (this.checked || this.$parent.model === this.value) {
        return 'icon-radio-checked-fill'
      } else {
        return 'icon-radio-unchecked'
      }
    }
  },
  methods: {
    changeRadio($event) {
      if (this.disabled) {
        return false
      }
      if (this.group) {
        this.$parent.$emit('change', this.value)
      } else {
        this.$emit('change', $event.target.checked)
      }
    }
  }
}
</script>
