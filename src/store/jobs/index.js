import { API_ROOT } from '@sdog/utils/api'
import { useErrorFromResponse } from '@sdog/definitions/errors'

import { findUserId } from '../user'
import { getUserId } from '../storage'
import { createActionTypes, reduxRegister, buildStore } from '../tools'

export const INITIAL_STATE = {
  loading: true,
  error: false,
  lastUpdated: false,
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
    results: {},
  },
  create: {
    loading: false,
    error: false,
    results: {},
  },
  update: {
    loading: false,
    error: false,
    jobId: false,
  },
}

const getLastUpdated = () => new Date().getTime()
const spreadLastUpdated = () => ({ lastUpdated: getLastUpdated() })

const spreadLoadingError = (loading = false, error = false) => ({ loading, error })

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
  [getUserJobsTypes.ERROR]: (state, { error }) => ({
    ...state,
    loading: false,
    error: useErrorFromResponse(error),
  }),
  [getUserJobsTypes.SUCCESS]: (state, { data }) => ({
    ...state,
    ...spreadLastUpdated(),
    loading: false,
    error: false,
    results: {
      ...state.results,
      ...(typeof data !== 'object'
        ? { posts: data }
        : ['applied', 'scheduled', 'recommended', 'preferred', 'posts'].reduce(
            (listOfPosts, postType) => ({
              ...listOfPosts,
              [postType]:
                typeof data[postType] === 'undefined'
                  ? [...state.results[postType]] || []
                  : data[postType],
            }),
            {},
          )),
    },
  }),
}

/**
 * Get Single Job
 */
export const GET_SINGLE_JOB = 'GET_SINGLE_JOB'
export const getSingleJobTypes = createActionTypes(GET_SINGLE_JOB)

export const getSingleJob = id => (dispatch, getState) =>
  dispatch({
    type: GET_SINGLE_JOB,
    api: {
      url: `${API_ROOT}/jobs`,
      method: 'GET',
      params: { id, user_id: findUserId(getState()) || getUserId() },
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
  [getSingleJobTypes.ERROR]: (state, { error }) => ({
    ...state,
    singleJob: {
      loading: false,
      error: useErrorFromResponse(error),
    },
  }),
}

/**
 * Post New Job
 */
export const POST_NEW_JOB = 'POST_NEW_JOB'
export const postNewJobTypes = createActionTypes(POST_NEW_JOB)

export const postNewJob = (data, cb = {}) => (dispatch, getState) =>
  dispatch({
    type: POST_NEW_JOB,
    api: {
      url: `${API_ROOT}/jobs`,
      method: 'POST',
      data: {
        user_id: findUserId(getState()) || getUserId(),
        data: {
          status: 'draft',
          ...data,
        },
      },
      callbacks: {
        ...cb,
      },
    },
  })

reducers = {
  ...reducers,
  [postNewJobTypes.LOADING]: state => ({
    ...state,
    create: {
      ...state.create,
      ...spreadLoadingError(true, false),
    },
  }),
  [postNewJobTypes.SUCCESS]: state => ({
    ...state,
    ...spreadLastUpdated(),
    create: {
      ...state.create,
      ...spreadLoadingError(false, false),
    },
  }),
  [postNewJobTypes.ERROR]: (state, { error }) => ({
    ...state,
    create: {
      ...state.create,
      ...spreadLoadingError(false, useErrorFromResponse(error)),
    },
  }),
}

/**
 * Update Job Post
 */
export const UPDATE_JOB_POST = 'UPDATE_JOB_POST'
export const updateJobPostTypes = createActionTypes(UPDATE_JOB_POST)

export const updateJobPost = (data, cb = {}) => (dispatch, getState) =>
  dispatch({
    type: UPDATE_JOB_POST,
    api: {
      url: `${API_ROOT}/jobs`,
      method: 'PUT',
      data: {
        user_id: findUserId(getState()) || getUserId(),
        data,
      },
      callbacks: {
        ...cb,
      },
    },
    payload: {
      jobId: data.id,
    },
  })

reducers = {
  ...reducers,
  [updateJobPostTypes.LOADING]: (state, { jobId }) => ({
    ...state,
    update: {
      ...state.update,
      ...spreadLoadingError(true, false),
      jobId,
    },
  }),
  [updateJobPostTypes.SUCCESS]: state => ({
    ...state,
    ...spreadLastUpdated(),
    update: {
      ...state.update,
      ...spreadLoadingError(false, false),
      jobId: false,
    },
  }),
  [updateJobPostTypes.ERROR]: (state, { error }) => ({
    ...state,
    update: {
      ...state.update,
      ...spreadLoadingError(false, useErrorFromResponse(error)),
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

export const findCreateJob = state => findState(state).create

export const findUpdateJob = state => findState(state).update

export default reducer
