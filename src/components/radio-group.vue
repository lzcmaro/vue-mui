<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'vui-radio-group',
  props: {
    model: {
      type: [String, Number],
      default: ''
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>