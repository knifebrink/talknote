import Cookies from 'js-cookie'

const TokenKey = 'loginToken'
const UserNameKey = 'userName'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserName() {
  return Cookies.get(UserNameKey)
}

export function setUserName(name) {
  return Cookies.set(UserNameKey, name)
}

export function removeUserName() {
  return Cookies.remove(UserNameKey)
}

