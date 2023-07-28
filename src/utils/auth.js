import Cookies from 'js-cookie'

const TokenKey = 'im_web_token'
// const TokenKey = 'imWebToken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
