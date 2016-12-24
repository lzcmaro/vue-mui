<template>
  <div class="overlay" :class="transparent ? 'overlay-transparent' : ''" @click="handleClick"></div>  
</template>

<script>
export default {
  name: 'vui-overlay',
  props: {
    transparent: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt)
    }
  }
}
</script>
