<template>
  <header class="header" :class="fixed ? 'header-fixed' : ''">
    <div class="pull-left"><slot name="left"></slot></div>
    <h3 class="title"><slot></slot></h3>
    <div class="pull-right"><slot name="right"></slot></div>
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
