import axios from 'axios'

import auth from './auth'

export const interceptAuth = () => {
  axios.interceptors.request.use(config => ({
    ...config,
    headers: {
      ...config.headers,
      common: {
        ...config.headers.common,
        Authorization: auth.getToken(),
      },
    },
  }))
}

export { auth }

export default {
  interceptAuth,
  auth,
}
