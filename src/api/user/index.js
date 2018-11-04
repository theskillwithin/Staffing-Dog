import api, { createApi, createPath } from '@sdog/api'

import { API_ROOT } from '../config'

export const API_USER_REGISTER = `${API_ROOT}/registration/new`
export const API_USER_PROFILE = `${API_ROOT}/:type`
export const API_USER_PROFILE_UPDATE = `${API_USER_PROFILE}/update`
export const API_USER = `${API_ROOT}/user`
export const API_USER_UPDATE = `${API_USER}/update`
export const API_USER_SCHEDULE = `${API_USER}/schedule`

export const register = createApi({ type: 'POST', url: API_USER_REGISTER }, api.post)

export const getProfile = createApi(
  { type: 'GET', url: API_USER_PROFILE },
  (url, type = 'professional') => api.get(createPath(url, { type: `${type}_profile` })),
)

export const updateProfile = createApi(
  { type: 'POST', url: API_USER_PROFILE_UPDATE },
  api.post,
)

export const getSchedule = createApi(
  { type: 'POST', url: API_USER_SCHEDULE },
  (url, date) => api.post(url, { date }),
)

export const getUser = createApi({ type: 'GET', url: API_USER }, api.get)
export const updateUser = createApi({ type: 'POST', url: API_USER_UPDATE }, api.post)
