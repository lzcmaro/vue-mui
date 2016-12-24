<template>
  <header class="header" :class="{'header-fixed': fixed}">
    <div class="left"><slot name="left"></slot></div>
    <h3 class="title"><slot></slot></h3>
    <div class="right"><slot name="right"></slot></div>
  </header>
</template>

<script>
export default {
  name: 'vui-header',
  props: {
    fixed: Boolean
  }
}
</script>
