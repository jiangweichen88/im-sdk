import DataDictionary from './dict'

// 字段类型 0:隐藏 1:数值 2:文本框 3:单选按钮 4:复选按钮 5:邮箱 6:电话 7:日期时间 8:日期 9:时间 10:下拉框 11:多级联动下拉框 12:多行输入框textarea
const fieldTypes = new DataDictionary([
  { id: '1', name: 'number', tag: 'el-input' },
  { id: '2', name: 'input', tag: 'el-input' },
  { id: '3', name: 'radio' },
  { id: '4', name: 'checkbox' },
  { id: '5', name: 'email', tag: 'el-input' },
  { id: '6', name: 'phone', tag: 'el-input' },
  { id: '7', name: 'datetime', tag: 'el-date-picker' },
  { id: '8', name: 'date', tag: 'el-date-picker' },
  { id: '9', name: 'time', tag: 'el-date-picker' },
  { id: '10', name: 'select' },
  { id: '11', name: 'cascade', tag: 'el-input' },
  { id: '12', name: 'textarea', tag: 'el-input' }
])
const msgType = new DataDictionary([
  // 消息类型
  { id: '0', name: 'text' },
  { id: '1', name: 'image' },
  { id: '2', name: 'file' },
  { id: '3', name: 'isReceived' }
])
const sendStatus = new DataDictionary([
  // 发送状态
  { id: '0', name: 'sending' },
  { id: '1', name: 'received' },
  { id: '2', name: 'offline_sending' },
  { id: '3', name: 'offine_received' },
  { id: '4', name: 'failed' }
])
export { fieldTypes, msgType, sendStatus }
