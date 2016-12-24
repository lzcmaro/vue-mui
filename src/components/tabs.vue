<template>
  <div class="nav nav-tabs" :class="{ 'nav-fixed': fixed }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'vui-tabs',
  props: {
    fixed: {
      type: Boolean,
      default: false
    },
    activeKey: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    console.log(this.activeKey, this.$slots.default)
  }
}
</script>
