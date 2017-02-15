<template>
  <div>
    <vui-header fixed>Input</vui-header>

    <page-content>
      <form>
        <vui-list class="field-list">
          <vui-list-item>
            <vui-input label="Inline Label" inline placeholder="Text Input" @change="handleChange" @keydown="handleKeydown" @focus="handleFocus"></vui-input>
          </vui-list-item>
          <vui-list-item>
            <vui-input label="Stacked Label" placeholder="Text Input" ></vui-input>
          </vui-list-item>
          <vui-list-item>
            <vui-input type="number" label="Stacked Label" placeholder="Number Input"></vui-input>
          </vui-list-item>
          <vui-list-item>
            <vui-input clearButton placeholder="Clear Input"></vui-input>
          </vui-list-item>
          <vui-list-item>
            <vui-input bordered clearButton placeholder="Bordered And Clear Input"></vui-input>
          </vui-list-item>
        </vui-list>
      </form>
    </page-content>
  </div>
</template>

<script>
export default {
  methods: {
    handleChange($evt) {
      console.log('handleChange', $evt.target.value)
    },
    handleKeydown($evt) {
      console.log('handleKeydown', $evt)
    },
    handleFocus($evt) {
      console.log('handleFocus', $evt)
    }
  }
}
</script>

<style lang="less" scoped>
  .page-content {
    padding: 0;
  }
</style>
