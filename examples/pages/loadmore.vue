<template>
  <div>
    <vui-header fixed>Load More</vui-header>
    <div class="loadmore-wrapper">
      <vui-loadmore
        :pulldown="true"
        :pullup="true" 
        :pulldown-status="pulldownStatus"
        :pulldown-text="pulldownText"
        :pullup-status="pullupStatus" 
        :pullup-text="pullupText"
        @pulldown="refresh"
        @pulldown-status-change="handleTopStatusChange"
        @pullup="loadMore"
        @pullup-status-change="handleBottomStatusChange">
        <vui-list>
          <vui-list-item v-for="item in pager.list">{{item}}</vui-list-item>
        </vui-list>
      </vui-loadmore>
    </div>
  </div>
</template>

<style lang="less" scoped="">
  .loadmore-wrapper {
    position: absolute;
    width: 100%;
    left: 0;
    top: 44px;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling : touch;
  }
</style>

<script>
export default {
  data() {
    return {
      pager: {
        list: [],
        page: 1,
        pageSize: 20,
        totalPage: 5,
        hasNext: true
      },
      pulldownStatus: 'idle',
      pullupStatus: 'idle'
    }
  },
  computed: {
    pulldownText() {
      return {
        'idle': '下拉可以刷新...',
        'flip': '松开即可刷新...',
        'loading': '正在加载中...'
      }
    },
    pullupText() {
      return {
        'idle': '上拉可以刷新...',
        'flip': '松开即可刷新...',
        'loading': '正在加载中...'
      }
    }
  },
  mounted() {
    let pager = this.pager
    for (let i = 1; i <= pager.pageSize; i++) {
      pager.list.push(i);
    }
  },
  methods: {
    refresh() {
      console.log('refresh')
      let pager = this.pager
      
      setTimeout(() => {
        pager.list = []
        for (let i = 1; i <= pager.pageSize; i++) {
          pager.list.push(i);
        }
        pager.page = 1
        pager.hasNext = pager.page < pager.totalPage
        this.pulldownStatus = 'idle'
      }, 1000)
    },
    loadMore() {
      console.log('loadMore')
      let pager = this.pager

      setTimeout(() => {
        let last = pager.list[pager.list.length - 1];
        for (let i = 1; i <= pager.pageSize; i++) {
          pager.list.push(last + i);
        }
        pager.page += 1
        pager.hasNext = pager.page < pager.totalPage
        this.pullupStatus = 'idle'
      }, 1000);
    },
    handleTopStatusChange(val) {
      this.pulldownStatus = val
    },
    handleBottomStatusChange(val) {
      this.pullupStatus = val
    }
  }
}
</script>
