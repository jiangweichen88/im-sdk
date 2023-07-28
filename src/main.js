import Vue from 'vue'
import './styles/common.css'
import './styles/reset.css'
// import './assets/fonts/iconfont.css'
import { loadResourceList } from './utils'
import Directives from './directive'
Vue.use(Directives)
import { imSdkVisitor } from '@/class/imSdkVisitor.js'
import { Popover, Tooltip, Button, Input } from 'element-ui'
Vue.use(Popover)
Vue.use(Tooltip)
Vue.use(Button)
Vue.use(Input)
import '@/icons/fonts/iconfont.css'
import '@/icons/fonts/iconfont.js'

import '../public/sdk/thirdpart/uuid.js'
import '../public/sdk/thirdpart/hashmap.js'
import '../public/sdk/module/mb_constants.js'
import '../public/sdk/module/mb_core.js'
import '../public/sdk/module/mb_daemon_auto_relogin.js'
import '../public/sdk/module/mb_daemon_keep_alive.js'
import '../public/sdk/module/mb_daemon_qos_recieve.js'
import '../public/sdk/module/mb_daemon_qos_send.js'
import '../public/sdk/module/mb_data_reciever.js'
import '../public/sdk/module/mb_data_sender.js'
import '../public/sdk/module/mb_socket_provider.js'
import '../public/sdk/module/mb_utils.js'
import '../public/sdk/mobileimsdk-client-sdk.js'

import * as filters from './filters' // global filters
// register global utility filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
let imSdkVisitorInstance = imSdkVisitor.init({
  // 渲染组件
  domId: 'imSdkVisitor_cccDesk',
  options: {
    tenantId: '370', // 企业ID
    imWebToken: '123123'
  },
  onReady($wsInstance) {
    console.log($wsInstance)
  }
})
// loadResourceList(RESOURCE_LIST, () => {
//   console.log(11)
//   let imSdkVisitorInstance = imSdkVisitor.init({
//     // 渲染组件
//     domId: 'imSdkVisitor_cccDesk',
//     options: {
//       tenantId: '370', // 企业ID
//       imWebToken: '123123'
//     },
//     onReady($wsInstance) {
//       console.log($wsInstance)
//     }
//   })
// })
