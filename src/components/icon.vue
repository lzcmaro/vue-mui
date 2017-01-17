<template>
  <i class="icon" :class="'icon-' + type" @click="handleClick"></i>
</template>

<script>
export default {
  name: 'vui-icon',
  props: {
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    handleClick($evt) {
      this.$emit('click', $evt)
    }
  }
}
</script>
