<template>
  <i class="icon" :class="'icon-' + this.type"></i>
</template>

<script>
export default {
  name: 'vui-icon',
  props: {
    type: String
  }
}
</script>
