<template>
  <div>
    <vui-header fixed>Searchbar</vui-header>
    <page-content>
      <vui-searchbar
        @active="active"
        @keydown="keydown"
        @input="input"
        @unactive="unactive"
        @cancel="cancel"
        @searchItem="searchItem"
        :searchList="searchList"
        cancelBtnText="取消"></vui-searchbar>

    </page-content>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchList:[]
      }
    },
    methods: {
      active() {
        console.log('focus')
      },
      keydown(val, $event) {
        //search item detail
        this.searchDetail(val)
      },
      input(val) {
        //search item list
        this.searchList.push(val)
      },
      searchItem(val, index) {
        //search item detail
        this.searchDetail(val)
      },
      unactive() {

      },
      cancel() {

      },
      searchDetail(val) {
        //alert('searchDetail');
        console.log('searchDetail')
      }
    }
  }
</script>
