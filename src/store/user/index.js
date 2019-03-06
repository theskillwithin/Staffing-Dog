import set from 'lodash/set'
import get from 'lodash/get'
import omit from 'lodash/omit'
import { API_ROOT } from '@sdog/utils/api'

import { createActionTypes, reduxRegister, buildStore } from '../tools'
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
    meta: {
      capacity: {
        default_hours: {
          sun: {
            active: false,
            from: { label: '6:00 am', value: '6:00 am' },
            to: { label: '7:00 pm', value: '7:00 pm' },
          },
          mon: {
            active: true,
            from: { label: '6:00 am', value: '6:00 am' },
            to: { label: '7:00 pm', value: '7:00 pm' },
          },
          tue: {
            active: true,
            from: { label: '6:00 am', value: '6:00 am' },
            to: { label: '7:00 pm', value: '7:00 pm' },
          },
          wed: {
            active: true,
            from: { label: '6:00 am', value: '6:00 am' },
            to: { label: '7:00 pm', value: '7:00 pm' },
          },
          thu: {
            active: true,
            from: { label: '6:00 am', value: '6:00 am' },
            to: { label: '7:00 pm', value: '7:00 pm' },
          },
          fri: {
            active: true,
            from: { label: '6:00 am', value: '6:00 am' },
            to: { label: '7:00 pm', value: '7:00 pm' },
          },
          sat: {
            active: true,
            from: { label: '6:00 am', value: '6:00 am' },
            to: { label: '7:00 pm', value: '7:00 pm' },
          },
        },
      },
    },
    id: '',
    user: {},
  },
  register: {
    loading: false,
    error: false,
  },
}

const spreadLoadingError = (loading = false, error = false) => ({ loading, error })

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
        setUserIdCookie(res.data.id)
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
    auth: { ...state.auth, ...spreadLoadingError(true, false) },
  }),
  [userLoginTypes.ERROR]: state => ({
    ...state,
    auth: { ...state.auth, ...spreadLoadingError(false, true) },
  }),
  [userLoginTypes.SUCCESS]: (state, { data }) => ({
    ...state,
    auth: { ...state.auth, ...spreadLoadingError(false, false) },
    profile: {
      ...state.profile,
      loading: false,
      error: false,
      ...data,
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
      success: res => {
        setUserIdCookie(res.data.id)
        if (onSuccess) onSuccess(res)
      },
      error: onError,
    },
  },
})

