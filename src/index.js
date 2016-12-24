import Button from './components/button'
import Header from './components/header'
import Icon from './components/icon'
import Link from './components/link'
import ListItem from './components/list-item'
import List from './components/list'
import Overlay from './components/overlay'
import TabContent from './components/tab-content'
import TabItem from './components/tab-item'
import Tabs from './components/tabs'
import Toast from './components/toast'

const install = function(Vue) {
  if (install.installed) return

  Vue.component(Button.name, Button)
  Vue.component(Header.name, Header)
  Vue.component(Icon.name, Icon)
  Vue.component(Link.name, Link)
  Vue.component(ListItem.name, ListItem)
  Vue.component(List.name, List)
  Vue.component(Overlay.name, Overlay)
  Vue.component(TabContent.name, TabContent)
  Vue.component(TabItem.name, TabItem)
  Vue.component(Tabs.name, Tabs)
  Vue.component(Toast.name, Toast)
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
  List,
  Overlay,
  TabContent,
  TabItem,
  Tabs,
  Toast
}
