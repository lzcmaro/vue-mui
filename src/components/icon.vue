<template>
  <i :class="'icon icon-' + type" @click="$emit('click', $event)"></i>
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
