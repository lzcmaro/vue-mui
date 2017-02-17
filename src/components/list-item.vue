<template>
  <li>
    <vui-link class="item-inner" :class="navigate ? 'item-navigate' : ''" :to="to">
      <div class="media" v-if="$slots.media"><slot name="media"></slot></div>
      <div class="content">
        <label class="title"><slot></slot></label>
        <label class="desc" v-if="$slots.desc"><slot name="desc"></slot></label>
      </div>
      <div class="after" v-if="$slots.after"><slot name="after"></slot></div>
      <i class="icon icon-right" v-if="navigate"></i>
    </vui-link>
  </li>
</template>

<script>
import VuiLink from './link'

export default {
  name: 'vui-list-item',
  components: {
    VuiLink
  },
  props: {
    to: String,
    navigate: Boolean
  }
}
</script>
