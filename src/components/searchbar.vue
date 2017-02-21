<template>
  <div>
    <div class="searchbar-wrap">
      <input type="text" class="searchbar-input" placeholder="搜索" :class="classObj" v-model="value"
             @focus="onfocus"
             @input="oninput"
             @keydown="onkeydown($event)"><span v-show="isactive" class="cancel-btn" @click="cancel">{{cancelBtnText}}</span>
    </div>
    <div class="searchbar-list" v-show="isactive">
      <vui-list v-show="showHistory">
        <div slot="title">历史搜索</div>
        <vui-list-item v-for="(item, index) in searchListBefore"
                       navigate
                       type="cross"
                       @iconClick="delItem(index)"
                       @itemClick="searchItem(item, index)">
          <span>{{item}}</span>
        </vui-list-item>
      </vui-list>

      <vui-list v-show="showNew">
        <div slot="title">搜索……</div>
        <vui-list-item v-for="item in searchList"
                       navigate
                       @itemClick="searchItem(item)">
          <img slot="media" src="http://7xogpz.com2.z0.glb.qiniucdn.com/friendCard__1487674469543.png" alt="" width="28" height="28">
          <span>{{item}}</span>
          <span slot="desc">Description</span>
        </vui-list-item>
      </vui-list>
    </div>
  </div>
</template>

<script>
import VuiListItem from './list-item'
import VuiList from './list'

export default{
  name: 'vui-searchbar',
  components: {
    VuiListItem,
    VuiList
  },
  data() {
    return {
      isactive: false,
      value: '',
      showHistory: true,
      showNew: false,
      searchListBefore: ['2', '3']
    }
  },
  props: {
    searchList: {
      type: Array
    },
    cancelBtnText: {
      type: String,
      required: true,
      default: '取消'
    }
  },
  methods: {
    onfocus() {
      this.isactive = true;
      this.$emit('active')
    },
    oninput() {
      this.showHistory = false;
      this.showNew = true;
      this.$emit('input', this.value)
    },
    onkeydown($event) {
      var index;
      if ($event.keyCode === 13) {
        console.log('enter');
        index = this.searchListBefore.indexOf(this.value);
        if (index === -1) {
          this.searchListBefore.unshift(this.value);
        } else {
          this.searchListBefore.splice(index, 1);
          this.searchListBefore.unshift(this.value);
        }
      }
      this.$emit('keydown', this.value, $event)
    },
    cancel() {
      this.isactive = false;
      this.value = '';
      this.showHistory = true;
      this.showNew = false;
      this.$emit('cancel');
    },
    searchItem(item, index) {
      // 将点击的item 放入历时搜索列表的第一个位置中
      this.searchListBefore.splice(index, 1);
      this.searchListBefore.unshift(item);
      this.$emit('searchItem', item, index);
    },
    delItem(index) {
      this.searchListBefore.splice(index, 1)
    }
  },
  computed: {
    classObj() {
      return {
        'active': this.isactive, 'unactive': !this.isactive
      }
    }
  }
}
</script>
