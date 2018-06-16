import api from '@sdog/api'

import { API_ROOT, createPath } from '../config'

export { getToken, setToken } from './storage'

export const API_AUTH_ROOT = `${API_ROOT}/auth`
export const API_AUTH_REFRESH_TOKEN = `${API_AUTH_ROOT}/refresh`
export const API_AUTH_LOGIN = `${API_AUTH_ROOT}/login`
export const API_AUTH_LOGOUT = `${API_AUTH_ROOT}/logout`
export const API_AUTH_FORGOT_PASSWORD = `${API_AUTH_ROOT}/forgot_password`

export const login = data => api.post(API_AUTH_LOGIN, data)
export const refreshToken = () => api.get(createPath(refreshToken.url))
export const logout = () => api.get(API_AUTH_LOGOUT)
export const forgotPassword = data => api.post(API_AUTH_FORGOT_PASSWORD, data)
