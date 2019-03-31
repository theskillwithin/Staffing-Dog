import set from 'lodash/set'
import get from 'lodash/get'
import omit from 'lodash/omit'
import { API_ROOT } from '@sdog/utils/api'
import createFingerprint from '@sdog/utils/fingerprint'
import { useErrorFromResponse } from '@sdog/definitions/errors'

import { createActionTypes, reduxRegister, buildStore } from '../tools'
import {
  getUserId,
  setToken as setTokenInCookie,
  setFingerprint as setFingerprintInCookie,
  setUserId as setUserIdCookie,
  removeAllAuth,
} from '../storage'

export const INITIAL_STATE = {
  lastUpdated: false,
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
  forgot: {
    loading: false,
    error: false,
    success: false,
  },
  reset: {
    loading: false,
    error: false,
    success: false,
    validate: {
      loading: true,
      error: false,
      success: false,
    },
  },
}

const getLastUpdated = () => new Date().getTime()
const spreadLastUpdated = () => ({ lastUpdated: getLastUpdated() })

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
 * SET USER FINGERPRINT
 */
export const USER_SET_FINGERPRINT = 'USER_SET_FINGERPRINT'

export const setFingerprint = fingerprint => dispatch => {
  setFingerprintInCookie(fingerprint)

  dispatch({
    type: USER_SET_FINGERPRINT,
    payload: { fingerprint },
  })
}

