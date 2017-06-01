<template>
  <div class="picker-column" :class="{divider: divider}">
    <slot v-if="divider"></slot>
    <div v-else ref="scoller" class="picker-scroller" :style="columnStyles()"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @touchcancel="handleTouchCancel">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vui-picker-column',
  props: {
    activeKey: [Number, String],
    divider: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      containerHeight: 0,
      itemHeight: 0,
      itemLength: 0,
      isMoving: false,
      startTouchY: 0,
      startScrollerTranslate: 0,
      scrollerTranslate: 0,
      minTranslate: 0,
      maxTranslate: 0
    }
  },
  watch: {
    activeKey(value) {
      this.computeTranslate()
    }
  },
  methods: {
    computeTranslate() {
      let selectedIndex = this.getCurrentIndex();
      // 更新picker-scroller的translate值
      this.scrollerTranslate = this.containerHeight / 2 - this.itemHeight / 2 - selectedIndex * this.itemHeight;
      // 最小偏移量=最后一个item在中间位置时，它距离picker-column的偏移量
      this.minTranslate = this.containerHeight / 2 - this.itemHeight * this.itemLength + this.itemHeight / 2;
      // 最大偏移量=最前面一个item在中间位置时，它距离picker-column的偏移量
      this.maxTranslate = this.containerHeight / 2 - this.itemHeight / 2;
    },
    getCurrentIndex() {
      let selectedIndex = 0;
      const children = this.$children

      if (children && children.length) {
        for (let index in children) {
          if (this.activeKey === children[index].eventKey) {
            return index
          }
        }
      }
      return selectedIndex;
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
        style.transitionDuration = 0;
      }

      return style;
    },
    handleTouchStart(event) {
      this.startTouchY = event.targetTouches[0].pageY;
      this.startScrollerTranslate = this.scrollerTranslate;
    },
    handleTouchMove(event) {
      event.preventDefault();
      event.stopPropagation();
      this.isMoving = true;
      const touchY = event.targetTouches[0].pageY;
      let nextScrollerTranslate = this.startScrollerTranslate + touchY - this.startTouchY;
      if (nextScrollerTranslate < this.minTranslate) {
        nextScrollerTranslate = this.minTranslate - Math.pow(this.minTranslate - nextScrollerTranslate, 0.8);
      } else if (nextScrollerTranslate > this.maxTranslate) {
        nextScrollerTranslate = this.maxTranslate + Math.pow(nextScrollerTranslate - this.maxTranslate, 0.8);
      }

      this.scrollerTranslate = nextScrollerTranslate;
    },
    handleTouchEnd(event) {
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
          // 在activeIndex = 0时，如果继续往下拖，它的activeKey不会变，这里需要调用computeTranslate()回复位置
          this.computeTranslate()
        } else if (this.scrollerTranslate < this.minTranslate) {
          activeIndex = this.itemLength - 1;
          this.computeTranslate()
        } else {
          activeIndex = -Math.floor(
            (this.scrollerTranslate - this.maxTranslate) / this.itemHeight
          );
        }

        const eventKey = this.getItemEventKey(activeIndex)
        this.$emit('change', eventKey)
      }, 0);
    },
    handleTouchCancel() {
      if (!this.isMoving) {
        return;
      }

      this.isMoving = false;
      this.startTouchY = this.scrollerTranslate = this.startScrollerTranslate = 0;
    },
    getItemEventKey(activeIndex) {
      const children = this.$children
      if (children && children.length) {
        return children[activeIndex] && children[activeIndex].eventKey
      }
    }
  },
  created() {
    if (this.activeKey === undefined && this.divider !== true) {
      console.warn('Missing required prop: "activeKey"')
    }
  },
  mounted() {
    // 因为父组件picker会在mounted中重置picker-inner的height值，
    // 这里需要等待下一次渲染完成后才能获取到正确的clientHeight
    this.$nextTick(() => {
      const $item = this.$el.querySelector('.picker-item')
      $item && (this.itemHeight = $item.clientHeight)
      this.containerHeight = this.$el.clientHeight
      this.itemLength = this.$children.length
      this.computeTranslate()
    })
  }
}
</script>
