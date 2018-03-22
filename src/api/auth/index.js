import axios from 'axios'

import { getToken, setToken } from './storage'


export const AUTH_API_ROOT = '/api/auth'

export const refreshToken = () =>
  axios.get(`${AUTH_API_ROOT}/refresh`)

export default { refreshToken, AUTH_API_ROOT, getToken, setToken }
