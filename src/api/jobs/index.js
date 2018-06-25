import api, { createApi } from '@sdog/api'
import { API_ROOT } from '@sdog/api/config'

export const API_JOBS = `${API_ROOT}/jobs`

export const getEvents = createApi(
  {
    type: 'GET',
    url: API_JOBS,
  },
  url => api.get(url),
)

export default { getEvents }
