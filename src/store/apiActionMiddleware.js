import * as Sentry from '@sentry/browser'
import get from 'lodash/get'
import axios, { unauthorizedUser } from '@sdog/utils/api'
import createFingerprint from '@sdog/utils/fingerprint'

import { createActionTypes } from './createAction'
import { setToken, getToken } from './storage'
import { USER_SET_TOKEN, findToken, findFingerprint, setFingerprint } from './user'

const AUTH_TOKEN_NAME = 'x-auth-token'

export default ({ dispatch, getState }) => next => async action => {
  const { type, api = false, payload = {} } = action

  // don't intercept actions that don't use the api object
  if (!api || !api.url) {
    return next(action)
  }

  const { callbacks = {}, dispatches = {}, ...apiSettings } = api

  const state = getState()
  const actionTypes = createActionTypes(type)
  let fingerprint = findFingerprint(state)
  const token = findToken(state)

  if (!fingerprint) {
    fingerprint = createFingerprint()
    setFingerprint(fingerprint)(dispatch)
  }

  dispatch({ type: actionTypes.LOADING, payload })

  const apiConfig = { headers: {}, method: 'GET', ...apiSettings }

  if (token) {
    apiConfig.headers = { ...apiConfig.headers, Authorization: `Bearer ${token}` }
  }

  apiConfig.headers = { ...apiConfig.headers, fingerprint }

  try {
    const response = await axios(apiConfig)

    // if we get a token in the headers and it is different than the current one, set it
    if (
      response.headers[AUTH_TOKEN_NAME] &&
      response.headers[AUTH_TOKEN_NAME] !== getToken(state)
    ) {
      setToken(response.headers[AUTH_TOKEN_NAME])
      dispatch({
        type: USER_SET_TOKEN,
        payload: { token: response.headers[AUTH_TOKEN_NAME] },
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
      dispatches.success.map(dispatchData => dispatch(dispatchData(response, payload)))
    }

    // run any callbacks sent in the action arguments { onSuccess, onErorr }
    if (callbacks && callbacks.success) {
      callbacks.success(response)
    }
  } catch (error) {
    Sentry.captureException(new Error(error))

    dispatch({ type: actionTypes.ERROR, payload: { ...payload, error } })

    // dispatch any action types set in the api dispatch values:
    // { api: { dispatches: { success: [], error: [] } } }
    if (dispatches.error) {
      dispatches.error.map(dispatchData => dispatch(dispatchData(error, payload)))
    }

    // run any callbacks sent in the action arguments { onSuccess, onErorr }
    if (callbacks && callbacks.error) {
      callbacks.error(error)
    }

    if (get(error, 'response.status') === 401) {
      unauthorizedUser()
    }
  }

  return next(action)
}
