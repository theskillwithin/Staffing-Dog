import Cookies from 'js-cookie'

import { IS_PROD, IS_STAGE } from '@sdog/utils/env'

export const TOKEN_KEY = 'sdJWT'
export const FINGERPRINT_KEY = 'sdFP'
export const USER_ID_KEY = 'sdUID'

const secure = IS_PROD || IS_STAGE

export const getToken = () => Cookies.get(TOKEN_KEY) || false
export const setToken = token => Cookies.set(TOKEN_KEY, token, { secure })
export const removeToken = () => Cookies.remove(TOKEN_KEY)

export const getFingerprint = () => Cookies.get(FINGERPRINT_KEY)
export const setFingerprint = fingerprint =>
  Cookies.set(FINGERPRINT_KEY, fingerprint, { secure })
export const removeFingerprint = () => Cookies.remove(FINGERPRINT_KEY)

export const getUserId = () => Cookies.get(USER_ID_KEY) || false
export const setUserId = id => Cookies.set(USER_ID_KEY, id, { secure })
export const removeUserId = () => Cookies.remove(USER_ID_KEY)

export const removeAllAuth = () => {
  removeToken()
  removeFingerprint()
  removeUserId()
}
