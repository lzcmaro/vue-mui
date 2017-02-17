<template>
  <div>
    <vui-header fixed>Radio</vui-header>
    <page-content>
      <vui-radio value='RadioSingle' :checked='ifCheck' :disabled='ifDisabled' @change='singleChanged'></vui-radio>
      <vui-radio-group :model='groupValue' @change='groupChanged'>
        <vui-radio value='groupValue1' :disabled='ifGroupDisabled'>radio1</vui-radio>
        <vui-radio value='groupValue2'>radio2</vui-radio>
        <vui-radio value='groupValue3'>radio3</vui-radio>
      </vui-radio-group>
    </page-content>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ifCheck: false,
      ifDisabled: false,
      groupValue: 'groupValue2',
      ifGroupDisabled: true
    }
  },
  methods: {
    singleChanged(val) {
      this.ifCheck = val
      console.log(this.ifCheck)
    },
    groupChanged(val) {
      this.groupValue = val
    }
  }
}
</script>
