import Vue from 'vue'
import Indicator from './indicator'
import createChainedFunction from '@/utils/createChainedFunction'

const defaultIndicatorType = 'warning'
let pool = []

function createInstance() {
  return new Vue({
    el: document.createElement('div'),
    components: {
      Indicator
    },
    data: {
      visible: false,
      type: defaultIndicatorType, // Indicator类型：loading, success, warning, failure
      message: null, // 显示的文本信息
      className: null, // Toast的自定义class
      onHidden: null // 隐藏后的回调
    },
    methods: {
      onHiddenChanged() {
        // 虽然Toast是自动隐藏的，但由于该实例可能会被复用，这里需要重置this.visible
        this.visible = false
        // 隐藏后删除该DOM元素
        this.$el.parentNode.removeChild(this.$el)
        // 缓存当前实例，以便后面可以从pool中直接使用
        pool.push(this)
      }
    },
    render(h) {
      const indicatorProps = {
        props: {
          show: this.visible,
          type: this.type
        },
        class: this.className,
        on: {
          hide: createChainedFunction(this.onHiddenChanged, this.onHidden)
        }
      }

      return (
        <indicator {...indicatorProps}>{this.message}</indicator>
      )
    }
  })
}

function getInstance() {
  return pool.length > 0 ? pool.pop() : createInstance()
}

/**
 * IndicatorService
 * 把Indicator组件封装成service，以便方便调用
 * @param {String|Object} options
 *   String类型，即显示的文本信息，需要同时设置type参数;
 *   Object类型，Indicator的参数配置，这时将忽略type, onHidden参数，具体有：
 *     type,
 *     message,
 *     className,
 *     onHidden
 * @param {String} type     Indicator类型：loading, success, failure, warning
 * @param {Function} onHidden Indicator隐藏后的回调
 * @example
 * 1. Vue.$indicator('', function() {}) // type默认为warning
 * 2. Vue.$indicator('', Vue.$indicator.types.LOADING, function() {})
 * 3. Vue.$indicator({type: Vue.$indicator.types.LOADING, message: ''}, function() {})
 */
function IndicatorService(options = {}, type = defaultIndicatorType, onHidden) {
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }

  // 如果type为function，把它设为onHidden，且为options指定默认的type值：warning
  if (typeof type === 'function') {
    // 当参数options为Object时，type可能已设置，这里需要忽略
    options.type = options.type || defaultIndicatorType
    // 这里不直接设值options.onHidden，让下边统一处理
    onHidden = type
  } else if (typeof type === 'string') {
    options.type = type
  }

  if (typeof onHidden === 'function') {
    options.onHidden = onHidden
  }

  let instance = getInstance()

  // 由于实例可能是从pool中取出来的，这里需要更新它的属性值
  instance.type = options.type
  instance.className = options.className
  instance.message = options.message
  instance.onHidden = options.onHidden

  document.body.appendChild(instance.$el)

  Vue.nextTick(function() {
    instance.visible = true
  })
}

/**
 * Indicator组件的4种类型，这里提供对外使用的枚举
 */
IndicatorService.types = {
  LOADING: 'loading',
  SUCCESS: 'success',
  FAILURE: 'failure',
  WARNING: 'warning'
}

export default IndicatorService
