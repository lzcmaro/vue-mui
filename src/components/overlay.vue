<template>
  <transition name="overlay">
    <div class="overlay" :class="transparent ? 'overlay-transparent' : ''" v-if="visible" @click="click()">
      <div class="inner" :style="{ opacity: opacity }"></div>
    </div>
  </transition>  
</template>

<script>
export default {
  name: 'vui-overlay',
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: true
    },
    click: {
      type: Function,
      default: () => {}
    },
    transparent: {
      type: Boolean,
      default: false
    },
    opacity: {
      type: Number,
      default: 1
    }
  }
}
</script>
