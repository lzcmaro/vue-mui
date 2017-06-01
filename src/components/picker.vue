<script>
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
    }
  },
  render(h) {
    let columnIndex = 0
    let $defaultSlots = this.$slots.default
    
    if ($defaultSlots && $defaultSlots.length) {
      // 遍历this.$slots.default，如果为picker-column，为它注册change事件
      $defaultSlots.forEach((slot) => {
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
        <div ref="inner" class="picker-inner">
          {$defaultSlots}
          <div class="picker-highlight"></div>
        </div>
      </div>
    )
  },
  mounted() {
    // 设置picker-inner的高度
    const $inner = this.$refs.inner
    const $item = $inner.querySelector('.picker-column .picker-item')
    const itemHeight = $item.clientHeight
    $inner.style.height = itemHeight * this.visibleItemCount + 'px'
  }
}
</script>
