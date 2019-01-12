import axios from '../api/index'

import { createActionTypes } from './createAction'
import { setToken, getToken } from './storage'
import { USER_SET_TOKEN, findToken, findFingerprint } from './user'

const AUTH_TOKEN_NAME = 'X-AUTH-TOKEN'
const AUTH_TOKEN_NAME_LOWER = AUTH_TOKEN_NAME.toLowerCase()

export default ({ dispatch, getState }) => next => async action => {
  const { type, api = false, payload = {} } = action

  // don't intercept actions that don't use the api object
  if (!api || !api.url) {
    return next(action)
  }

  const { callbacks = {}, dispatches = {}, ...apiSettings } = api

  const state = getState()
  const actionTypes = createActionTypes(type)
  const fingerprint = findFingerprint(state)
  const token = findToken(state)

  dispatch({ type: actionTypes.LOADING, payload })

  const apiConfig = { headers: {}, method: 'GET', ...apiSettings }

  if (token) {
    apiConfig.headers = { ...apiConfig.headers, [AUTH_TOKEN_NAME]: token }
  }

  if (fingerprint) {
    apiConfig.headers = { ...apiConfig.headers, fingerprint }
  }

  try {
    const response = await axios(apiConfig)

    // if we get a token in the headers and it is different than the current one, set it
    if (
      response.headers[AUTH_TOKEN_NAME_LOWER] &&
      response.headers[AUTH_TOKEN_NAME_LOWER] !== getToken(state)
    ) {
      setToken(response.headers[AUTH_TOKEN_NAME_LOWER])
      dispatch({
        type: USER_SET_TOKEN,
        payload: { token: response.headers[AUTH_TOKEN_NAME_LOWER] },
      })
    }

    dispatch({
      type: actionTypes.SUCCESS,
      payload: {
        ...response,
        __payload: payload,
      },
    })

    // dispatch any action types set in the api dispatch values:
    // { api: { dispatches: { success: [], error: [] } } }
    if (dispatches.success) {
      dispatches.success.map(dispatchData => dispatch(dispatchData(response)))
    }

    // run any callbacks sent in the action arguments { onSuccess, onErorr }
    if (callbacks && callbacks.success) {
      callbacks.success(response)
    }
  } catch (err) {
    dispatch({ type: actionTypes.ERROR, payload: err })

    // dispatch any action types set in the api dispatch values:
    // { api: { dispatches: { success: [], error: [] } } }
    if (dispatches.error) {
      dispatches.error.map(dispatchData => dispatch(dispatchData(err)))
    }

    // run any callbacks sent in the action arguments { onSuccess, onErorr }
    if (callbacks && callbacks.error) {
      callbacks.error(err)
    }
  }

  return next(action)
}
