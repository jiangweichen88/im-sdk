import request from '@/utils/request'

// export function getImAccountsCustomer(data) {
//   return request({
//     url: '/nebula/im/ImAccounts/customer',
//     method: 'get',
//     params: data
//   })
// }
// 访客端使用Im系统必须访问的第一个接口, 将会返回ImAccount, 服务器信息以及鉴权信息
const api = '/api'
// 坐席注册
export function getImAccountsAgent(data) {
  return request({
    url: api + '/nebula/im/ImAccounts/agent',
    method: 'post',
    data
  })
}
export function getImAgens(data) {
  return request({
    url: api + '/nebula/im/internal/agens',
    method: 'post',
    data
  })
}
//在线
export function setImOnline(data) {
  return request({
    url: api + '/nebula/im/agentPresence/online',
    method: 'put',
    data
  })
}
//我的 对话记录列表
export function getMySessions(data) {
  return request({
    url: api + '/nebula/im/sessions/currentList',
    method: 'get',
    params: data
  })
}
//对话记录详情
export function getSessionsDetails(sessionId) {
  return request({
    url: api + `/nebula/im/sessions/${sessionId}`,
    method: 'get'
  })
}
//消息已接收
export function putReceived(id) {
  return request({
    url: api + `/nebula/im/messages/${id}/received`,
    method: 'put'
  })
}
//坐席端创建消息
export function sendMessagesAgent(data) {
  return request({
    url: api + '/nebula/im/chat/messages/agent',
    method: 'post',
    data
  })
}

export function getImAccountsCustomer(data) {
  return request({
    url: api + '/nebula/im/ImAccounts/customer',
    method: 'post',
    data
  })
}
export function getImChatRoute(data) {
  return request({
    url: api + '/nebula/im/chat/route',
    method: 'post',
    data
  })
}
//获取队列id或者会话ID
export function getImChats(data) {
  return request({
    url: api + '/nebula/im/chats',
    method: 'post',
    data
  })
}
//访客端创建消息
export function sendMessagesCustomer(data) {
  return request({
    url: api + '/nebula/im/chat/messages/customer',
    method: 'post',
    data
  })
}
//客户端获取会话的历史消息
export function getCustomerViewMessages(sessionId) {
  return request({
    url: api + `/nebula/im/chat/messages/${sessionId}/customerViewMessages`,
    method: 'get'
  })
}

//坐席端获取历史会话列表
export function getCustomerViewHistorySessions(data, sessionId) {
  return request({
    url: api + `/nebula/im/chat/messages/${sessionId}/customerViewHistorySessions`,
    method: 'get',
    params: data
  })
}
