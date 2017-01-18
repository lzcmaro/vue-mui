<template>
  <div>
    <vui-header fixed>Switcher</vui-header>
    <page-content>
      <template>
        <vui-switcher :checkedState="switcherValue.one" @change="handleChange">One</vui-switcher>
        <vui-switcher :checkedState="switcherValue.two" disabled>Two (disabled)</vui-switcher>
        <vui-switcher :checkedState="switcherValue.three" readonly>Two (readonly)</vui-switcher>
      </template>
    </page-content>
  </div>
</template>

<script>
export default {
  data () {
    return {
      switcherValue: {
        one: false,
        two: true,
        three: false
      }
    }
  },
  methods: {
    handleChange(val) {
      console.info(val)
      this.switcherValue.one = val
    }
  }
}
</script>

