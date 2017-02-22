<template>
  <li :class="type === 'cross' ? 'cross' : ''">
    <vui-link class="item-inner" :class="[navigate ? 'item-navigate' : '', type === 'cross' ? 'cross' : '']" :to="to">
      <div class="media" v-if="$slots.media"><slot name="media"></slot></div>
      <div class="content">
        <label class="title"><slot></slot></label>
        <label class="desc" v-if="$slots.desc"><slot name="desc"></slot></label>
      </div>
      <div class="after" v-if="$slots.after"><slot name="after"></slot></div>
      <i class="icon icon-right"  v-if="navigate && type === 'right'"></i>
    </vui-link>
    <span v-if="type === 'cross'" class="cross-btn"><vui-icon :type="type" @click="iconClick"></vui-icon></span>
  </li>
</template>

<script>
import VuiLink from './link'
import VuiIcon from './icon.vue'
export default {
  name: 'vui-list-item',
  components: {
    VuiLink,
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
  methods: {
    iconClick() {
      this.$emit('iconClick')
    }
  }
}
</script>
