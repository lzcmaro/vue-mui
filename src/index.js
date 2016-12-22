import Button from './components/button'
import Header from './components/header'
import Icon from './components/icon'
import Link from './components/link'
import ListItem from './components/list-item'
import List from './components/list'

const install = function(Vue) {
  if (install.installed) return

  Vue.component(Button.name, Button)
  Vue.component(Header.name, Header)
  Vue.component(Icon.name, Icon)
  Vue.component(Link.name, Link)
  Vue.component(ListItem.name, ListItem)
  Vue.component(List.name, List)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

module.exports = {
  install,
  version: '0.0.1',
  Button,
  Header,
  Icon,
  Link,
  ListItem,
  List
}
