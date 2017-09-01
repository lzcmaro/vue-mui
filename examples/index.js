import Vue from 'vue'
import App from './app'
import routes from './route'
import mui from '@/index'
import VueRouter from 'vue-router'
import PageContent from './page-content'

document.addEventListener('DOMContentLoaded', function() {
  if (window.FastClick) window.FastClick.attach(document.body)
}, false)

Vue.use(mui)
Vue.use(VueRouter)
Vue.component(PageContent.name, PageContent)

const router = new VueRouter({
  base: __dirname,
  routes
})

new Vue({ // eslint-disable-line
  el: '#app',
  render: h => h(App),
  router
})

// 在回退到首页时，把滚动条重置到原来的位置
let indexScrollTop = 0
router.beforeEach((route, redirect, next) => {
  if (route.path !== '/') {
    indexScrollTop = document.body.scrollTop
  }
  document.title = route.meta.title || 'Vue UI'
  next()
})

router.afterEach(route => {
  if (route.path !== '/') {
    document.body.scrollTop = 0
  } else {
    Vue.nextTick(() => {
      document.body.scrollTop = indexScrollTop
    })
  }
})
