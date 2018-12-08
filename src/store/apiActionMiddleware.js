import axios, { IS_DEV } from '../api/index'

import { createActionTypes } from './createAction'
import { setToken, getToken } from './storage'
import { USER_SET_TOKEN, findToken, findFingerprint } from './user'

const AUTH_TOKEN_NAME = 'X-AUTH-TOKEN'

export default ({ dispatch, getState }) => next => async action => {
  const { type, api = false, payload = {} } = action

  if (!api || !api.url) {
    return next(action)
  }

  const actionTypes = createActionTypes(type)

  dispatch({ type: actionTypes.LOADING, payload })

  try {
    const fingerprint = findFingerprint(getState())
    const token = findToken(getState())

    const apiConfig = { method: 'get', ...api }

    if ('get' === apiConfig.method.toLowerCase()) {
      apiConfig.params = {
        ...(apiConfig.params || {}),
        fingerprint,
      }
    } else {
      apiConfig.data = {
        ...(apiConfig.data || {}),
        fingerprint,
      }
    }

    if (!IS_DEV) {
      apiConfig.headers = {
        ...(apiConfig.headers || {}),
        [AUTH_TOKEN_NAME]: token,
      }
    }

    const response = await axios(apiConfig)
    const { headers = {} } = response

    // if we get a token in the headers and it is different than the current one, set it
    if (
      headers &&
      headers[AUTH_TOKEN_NAME] &&
      headers[AUTH_TOKEN_NAME] !== getToken(getState())
    ) {
      setToken(headers[AUTH_TOKEN_NAME])
      dispatch({ type: USER_SET_TOKEN, payload: { token: headers[AUTH_TOKEN_NAME] } })
    }

    dispatch({ type: actionTypes.SUCCESS, payload: response })
    if (api.callbacks && api.callbacks.success) {
      api.callbacks.success(response)
    }
  } catch (err) {
    dispatch({ type: actionTypes.ERROR, payload: err })
    if (api.callbacks && api.callbacks.error) {
      api.callbacks.error(err)
    }
  }

  return next(action)
}
