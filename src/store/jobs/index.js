import { API_ROOT } from '../../api'
import { findUserId } from '../user'
import { getUserId } from '../storage'
import { createActionTypes, reduxRegister, buildStore } from '../tools'

export const INITIAL_STATE = {
  loading: false,
  error: false,
  results: {},
}

let reducers = {}

/**
 * Get Jobs
 */
export const GET_USER_JOBS = 'GET_USER_JOBS'
export const getUserJobsTypes = createActionTypes(GET_USER_JOBS)

export const getUserJobs = (userId = false) => (dispatch, getState) => {
  dispatch({
    type: GET_USER_JOBS,
    api: {
      url: `${API_ROOT}/jobs`,
      method: 'GET',
      params: { user_id: userId || findUserId(getState()) || getUserId() },
    },
  })
}

reducers = {
  ...reducers,
  [getUserJobsTypes.LOADING]: state => ({
    ...state,
    loading: true,
    error: false,
  }),
  [getUserJobsTypes.ERROR]: (state, { error = 'error' }) => ({
    ...state,
    loading: false,
    error,
  }),
  [getUserJobsTypes.SUCCESS]: (state, { data }) => ({
    ...state,
    loading: false,
    error: false,
    results: data,
  }),
}

/**
 * Create Store
 */
export const reducer = buildStore(reducers, INITIAL_STATE)

reduxRegister.register('jobs', reducer)

/**
 * Find State
 */
export const findState = state => state.jobs
export const findJobsLoading = state => findState(state).loading
export const findJobsError = state => findState(state).error
export const findJobs = state => findState(state).results

export default reducer
