import InfiniteScroll from './directive'

const install = function(Vue) {
  Vue.directive('InfiniteScroll', InfiniteScroll)
}

InfiniteScroll.install = install
export default InfiniteScroll
