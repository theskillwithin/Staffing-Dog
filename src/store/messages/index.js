import find from 'lodash/find'
import { findUserId } from '@sdog/store/user'

import { API_ROOT } from '../../api'

import { getUserId } from '../storage'
import { createActionTypes, reduxRegister, buildStore } from '../tools'

export const INITIAL_STATE = {
  loading: true,
  error: false,
  threads: [],
}

let reducers = {}

/**
 * Get User Threads
 */

export const GET_USER_THREADS = 'GET_USER_THREADS'
export const getUserThreadsTypes = createActionTypes(GET_USER_THREADS)

export const getUserThreads = id => (dispatch, getState) => {
  const userId = id || findUserId(getState()) || getUserId()

  dispatch({
    type: GET_USER_THREADS,
    api: {
      url: `${API_ROOT}/messages/threads`,
      method: 'GET',
      params: { user_id: userId },
    },
  })
}

reducers = {
  ...reducers,
  [getUserThreadsTypes.LOADING]: state => ({
    ...state,
    loading: true,
    error: false,
  }),
  [getUserThreadsTypes.SUCCESS]: (state, { data }) => ({
    ...state,
    loading: false,
    error: false,
    threads: data,
  }),
  [getUserThreadsTypes.ERROR]: (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }),
}

/**
 * Get Single Thread
 */
export const GET_SINGLE_THREAD = 'GET_SINGLE_THREAD'
export const getSingleThreadTypes = createActionTypes(GET_SINGLE_THREAD)

export const getSingleThread = ({ userId, threadId }) => (dispatch, getState) => ({
  type: GET_SINGLE_THREAD,
  api: {
    url: `${API_ROOT}/messages/threads`,
    method: 'GET',
    params: { user_id: userId || findUserId(getState()) || getUserId(), id: threadId },
  },
  payload: { threadId },
})

reducers = {
  ...reducers,
  [getSingleThreadTypes.LOADING]: (state, { threadId }) => ({
    ...state,
    threads: find(state.threads, ({ id }) => id === threadId)
      ? state.threads.map(thread => ({
          ...thread,
          loading: thread.id === threadId ? true : thread.loading,
          error: thread.id === threadId ? false : thread.error,
        }))
      : [...state.threads, { threadId, loading: true, error: false }],
  }),
  [getSingleThreadTypes.SUCCESS]: (state, { data }) => ({
    ...state,
    threads: find(state.threads, ({ id }) => id === data.id)
      ? state.threads.map(thread => ({
          ...thread,
          ...data,
          loading: false,
          error: false,
        }))
      : [...state.threads, { ...data }],
  }),
  [getSingleThreadTypes.ERROR]: (state, { error, threadId }) => ({
    ...state,
    threads: state.threads.map(thread => ({
      ...thread,
      loading: thread.id === threadId ? false : thread.loading,
      error: thread.id === threadId ? error : thread.error,
    })),
  }),
}

/**
 * Create Store
 */
export const reducer = buildStore(reducers, INITIAL_STATE)

reduxRegister.register('messages', reducer)

/**
 * Find Store
 */
export const findState = state => state.messages
export const findThreadsLoading = state => findState(state).loading
export const findThreadsError = state => findState(state).error
export const findThreads = state => findState(state).threads
