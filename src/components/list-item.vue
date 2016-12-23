<template>
  <li>
    <a class="item-inner" :class="navigate ? 'item-navigate' : ''" :href="href">
      <div class="media" v-if="$slots.media"><slot name="media"></slot></div>
      <div class="content">
        <div class="title"><slot></slot></div>
        <div class="desc" v-if="$slots.desc"><slot name="desc"></slot></div>
      </div>
      <div class="after" v-if="$slots.after"><slot name="after"></slot></div>
      <i class="icon icon-right" v-if="navigate"></i>
    </a>
  </li>
</template>

<script>
export default {
  name: 'vui-list-item',
  props: {
    to: String,
    navigate: Boolean
  },
  computed: {
    href() {
      if (this.to && !this.added && this.$router) {
        const resolved = this.$router.match(this.to)
        if (!resolved.matched.length) return this.to

        this.$nextTick(() => {
          this.added = true
          this.$el.addEventListener('click', this.handleClick)
        })
        return resolved.path
      }
      return this.to
    }
  },
  methods: {
    handleClick($event) {
      $event.preventDefault()
      this.$router.push(this.href)
    }
  }
}
</script>
