import axios from 'axios'
import pathToRegex from 'path-to-regexp'
import qs from 'qs'

import { API_ROOT, IS_DEV } from './config'

const sdNoop = () => {
  const error = 'No Api Method Found:'
  return Promise.reject(error)
}

axios.interceptors.response.use(res => {
  if (res.status >= 400 && res.status <= 499) {
    return Promise.reject(res)
  }

  return res
}, Promise.reject)

axios.defaults.paramsSerializer = params => qs.stringify(params)

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

export default axios
