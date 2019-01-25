import axios from 'axios'
import pathToRegex from 'path-to-regexp'
import qs from 'qs'
import { removeAllAuth } from '@sdog/store/storage'

import { API_ROOT, IS_DEV } from './config'

const axiosInstance = axios.create({
  withCredentials: true,
})

const sdNoop = () => {
  const error = 'No Api Method Found:'
  return Promise.reject(error)
}

axiosInstance.interceptors.response.use(
  res => res,
  error => {
    if (
      400 === error.response.status &&
      'No User/Profile found.' === error.response.data.error
    ) {
      // clear cookies
      removeAllAuth()
      // redirect to login page
      window.location = '/#/login'
    }

    return Promise.reject(error)
  },
)

axiosInstance.defaults.paramsSerializer = params => qs.stringify(params)

export const createApi = (options = {}, apiCall = sdNoop) => ({
  ...options,
  send: (...args) => apiCall(options.url, ...args),
})

export const createPath = (url, args, rootPath = API_ROOT) => {
  const path = url.replace(rootPath, '')
  const builtPath = pathToRegex.compile(path)(args)

  return `${rootPath}${builtPath}`
}

export { API_ROOT, IS_DEV }

export default axiosInstance
