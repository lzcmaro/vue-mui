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
        :searchListBefore="searchListBefore"
        cancelBtnText="取消"></vui-searchbar>

    </page-content>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchList:[],
        searchListBefore:['2', '3']
      }
    },
    methods: {
      active() {
        console.log('focus')
      },
      keydown(val, $event) {
        var index;
        if($event.keyCode == 13){
          console.log('enter');
          index = this.searchListBefore.indexOf(val);
          if(index == -1)
            this.searchListBefore.unshift(val);
          else{
            this.searchListBefore.splice(index, 1);
            this.searchListBefore.unshift(val);
          }
          //search item detail
          this.searchDetail(val);

        }
      },
      input(val) {
        //search item list
        this.searchList.push(val);
      },
      searchItem(val, index) {
        //将点击的item 放入历时搜索列表的第一个位置中
        this.searchListBefore.splice(index, 1);
        this.searchListBefore.unshift(val);
        //search item detail
        this.searchDetail(val);
      },
      unactive() {
        console.log('blur')
      },
      cancel() {
        console.log('cancel')
      },
      searchDetail(val) {
        alert('searchDetail');
        console.log('searchDetail')
      }
    }
  }
</script>
