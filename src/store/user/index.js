import { API_ROOT } from '../../api'
import { createActionTypes } from '../createAction'
import { buildStore, reduxRegister } from '../index'
import {
  getUserId,
  setToken as setTokenInCookie,
  setUserId as setUserIdCookie,
} from '../storage'

export const INITIAL_STATE = {
  auth: {
    loading: false,
    error: false,
    token: false,
    fingerprint: false,
  },
  schedule: {
    events: [],
    loading: false,
    error: false,
  },
  profile: {
    loading: false,
    error: false,
    user: {},
  },
}

let reducers = {}

/**
 * SET USER TOKEN
 */
export const USER_SET_TOKEN = 'USER_SET_TOKEN'

export const setToken = token => dispatch => {
  setTokenInCookie(token)

  dispatch({
    type: USER_SET_TOKEN,
    payload: { token },
  })
}

reducers = {
  ...reducers,
  [USER_SET_TOKEN]: (state, { token }) => ({
    ...state,
    auth: {
      ...state.auth,
      token,
    },
  }),
}

/**
 * LOGIN USER
 */
export const USER_LOGIN = 'USER_LOGIN'
export const userLoginTypes = createActionTypes(USER_LOGIN)

export const login = ({
  email,
  password,
  history = false,
  onSuccess = false,
  onError = false,
}) => ({
  type: USER_LOGIN,
  api: {
    url: `${API_ROOT}/login`,
    method: 'POST',
    data: { email, password },
    callbacks: {
      success: res => {
        setUserIdCookie(res.data.user.id)
        if (onSuccess) onSuccess(res)

        if (history) {
          if (res.data.user.onboarding_status === 'incomplete') {
            history.push(`/onboarding/${res.data.user.type}/step/1`)
          } else {
            history.push('/')
          }
        }
      },
      error: onError,
    },
  },
})

reducers = {
  ...reducers,
  [userLoginTypes.LOADING]: state => ({
    ...state,
    auth: { ...state.auth, loading: true, error: false },
  }),
  [userLoginTypes.ERROR]: state => ({
    ...state,
    auth: { ...state.auth, loading: false, error: true },
  }),
  [userLoginTypes.SUCCESS]: (state, { data }) => ({
    ...state,
    auth: { ...state.auth, loading: true, error: false },
    profile: {
      ...state.profile,
      loading: false,
      error: false,
      ...data,
    },
  }),
}

/**
 * GET USER PROFILE
 */
export const USER_GET_PROFILE = 'USER_GET_PROFILE'
export const userGetProfileTypes = createActionTypes(USER_GET_PROFILE)

export const getUserProfile = (id = false) => (dispatch, getState) =>
  dispatch({
    type: USER_GET_PROFILE,
    api: {
      url: `${API_ROOT}/profiles`,
      method: 'GET',
      params: { id: id || findUserId(getState()) || getUserId() },
    },
  })

reducers = {
  ...reducers,
  [userGetProfileTypes.LOADING]: state => ({
    ...state,
    profile: { ...state.profile, loading: true, error: false },
  }),
  [userGetProfileTypes.ERROR]: (state, payload) => ({
    ...state,
    profile: {
      ...state.profile,
      loading: false,
      error: payload.error || 'error',
    },
  }),
  [userGetProfileTypes.SUCCESS]: (state, { data }) => ({
    ...state,
    profile: {
      ...state.profile,
      loading: false,
      error: false,
      ...data,
    },
  }),
}

/**
 * GET USER SCHEDULE
 */
export const USER_GET_SCHEDULE = 'USER_GET_SCHEDULE'
export const userGetScheduleTypes = createActionTypes(USER_GET_SCHEDULE)

export const getSchedule = date => ({
  type: USER_GET_SCHEDULE,
  api: {
    url: `${API_ROOT}/schedule`,
    method: 'POST',
    data: { date },
  },
})

reducers = {
  ...reducers,
  [userGetScheduleTypes.LOADING]: state => ({
    ...state,
    schedule: { ...state.schedule, loading: true, error: false },
  }),
  [userGetScheduleTypes.ERROR]: state => ({
    ...state,
    schedule: { ...state.schedule, loading: false, error: true },
  }),
  [userGetScheduleTypes.SUCCESS]: state => ({
    ...state,
    schedule: { ...state.schedule, loading: false, error: true },
  }),
}

/**
 * Create Store
 */
export const reducer = buildStore(reducers, INITIAL_STATE)

reduxRegister.register('user', reducer)

/**
 * Find State
 */

export const findState = state => state.user
export const findUserAuth = state => findState(state).auth
export const findSchedule = state => findState(state).schedule
export const findUserProfile = state => findState(state).profile

export const findScheduleEvents = state => findSchedule(state).events
export const findScheduleLoading = state => findSchedule(state).loading
export const findScheduleError = state => findSchedule(state).error

export const findToken = state => findUserAuth(state).token
export const findFingerprint = state => findUserAuth(state).fingerprint

export const findUserId = state => findUserProfile(state).user.id

export default reducer
