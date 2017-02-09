<template>
  <div>
    <vui-header fixed>Switcher</vui-header>
    <page-content>
      <template>
        <vui-switcher :checked="switcherValue.one" @change="handleChange">One</vui-switcher>
        <vui-switcher :checked="switcherValue.two" disabled>Two (disabled)</vui-switcher>
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
        two: true
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

