import axios from 'axios'

import { SIM, API_ROOT, fakePromise } from '../config'

import { getToken, setToken } from './storage'

export const API_AUTH_ROOT = `${API_ROOT}/auth`

export const refreshToken = () => {
  return SIM ? fakePromise({}) : axios.get(`${API_AUTH_ROOT}/refresh`)
}

export const login = data => {
  return SIM ? fakePromise({}) : axios.post(`${API_AUTH_ROOT}/login`, data)
}

export const logout = () => {
  return SIM ? fakePromise({}) : axios.get(`${API_AUTH_ROOT}/logout`)
}

export const forgotPassword = data => {
  return SIM ? fakePromise({}) : axios.post(`${API_AUTH_ROOT}/forgot_password`, data)
}

export default {
  login,
  logout,
  forgotPassword,
  refreshToken,
  API_AUTH_ROOT,
  getToken,
  setToken,
}
