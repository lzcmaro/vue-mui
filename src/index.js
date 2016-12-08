import Header from '../components/header'
import Hello from '../components/hello'

const install = function(Vue) {
  if (install.installed) return

  Vue.component(Header.name, Header)
  Vue.component(Hello.name, Hello)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

module.exports = {
  install,
  version: '0.0.1',
  Header,
  Hello
}
