<template>
  <div>
    <vui-header fixed>Action Sheet</vui-header>

    <page-content>
      <vui-button size="large" @click="visibled = !visibled">Show ActionSheet</vui-button>

      <vui-action-sheet :show="visibled" :cancelButton="true" cancelButtonText="Cancel" @cancel="handleCancel">
        <vui-action-sheet-button type="primary" @click="handlePublish">Publish</vui-action-sheet-button>
        <vui-action-sheet-button type="primary" @click="handleSave">Save</vui-action-sheet-button>
        <vui-action-sheet-button type="danger" @click="handleDelete">Delete</vui-action-sheet-button>
      </vui-action-sheet>
    </page-content>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visibled: false
    }
  },
  methods: {
    handlePublish() {
      console.log('publish')
      this.visibled = false
    },
    handleSave() {
      console.log('save')
      this.visibled = false
    },
    handleDelete() {
      console.log('delete')
      this.visibled = false
    },
    handleCancel() {
      console.log('cancel')
      this.visibled = false
    }
  }
}
</script>
