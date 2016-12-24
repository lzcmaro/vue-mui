<template>
  <div class="tab-item" :class="{'active': active}" @click="handleClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'vui-tab-item',
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt)
    }
  },
  mounted() {
    console.log(this)
  }
}
</script>
