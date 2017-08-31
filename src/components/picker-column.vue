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
import swap from '../utils/swap'
import isVisibleElement from '../utils/isVisibleElement'
import getParent from '../utils/getParent'

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
      let selectedIndex = this.getCurrentIndex()
      // 更新picker-scroller的translate值
      this.scrollerTranslate = this.containerHeight / 2 - this.itemHeight / 2 - selectedIndex * this.itemHeight
      // 最小偏移量=最后一个item在中间位置时，它距离picker-column的偏移量
      this.minTranslate = this.containerHeight / 2 - this.itemHeight * this.itemLength + this.itemHeight / 2
      // 最大偏移量=最前面一个item在中间位置时，它距离picker-column的偏移量
      this.maxTranslate = this.containerHeight / 2 - this.itemHeight / 2
    },
    getCurrentIndex() {
      let selectedIndex = 0
      const children = this.$children

      if (children && children.length) {
        for (let index in children) {
          if (this.activeKey === children[index].eventKey) {
            return index
          }
        }
      }
      return selectedIndex
    },
    columnStyles() {
      const translateString = `translate3d(0, ${this.scrollerTranslate}px, 0)`
      const style = {
        MsTransform: translateString,
        MozTransform: translateString,
        OTransform: translateString,
        WebkitTransform: translateString,
        transform: translateString
      }

      if (this.isMoving) {
        style.transitionDuration = 0
      }

      return style
    },
    handleTouchStart(event) {
      this.startTouchY = event.targetTouches[0].pageY
      this.startScrollerTranslate = this.scrollerTranslate
    },
    handleTouchMove(event) {
      const touchY = event.targetTouches[0].pageY
      let nextScrollerTranslate = this.startScrollerTranslate + touchY - this.startTouchY

      this.isMoving = true

      event.preventDefault()
      event.stopPropagation()

      if (nextScrollerTranslate < this.minTranslate) {
        nextScrollerTranslate = this.minTranslate - Math.pow(this.minTranslate - nextScrollerTranslate, 0.8)
      } else if (nextScrollerTranslate > this.maxTranslate) {
        nextScrollerTranslate = this.maxTranslate + Math.pow(nextScrollerTranslate - this.maxTranslate, 0.8)
      }

      this.scrollerTranslate = nextScrollerTranslate
    },
    handleTouchEnd(event) {
      if (!this.isMoving) {
        return
      }

      this.isMoving = false
      this.startTouchY = 0
      this.startScrollerTranslate = 0

      setTimeout(() => {
        let activeIndex

        if (this.scrollerTranslate > this.maxTranslate) {
          activeIndex = 0
        } else if (this.scrollerTranslate < this.minTranslate) {
          activeIndex = this.itemLength - 1
        } else {
          activeIndex = -Math.floor(
            (this.scrollerTranslate - this.maxTranslate) / this.itemHeight
          )
        }

        const eventKey = this.getItemEventKey(activeIndex)
        // 在activeIndex = 0或activeIndex = itemLength - 1时
        // 如果继续拖，它的activeKey不会变，这里需要调用computeTranslate()回复位置
        // 而且为了避免外边没有更新this.activeKey，而导致组件没有复位，这里先调用computeTranslate()
        this.computeTranslate()
        this.$emit('change', eventKey)
      }, 0)
    },
    handleTouchCancel() {
      if (!this.isMoving) {
        return
      }

      this.isMoving = false
      this.startTouchY = this.scrollerTranslate = this.startScrollerTranslate = 0
    },
    getItemEventKey(activeIndex) {
      const children = this.$children
      if (children && children.length) {
        return children[activeIndex] && children[activeIndex].eventKey
      }
    },
    getItemHeight($container) {
      const $item = $container.querySelector('.picker-item')
      return $item ? $item.offsetHeight : 0
    }
  },
  created() {
    if (this.activeKey === undefined && this.divider !== true) {
      console.warn('Missing required prop: "activeKey"')
    }
  },
  updated() {
    const children = this.$children
    // children发生变化时（可能是动态的级联选项），更新this.itemLength，并重新设置元素的translate
    if (children.length !== this.itemLength) {
      this.itemLength = children.length
      this.computeTranslate()
    }
  },
  mounted() {
    // 因为父组件picker会在mounted中重置picker-inner的height值，
    // 这里需要等待下一次渲染完成后才能获取到正确的offsetHeight
    this.$nextTick(() => {
      // 避免picker放到隐藏的元素中，而无法获取到正确的元素高度，这里需要额外处理
      if (isVisibleElement(this.$el) && this.$el.offsetHeight === 0) {
        // 这里把整个picker结构都clone出来，避免它的样式受到影响
        const $picker = getParent(this.$el, '.picker')
        swap($picker, ($wrap) => {
          const $container = $wrap.querySelector('.picker-column')
          this.itemHeight = this.getItemHeight($container)
          this.containerHeight = $container.offsetHeight
        })
      } else {
        this.itemHeight = this.getItemHeight(this.$el)
        this.containerHeight = this.$el.offsetHeight
      }

      this.itemLength = this.$children.length
      this.computeTranslate()
    })
  }
}
</script>
