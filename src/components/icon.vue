<template>
  <i class="icon" :class="'icon-' + type"></i>
</template>

<script>
export default {
  name: 'vui-icon',
  props: {
    type: {
      type: String,
      required: true
    }
  }
}
</script>
