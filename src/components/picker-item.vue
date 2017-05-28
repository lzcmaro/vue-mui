<template>
<div class="picker-item" :option="option" :class="selectedItem(option)" @click="handleItemClick" :style="[itemStyle]">
    <slot></slot>
</div>
</div>
</template>

<script>
export default {
  name: 'vui-picker-item',
  props: {
    option: {
      type: [String, Object],
      required: true
    }
  },
  data() {
    return {
      currentValue: this.$parent.value,
      itemStyle: {
        height: this.$parent.itemHeight + 'px',
        lineHeight: this.$parent.itemHeight + 'px'
      }
    };
  },
  methods: {
    selectedItem(option) {
      if (typeof option === 'object') {
        if (!option.key || !option.value) {
          // throw new ReferenceError();
          console.warn('Warning: data must be key and value.');
          return;
        }

        if (option.key === this.$parent.value.key) {
          return 'picker-item-selected';
        }
      }

      if (typeof option === 'string') {
        if (option === this.$parent.value) {
          return 'picker-item-selected';
        }
      }

      return '';
    },
    handleItemClick(e) {
      e.preventDefault();
      if (e.target.innerText !== this.currentValue) {
        this.$emit('click', e, this.$parent.name);
      }
    }
  }
};
</script>
<style lang="css">
</style>
