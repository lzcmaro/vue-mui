<template>
  <nav class="nav" :class="fixed ? 'nav-fixed' : ''">
    <div class="left"><slot name="left"></slot></div>
    <h3 class="title"><slot></slot></h3>
    <div class="right"><slot name="right"></slot></div>
  </nav>
</template>

<script>
export default {
  name: 'vui-navbar',
  props: {
    fixed: Boolean
  }
}
</script>
