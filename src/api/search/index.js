import api from '@sdog/api'

import { API_ROOT } from '../config'

export const API_SEARCH = `${API_ROOT}/search`

export const search = data => api.post(API_SEARCH, data)
