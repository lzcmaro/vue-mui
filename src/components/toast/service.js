import Vue from 'vue'
import Toast from './toast' // eslint-disable-line
import createChainedFunction from '@/utils/createChainedFunction'

let pool = []

function removeDOM(event) {
  const $target = event.target
  $target.parentNode && $target.parentNode.removeChild($target)
}

function createInstance() {
  return new Vue({
    el: document.createElement('div'),
    data: {
      visible: false,
      message: null, // 显示的文本信息
      className: null, // Toast的自定义class
      iconClass: null, // 图标的class，如：'icon icon-home'；为空时不显示图标
      onHidden: null // 隐藏后的回调
    },
    methods: {
      onHiddenChanged() {
        // 虽然Toast是自动隐藏的，但由于该实例可能会被复用，这里需要重置this.visible
        this.visible = false
        // 在隐藏的动画完成后删除该DOM元素
        this.$el.addEventListener('transitionend', removeDOM)
        // 缓存当前实例，以便后面可以从pool中直接使用
        pool.push(this)
      }
    },
    render(h) {
      const toastProps = {
        props: {
          show: this.visible
        },
        class: this.className,
        on: {
          hide: createChainedFunction(this.onHiddenChanged, this.onHidden)
        }
      }

      return (
        <Toast {...toastProps}>
          {this.iconClass ? (<i class={this.iconClass}></i>) : null}{this.message}
        </Toast>
      )
    }
  })
}

function getInstance() {
  return pool.length > 0 ? pool.pop() : createInstance()
}

/**
 * ToastService
 * 把Toast组件封装成service，以便方便调用
 * @param {String|Object} message String：即显示的文本信息；Object：参数配置，见上面的createInstance.data
 */
let ToastService = function(options = {}) {
  if (typeof options === 'string') {
    options = {message: options}
  }

  let instance = getInstance()

  // 由于实例可能是从pool中取出来的，这里需要更新它的属性值
  instance.className = options.className
  instance.iconClass = options.iconClass
  instance.message = options.message
  instance.onHidden = options.onHidden

  document.body.appendChild(instance.$el)

  Vue.nextTick(function() {
    instance.visible = true
    // 移除该实例可能已绑定的transitionend事件
    instance.$el.removeEventListener('transitionend', removeDOM)
  })
}

export default ToastService
