<template>
  <nav class="nav" :class="fixed ? 'nav-fixed' : ''">
    <div class="pull-left"><slot name="left"></slot></div>
    <h3 class="title"><slot></slot></h3>
    <div class="pull-right"><slot name="right"></slot></div>
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
