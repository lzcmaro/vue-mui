import $ from './utils/NodeList.js'

import ActionSheetButton from './components/action-sheet-button'
import ActionSheet from './components/action-sheet'
import Alert from './components/alert'
import Badge from './components/badge'
import Button from './components/button'
import Confirm from './components/confirm'
import Dialog from './components/dialog'
import Header from './components/header'
import Icon from './components/icon'
import Indicator from './components/indicator'
import Link from './components/link'
import ListItem from './components/list-item'
import List from './components/list'
import Modal from './components/modal'
import Overlay from './components/overlay'
import TabContent from './components/tab-content'
import TabItem from './components/tab-item'
import Tabbar from './components/tabbar'
import Tabs from './components/tabs'
import Toast from './components/toast'

const install = function(Vue) {
  if (install.installed) return

  Vue.component(ActionSheetButton.name, ActionSheetButton)
  Vue.component(ActionSheet.name, ActionSheet)
  Vue.component(Alert.name, Alert)
  Vue.component(Badge.name, Badge)
  Vue.component(Button.name, Button)
  Vue.component(Confirm.name, Confirm)
  Vue.component(Dialog.name, Dialog)
  Vue.component(Header.name, Header)
  Vue.component(Icon.name, Icon)
  Vue.component(Indicator.name, Indicator)
  Vue.component(Link.name, Link)
  Vue.component(ListItem.name, ListItem)
  Vue.component(List.name, List)
  Vue.component(Modal.name, Modal)
  Vue.component(Overlay.name, Overlay)
  Vue.component(TabContent.name, TabContent)
  Vue.component(TabItem.name, TabItem)
  Vue.component(Tabbar.name, Tabbar)
  Vue.component(Tabs.name, Tabs)
  Vue.component(Toast.name, Toast)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

module.exports = {
  $,
  install,
  version: '0.0.1',
  ActionSheetButton,
  ActionSheet,
  Alert,
  Badge,
  Button,
  Confirm,
  Dialog,
  Header,
  Icon,
  Indicator,
  Link,
  ListItem,
  List,
  Modal,
  Overlay,
  TabContent,
  TabItem,
  Tabbar,
  Tabs,
  Toast
}
