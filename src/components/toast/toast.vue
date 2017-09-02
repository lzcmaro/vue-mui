<template>
  <transition name="toast-pop" @after-leave="afterLeave">
    <div class="toast" v-show="visible">
      <div class="toast-body">
        <div class="toast-content"><slot></slot></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'vui-toast',
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      visible: this.show
    }
  },
  watch: {
    show(val) {
      this.visible = val
      this.timer && clearTimeout(this.timer)

      // 因为toast组件，默认是自动隐藏的，这里避免外部在@hide()处理后，重新传值过来，而导致死循环的问题
      if (val === true) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.duration)
      }
    }
  },
  methods: {
    afterLeave() {
      this.$emit('hide')
    }
  }
}
</script>
