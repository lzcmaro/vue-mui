const noop = () => {}
const ctx = '@@InfiniteScroll'
const ATTR_DISTANCE = 'infinite-scroll-distance'
const ATTR_DISABLED = 'infinite-scroll-disabled'

const getScrollTop = function(element) {
  if (element === window) {
    return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop)
  }

  return element.scrollTop
}

const getVisibleHeight = function(element) {
  if (element === window) {
    return document.documentElement.offsetHeight
  }

  return element.offsetHeight
}

const getScrollEventTarget = function(element) {
  const getComputedStyle = document.defaultView.getComputedStyle
  let currentNode = element
  // bugfix, see http://w3help.org/zh-cn/causes/SD9013 and http://stackoverflow.com/questions/17016740/onscroll-function-is-not-working-for-chrome
  while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
    let overflowY = getComputedStyle(currentNode).overflowY
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return currentNode
    }
    currentNode = currentNode.parentNode
  }
  return window
}

const scrollHandler = function() {
  const eventTarget = this.scrollEventTarget
  const offsetHeight = getVisibleHeight(eventTarget)
  const scrollHeight = eventTarget.scrollHeight
  const scrollTop = getScrollTop(eventTarget)
  const shouldScroll = scrollHeight - scrollTop <= offsetHeight + this.scrollDistance

  if (shouldScroll && this.scrollEnabled) {
    this.expression()
  }
}

// a minimum time that should elapse between each call to the
// handler. N.b. the first call the handler will be run
// immediately, and the final call will always result in the
// handler being called after the `wait` period elapses.
// A slimmed down version of underscore's implementation.
function throttle(func, wait) {
  let timeout = null
  let previous = 0

  wait = wait || 200

  function later() {
    previous = new Date().getTime()
    clearInterval(timeout)
    timeout = null
    return func.call()
  }

  function throttled() {
    const now = new Date().getTime()
    const remaining = wait - (now - previous)
    if (remaining <= 0) {
      clearInterval(timeout)
      timeout = null
      previous = now
      func.call()
    } else if (!timeout) {
      timeout = setInterval(later, remaining, 1)
    }
  }

  return throttled
}

const hasScrollContent = function(element) {
  const offsetHeight = getVisibleHeight(element)
  const scrollHeight = element.scrollHeight

  return scrollHeight > offsetHeight
}

const attachScrollListener = function() {
  if (hasScrollContent(this.scrollEventTarget)) {
    this.scrollListener = throttle(scrollHandler.bind(this))
    this.scrollEventTarget.addEventListener('scroll', this.scrollListener)
  }
}

const detachScrollListener = function() {
  this.scrollEventTarget.removeEventListener('scroll', this.scrollListener)
}

export default {
  bind(el, binding, vnode) {
    const vm = vnode.context
    const scrollDistance = Number(vnode.data.attrs[ATTR_DISTANCE]) || 0
    const disabled = Boolean(vnode.data.attrs[ATTR_DISABLED])

    el[ctx] = {
      el,
      vm,
      expression: binding.value || noop,
      scrollDistance,
      scrollEnabled: !disabled
    }

    vm.$on('hook:mounted', () => {
      const eventTarget = getScrollEventTarget(el)

      // 在$nextTick()中添加scroll事件，这时候可以取到el的实际scrollHeight值
      vm.$nextTick(() => {
        el[ctx].scrollEventTarget = eventTarget
        attachScrollListener.call(el[ctx])
      })
    })
  },
  update(el, binding, vnode, oldVnode) {
    const disabled = vnode.data.attrs[ATTR_DISABLED]

    // 指令中的update钩子是被绑定元素所在的模板更新时调用，而不论绑定值是否有变化
    // 这里判断绑定的值是否有更新，避免多余的操作
    if (disabled === oldVnode.data.attrs[ATTR_DISABLED]) return

    el[ctx].scrollEnabled = !disabled
    // detachScrollListener.call(el[ctx])
    // disabled === false && attachScrollListener.call(el[ctx])
  },
  unbind(el) {
    detachScrollListener.call(el[ctx])
  }
}
