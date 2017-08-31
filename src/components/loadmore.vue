<template>
  <div class="loadmore">
    <div class="loadmore-inner" :class="{'dropped': touchEnd}" :style="{'transform': 'translate3d(0, ' + translate + 'px, 0)'}">
      <slot name="top">
        <div class="loadmore-top" v-if="pulldown">
          <vui-spinner type="spinner2" v-show="topStatus === 'loading'"></vui-spinner>
          <vui-icon type="arrow-down" :class="{[topStatus]: topStatus}" v-show="topStatus !== 'loading' && topStatus !== 'nomore'"></vui-icon>
          {{pulldownText[topStatus]}}
        </div>
      </slot>
      <slot></slot>
      <slot name="bottom">
        <div class="loadmore-bottom" v-if="pullup">
          <vui-spinner type="spinner2" v-show="bottomStatus === 'loading'"></vui-spinner>
          <vui-icon type="arrow-up" :class="{[bottomStatus]: bottomStatus}" v-show="bottomStatus !== 'loading' && bottomStatus !== 'nomore'"></vui-icon>
          {{pullupText[bottomStatus]}}
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import VuiIcon from './icon'
import VuiSpinner from './spinner'

const STATUS_IDLE = 'idle'
const STATUS_FLIP = 'flip'
const STATUS_LOADING = 'loading'
const STATUS_NO_MORE = 'nomore'
const DRIECTION_DOWN = 'down'
const DRIECTION_UP = 'up'
const TOP_HEIGHT = 40

