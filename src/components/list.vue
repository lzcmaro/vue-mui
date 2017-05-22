<template>
  <div class="list">
    <div class="list-title" v-if="$slots.title">
      <slot name="title"></slot>
    </div>
    <ul>
      <slot></slot>
    </ul>
    <div class="list-append" v-if="$slots.append">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vui-list'
}
</script>
