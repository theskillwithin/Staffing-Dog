import axios from 'axios'
import qs from 'qs'
import get from 'lodash/get'
import { removeAllAuth } from '@sdog/store/storage'

import { SIM, IS_DEV, IS_STAGE } from './env'

export { SIM, IS_DEV }
export const API_VERSION = 'v1'
export const SIM_TTL = 100
export const LOCAL_API_ROOT = `http://api.sdog.test/${API_VERSION}`
export const STAGE_API_ROOT = `https://api.dev.staffing.dog/${API_VERSION}`
export const PROD_API_ROOT = IS_STAGE
  ? STAGE_API_ROOT
  : `https://api.staffing.dog/${API_VERSION}`
export const API_ROOT = IS_DEV ? LOCAL_API_ROOT : PROD_API_ROOT

const axiosInstance = axios.create({
  withCredentials: true,
  paramsSerializer: params => qs.stringify(params),
})

const unauthorizedUser = () => {
  removeAllAuth()
  window.location.assign('/login')
}

axiosInstance.interceptors.response.use(
  res => {
    if (res.status >= 400) {
      if (res.status === 401) {
        unauthorizedUser()
      }

      return Promise.reject(res)
    }

    return Promise.resolve(res)
  },
  error => {
    if (get(error, 'response.status') === 401) {
      unauthorizedUser()
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
