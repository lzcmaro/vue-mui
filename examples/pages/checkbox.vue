<template>
  <div>
    <vui-header fixed>Checkbox</vui-header>
    <page-content>
      <vui-checkbox v-model="checkboxValue.one" value="one" id="one" checked>One</vui-checkbox>
      <vui-checkbox v-model="checkboxValue.two" value="two" disabled checked>Two (disabled)</vui-checkbox>
      <vui-checkbox v-model="checkboxValue.three" value="three" readonly>Three (readonly)</vui-checkbox>
    </page-content>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkboxValue: {
        one: null,
        two: 'two',
        three: null
      }
    }
  }
}
</script>
