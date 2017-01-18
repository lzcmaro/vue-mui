<template>
  <li :class="{'active': $parent.activeKey === eventKey}" @click="handleClick">
    <div class="icon-wrap" v-if="$slots.icon"><slot name="icon"></slot></div>
    <label class="title"><slot></slot></label>
  </li>
</template>

<script>
export default {
  name: 'vui-tab-item',
  props: {
    eventKey: {
      type: [String, Number],
      required: true
    }
  },
  methods: {
    handleClick(evt) {
      // 这里触发的是父组件的事件，如下：
      // <vui-tabs @change>...</vui-tabs>
      this.$parent.$emit('change', evt, this.eventKey)
    }
  }
}
</script>
