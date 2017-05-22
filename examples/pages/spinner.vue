<template>
  <div>
    <vui-header fixed>Spinner</vui-header>
    <page-content>
      <vui-list>
        <vui-list-item>
          spinner<vui-spinner type="spinner" slot="after"></vui-spinner>
        </vui-list-item>
        <vui-list-item>
          spinner1<vui-spinner type="spinner1" slot="after"></vui-spinner>
        </vui-list-item>
        <vui-list-item>
          spinner2<vui-spinner type="spinner2" slot="after"></vui-spinner>
        </vui-list-item>
        <vui-list-item>
          spinner3<vui-spinner type="spinner3" slot="after"></vui-spinner>
        </vui-list-item>
      </vui-list>
    </page-content>
  </div>
</template>

<style lang="less" scoped>
  .page-content {
    padding: 0;
  }
</style>

<script>
export default {
}
</script>
