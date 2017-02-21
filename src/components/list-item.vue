<template>
  <li :class="type === 'cross' ? 'cross' : ''">
    <a class="item-inner" :class="[navigate ? 'item-navigate' : '', type === 'cross' ? 'cross' : '']" :href="href">
      <div class="media" v-if="$slots.media"><slot name="media"></slot></div>
      <div class="content">
        <label class="title"><slot></slot></label>
        <label class="desc" v-if="$slots.desc"><slot name="desc"></slot></label>
      </div>
      <div class="after" v-if="$slots.after"><slot name="after"></slot></div>
      <i class="icon icon-right"  v-if="navigate && type === 'right'"></i>
    </a>
    <span v-if="type === 'cross'" class="cross-btn"><vui-icon :type="type" @click="iconClick"></vui-icon></span>
  </li>
</template>

<script>
import VuiIcon from './icon.vue'
export default {
  name: 'vui-list-item',
  components: {
    VuiIcon
  },
  props: {
    to: String,
    navigate: Boolean,
    type: {
      type: String,
      default: 'right'
    }
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
      if (this.type === 'cross') {
        this.$nextTick(() => {
          this.added = true
          this.$el.addEventListener('click', this.handleClick)
        })
      }
      return this.to
    }
  },
  methods: {
    handleClick($event) {
      $event.preventDefault()
      if (this.type === 'cross') {
        return this.$emit('itemClick')
      }
      this.$router.push(this.href)
    },
    iconClick() {
      this.$emit('iconClick')
    }
  }
}
</script>
