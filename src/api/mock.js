import MockAdapter from 'axios-mock-adapter'
import axios from '@sdog/api'
import messagesMock from '@sdog/api/messages/mock'
import jobsMock from '@sdog/api/jobs/mock'
import searchMock from '@sdog/api/search/mock'
import log from '@sdog/utils/log'

const mock = new MockAdapter(axios)
const endpoints = [...messagesMock, ...jobsMock, ...searchMock]

endpoints.forEach(({ url, type = 'ANY', response = {}, responseCode = 200 }) => {
  log('[SD]:[MOCK]:[REQUEST] ', url, type)

  switch (type.toLowerCase()) {
    case 'get':
      mock.onGet(url).reply(config => {
        log('[SD]:[MOCK]:[RESPONSE]', config.url, response)
        return [responseCode, response]
      })
      break
    case 'post':
      mock.onPost(url).reply(config => {
        log('[SD]:[MOCK]:[RESPONSE]', config.url, response)
        return [responseCode, response]
      })
      break
    default:
      mock.onAny(url).reply(config => {
        log('[SD]:[MOCK]:[RESPONSE]', config.url, response)
        return [responseCode, response]
      })
  }

  mock.onAny(url).reply(500)
})

axios.interceptors.request.use(config => {
  log('[SD]:[XHR]:[REQUEST] ', config.url, config.method)
  return config
})
