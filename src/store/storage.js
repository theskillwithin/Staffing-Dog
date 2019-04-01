import Cookies from 'js-cookie'

export const TOKEN_KEY = 'sdJWT'
export const FINGERPRINT_KEY = 'sdFP'
export const USER_ID_KEY = 'sdUID'

export const getToken = () => Cookies.get(TOKEN_KEY) || false
export const setToken = token => Cookies.set(TOKEN_KEY, token)
export const removeToken = () => Cookies.remove(TOKEN_KEY)

export const getFingerprint = () => Cookies.get(FINGERPRINT_KEY)
export const setFingerprint = fingerprint => Cookies.set(FINGERPRINT_KEY, fingerprint)
export const removeFingerprint = () => Cookies.remove(FINGERPRINT_KEY)

export const getUserId = () => Cookies.get(USER_ID_KEY) || false
export const setUserId = id => Cookies.set(USER_ID_KEY, id)
export const removeUserId = () => Cookies.remove(USER_ID_KEY)

export const removeAllAuth = () => {
  removeToken()
  removeFingerprint()
  removeUserId()
}
