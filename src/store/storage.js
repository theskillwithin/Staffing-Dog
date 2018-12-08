export const TOKEN_KEY = 'sdJWT'
export const FINGERPRINT_KEY = 'sdFP'
export const USER_ID_KEY = 'sdUID'

export const getToken = () => localStorage.getItem(TOKEN_KEY) || false
export const setToken = token => localStorage.setItem(TOKEN_KEY, token)

export const getFingerprint = () => localStorage.getItem(FINGERPRINT_KEY)
export const setFingerprint = fingerprint =>
  localStorage.setItem(FINGERPRINT_KEY, fingerprint)

export const getUserId = () => localStorage.getItem(USER_ID_KEY) || false
export const setUserId = id => localStorage.setItem(USER_ID_KEY, id)
