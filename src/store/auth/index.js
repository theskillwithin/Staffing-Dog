import buildStore from '../build'

import { SET_TOKEN, SET_ERROR } from './actions'

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
  setError: error => ({
    type: SET_ERROR,
    payload: { error },
  }),
}

export const setToken = token => dispatch => dispatch(actions.setToken(token))

export default buildStore(
  {
    [SET_TOKEN]: reducers.setToken,
    [SET_ERROR]: reducers.setError,
  },
  initialState,
)

export const findState = state => state.auth
export const findToken = state => findState(state).token
