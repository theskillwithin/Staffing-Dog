import api, { createApi } from '@sdog/api'

import { API_ROOT } from '../config'

export const API_SEARCH = `${API_ROOT}/search`

export const search = createApi({ type: 'POST', url: API_SEARCH }, api.post)

export default { search }
