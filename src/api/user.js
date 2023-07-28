import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/cds/login/login',
    method: 'get',
    params: data
  })
}
// http://192.168.16.23/cds/login/login?username=8005%40test&password=12bce374e7be15142e8172f668da00d8&logintype=2

export function getInfo(token) {
  return request({
    url: '/vue-element-base/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-base/user/logout',
    method: 'post'
  })
}
