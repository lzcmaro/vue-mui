<template>
  <div>
    <vui-header fixed>Button</vui-header>
    <page-content>
      <div class="btn-group">
        <vui-button @click="handleClick" size="small">Default</vui-button>
        <vui-button ref="btn1" size="small" type="primary">Primary</vui-button>
        <vui-button size="small" type="danger">Danger</vui-button>
      </div>

      <div class="btn-group">
        <vui-button>Default</vui-button>
        <vui-button type="primary">Primary</vui-button>
        <vui-button type="danger">Danger</vui-button>
      </div>

      <div class="btn-group">
        <vui-button size="large">Default</vui-button>
        <vui-button size="large" type="primary">Primary</vui-button>
        <vui-button size="large" type="danger">Danger</vui-button>
      </div>

      <div class="btn-group">
        <vui-button size="large" disabled>Default</vui-button>
        <vui-button size="large" type="primary" disabled>Primary</vui-button>
        <vui-button size="large" type="danger" disabled>Danger</vui-button>
      </div>

      <div class="btn-group">
        <vui-button size="large" plain>Default</vui-button>
        <vui-button size="large" type="primary" plain>Primary</vui-button>
        <vui-button size="large" type="danger" nativeType="submit" plain>Danger</vui-button>
      </div>
    </page-content>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$refs.btn1.$on('click', function(ev) {
      console.log(ev)
    })
  },
  methods: {
    handleClick(ev) {
      console.log(ev)
    }
  }
}
</script>

<style lang="less">
  .btn-group .btn {
    margin-bottom: 15px;
  }
</style>