reducers = {
  ...reducers,
  [USER_SET_FINGERPRINT]: (state, { fingerprint }) => ({
    ...state,
    ...spreadLastUpdated(),
    auth: {
      ...state.auth,
      fingerprint,
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
    dispatches: {
      error: [
        () => ({
          type: USER_SET_FINGERPRINT,
          payload: { fingerprint: false },
        }),
      ],
    },
  },
})

reducers = {
  ...reducers,
  [userLoginTypes.LOADING]: state => ({
    ...state,
    ...spreadLastUpdated(),
    auth: { ...state.auth, ...spreadLoadingError(true, false) },
  }),
  [userLoginTypes.ERROR]: (state, { error }) => ({
    ...state,
    ...spreadLastUpdated(),
    auth: {
      ...state.auth,
      ...spreadLoadingError(false, useErrorFromResponse(error)),
    },
  }),
  [userLoginTypes.SUCCESS]: (state, { data }) => ({
    ...state,
    ...spreadLastUpdated(),
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
 * Logout User
 */
export const USER_LOGOUT = 'USER_LOGOUT'
export const userLogoutTypes = createActionTypes(USER_LOGOUT)

const onLogoutDispatches = [
  () => ({ type: USER_SET_FINGERPRINT, payload: { fingerprint: createFingerprint() } }),
  () => ({ type: USER_SET_TOKEN, payload: { token: false } }),
]

const onLogoutCallback = cb => {
  removeAllAuth()
  if (cb) cb()
}

export const logout = (cb = false) => (dispatch, getState) => {
  const userId = findUserId(getState())

  if (userId) {
    dispatch({
      type: USER_LOGOUT,
      api: {
        url: `${API_ROOT}/logout`,
        method: 'POST',
        data: { user_id: userId },
        callbacks: {
          success: () => onLogoutCallback(cb),
          error: () => onLogoutCallback(cb),
        },
        dispatches: {
          success: onLogoutDispatches,
          error: onLogoutDispatches,
        },
      },
    })
  } else {
    onLogoutCallback(cb)
  }
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
    ...spreadLastUpdated(),
    register: {
      ...state.register,
      ...spreadLoadingError(true, false),
    },
  }),
  [userRegisterTypes.SUCCESS]: (state, { data }) => ({
    ...state,
    ...spreadLastUpdated(),
    profile: formatProfileData(state.profile, data),
  }),
  [userRegisterTypes.ERROR]: (state, { error }) => ({
    ...state,
    ...spreadLastUpdated(),
    register: {
      ...state.register,
      ...spreadLoadingError(false, useErrorFromResponse(error)),
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
    ...spreadLastUpdated(),
    register: {
      ...state.register,
      ...spreadLoadingError(true, false),
    },
  }),
  [userRegisterUpdateTypes.SUCCESS]: (state, { data }) => ({
    ...state,
    ...spreadLastUpdated(),
    register: {
      ...state.register,
      ...spreadLoadingError(false, false),
    },
    profile: formatProfileData(state.profile, data),
  }),
  [userRegisterUpdateTypes.ERROR]: (state, { error }) => ({
    ...state,
    ...spreadLastUpdated(),
    register: {
      ...state.register,
      ...spreadLoadingError(false, useErrorFromResponse(error)),
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
    ...spreadLastUpdated(),
    profile: {
      ...state.profile,
      ...spreadLoadingError(true, false),
    },
  }),
  [userGetProfileTypes.SUCCESS]: (state, { data }) => ({
    ...state,
    ...spreadLastUpdated(),
    profile: {
      ...state.profile,
      ...data,
      ...spreadLoadingError(false, false),
    },
  }),
  [userGetProfileTypes.ERROR]: (state, { error }) => ({
    ...state,
    ...spreadLastUpdated(),
    profile: {
      ...state.profile,
      ...spreadLoadingError(false, useErrorFromResponse(error)),
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
    ...spreadLastUpdated(),
    schedule: {
      ...state.schedule,
      ...spreadLoadingError(true, false),
    },
  }),
  [userGetScheduleTypes.ERROR]: state => ({
    ...state,
    ...spreadLastUpdated(),
    schedule: {
      ...state.schedule,
      ...spreadLoadingError(false, true),
    },
  }),
  [userGetScheduleTypes.SUCCESS]: state => ({
    ...state,
    ...spreadLastUpdated(),
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
    ...spreadLastUpdated(),
    profile: set({ ...state.profile }, name, value),
    lastUpdated: new Date().getTime(),
  }),
  [autoSaveUserProfileTypes.LOADING]: (state, { name, value }) => ({
    ...state,
    ...spreadLastUpdated(),
    profile: set({ ...state.profile }, name, value),
    previousProfileUpdate: {
      name,
      value: get(state.profile, name),
    },
    lastUpdated: new Date().getTime(),
  }),
  [autoSaveUserProfileTypes.SUCCESS]: (state, { data }) => ({
    ...state,
    ...spreadLastUpdated(),
    profile: {
      ...state.profile,
      ...data,
    },
    lastUpdated: new Date().getTime(),
  }),
  [autoSaveUserProfileTypes.ERROR]: (state, { error }) => ({
    ...state,
    ...spreadLastUpdated(),
    profile: {
      ...(state.profile.previousProfileUpdate
        ? set(
            { ...state.profile },
            state.profile.previousProfileUpdate.name,
            state.profile.previousProfileUpdate.value,
          )
        : state.profile),
      ...spreadLoadingError(false, useErrorFromResponse(error)),
    },
    lastUpdated: new Date().getTime(),
  }),
}

/**
 * Save User Profile Data
 */
export const SAVE_USER_PROFILE = 'SAVE_USER_PROFILE'
export const saveUserProfileTypes = createActionTypes(SAVE_USER_PROFILE)

export const saveUserProfile = form => (dispatch, getState) => {
  dispatch({
    type: SAVE_USER_PROFILE,
    api: {
      url: `${API_ROOT}/profiles`,
      method: 'PUT',
      data: { data: form.profile, id: findUserId(getState()) || getUserId() },
    },
    payload: form.profile,
  })
}

reducers = {
  ...reducers,
  [saveUserProfileTypes.LOADING]: state => ({
    ...state,
    ...spreadLastUpdated(),
    profile: { ...state.profile, ...spreadLoadingError(true, false) },
  }),
  [saveUserProfileTypes.SUCCESS]: (state, { data }) => ({
    ...state,
    ...spreadLastUpdated(),
    profile: {
      ...state.profile,
      ...data,
      ...spreadLoadingError(false, false),
    },
  }),
  [saveUserProfileTypes.ERROR]: (state, { error }) => ({
    ...state,
    ...spreadLastUpdated(),
    profile: {
      ...state.profile,
      ...spreadLoadingError(false, useErrorFromResponse(error)),
    },
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
    type: UPLOAD_USER_PHOTO,
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
    ...spreadLastUpdated(),
    loadingUserProfile: true,
    loadingUserProfileError: false,
  }),
  [uploadUserPhotoTypes.SUCCESS]: (state, { data }) => ({
    ...state,
    ...spreadLastUpdated(),
    loadingUserProfile: false,
    loadingUserProfileError: false,
    profile: {
      ...state.profile,
      preferences: {
        ...state.profile.preferences,
        profile_image_url: data.profile_img_url,
      },
    },
  }),
  [uploadUserPhotoTypes.ERROR]: (state, { error }) => ({
    ...state,
    ...spreadLastUpdated(),
    loadingUserProfile: false,
    loadingUserProfileError: useErrorFromResponse(error),
  }),
}

/**
 * Clear Error Register
 */

export const USER_REGISTER_CLEAR_ERROR = 'USER_REGISTER_CLEAR_ERROR'

export const clearRegisterUserError = () => ({
  type: USER_REGISTER_CLEAR_ERROR,
})

reducers = {
  ...reducers,
  [USER_REGISTER_CLEAR_ERROR]: state => ({
    ...state,
    ...spreadLastUpdated(),
    register: {
      ...state.register,
      error: null,
    },
  }),
}

/**
 * FORGOT PASSWORD
 */
export const USER_FORGOT_PASSWORD = 'USER_FORGOT_PASSWORD'
export const USER_FORGOT_PASSWORD_CLEAR_SUCCESS = 'USER_FORGOT_PASSWORD_CLEAR_SUCCESS'
export const userForgotPasswordTypes = createActionTypes(USER_FORGOT_PASSWORD)

export const displayedForgotPasswordClearSuccess = () => ({
  type: USER_FORGOT_PASSWORD_CLEAR_SUCCESS,
})

export const submitForgotPasswordEmail = ({ email, history }) => ({
  type: USER_FORGOT_PASSWORD,
  api: {
    url: `${API_ROOT}/login/forgot-password`,
    method: 'POST',
    data: { email },
    callbacks: {
      success: () => {
        if (history) {
          history.push('/login')
        }
      },
    },
  },
})

reducers = {
  ...reducers,
  [userForgotPasswordTypes.LOADING]: state => ({
    ...state,
    ...spreadLastUpdated(),
    forgot: {
      ...state.forgot,
      ...spreadLoadingError(true, false),
      success: false,
    },
  }),
  [userForgotPasswordTypes.ERROR]: (state, { error }) => ({
    ...state,
    ...spreadLastUpdated(),
    forgot: {
      ...state.forgot,
      ...spreadLoadingError(false, useErrorFromResponse(error)),
      success: false,
    },
  }),
  [userForgotPasswordTypes.SUCCESS]: (state, { data }) => ({
    ...state,
    ...spreadLastUpdated(),
    forgot: {
      ...state.forgot,
      ...spreadLoadingError(false, false),
      success: get(data, 'message', true),
    },
  }),
  [USER_FORGOT_PASSWORD_CLEAR_SUCCESS]: state => ({
    ...state,
    ...spreadLastUpdated(),
    forgot: {
      ...state.forgot,
      success: false,
    },
  }),
}

/**
 * RESET PASSWORD
 */
export const USER_RESET_PASSWORD = 'USER_RESET_PASSWORD'
export const USER_VALIDATE_PASSWORD = 'USER_VALIDATE_PASSWORD'
export const USER_RESET_PASSWORD_CLEAR_SUCCESS = 'USER_RESET_PASSWORD_CLEAR_SUCCESS'
export const userResetPasswordTypes = createActionTypes(USER_RESET_PASSWORD)
export const userValidatePasswordTypes = createActionTypes(USER_VALIDATE_PASSWORD)

export const displayedResetPasswordClearSuccess = () => ({
  type: USER_RESET_PASSWORD_CLEAR_SUCCESS,
})

export const validateResetPasswordEmail = ({ anchor, token }) => ({
  type: USER_VALIDATE_PASSWORD,
  api: {
    url: `${API_ROOT}/login/validate-reset`,
    method: 'POST',
    data: { anchor, token },
  },
})

export const submitResetPasswordEmail = ({ anchor, token, data, history }) => ({
  type: USER_RESET_PASSWORD,
  api: {
    url: `${API_ROOT}/login/reset-password`,
    method: 'POST',
    data: { anchor, token, data },
    callbacks: {
      success: () => {
        if (history) {
          history.push('/login')
        }
      },
    },
  },
})

reducers = {
  ...reducers,
  [userValidatePasswordTypes.LOADING]: state => ({
    ...state,
    ...spreadLastUpdated(),
    reset: {
      ...state.reset,
      validate: {
        ...state.reset.validate,
        ...spreadLoadingError(true, false),
        success: false,
      },
    },
  }),
  [userValidatePasswordTypes.ERROR]: (state, { error }) => ({
    ...state,
    ...spreadLastUpdated(),
    reset: {
      ...state.reset,
      validate: {
        ...state.reset.validate,
        ...spreadLoadingError(false, useErrorFromResponse(error)),
        success: false,
      },
    },
  }),
  [userValidatePasswordTypes.SUCCESS]: (state, { data }) => ({
    ...state,
    ...spreadLastUpdated(),
    reset: {
      ...state.reset,
      validate: {
        ...state.reset.validate,
        ...spreadLoadingError(false, false),
        success: get(data, 'message', true),
      },
    },
  }),
  [userResetPasswordTypes.LOADING]: state => ({
    ...state,
    ...spreadLastUpdated(),
    reset: {
      ...state.reset,
      ...spreadLoadingError(true, false),
      success: false,
    },
  }),
  [userResetPasswordTypes.ERROR]: (state, { error }) => ({
    ...state,
    ...spreadLastUpdated(),
    reset: {
      ...state.reset,
      ...spreadLoadingError(false, useErrorFromResponse(error)),
      success: false,
    },
  }),
  [userResetPasswordTypes.SUCCESS]: (state, { data }) => ({
    ...state,
    ...spreadLastUpdated(),
    reset: {
      ...state.reset,
      ...spreadLoadingError(false, false),
      success: get(data, 'message', true),
    },
  }),
  [USER_RESET_PASSWORD_CLEAR_SUCCESS]: state => ({
    ...state,
    ...spreadLastUpdated(),
    reset: {
      ...state.reset,
      success: false,
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

export const loadingUserProfile = state => findState(state).loadingUserProfile
export const loadingUserProfileError = state => findState(state).loadingUserProfileError

export const findUserAuth = state => findState(state).auth
export const findSchedule = state => findState(state).schedule
export const findRegister = state => findState(state).register
export const findForgot = state => findState(state).forgot
export const findReset = state => findState(state).reset
export const findResetValidate = state => findReset(state).validate
export const findUserProfile = state => findState(state).profile
export const findUserMeta = state => findUserProfile(state).meta
export const findUserInfo = state => findUserProfile(state).user
export const findUserPreferences = state => findUserProfile(state).preferences

export const findScheduleEvents = state => findSchedule(state).events
export const findScheduleLoading = state => findSchedule(state).loading
export const findScheduleError = state => findSchedule(state).error

export const findForgotLoading = state => findForgot(state).loading
export const findForgotError = state => findForgot(state).error
export const findForgotSuccess = state => findForgot(state).success

export const findResetValidateLoading = state => findResetValidate(state).loading
export const findResetValidateError = state => findResetValidate(state).error
export const findResetValidateSuccess = state => findResetValidate(state).success

export const findResetLoading = state => findReset(state).loading
export const findResetError = state => findReset(state).error
export const findResetSuccess = state => findReset(state).success

export const findRegisterError = state => findRegister(state).error

export const findToken = state => findUserAuth(state).token
export const findFingerprint = state => findUserAuth(state).fingerprint

export const findUserId = state => findUserProfile(state).id

export default reducer
