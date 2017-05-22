<template>
  <div>
    <vui-header fixed>Infinite Scroll</vui-header>
    <div class="infinite-scroll-wrapper">
      <div v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy" infinite-scroll-distance="20">
        <vui-list>
          <vui-list-item v-for="item in pager.list">{{item}}</vui-list-item>
        </vui-list>
        <div class="spinner-wrapper">
          <vui-spinner v-if="pager.hasNext" type="spinner2"></vui-spinner>
          {{pager.hasNext ? 'Loading...' : '没有更多了...'}}
        </div>
      </div>    
    </div>
  </div>
</template>

<style lang="less" scoped>
  .infinite-scroll-wrapper {
    position: absolute;
    width: 100%;
    left: 0;
    top: 44px;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling : touch;
  }
  .spinner-wrapper {
    height: 44px;
    line-height: 44px;
    background-color: #fff;
    color: #999;
    text-align: center;
    .spinner {
      margin-right: 5px;
      vertical-align: -4px;
    }
  }
</style>

<script>
export default {
  data: function() {
    return {
      pager: {
        list: [],
        loading: false,
        page: 1,
        pageSize: 20,
        totalPage: 5,
        hasNext: true
      }
    }
  },
  computed: {
    busy() {
      return this.pager.loading || !this.pager.hasNext
    }
  },
  mounted() {
    let pager = this.pager
    for (let i = 1; i <= pager.pageSize; i++) {
      pager.list.push(i);
    }
  },
  methods: {
    loadMore: function() {
      console.log('loadMore')
      let pager = this.pager

      // 把loading设为ture，以屏蔽infinite-scroll绑定的事件
      // 避免在加载数据时，上下滚动屏幕而使得loadMore再次触发
      pager.loading = true

      setTimeout(() => {
        let last = pager.list[pager.list.length - 1];
        for (let i = 1; i <= pager.pageSize; i++) {
          pager.list.push(last + i);
        }
        pager.page += 1
        pager.loading = false
        pager.hasNext = pager.page < pager.totalPage
      }, 1000);
    }
  }
}
</script>
