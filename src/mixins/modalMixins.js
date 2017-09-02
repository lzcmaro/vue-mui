export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: String,
    closeButton: {
      type: Boolean,
      default: true
    },
    backdrop: {
      type: Boolean,
      default: true
    },
    transition: {
      type: String,
      default: 'fade',
      validator(value) {
        return [
          'fade', // 淡入淡出
          'slide-up', // 从下往上滑出
          'slide-left' // 从右往左滑出
        ].indexOf(value) > -1
      }
    }
  }
}
