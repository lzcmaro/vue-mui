<template>
  <div class="checkbox-wrap">
    <input type="checkbox" :value="value" :id="id" class="vui-checkbox" :checked="checked" :disabled="disabled" :readonly="readonly">
    <label :for="id">
      <i class="icon icon-checkbox-checked"></i>
      <i class="icon icon-checkbox-unchecked"></i>
      <slot></slot>
    </label>
  </div>
</template>

<script>
export default {
  name: 'vui-checkbox',
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
  }
}
</script>

<style>
input[type="checkbox"]{
    display: none;
}
.vui-checkbox + label i.icon-checkbox-checked, .vui-checkbox:checked + label i.icon-checkbox-unchecked{
  display: none;
}
.vui-checkbox + label i.icon-checkbox-unchecked, .vui-checkbox:checked + label i.icon-checkbox-checked{
  display: inline-block;
}
input[type="checkbox"][disabled] + label i, input[type="checkbox"][readonly] + label i{
  color: rgba(0, 0, 0, 0.5);
}
</style>
