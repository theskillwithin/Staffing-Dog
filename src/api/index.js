import axios from 'axios'
import pathToRegex from 'path-to-regexp'

const sdNoop = () => {}

export const createApi = (options = {}, apiCall = sdNoop) => ({
  ...options,
  send: (...args) => apiCall(options.url, ...args),
})

export const createPath = (url, args) => pathToRegex.parse(url)(url, args)

export default axios
