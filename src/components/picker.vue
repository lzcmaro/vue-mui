<script>
import swap from '../utils/swap'
import isVisibleElement from '../utils/isVisibleElement'

const DETAULT_VISIBLE_ITEMS = 3

export default {
  name: 'vui-picker',
  props: {
    visibleItemCount: {
      type: Number,
      default: DETAULT_VISIBLE_ITEMS,
      validator(value) {
        // 奇数，并且大于等于DETAULT_VISIBLE_ITEMS
        return value >= DETAULT_VISIBLE_ITEMS && value % 2 === 1
      }
    }
  },
  data() {
    return {
      // 缓存当前所有picker-column的activeKey值，以便在handleChange中回传到外边
      activeKeys: []
    }
  },
  methods: {
    handleChange(columnIndex, eventKey) {
      this.activeKeys[columnIndex] = eventKey
      this.$emit('change', this.activeKeys)
    },
    getItemHeight($container) {
      const $item = $container.querySelector('.picker-column .picker-item')
      return $item ? $item.offsetHeight : 0
    }
  },
  render(h) {
    const $slots = this.$slots
    let $slotHeader = $slots.header
    let $slotFooter = $slots.footer
    let $slotDefault = $slots.default
    let columnIndex = 0

    if ($slotHeader && $slotHeader.length) {
      $slotHeader = (
        <div class="picker-header">{$slotHeader}</div>
      )
    } else {
      $slotHeader = null
    }

    if ($slotFooter && $slotFooter.length) {
      $slotFooter = (
        <div class="picker-footer">{$slotFooter}</div>
      )
    } else {
      $slotFooter = null
    }

    if ($slotDefault && $slotDefault.length) {
      // 遍历this.$slots.default，如果为picker-column，为它注册change事件
      $slotDefault.forEach((slot) => {
        let componentOptions = slot.componentOptions
        // 由于无法判断当前component是否为picker-column，这里简单的判断它是否为vue component
        // 排除divider不为false的picker-column项
        if (componentOptions && (componentOptions.propsData.divider === undefined || componentOptions.propsData.divider === false)) {
          this.activeKeys[columnIndex] = componentOptions.propsData.activeKey
          componentOptions.listeners = {
            ...componentOptions.listeners,
            // 为方便在handleChange统一处理回调，这里给它添加一个picker-column索引值
            change: this.handleChange.bind(this, columnIndex)
          }
          columnIndex += 1
        }
      })
    }

    return (
      <div class="picker">
        {$slotHeader}
        <div ref="inner" class="picker-inner">
          {$slotDefault}
          <div class="picker-highlight"></div>
        </div>
        {$slotFooter}
      </div>
    )
  },
  mounted() {
    const $inner = this.$refs.inner
    let itemHeight

    // 避免picker放到隐藏的元素中，而无法获取到正确的元素高度，这里需要额外处理
    if (isVisibleElement(this.$el) && this.$el.offsetHeight === 0) {
      swap(this.$el, ($wrap) => {
        itemHeight = this.getItemHeight($wrap)
      })
    } else {
      itemHeight = this.getItemHeight($inner)
    }

    // 设置picker-inner的高度
    $inner.style.height = itemHeight * this.visibleItemCount + 'px'
  }
}
</script>
