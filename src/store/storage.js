import { getItem, setItem, removeItem } from '../utils/cookies'

export const TOKEN_KEY = 'sdJWT'
export const FINGERPRINT_KEY = 'sdFP'
export const USER_ID_KEY = 'sdUID'

export const getToken = () => getItem(TOKEN_KEY) || false
export const setToken = token => setItem(TOKEN_KEY, token)
export const removeToken = () => removeItem(TOKEN_KEY)

export const getFingerprint = () => getItem(FINGERPRINT_KEY)
export const setFingerprint = fingerprint => setItem(FINGERPRINT_KEY, fingerprint)
export const removeFingerprint = () => removeItem(FINGERPRINT_KEY)

export const getUserId = () => getItem(USER_ID_KEY) || false
export const setUserId = id => setItem(USER_ID_KEY, id)
export const removeUserId = () => removeItem(USER_ID_KEY)

export const removeAllAuth = () => {
  removeToken()
  removeFingerprint()
  removeUserId()
}
