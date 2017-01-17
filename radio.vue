<template>
  <div>
    <vui-header fixed>Radio</vui-header>
    <page-content>
      <vui-radio value='RadioSingle' :checked='ifCheck' :disabled='ifDisabled' @change='singleChanged'></vui-radio>
    	<vui-radio value='RadioSingle2' :checked='ifCheck2' :disabled='ifDisabled2' @change='singleChanged2'></vui-radio>
    </page-content>
    <page-content>
      <vui-radio-group :model='groupValue' @change='groupChanged'>
        <vui-radio value='groupValue1' :disabled='ifGroupDisabled'>第一个radio</vui-radio>
        <vui-radio value='groupValue2'>第二个radio</vui-radio>
        <vui-radio value='groupValue3'>第三个radio</vui-radio>
      </vui-radio-group>
    </page-content>
  </div>
</template>

<script>
export default {
	data() {
    return {
      ifCheck: true,
      ifDisabled: false,
      ifCheck2: false,
      ifDisabled2: true,
      groupValue: 'groupValue2',
      ifGroupDisabled: true
    }
	},
  methods: {
    singleChanged(val) {
      this.ifCheck = val
    },
    singleChanged2(val) {
      this.ifCheck2 = val
    },
    groupChanged(val) {
      this.groupValue = val
    }
  }
}
</script>