export default {
  name: 'vui-loadmore',
  components: {
    VuiIcon,
    VuiSpinner
  },
  props: {
    /**
     * touch move 可拖动的最大偏移量，0为不限制
     */
    maxDistance: {
      type: Number,
      default: 0
    },
    pulldown: {
      type: Boolean,
      default: true
    },
    pulldownStatus: {
      type: String,
      default: STATUS_IDLE,
      validator(value) {
        return [
          STATUS_IDLE,
          STATUS_FLIP,
          STATUS_LOADING,
          STATUS_NO_MORE
        ].indexOf(value) > -1
      }
    },
    pulldownText: {
      type: Object,
      default() {
        return {
          [STATUS_IDLE]: '下拉可以刷新',
          [STATUS_FLIP]: '松开即可刷新',
          [STATUS_LOADING]: '正在加载中...',
          [STATUS_NO_MORE]: '暂无更多数据'
        }
      }
    },
    /**
     * pulldown 事件的触发边界（touch move拖动的偏移量）
     */
    pulldownDistance: {
      type: Number,
      default: 60
    },
    pullup: {
      type: Boolean,
      default: false
    },
    pullupStatus: {
      type: String,
      default: STATUS_IDLE,
      validator(value) {
        return [
          STATUS_IDLE,
          STATUS_FLIP,
          STATUS_LOADING,
          STATUS_NO_MORE
        ].indexOf(value) > -1
      }
    },
    pullupText: {
      type: Object,
      default() {
        return {
          [STATUS_IDLE]: '上拉可以刷新',
          [STATUS_FLIP]: '松开即可刷新',
          [STATUS_LOADING]: '正在加载中...',
          [STATUS_NO_MORE]: '暂无更多数据'
        }
      }
    },
    /**
     * pullup 事件的触发边界（touch move拖动的偏移量）
     */
    pullupDistance: {
      type: Number,
      default: 60
    }
  },
  data() {
    return {
      /**
       * 用于touch move时，给loadmore-inner设置的translate3d的偏移量
       */
      translate: 0,
      startY: 0,
      currentY: 0,
      startScrollTop: 0,
      /**
       * touchEnd事件结束后的标识
       * loadmore-inner绑定该值，添加dropped样式，以便它在重设translate为0时，有动态效果
       */
      touchEnd: false,
      /**
       * 是否到了bottom边界
       */
      bottomReached: false,
      /**
       * touch move移动的方向
       */
      direction: null,
      topStatus: STATUS_IDLE,
      bottomStatus: STATUS_IDLE
    }
  },
  watch: {
    pulldownStatus(val) {
      if (this.topStatus === STATUS_LOADING && val === STATUS_IDLE || val === STATUS_NO_MORE) {
        // 为出现更友好的动态效果，这里延时更新
        return setTimeout(() => {
          this.translate = 0
          this.topStatus = val
        }, 200)
      }
      this.topStatus = val
    },
    pullupStatus(val) {
      if (this.bottomStatus === STATUS_LOADING && val === STATUS_IDLE || val === STATUS_NO_MORE) {
        // 为出现更友好的动态效果，这里延时更新
        return setTimeout(() => {
          this.translate = 0
          this.bottomStatus = val
        }, 200)
      }
      this.bottomStatus = val
    }
  },
  methods: {
    getScrollEventTarget(element) {
      let currentNode = element
      while (currentNode && currentNode.tagName !== 'HTML' &&
        currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
        let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY
        if (overflowY === 'scroll' || overflowY === 'auto') {
          return currentNode
        }
        currentNode = currentNode.parentNode
      }
      return window
    },
    getScrollTop(element) {
      if (element === window) {
        return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop)
      } else {
        return element.scrollTop
      }
    },
    checkBottomReached() {
      if (this.scrollEventTarget === window) {
        return document.body.scrollTop + document.documentElement.clientHeight >= document.body.scrollHeight
      } else {
        return this.$el.getBoundingClientRect().bottom <= this.scrollEventTarget.getBoundingClientRect().bottom + 1
      }
    },
    bindTouchEvents() {
      this.$el.addEventListener('touchstart', this.handleTouchStart)
      this.$el.addEventListener('touchmove', this.handleTouchMove)
      this.$el.addEventListener('touchend', this.handleTouchEnd)
    },
    handleTouchStart(event) {
      this.startY = event.touches[0].clientY
      this.startScrollTop = this.getScrollTop(this.scrollEventTarget)
      this.touchEnd = false
      this.bottomReached = false

      // 重置status为idle
      if (this.topStatus !== STATUS_LOADING && this.topStatus !== STATUS_NO_MORE) {
        this.topStatus = STATUS_IDLE
      }
      if (this.bottomStatus !== STATUS_LOADING && this.bottomStatus !== STATUS_NO_MORE) {
        this.bottomStatus = STATUS_IDLE
      }
    },
    handleTouchMove(event) {
      const distanceIndex = 2
      const boundingClientRect = this.$el.getBoundingClientRect()
      if (this.startY < boundingClientRect.top && this.startY > boundingClientRect.bottom) {
        return
      }

      this.currentY = event.touches[0].clientY
      // touch move移动的距离
      const distance = (this.currentY - this.startY) / distanceIndex
      // touch move移动的方向
      this.direction = distance > 0 ? DRIECTION_DOWN : DRIECTION_UP

      // pulldown
      if (this.pulldown && this.direction === DRIECTION_DOWN &&
        this.getScrollTop(this.scrollEventTarget) === 0 && this.topStatus !== STATUS_LOADING) {
        event.preventDefault()
        event.stopPropagation()

        // 设置translate
        if (this.maxDistance > 0) {
          this.translate = distance <= this.maxDistance ? distance - this.startScrollTop : this.translate
        } else {
          this.translate = distance - this.startScrollTop
        }
        if (this.translate < 0) {
          this.translate = 0
        }

        // 更新topStatus
        // 当topStatus=nomore时，不处理
        if (this.topStatus !== STATUS_NO_MORE) {
          const status = this.translate >= this.pulldownDistance ? STATUS_FLIP : STATUS_IDLE
          this.$emit('pulldown-status-change', status)
          this.topStatus = status
        }
      }

      // pullup时，更新bottomReached的值，以便下边判断是否到了bottom边界
      if (this.direction === DRIECTION_UP) {
        this.bottomReached = this.bottomReached || this.checkBottomReached()
      }

      // pullup
      if (this.pullup && this.direction === DRIECTION_UP &&
        this.bottomReached && this.bottomStatus !== STATUS_LOADING) {
        event.preventDefault()
        event.stopPropagation()

        if (this.maxDistance > 0) {
          this.translate = Math.abs(distance) <= this.maxDistance
            ? this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance : this.translate
        } else {
          this.translate = this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance
        }
        if (this.translate > 0) {
          this.translate = 0
        }

        // 更新bottomStatus
        // 当bottomStatus=nomore时，不处理
        if (this.bottomStatus !== STATUS_NO_MORE) {
          const status = -this.translate >= this.pullupDistance ? STATUS_FLIP : STATUS_IDLE
          this.$emit('pullup-status-change', status)
          this.bottomStatus = status
        }
      }
    },
    handleTouchEnd() {
      this.touchEnd = true

      // pulldown
      if (this.direction === DRIECTION_DOWN && this.getScrollTop(this.scrollEventTarget) === 0 && this.translate > 0) {
        if (this.topStatus === STATUS_FLIP) {
          this.translate = TOP_HEIGHT
          this.topStatus = STATUS_LOADING
          this.$emit('pulldown-status-change', STATUS_LOADING)
          this.$emit('pulldown')
        } else {
          this.translate = 0
        }
      }

      // pullup
      if (this.direction === DRIECTION_UP && this.bottomReached && this.translate < 0) {
        this.bottomReached = false
        if (this.bottomStatus === STATUS_FLIP) {
          this.translate = -TOP_HEIGHT
          this.bottomStatus = STATUS_LOADING
          this.$emit('pullup-status-change', STATUS_LOADING)
          this.$emit('pullup')
        } else {
          this.translate = 0
        }
      }
    }
  },
  mounted() {
    this.scrollEventTarget = this.getScrollEventTarget(this.$el)
    if (this.pulldown || this.pullup) {
      this.bindTouchEvents()
    }
  }
}
</script>
