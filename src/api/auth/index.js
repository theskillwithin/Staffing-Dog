import api, { createApi } from '@sdog/api'

import { API_ROOT } from '../config'

export { getToken, setToken } from './storage'

export const API_AUTH_ROOT = `${API_ROOT}/auth`
export const API_AUTH_REFRESH_TOKEN = `${API_AUTH_ROOT}/refresh`
export const API_AUTH_LOGIN = `${API_AUTH_ROOT}/login`
export const API_AUTH_LOGOUT = `${API_AUTH_ROOT}/logout`
export const API_AUTH_FORGOT_PASSWORD = `${API_AUTH_ROOT}/forgot_password`

export const login = createApi({ type: 'POST', url: API_AUTH_LOGIN }, (url, data) =>
  api.post(url, data),
)

export const logout = createApi({ type: 'GET', url: API_AUTH_LOGOUT }, url =>
  api.get(url),
)

export const forgotPassword = createApi(
  { type: 'POST', url: API_AUTH_FORGOT_PASSWORD },
  (url, data) => api.post(url, data),
)

export default { login, logout, forgotPassword }
