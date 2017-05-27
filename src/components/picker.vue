<template>
  <div class="picker-inline-container">
      <div class="picker-container" :style="'height:'+ height + 'px'">
          <div class="picker-inner">
            <slot></slot>
            <div class="picker-highlight" :style="highlightStyles()"></div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'vui-picker',
  props: {
    itemHeight: {
      type: Number,
      default: 36
    },
    height: {
      type: Number,
      default: 216
    }
  },

  methods: {
    highlightStyles() {
      return (
        'height:' +
        this.itemHeight +
        'px;margin-top:' +
        -(this.itemHeight / 2) +
        'px'
      );
    },

    handleItemClick(option, name) {
      console.log('parent option:', option);
      console.log('parent name:', name);
      this.$emit('click', option, name);
    }
  }
};

</script>

<style lang="css">

</style>
