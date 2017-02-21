<template>
  <div>
    <div class="searchbar-wrap">
      <input type="text" class="searchbar-input" placeholder="搜索" :class="classObj" v-model="value"
             @focus="onfocus"
             @input="oninput"
             @keydown="onkeydown($event)"><span v-show="isactive" class="cancel-btn" @click="cancel">{{cancelBtnText}}</span>
    </div>
    <div class="searchbar-list" v-show="isactive">
      <ul v-show="showHistory" class="history">
        <li v-for="(item, index) in searchListBefore"><span @click="searchItem(item, index)">{{item}}</span>
          <vui-icon type="cross" style="width:5%;" @click="delItem(index)"></vui-icon>
        </li>
      </ul>
      <ul v-show="showNew" class="new">
        <li v-for="item in searchList" @click="searchItem(item)">
          <vui-icon type="search"></vui-icon><span>{{item}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import VuiIcon from './icon'

export default{
  name: 'vui-searchbar',
  components: {
    VuiIcon
  },
  data() {
    return {
      isactive: false,
      value: '',
      showHistory: true,
      showNew: false
    }
  },
  props: {
    searchList: {
      type: Array
    },
    searchListBefore: {
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
      this.$emit('keydown', this.value, $event)
    },
    cancel() {
      this.isactive = false;
      this.value = '';
      this.$emit('cancel');
    },
    searchItem(item, index) {
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
