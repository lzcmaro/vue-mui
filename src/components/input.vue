<script>
import VuiButton from './button'
import VuiIcon from './icon'
import createChainedFunction from '@/utils/createChainedFunction'
import toggleClass, {removeClass} from '@/utils/toggleClass'

// const CLS_FIELD_HAS_FOCUS = 'field-has-focus'
const CLS_FIELD_HAS_VALUE = 'field-has-value'

export default {
  name: 'vui-input',
  components: {
    VuiButton,
    VuiIcon
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    bordered: {
      type: Boolean,
      default: false
    },
    clearButton: {
      type: Boolean,
      default: false
    },
    label: String,
    inline: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // 下面的一些属于input的attr，已在render中绑定到了input上，这里把它们从wrapper上remove掉
    const nativeAttrs = ['id', 'name', 'value', 'placeholder', 'disabled', 'readonly']

    nativeAttrs.forEach((value, index) => this.$el.removeAttribute(value))
  },
  methods: {
    // focusInputHandler() {
    //   $(this.$el).addClass(CLS_FIELD_HAS_FOCUS)
    // },
    // blurInputHandler() {
    //   // 如果clearButton在has-focus.has-value时才显示的话，这里不设置setTimeout将会导致clearButton.click事件无效
    //   window.setTimeout(() => {
    //     $(this.$el).removeClass(CLS_FIELD_HAS_FOCUS)
    //   }, 200)
    // },
    keyupInputHandler(evt) {
      const $input = this.$refs.input
      toggleClass(this.$el, CLS_FIELD_HAS_VALUE, !!$input.value.trim())
    },
    clearButtonHandler() {
      const $input = this.$refs.input
      $input.value = ''
      $input.focus()
      removeClass(this.$el, CLS_FIELD_HAS_VALUE)
    }
  },
  render(h) {
    const noop = () => {}
    const vm = this.$vnode
    const listeners = vm.componentOptions.listeners || {}
    const fieldProps = {
      class: {
        field: true,
        'field-inline': this.inline,
        'field-bordered': this.bordered,
        'field-has-button': this.clearButton
      }
    }
    const inputProps = {
      attrs: {
        type: this.type,
        // autocorrect: 'off',
        autocomplete: 'off',
        ...vm.data.attrs
      },
      // 添加focus, blur，keyup事件，便于处理是否显示clearButton
      on: {
        ...listeners,
        // focus: createChainedFunction(this.focusInputHandler, listeners.focus ? listeners.focus.fn : noop),
        // blur: createChainedFunction(this.blurInputHandler, listeners.blur ? listeners.blur.fn : noop),
        keyup: createChainedFunction(this.keyupInputHandler, listeners.keyup ? listeners.keyup.fn : noop)
      }
    }
    const clearButtonProps = {
      class: {
        'btn-clear': true
      },
      on: {
        click: this.clearButtonHandler
      }
    }

    return (
      <div {...fieldProps}>
        {this.label ? (<label>{this.label}</label>) : null}
        <input ref="input" {...inputProps} />
        {this.clearButton ? (<vui-button {...clearButtonProps}><vui-icon type="cancel"></vui-icon></vui-button>) : null}
      </div>
    )
  }
}
</script>
