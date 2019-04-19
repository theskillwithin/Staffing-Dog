import { API_ROOT } from '@sdog/utils/api'
import { useErrorFromResponse } from '@sdog/definitions/errors'
import { findUserId } from '@sdog/store/user'

import { createActionTypes, reduxRegister, buildStore } from '../tools'
import { getUserId } from '../storage'

const spreadLastUpdated = () => ({
  lastUpdated: new Date().getTime(),
})
const spreadLoadingError = (loading = false, error = false) => ({
  loading,
  error,
})

export const INITIAL_STATE = {
  lastUpdated: false,
  loading: false,
  error: false,
  results: [],
}

let reducers = {}

/**
 * GET PROFESSIONALS
 */
export const GET_PROFESSIONALS = 'GET_PROFESSIONALS'
export const getProfessionalsTypes = createActionTypes(GET_PROFESSIONALS)

export const getProfessionals = data => (dispatch, getState) =>
  dispatch({
    type: GET_PROFESSIONALS,
    api: {
      url: `${API_ROOT}/profiles/professionals`,
      method: 'GET',
      params: {
        user_id: findUserId(getState()) || getUserId(),
        ...data,
      },
    },
  })

reducers = {
  ...reducers,
  [getProfessionalsTypes.LOADING]: state => ({
    ...state,
    ...spreadLastUpdated(),
    ...spreadLoadingError(true, false),
  }),
  [getProfessionalsTypes.SUCCESS]: (state, { data }) => ({
    ...state,
    ...spreadLastUpdated(),
    ...spreadLoadingError(false, false),
    results: data,
  }),
  [getProfessionalsTypes.ERROR]: (state, { error }) => ({
    ...state,
    ...spreadLastUpdated(),
    ...spreadLoadingError(false, useErrorFromResponse(error)),
  }),
}

/**
 * Create Store
 */
export const reducer = buildStore(reducers, INITIAL_STATE)

reduxRegister.register('professionals', reducer)

/**
 * Find State
 */

export const findState = state => state.professionals

export const findProfessionals = state => findState(state).results
export const findProfessionalsLoading = state => findState(state).loading
export const findProfessionalsError = state => findState(state).error

/**
 * Default Export
 */
export default reducer
