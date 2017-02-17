<template>
  <a class="link" :href="href" @click="handleClick"><slot></slot></a>
</template>

<script>
export default {
  name: 'vui-link',
  props: {
    to: String
  },
  computed: {
    href() {
      // 如果传递了to属性，并且当前应用域中使用了vue-router，这里给它添加click事件，以便在点击后，使用router进行跳转
      if (this.to && !this.added && this.$router) {
        const resolved = this.$router.match(this.to)
        if (!resolved.matched.length) return this.to

        this.$nextTick(() => {
          const listeners = this.$vnode.componentOptions.listeners || {}
          this.added = true

          // 如果组件绑定了click事件，这里不处理
          if (!listeners.click) {
            this.$el.addEventListener('click', this.handleClick)
          }
        })
        return resolved.path
      }

      return this.to
    }
  },
  methods: {
    handleClick($evt) {
      const listeners = this.$vnode.componentOptions.listeners || {}
      let result
      $evt.preventDefault()

      if (listeners.click) {
        result = listeners.click.fn.call(this, $evt)
      }
      // 当added=true时，仅当绑定的click返回false时，才不跳转
      if (this.added && result !== false) {
        this.$router.push(this.href)
      }
    }
  }
}
</script>
