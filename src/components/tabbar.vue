<template>
  <div class="nav nav-tabbar">
    <ul><slot></slot></ul>
  </div>
</template>

<script>
export default {
  name: 'vui-tabbar',
  props: {
    activeKey: {
      type: [Number, String],
      required: true
    }
  }
}
</script>
