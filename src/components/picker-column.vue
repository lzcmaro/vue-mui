<template>
  <div class="picker-column">
    <div class="picker-scroller" @click="handleItemClick" :style="columnStyles()" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd" @touchcancel="handleTouchCancel">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vui-picker-column',
  props: {
    name: {
      required: true,
      type: String
    },
    value: {
      required: true,
      type: [String, Object]
    },
    options: {
      required: true,
      type: Array
    },
    columnHeight: {
      required: true,
      type: Number
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
      currentIndex: 0,
      currentValue: this.value,
      isMoving: false,
      startTouchY: 0,
      startScrollerTranslate: 0,
      scrollerTranslate: 0,
      minTranslate: 0,
      maxTranslate: 0
    };
  },
  methods: {
    computeTranslate() {
      let selectedIndex;
      if (typeof this.currentValue === 'object') {
        var arr = [];
        for (var i = 0; i < this.options.length; i++) {
          arr.push(this.options[i].key);
        }
        selectedIndex = arr.indexOf(this.currentValue.key);
      } else {
        selectedIndex = this.options.indexOf(this.currentValue);
      }

      if (selectedIndex < 0) {
        // throw new ReferenceError();
        console.warn(
          'Warning: "' +
            this.name +
            '" doesn\'t contain an option of "' +
            this.currentValue.value +
            '".'
        );
        this.onValueSelected(selectedIndex);
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

    onValueSelected(index) {
      this.currentIndex = index;
      this.currentValue = this.options[index];
      this.computeTranslate();
    },

    handleItemClick(event) {
      this.$emit('click', event);
    },

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

      this.isMoving = false;
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
        this.onValueSelected(activeIndex);
        this.onChange(activeIndex, this.name);
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
    }
  },
  created() {
    this.computeTranslate();
  }
};
</script>

<style lang="css">
</style>
