import buildStore from '../build'

export const BASE = '@SD/AUTH'
export const SET_TOKEN = `${BASE}_SET_TOKEN`
export const SET_ERROR = `${BASE}_SET_ERROR`
export const REFRESH_TOKEN = `${BASE}_REFRESH_TOKEN`

const INITIAL_STATE = {
  token: false,
  error: false,
}

const reducers = {
  [SET_TOKEN]: (state, payload) => ({
    ...state,
    token: payload.token,
    error: false,
  }),
  [SET_ERROR]: (state, payload) => ({
    ...state,
    error: payload.error,
  }),
  [REFRESH_TOKEN]: state => ({
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

export default buildStore(reducers, INITIAL_STATE)

export const findState = state => state.auth
export const findToken = state => findState(state).token
