import Header from './components/header'
import List from './components/list'

const install = function(Vue) {
  if (install.installed) return

  Vue.component(Header.name, Header)
  Vue.component(List.name, List)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

module.exports = {
  install,
  version: '0.0.1',
  Header,
  List
}
