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
    },
    value: {
      required: true
    },
    itemHeight: {
      required: true,
      type: Number
    },
    onChange: {
      required: true,
      type: Function
    }
  },
  data() {
    return {
      currentValue: this.value,
      itemStyle: {
        height: this.itemHeight + 'px',
        lineHeight: this.itemHeight + 'px'
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

        if (option.key === this.value.key) {
          return 'picker-item-selected';
        }
      }

      if (typeof option === 'string') {
        if (option === this.value) {
          return 'picker-item-selected';
        }
      }

      return '';
    },
    handleItemClick(e) {
      if (e.target.innerText !== this.currentValue) {
        this.$emit('click', e);
      }
    }
  }
};

</script>
<style lang="css">
</style>
