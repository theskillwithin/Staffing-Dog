import { API_ROOT } from '../../api'
import { createActionTypes } from '../createAction'
import { buildStore, reduxRegister } from '../index'
import { getUserId } from '../storage'

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
    user: {
      id: 'c8332196-8c47-46d4-b97d-0ed42d4786d0',
    },
  },
}

let reducers = {}

/**
 * SET USER TOKEN
 */
export const USER_SET_TOKEN = 'USER_SET_TOKEN'

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

export const login = ({ email, password, onSuccess, onError }) => ({
  type: USER_LOGIN,
  api: {
    url: `${API_ROOT}/login`,
    type: 'POST',
    data: { email, password },
    callbacks: {
      success: onSuccess,
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
      type: 'GET',
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
    type: 'POST',
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
