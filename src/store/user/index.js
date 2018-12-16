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
  },
  register: {
    loading: false,
    error: false,
  },
}

const spreadLoadingError = (loading, error) => ({ loading, error })

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
  [userLoginTypes.SUCCESS]: (
    state,
    {
      data: {
        user,
        full_profile: { user: userProfile, ...userFullProfile },
      },
    },
  ) => ({
    ...state,
    auth: { ...state.auth, loading: true, error: false },
    profile: {
      ...state.profile,
      loading: false,
      error: false,
      ...(user || {}),
      ...(userProfile || {}),
      ...(userFullProfile || {}),
    },
  }),
}

/**
 * REGISTER USER
 */
export const USER_REGISTER = 'USER_REGISTER'
export const userRegisterTypes = createActionTypes(USER_REGISTER)

export const registerUser = ({ onSuccess = false, onError = false, ...data }) => ({
  type: USER_REGISTER,
  api: {
    url: `${API_ROOT}/register`,
    method: 'POST',
    data,
    callbacks: {
      success: onSuccess,
      error: onError,
    },
  },
})

reducers = {
  ...reducers,
  [userRegisterTypes.LOADING]: state => ({
    ...state,
    register: {
      ...state.register,
      ...spreadLoadingError(true, false),
    },
  }),
  [userRegisterTypes.SUCCESS]: (
    state,
    {
      data: {
        user,
        full_profile: { user: userProfile, ...userFullProfile },
      },
    },
  ) => ({
    ...state,
    register: {
      ...state,
      ...spreadLoadingError(false, false),
    },
    profile: {
      ...state.profile,
      ...spreadLoadingError(false, false),
      ...(user || {}),
      ...(userProfile || {}),
      ...(userFullProfile || {}),
    },
  }),
  [userRegisterTypes.ERROR]: (state, { error }) => ({
    ...state,
    register: {
      ...state.register,
      ...spreadLoadingError(false, error),
    },
  }),
}

/**
 * Update Registered User
 */
export const USER_REGISTER_UPDATE = 'USER_REGISTER_UPDATE'
export const userRegisterUpdateTypes = createActionTypes(USER_REGISTER_UPDATE)

export const updateRegisterUser = ({ onSuccess = false, onError = false, ...data }) => ({
  type: USER_REGISTER_UPDATE,
  api: {
    url: `${API_ROOT}/register`,
    method: 'PUT',
    data,
    callbacks: {
      success: onSuccess,
      error: onError,
    },
  },
})

reducers = {
  ...reducers,
  [userRegisterUpdateTypes.LOADING]: reducers[userRegisterTypes.LOADING],
  [userRegisterUpdateTypes.SUCCESS]: reducers[userRegisterTypes.SUCCESS],
  [userRegisterUpdateTypes.ERROR]: reducers[userRegisterTypes.ERROR],
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
    profile: {
      ...state.profile,
      ...spreadLoadingError(true, false),
    },
  }),
  [userGetProfileTypes.ERROR]: (state, payload) => ({
    ...state,
    profile: {
      ...state.profile,
      ...spreadLoadingError(false, payload.error || 'error'),
    },
  }),
  [userGetProfileTypes.SUCCESS]: (
    state,
    {
      data: {
        user,
        full_profile: { user: userProfile, ...userFullProfile },
      },
    },
  ) => ({
    ...state,
    profile: {
      ...state.profile,
      ...spreadLoadingError(false, false),
      ...(user || {}),
      ...(userProfile || {}),
      ...(userFullProfile || {}),
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
    schedule: {
      ...state.schedule,
      ...spreadLoadingError(true, false),
    },
  }),
  [userGetScheduleTypes.ERROR]: state => ({
    ...state,
    schedule: {
      ...state.schedule,
      ...spreadLoadingError(false, true),
    },
  }),
  [userGetScheduleTypes.SUCCESS]: state => ({
    ...state,
    schedule: {
      ...state.schedule,
      ...spreadLoadingError(false, false),
    },
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

export const findUserId = state => findUserProfile(state).id

export default reducer
