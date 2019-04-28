import set from 'lodash/set'
import omit from 'lodash/omit'
import Cookies from 'js-cookie'
import { API_ROOT } from '@sdog/utils/api'
import get from '@sdog/utils/get'
import createFingerprint from '@sdog/utils/fingerprint'
import { useErrorFromResponse } from '@sdog/definitions/errors'
import { showGlobalAlert } from '@sdog/store/alerts'

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
  promoCode: false,
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
  offices: {
    loading: false,
    error: false,
    results: [],
  },
  updateProfile: {
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
    update: {
      loading: false,
      error: false,
    },
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
  validateEmail: {
    loading: false,
    error: false,
    success: false,
  },
  requestValidateEmail: {
    loading: false,
    error: false,
    success: false,
  },
  requestValidatePhone: {
    loading: false,
    error: false,
    success: false,
    token: false,
    anchor: false,
  },
  validatePhone: {
    loading: false,
    error: false,
    success: false,
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
export const userLoginTYPES = createActionTypes(USER_LOGIN)

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
  [userLoginTYPES.LOADING]: state => ({
    ...state,
    ...spreadLastUpdated(),
    auth: { ...state.auth, ...spreadLoadingError(true, false) },
  }),
  [userLoginTYPES.ERROR]: (state, { error }) => ({
    ...state,
    ...spreadLastUpdated(),
    auth: {
      ...state.auth,
      ...spreadLoadingError(false, useErrorFromResponse(error)),
    },
  }),
  [userLoginTYPES.SUCCESS]: (state, { data }) => ({
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
export const userRegisterTYPES = createActionTypes(USER_REGISTER)

export const registerUser = ({ onSuccess = false, onError = false, ...data }) => ({
  type: USER_REGISTER,
  api: {
    url: `${API_ROOT}/register`,
    method: 'POST',
    data: {
      ...data,
      promo_code: Cookies.get('sdPromo') || null,
    },
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
  [userRegisterTYPES.LOADING]: state => ({
    ...state,
    ...spreadLastUpdated(),
    register: {
      ...state.register,
      ...spreadLoadingError(true, false),
    },
  }),
  [userRegisterTYPES.SUCCESS]: (state, { data }) => ({
    ...state,
    ...spreadLastUpdated(),
    profile: formatProfileData(state.profile, data),
  }),
  [userRegisterTYPES.ERROR]: (state, { error }) => ({
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
export const userRegisterUpdateTYPES = createActionTypes(USER_REGISTER_UPDATE)

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
  [userRegisterUpdateTYPES.LOADING]: state => ({
    ...state,
    ...spreadLastUpdated(),
    register: {
      ...state.register,
      ...spreadLoadingError(true, false),
    },
  }),
  [userRegisterUpdateTYPES.SUCCESS]: (state, { data }) => ({
    ...state,
    ...spreadLastUpdated(),
    register: {
      ...state.register,
      ...spreadLoadingError(false, false),
    },
    profile: formatProfileData(state.profile, data),
  }),
  [userRegisterUpdateTYPES.ERROR]: (state, { error }) => ({
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
export const userGetProfileTYPES = createActionTypes(USER_GET_PROFILE)

export const getUserProfile = ({
  id = false,
  onSuccess = false,
  onError = false,
} = {}) => (dispatch, getState) => {
  const userId = id || findUserId(getState()) || getUserId()

  if (!userId) {
    dispatch({
      type: userGetProfileTYPES.ERROR,
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
  [userGetProfileTYPES.LOADING]: state => ({
    ...state,
    ...spreadLastUpdated(),
    profile: {
      ...state.profile,
      ...spreadLoadingError(true, false),
    },
  }),
  [userGetProfileTYPES.SUCCESS]: (state, { data }) => ({
    ...state,
    ...spreadLastUpdated(),
    profile: {
      ...state.profile,
      ...data,
      ...spreadLoadingError(false, false),
    },
  }),
  [userGetProfileTYPES.ERROR]: (state, { error }) => ({
    ...state,
    ...spreadLastUpdated(),
    profile: {
      ...state.profile,
      ...spreadLoadingError(false, useErrorFromResponse(error)),
    },
  }),
}

/**
 * GET PRACTICE OFFICES
 */
export const USER_GET_PRACTICE_OFFICES = 'USER_GET_PRACTICE_OFFICES'
export const userGetPracticeOfficesTYPES = createActionTypes(USER_GET_PRACTICE_OFFICES)

export const getPracticeOffices = userId => (dispatch, getState) =>
  dispatch({
    type: USER_GET_PRACTICE_OFFICES,
    api: {
      url: `${API_ROOT}/profiles/practices/offices`,
      method: 'GET',
      params: { user_id: userId || findUserId(getState()) || getUserId() },
    },
  })

reducers = {
  ...reducers,
  [userGetPracticeOfficesTYPES.LOADING]: state => ({
    ...state,
    ...spreadLastUpdated(),
    offices: {
      ...state.offices,
      ...spreadLoadingError(true, false),
    },
  }),
  [userGetPracticeOfficesTYPES.SUCCESS]: (state, { data }) => ({
    ...state,
    ...spreadLastUpdated(),
    offices: {
      ...state.offices,
      ...spreadLoadingError(false, false),
      results: data,
    },
  }),
  [userGetPracticeOfficesTYPES.ERROR]: (state, { error }) => ({
    ...state,
    ...spreadLastUpdated(),
    offices: {
      ...state.offices,
      ...spreadLoadingError(false, useErrorFromResponse(error)),
    },
  }),
}

/**
 * GET USER SCHEDULE
 */
export const USER_GET_SCHEDULE = 'USER_GET_SCHEDULE'
export const userGetScheduleTYPES = createActionTypes(USER_GET_SCHEDULE)

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
  [userGetScheduleTYPES.LOADING]: state => ({
    ...state,
    ...spreadLastUpdated(),
    schedule: {
      ...state.schedule,
      ...spreadLoadingError(true, false),
    },
  }),
  [userGetScheduleTYPES.ERROR]: state => ({
    ...state,
    ...spreadLastUpdated(),
    schedule: {
      ...state.schedule,
      ...spreadLoadingError(false, true),
    },
  }),
  [userGetScheduleTYPES.SUCCESS]: state => ({
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
export const autoSaveUserProfileTYPES = createActionTypes(AUTO_SAVE_USER_PROFILE)

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
  [autoSaveUserProfileTYPES.LOADING]: (state, { name, value }) => ({
    ...state,
    ...spreadLastUpdated(),
    profile: set({ ...state.profile }, name, value),
    previousProfileUpdate: {
      name,
      value: get(state.profile, name),
    },
    lastUpdated: new Date().getTime(),
  }),
  [autoSaveUserProfileTYPES.SUCCESS]: (state, { data }) => ({
    ...state,
    ...spreadLastUpdated(),
    profile: {
      ...state.profile,
      ...data,
    },
    lastUpdated: new Date().getTime(),
  }),
  [autoSaveUserProfileTYPES.ERROR]: (state, { error }) => ({
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
export const saveUserProfileTYPES = createActionTypes(SAVE_USER_PROFILE)

export const saveUserProfile = (form, options = {}) => (dispatch, getState) => {
  const dispatchOptions = {
    type: SAVE_USER_PROFILE,
    api: {
      url: `${API_ROOT}/profiles`,
      method: 'PUT',
      data: { data: form.profile, id: findUserId(getState()) || getUserId() },
      dispatches: {
        success: [
          () =>
            showGlobalAlert({
              message: 'You have sucessfully saved your profile.',
              type: 'success',
            }),
        ],
        error: [
          error =>
            showGlobalAlert({
              message: useErrorFromResponse(error),
              type: 'error',
            }),
        ],
      },
    },
    payload: form.profile,
  }

  if (options.dispatches) {
    if (options.overrideDispatches) {
      dispatchOptions.api.dispatches = { ...options.dispatches }
    } else {
      dispatchOptions.api.dispatches = {
        ...get(dispatchOptions, 'api.dispatches', []),
        success: [
          ...get(dispatchOptions, 'api.dispatches.success', []),
          ...get(options, 'dispatches.success', []),
        ],
        error: [
          ...get(dispatchOptions, 'api.dispatches.error', []),
          ...get(options, 'dispatches.error', []),
        ],
      }
    }
  }

  dispatch(dispatchOptions)
}

reducers = {
  ...reducers,
  [saveUserProfileTYPES.LOADING]: state => ({
    ...state,
    ...spreadLastUpdated(),
    updateProfile: { ...state.updateProfile, ...spreadLoadingError(true, false) },
  }),
  [saveUserProfileTYPES.SUCCESS]: (state, { data }) => ({
    ...state,
    ...spreadLastUpdated(),
    profile: {
      ...state.profile,
      ...data,
    },
    updateProfile: {
      ...state.updateProfile,
      ...spreadLoadingError(false, false),
    },
  }),
  [saveUserProfileTYPES.ERROR]: (state, { error }) => ({
    ...state,
    ...spreadLastUpdated(),
    updateProfile: {
      ...state.updateProfile,
      ...spreadLoadingError(false, useErrorFromResponse(error)),
    },
  }),
}

/**
 * Upload User Photo
 */
export const UPLOAD_USER_PHOTO = 'UPLOAD_USER_PHOTO'
export const uploadUserPhotoTYPES = createActionTypes(UPLOAD_USER_PHOTO)

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
  [uploadUserPhotoTYPES.LOADING]: state => ({
    ...state,
    ...spreadLastUpdated(),
    loadingUserProfile: true,
    loadingUserProfileError: false,
  }),
  [uploadUserPhotoTYPES.SUCCESS]: (state, { data }) => ({
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
  [uploadUserPhotoTYPES.ERROR]: (state, { error }) => ({
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
export const userForgotPasswordTYPES = createActionTypes(USER_FORGOT_PASSWORD)

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
  [userForgotPasswordTYPES.LOADING]: state => ({
    ...state,
    ...spreadLastUpdated(),
    forgot: {
      ...state.forgot,
      ...spreadLoadingError(true, false),
      success: false,
    },
  }),
  [userForgotPasswordTYPES.ERROR]: (state, { error }) => ({
    ...state,
    ...spreadLastUpdated(),
    forgot: {
      ...state.forgot,
      ...spreadLoadingError(false, useErrorFromResponse(error)),
      success: false,
    },
  }),
  [userForgotPasswordTYPES.SUCCESS]: (state, { data }) => ({
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
export const userResetPasswordTYPES = createActionTypes(USER_RESET_PASSWORD)
export const userValidatePasswordTYPES = createActionTypes(USER_VALIDATE_PASSWORD)

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
  [userValidatePasswordTYPES.LOADING]: state => ({
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
  [userValidatePasswordTYPES.ERROR]: (state, { error }) => ({
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
  [userValidatePasswordTYPES.SUCCESS]: (state, { data }) => ({
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
  [userResetPasswordTYPES.LOADING]: state => ({
    ...state,
    ...spreadLastUpdated(),
    reset: {
      ...state.reset,
      ...spreadLoadingError(true, false),
      success: false,
    },
  }),
  [userResetPasswordTYPES.ERROR]: (state, { error }) => ({
    ...state,
    ...spreadLastUpdated(),
    reset: {
      ...state.reset,
      ...spreadLoadingError(false, useErrorFromResponse(error)),
      success: false,
    },
  }),
  [userResetPasswordTYPES.SUCCESS]: (state, { data }) => ({
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
 * USER VALIDATE EMAIL
 */
export const USER_VALIDATE_EMAIL = 'USER_VALIDATE_EMAIL'
export const USER_VALIDATE_REQUEST = 'USER_VALIDATE_REQUEST'
export const USER_VALIDATE_EMAIL_CLEAR_SUCCESS = 'USER_VALIDATE_EMAIL_CLEAR_SUCCESS'
export const userValidateEmailTYPES = createActionTypes(USER_VALIDATE_EMAIL)
export const userValidateRequestEmailTYPES = createActionTypes(USER_VALIDATE_REQUEST)

export const requestValidateEmail = () => (dispatch, getState) => {
  const userId = findUserId(getState()) || getUserId()
  dispatch({
    type: USER_VALIDATE_REQUEST,
    api: {
      url: `${API_ROOT}/profiles/email_confirmation`,
      method: 'POST',
      data: { user_id: userId },
    },
  })
}

export const validateEmail = ({ anchor, token }) => ({
  type: USER_VALIDATE_EMAIL,
  api: {
    url: `${API_ROOT}/login/validate_email`,
    method: 'POST',
    data: { anchor, token },
  },
})

reducers = {
  ...reducers,
  [userValidateRequestEmailTYPES.LOADING]: state => ({
    ...state,
    ...spreadLastUpdated(),
    requestValidateEmail: {
      ...state.requestValidateEmail,
      ...spreadLoadingError(true, false),
      success: false,
    },
  }),
  [userValidateRequestEmailTYPES.ERROR]: (state, { error }) => ({
    ...state,
    ...spreadLastUpdated(),
    requestValidateEmail: {
      ...state.requestValidateEmail,
      ...spreadLoadingError(false, useErrorFromResponse(error)),
      success: false,
    },
  }),
  [userValidateRequestEmailTYPES.SUCCESS]: (state, { data }) => ({
    ...state,
    ...spreadLastUpdated(),
    requestValidateEmail: {
      ...state.requestValidateEmail,
      ...spreadLoadingError(false, false),
      success: get(data, 'message', true),
    },
  }),
  [userValidateEmailTYPES.LOADING]: state => ({
    ...state,
    ...spreadLastUpdated(),
    validateEmail: {
      ...state.validateEmail,
      ...spreadLoadingError(true, false),
      success: false,
    },
  }),
  [userValidateEmailTYPES.ERROR]: (state, { error }) => ({
    ...state,
    ...spreadLastUpdated(),
    validateEmail: {
      ...state.validateEmail,
      ...spreadLoadingError(false, useErrorFromResponse(error)),
      success: false,
    },
  }),
  [userValidateEmailTYPES.SUCCESS]: (state, { data }) => ({
    ...state,
    ...spreadLastUpdated(),
    validateEmail: {
      ...state.validateEmail,
      ...spreadLoadingError(false, false),
      success: get(data, 'message', true),
    },
  }),
}

/**
 * USER VALIDATE PHONE #
 */
export const USER_VALIDATE_PHONE = 'USER_VALIDATE_PHONE'
export const USER_VALIDATE_PHONE_REQUEST = 'USER_VALIDATE_PHONE_REQUEST'
export const userValidatePhoneTYPES = createActionTypes(USER_VALIDATE_PHONE)
export const userValidateRequestPhoneTYPES = createActionTypes(
  USER_VALIDATE_PHONE_REQUEST,
)

export const requestValidatePhone = ({ updateProfileData = false }) => (
  dispatch,
  getState,
) => {
  const userId = findUserId(getState()) || getUserId()

  if (updateProfileData) {
    dispatch({ type: userValidateRequestPhoneTYPES.LOADING })
    saveUserProfile(updateProfileData, {
      overrideDIspatches: true,
      dispatches: {
        success: [
          () => ({
            type: USER_VALIDATE_PHONE_REQUEST,
            api: {
              url: `${API_ROOT}/profiles/phone_confirmation_request`,
              method: 'POST',
              data: { user_id: userId },
            },
          }),
        ],
      },
    })(dispatch, getState)
  } else {
    dispatch({
      type: USER_VALIDATE_PHONE_REQUEST,
      api: {
        url: `${API_ROOT}/profiles/phone_confirmation_request`,
        method: 'POST',
        data: { user_id: userId },
      },
    })
  }
}

export const validatePhone = ({ anchor, token, code }) => ({
  type: USER_VALIDATE_PHONE,
  api: {
    url: `${API_ROOT}/profiles/phone_confirmation`,
    method: 'POST',
    data: { anchor, token, code },
  },
})

reducers = {
  ...reducers,
  [userValidateRequestPhoneTYPES.LOADING]: state => ({
    ...state,
    ...spreadLastUpdated(),
    requestValidatePhone: {
      ...state.requestValidatePhone,
      ...spreadLoadingError(true, false),
      success: false,
    },
  }),
  [userValidateRequestPhoneTYPES.ERROR]: (state, { error }) => ({
    ...state,
    ...spreadLastUpdated(),
    requestValidatePhone: {
      ...state.requestValidatePhone,
      ...spreadLoadingError(false, useErrorFromResponse(error)),
      success: false,
    },
  }),
  [userValidateRequestPhoneTYPES.SUCCESS]: (state, { data: { token, anchor } }) => ({
    ...state,
    ...spreadLastUpdated(),
    requestValidatePhone: {
      ...state.requestValidatePhone,
      ...spreadLoadingError(false, false),
      success: true,
      token,
      anchor,
    },
  }),
  [userValidatePhoneTYPES.LOADING]: state => ({
    ...state,
    ...spreadLastUpdated(),
    validatePhone: {
      ...state.validatePhone,
      ...spreadLoadingError(true, false),
      success: false,
    },
  }),
  [userValidatePhoneTYPES.ERROR]: (state, { error }) => ({
    ...state,
    ...spreadLastUpdated(),
    validatePhone: {
      ...state.validatePhone,
      ...spreadLoadingError(false, useErrorFromResponse(error)),
      success: false,
    },
  }),
  [userValidatePhoneTYPES.SUCCESS]: (state, { data }) => ({
    ...state,
    ...spreadLastUpdated(),
    validatePhone: {
      ...state.validatePhone,
      ...spreadLoadingError(false, false),
      success: get(data, 'message', true),
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
export const findValidateEmail = state => findState(state).validateEmail
export const findValidatePhone = state => findState(state).validatePhone
export const findResetValidate = state => findReset(state).validate
export const findValidateEmailRequest = state => findState(state).requestValidateEmail
export const findValidatePhoneRequest = state => findState(state).requestValidatePhone
export const findUserProfile = state => findState(state).profile
export const findUserMeta = state => findUserProfile(state).meta
export const findUserInfo = state => findUserProfile(state).user
export const findUserPreferences = state => findUserProfile(state).preferences

export const findUpdateProfile = state => findState(state).updateProfile

export const findScheduleEvents = state => findSchedule(state).events
export const findScheduleLoading = state => findSchedule(state).loading
export const findScheduleError = state => findSchedule(state).error

export const findForgotLoading = state => findForgot(state).loading
export const findForgotError = state => findForgot(state).error
export const findForgotSuccess = state => findForgot(state).success

export const findValidateEmailLoading = state => findValidateEmail(state).loading
export const findValidateEmailError = state => findValidateEmail(state).error
export const findValidateEmailSuccess = state => findValidateEmail(state).success

export const findValidateEmailRequestLoading = state =>
  findValidateEmailRequest(state).loading
export const findValidateEmailRequestError = state =>
  findValidateEmailRequest(state).error
export const findValidateEmailRequestSuccess = state =>
  findValidateEmailRequest(state).success

export const findValidatePhoneLoading = state => findValidatePhone(state).loading
export const findValidatePhoneError = state => findValidatePhone(state).error
export const findValidatePhoneSuccess = state => findValidatePhone(state).success

export const findValidatePhoneRequestLoading = state =>
  findValidatePhoneRequest(state).loading
export const findValidatePhoneRequestError = state =>
  findValidatePhoneRequest(state).error
export const findValidatePhoneRequestSuccess = state =>
  findValidatePhoneRequest(state).success
export const findValidatePhoneRequestToken = state =>
  findValidatePhoneRequest(state).token
export const findValidatePhoneRequestAnchor = state =>
  findValidatePhoneRequest(state).anchor

export const findResetValidateLoading = state => findResetValidate(state).loading
export const findResetValidateError = state => findResetValidate(state).error
export const findResetValidateSuccess = state => findResetValidate(state).success

export const findResetLoading = state => findReset(state).loading
export const findResetError = state => findReset(state).error
export const findResetSuccess = state => findReset(state).success

export const findPracticeOffices = state => findState(state).offices

export const findRegisterError = state => findRegister(state).error

export const findToken = state => findUserAuth(state).token
export const findFingerprint = state => findUserAuth(state).fingerprint

export const findUserType = state => findUserInfo(state).type

export const findUserId = state => findUserProfile(state).id

export const findUserPlanTier = state =>
  get(findUserProfile(state), 'meta.summary.plan_tier', false)

export default reducer
