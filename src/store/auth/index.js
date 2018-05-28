import { refreshToken as refreshMyToken } from '../../api/auth'
import buildStore from '../build'

import { SET_TOKEN, SET_ERROR, REFRESH_TOKEN } from './actions'

const initialState = {
  token: false,
  error: false,
}

const reducers = {
  setToken: (state, payload) => ({
    ...state,
    token: payload.token,
    error: false,
  }),
  setError: (state, payload) => ({
    ...state,
    error: payload.error,
  }),
  refreshToken: state => ({
    ...state,
    error: false,
  }),
}

export const actions = {
  setToken: token => ({
    type: SET_TOKEN,
    payload: { token },
  }),
  refreshToken: () => ({
    type: REFRESH_TOKEN,
  }),
  setError: error => ({
    type: SET_ERROR,
    payload: { error },
  }),
}

export const setToken = token => dispatch => dispatch(actions.setToken(token))

export const refreshToken = () => dispatch => {
  dispatch(actions.refreshToken())

  return refreshMyToken()
    .then(res => {
      dispatch(actions.setToken(res.roken))
    })
    .catch(res => {
      dispatch(actions.setError(res.error || res))
    })
}

export default buildStore(
  {
    [SET_TOKEN]: reducers.setToken,
    [SET_ERROR]: reducers.setError,
    [REFRESH_TOKEN]: reducers.refreshToken,
  },
  initialState,
)

export const findState = state => state.auth
export const findToken = state => findState(state).token
