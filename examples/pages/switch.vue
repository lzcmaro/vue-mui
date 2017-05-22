<template>
  <div>
    <vui-header fixed>Switch</vui-header>
    <page-content>
      <template>
        <vui-switch :checked="switchValue.one" @change="handleChange">One</vui-switch>
        <vui-switch :checked="switchValue.two" disabled>Two (disabled)</vui-switch>
      </template>
    </page-content>
  </div>
</template>

<script>
export default {
  data () {
    return {
      switchValue: {
        one: false,
        two: true
      }
    }
  },
  methods: {
    handleChange(val) {
      console.info(val)
      this.switchValue.one = val
    }
  }
}
</script>

