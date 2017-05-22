<script>
import TabContent from './tab-content'

export default {
  name: 'vui-tabs',
  components: {
    TabContent
  },
  props: {
    fixed: {
      type: Boolean,
      default: false
    },
    activeKey: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      tabContent: undefined
    }
  },
  methods: {
    updateTabContent() {
      const child = this.$children

      if (child && child.length > 0) {
        // 遍历child，如果存在slot="content"的分发内容，且当前activeKey===item.eventKey的话，把它添加到data.tabContent中
        for (let item of child) {
          if (item.eventKey && this.activeKey === item.eventKey && item.$slots.content) {
            // $slots.content 得到的是一个VNode数组，直接赋值给tabContent的话，会导致render()执行多次
            // 所以这里只取$slots.content的第一个VNode
            this.tabContent = item.$slots.content.pop()
            return
          }
        }

        this.tabContent = undefined
      }
    }
  },
  mounted() {
    this.updateTabContent()
  },
  render(h) {
    const props = {
      class: {
        'nav': true,
        'nav-tabs': true,
        'nav-fixed': this.fixed
      }
    }

    return (
      <div {...props}>
        <ul>{this.$slots.default}</ul>
        <tab-content>{this.tabContent}</tab-content>
      </div>
    )
  },
  watch: {
    activeKey() {
      this.updateTabContent()
    }
  }
}
</script>