const formatProfileData = (profile, data) => ({
  ...profile,
  ...data,
  ...spreadLoadingError(false, false),
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
  [userRegisterTypes.SUCCESS]: (state, { data }) => ({
    ...state,
    profile: formatProfileData(state.profile, data),
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
    data: omit(data, ['addresses.geocode']),
    callbacks: {
      success: onSuccess,
      error: onError,
    },
  },
})

reducers = {
  ...reducers,
  [userRegisterUpdateTypes.LOADING]: state => ({
    ...state,
    register: {
      ...state.register,
      ...spreadLoadingError(true, false),
    },
  }),
  [userRegisterUpdateTypes.SUCCESS]: (state, { data }) => ({
    ...state,
    register: {
      ...state.register,
      ...spreadLoadingError(false, false),
    },
    profile: formatProfileData(state.profile, data),
  }),
  [userRegisterUpdateTypes.ERROR]: (state, { error }) => ({
    ...state,
    register: {
      ...state.register,
      ...spreadLoadingError(false, error),
    },
  }),
}

/**
 * GET USER PROFILE
 */
export const USER_GET_PROFILE = 'USER_GET_PROFILE'
export const userGetProfileTypes = createActionTypes(USER_GET_PROFILE)

export const getUserProfile = ({
  id = false,
  onSuccess = false,
  onError = false,
} = {}) => (dispatch, getState) => {
  const userId = id || findUserId(getState()) || getUserId()

  if (!userId) {
    dispatch({
      type: userGetProfileTypes.ERROR,
      payload: { error: 'No User' },
    })
  } else {
    dispatch({
      type: USER_GET_PROFILE,
      api: {
        url: `${API_ROOT}/profiles`,
        method: 'GET',
        params: { id: userId },
        callbacks: {
          success: onSuccess,
          error: onError,
        },
      },
    })
  }
}

reducers = {
  ...reducers,
  [userGetProfileTypes.LOADING]: state => ({
    ...state,
    profile: {
      ...state.profile,
      ...spreadLoadingError(true, false),
    },
  }),
  [userGetProfileTypes.SUCCESS]: (state, { data }) => ({
    ...state,
    profile: {
      ...state.profile,
      ...data,
      ...spreadLoadingError(false, false),
    },
  }),
  [userGetProfileTypes.ERROR]: (state, payload) => ({
    ...state,
    profile: {
      ...state.profile,
      ...spreadLoadingError(false, payload.error || 'error'),
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
 * Auto Save User Profile Data
 *
 * This currently allows you to auto save (onchange) save user profile
 * It currently only supports items that live in the profile object,
 * excluding the profile.user from orginal api call
 *
 * Supported Paths: meta, addresses, preferences
 * Example 'meta.capacity.availablity'
 */
export const AUTO_SAVE_USER_PROFILE = 'AUTO_SAVE_USER_PROFILE'
export const AUTH_SAVE_USER_PROFILE_ONLY_REDUX = 'AUTH_SAVE_USER_PROFILE_ONLY_REDUX'
export const autoSaveUserProfileTypes = createActionTypes(AUTO_SAVE_USER_PROFILE)

export const autoSaveUserProfile = (name, value, useApi = true) => (
  dispatch,
  getState,
) => {
  const state = getState()

  if (!useApi) {
    dispatch({
      type: AUTH_SAVE_USER_PROFILE_ONLY_REDUX,
      payload: { name, value },
    })
  } else {
    dispatch({
      type: AUTO_SAVE_USER_PROFILE,
      api: {
        url: `${API_ROOT}/profiles`,
        method: 'PUT',
        data: {
          id: findUserId(getState()) || getUserId(),
          data: omit(
            set(
              {
                addresses: findUserProfile(state).addresses,
                meta: findUserMeta(state),
                preferences: findUserPreferences(state),
                user: findUserProfile(state).user,
              },
              name,
              value,
            ),
            ['addresses.geocode'],
          ),
        },
      },
      payload: { name, value },
    })
  }
}

reducers = {
  ...reducers,
  [AUTH_SAVE_USER_PROFILE_ONLY_REDUX]: (state, { name, value }) => ({
    ...state,
    profile: set({ ...state.profile }, name, value),
    lastUpdated: new Date().getTime(),
  }),
  [autoSaveUserProfileTypes.LOADING]: (state, { name, value }) => ({
    ...state,
    profile: set({ ...state.profile }, name, value),
    previousProfileUpdate: {
      name,
      value: get(state.profile, name),
    },
    lastUpdated: new Date().getTime(),
  }),
  [autoSaveUserProfileTypes.SUCCESS]: (state, { data }) => ({
    ...state,
    profile: {
      ...state.profile,
      ...data,
    },
    lastUpdated: new Date().getTime(),
  }),
  [autoSaveUserProfileTypes.ERROR]: (state, payload) => ({
    ...state,
    profile: {
      ...(state.profile.previousProfileUpdate
        ? set(
            { ...state.profile },
            state.profile.previousProfileUpdate.name,
            state.profile.previousProfileUpdate.value,
          )
        : state.profile),
      ...spreadLoadingError(false, payload.error || 'error'),
    },
    lastUpdated: new Date().getTime(),
  }),
}

/**
 * Upload User Photo
 */
export const UPLOAD_USER_PHOTO = 'UPLOAD_USER_PHOTO'
export const uploadUserPhotoTypes = createActionTypes(UPLOAD_USER_PHOTO)

export const uploadUserPhoto = file => (dispatch, getState) => {
  const data = new FormData()
  data.append('profileimg', file)
  data.append('user_id', findUserId(getState()) || getUserId())

  dispatch({
    type: USER_GET_SCHEDULE,
    api: {
      url: `${API_ROOT}/profile/uploads`,
      method: 'POST',
      data,
    },
  })
}

reducers = {
  ...reducers,
  [uploadUserPhotoTypes.LOADING]: state => ({
    ...state,
    loadingUserProfile: true,
    loadingUserProfileError: false,
  }),
  [uploadUserPhotoTypes.SUCCESS]: (state, { data }) => ({
    ...state,
    loadingUserProfile: false,
    loadingUserProfileError: false,
    profile: {
      ...state.profile,
      preferences: {
        ...state.profile.preferences,
        profile_img_url: data.profile_img_url,
      },
    },
  }),
  [uploadUserPhotoTypes.ERROR]: state => ({
    ...state,
    loadingUserProfile: false,
    loadingUserProfileError: true,
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
export const findRegister = state => findState(state).register
export const findUserProfile = state => findState(state).profile
export const findUserMeta = state => findUserProfile(state).meta
export const findUserInfo = state => findUserProfile(state).user
export const findUserPreferences = state => findUserProfile(state).preferences

export const findScheduleEvents = state => findSchedule(state).events
export const findScheduleLoading = state => findSchedule(state).loading
export const findScheduleError = state => findSchedule(state).error

export const findRegisterError = state => findRegister(state).error

export const findToken = state => findUserAuth(state).token
export const findFingerprint = state => findUserAuth(state).fingerprint

export const findUserId = state => findUserProfile(state).id

export default reducer
