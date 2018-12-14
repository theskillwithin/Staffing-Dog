import axios from 'axios'
import pathToRegex from 'path-to-regexp'

import { API_ROOT, IS_DEV } from './config'

const sdNoop = () => {}

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
