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
    // this.updateModel()
  },
  methods: {
    // updateModel() {
    //   const model = this.model
    //   this.$children.forEach((child) => {
    //     child.selected = model === child.value
    //     child.group = true
    //   })
    // }
  }
}
</script>