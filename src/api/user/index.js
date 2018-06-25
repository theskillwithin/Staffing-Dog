import api, { createPath } from '@sdog/api'

import { API_ROOT } from '../config'

export const API_USER_REGISTER = `${API_ROOT}/registration/new`
export const API_USER_PROFILE = `${API_ROOT}/:type`
export const API_USER_PROFILE_UPDATE = `${API_USER_PROFILE}/update`
export const API_USER = `${API_ROOT}/user`
export const API_USER_UPDATE = `${API_USER}/update`

export const registerUser = data => api.post(`${API_ROOT}/registration/new`, data)
export const getProfile = (type = 'professional') =>
  api.get(createPath(API_USER_PROFILE, { type: `${type}_profile` }))
export const updateProfile = (data, type = 'professional') =>
  api.post(createPath(API_USER_PROFILE, { type: `${type}_profile` }), data)
export const getUser = () => api.get(API_USER)
export const updateUser = data => api.post(API_USER_UPDATE, data)
