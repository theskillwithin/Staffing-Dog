import axios from '@sdog/api'
import { getToken } from '@sdog/api/auth'

export const interceptAuth = () => {
  axios.interceptors.request.use(config => ({
    ...config,
    headers: {
      ...config.headers,
      common: {
        ...config.headers.common,
        Authorization: getToken(),
      },
    },
  }))
}

export default interceptAuth
