import get from 'lodash/get'

import { API_ROOT } from '../../api'
import { findUserId } from '../user'
import { getUserId } from '../storage'
import { createActionTypes, reduxRegister, buildStore } from '../tools'

export const INITIAL_STATE = {
  loading: true,
  error: false,
  results: {
    scheduled: [],
    applied: [],
    recommended: [],
    posts: [],
    preferred: [],
  },
  singleJob: {
    loading: true,
    error: false,
    results: false,
  },
}

let reducers = {}

/**
 * Get Jobs
 */
export const GET_USER_JOBS = 'GET_USER_JOBS'
export const getUserJobsTypes = createActionTypes(GET_USER_JOBS)

export const getUserJobs = (params = {}) => (dispatch, getState) => {
  dispatch({
    type: GET_USER_JOBS,
    api: {
      url: `${API_ROOT}/jobs`,
      method: 'GET',
      params: {
        user_id: findUserId(getState()) || getUserId(),
        ...params,
      },
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
    results: {
      ...state.results,
      ...['applied', 'scheduled', 'recommended', 'preferred', 'posts'].reduce(
        (listOfPosts, postType) => ({
          ...listOfPosts,
          [postType]:
            typeof data[postType] === 'undefined'
              ? [...state.results[postType]] || []
              : data[postType],
        }),
        {},
      ),
    },
  }),
}

/**
 * Get Single Job
 */
export const GET_SINGLE_JOB = 'GET_SINGLE_JOB'
export const getSingleJobTypes = createActionTypes(GET_SINGLE_JOB)

export const getSingleJob = id => ({
  type: GET_SINGLE_JOB,
  api: {
    url: `${API_ROOT}/jobs`,
    method: 'GET',
    params: { id },
  },
})

reducers = {
  ...reducers,
  [getSingleJobTypes.LOADING]: state => ({
    ...state,
    singleJob: {
      ...state.singleJob,
      loading: true,
      error: false,
    },
  }),
  [getSingleJobTypes.SUCCESS]: (state, { data }) => ({
    ...state,
    singleJob: {
      ...state.singleJob,
      loading: false,
      error: false,
      results: data,
    },
  }),
  [getSingleJobTypes.ERROR]: (state, payload) => ({
    ...state,
    singleJob: {
      loading: false,
      error: get(payload, 'data.message', payload.error),
    },
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

export const findSingleJobState = state => findState(state).singleJob
export const findSingleJob = state => findSingleJobState(state).results
export const findSingleJobLoading = state => findSingleJobState(state).loading
export const findSingleJobError = state => findSingleJobState(state).error

export default reducer
