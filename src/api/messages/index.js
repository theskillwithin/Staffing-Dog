import api, { createApi } from '@sdog/api'

import { API_ROOT } from '../config'

export const API_MESSAGES = `${API_ROOT}/message`
export const API_MESSAGES_SEND = `${API_MESSAGES}/send`
export const API_MESSAGES_DELETE = `${API_MESSAGES_DELETE}/delete`

export const getMessages = createApi(
  { type: 'GET', url: API_MESSAGES },
  url => api.get(url),
)

export default {
  getMessages,
}
