<template>
  <span class="badge" :class="'badge-' + type">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'vui-badge',
  props: {
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
