import Vue from 'vue'
import './styles/common.css'
import './styles/reset.css'
// import './assets/fonts/iconfont.css'
import Directives from './directives'
Vue.use(Directives)
import { imSdkVisitor } from '@/class/imSdkVisitor.js'
import { Popover, Tooltip, Button, Input } from 'element-ui'
// import 'babel-polyfill'
Vue.use(Popover)
Vue.use(Tooltip)
Vue.use(Button)
Vue.use(Input)
export default imSdkVisitor
export { imSdkVisitor }
