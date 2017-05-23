<template>
  <div class="picker-column">
    <div class="picker-scroller"
    :style="columnStyles()"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    @touchcancel="handleTouchCancel">
      <div class="picker-item" :class="option === value ? 'picker-item-selected' : ''" v-for="option in options" @click="handleItemClick(option,name)" :style="[itemStyle]">{{option}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'vue-picker-item',
  props: {
    options: {
      required: true,
      type: Array
    },
    name: {
      required: true,
      type: String
    },
    value: {
      required: true
    },
    itemHeight: {
      required: true,
      type: Number
    },
    columnHeight: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      currentValue: this.value,
      itemStyle: {
        height: this.itemHeight + 'px',
        lineHeight: this.itemHeight + 'px'
      },
      isMoving: false,
      startTouchY: 0,
      startScrollerTranslate: 0,
      scrollerTranslate: 0,
      minTranslate: 0,
      maxTranslate: 0
    };
  },
  methods: {
    columnStyles() {
      const translateString = `translate3d(0, ${this.scrollerTranslate}px, 0)`;
      const style = {
        MsTransform: translateString,
        MozTransform: translateString,
        OTransform: translateString,
        WebkitTransform: translateString,
        transform: translateString
      };
      if (this.isMoving) {
        style.transitionDuration = '0ms';
      }

      return style;
    },

    computeTranslate() {
      let selectedIndex = this.options.indexOf(this.currentValue);
      if (selectedIndex < 0) {
        // throw new ReferenceError();
        console.warn(
          'Warning: "' +
            this.name +
            '" doesn\'t contain an option of "' +
            this.currentValue +
            '".'
        );
        this.onValueSelected(this.options[0]);
        selectedIndex = 0;
      }

      this.scrollerTranslate =
        this.columnHeight / 2 -
        this.itemHeight / 2 -
        selectedIndex * this.itemHeight;
      this.minTranslate =
        this.columnHeight / 2 -
        this.itemHeight * this.options.length +
        this.itemHeight / 2;
      this.maxTranslate = this.columnHeight / 2 - this.itemHeight / 2;
    },

    onValueSelected(v) {
      console.log('value____', v);
      console.log('name', this.name);

      console.log('parent_____', this.$parent);
      this.currentValue = v;
      this.$parent.valueGroups[this.name] = v;
      this.computeTranslate();
    },

    handleTouchStart(event) {
      const startTouchY = event.targetTouches[0].pageY;

      this.startTouchY = startTouchY;
      this.startScrollerTranslate = this.scrollerTranslate;
    },

    handleTouchMove(event) {
      event.preventDefault();

      const touchY = event.targetTouches[0].pageY;

      if (!this.isMoving) {
        this.isMoving = true;
      }

      let nextScrollerTranslate =
        this.startScrollerTranslate + touchY - this.startTouchY;
      if (nextScrollerTranslate < this.minTranslate) {
        nextScrollerTranslate =
          this.minTranslate -
          Math.pow(this.minTranslate - nextScrollerTranslate, 0.8);
      } else if (nextScrollerTranslate > this.maxTranslate) {
        nextScrollerTranslate =
          this.maxTranslate +
          Math.pow(nextScrollerTranslate - this.maxTranslate, 0.8);
      }

      this.scrollerTranslate = nextScrollerTranslate;
    },

    handleTouchEnd() {
      if (!this.isMoving) {
        return;
      }

      this.isMoving = 0;
      this.startTouchY = 0;
      this.startScrollerTranslate = 0;

      setTimeout(() => {
        let activeIndex;
        if (this.scrollerTranslate > this.maxTranslate) {
          activeIndex = 0;
        } else if (this.scrollerTranslate < this.minTranslate) {
          activeIndex = this.options.length - 1;
        } else {
          activeIndex = -Math.floor(
            (this.scrollerTranslate - this.maxTranslate) / this.itemHeight
          );
        }
        this.onValueSelected(this.options[activeIndex]);
      }, 0);
    },
    handleTouchCancel() {
      if (!this.isMoving) {
        return;
      }

      this.isMoving = false;
      this.startTouchY = 0;
      this.startScrollerTranslate = 0;
      this.scrollerTranslate = this.startScrollerTranslate;
    },

    handleItemClick(option, name) {
      console.log('option', option);
      console.log('name', name);
      this.$emit('click', option, name);

      console.log('value:', this.currentValue);

      if (option !== this.currentValue) {
        this.onValueSelected(option);
      }
    }
  },

  created() {
    this.computeTranslate();
  }
};
</script>

<style lang="css">
</style>
