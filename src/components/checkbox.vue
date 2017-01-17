<template>
  <div class="checkbox">
    <input type="checkbox"
     :value="value"
     :id="id"
     :checked="checked"
     :disabled="disabled"
     :readonly="readonly"
     @change="changeCheck">
    <label :for="id">
      <vui-icon type="checkbox-checked"></vui-icon>
      <vui-icon type="checkbox-unchecked"></vui-icon>
      <slot></slot>
    </label>
  </div>
</template>

<script>
import VuiIcon from './icon'
export default {
  name: 'vui-checkbox',
  components: {
    VuiIcon
  },
  props: {
    value: {
      type: [String, Number]
    },
    id: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    checked: {
      type: Boolean
    },
    readonly: {
      type: Boolean
    }
  },
  methods: {
    changeCheck: function($event) {
      if (this.disabled || this.readonly) {
        return false
      } else {
        this.$emit('change', $event.target.checked)
      }
    }
  }
}
</script>
