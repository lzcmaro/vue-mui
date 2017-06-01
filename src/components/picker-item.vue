<template>
  <label class="picker-item" :class="{'active': $parent.activeKey === eventKey}" :data-key="eventKey">
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: 'vui-picker-item',
  props: {
    eventKey: {
      type: [Number, String],
      required: true
    }
  }
}
</script>
