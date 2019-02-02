import find from 'lodash/find'
import { API_ROOT } from '@sdog/api'

import { findUserId } from '../user'
import { getUserId } from '../storage'
import { createActionTypes, reduxRegister, buildStore } from '../tools'

export const INITIAL_STATE = {
  loading: true,
  error: false,
  threads: [],
  friends: [],
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
 * Send Message
 */
export const SEND_USER_MESSAGE = 'SEND_USER_MESSAGE'
export const sendUserMessageTypes = createActionTypes(SEND_USER_MESSAGE)

export const sendUserMessage = ({
  message,
  userId = false,
  friendId = false,
  threadId = false,
}) => (dispatch, getState) => {
  const isNewThread = !!threadId

  dispatch({
    type: SEND_USER_MESSAGE,
    api: {
      url: `${API_ROOT}/messages${isNewThread ? '/threads' : ''}`,
      method: 'POST',
      data: {
        user_id: userId || findUserId(getState()) || getUserId(),
        ...(friendId ? { participant_id: friendId } : {}),
        ...(threadId ? { thread_id: threadId } : {}),
        data: { message },
      },
    },
    payload: { userId, friendId, threadId, message },
  })
}

reducers = {
  ...reducers,
  [sendUserMessageTypes.LOADING]: (state, { threadId }) => ({
    ...state,
    threads: state.threads.map(thread => ({
      ...thread,
      sending: thread.id === threadId ? true : thread.sending || false,
    })),
  }),
  [sendUserMessageTypes.SUCCESS]: (
    state,
    { __payload: { message, userId, threadId } },
  ) => ({
    ...state,
    threads: state.threads.map(thread => ({
      sending: false,
      recent:
        thread.id === threadId
          ? [...thread.recent, { message, sent_by: userId }]
          : [...thread.recent],
    })),
  }),
}

/**
 * Get Friend List
 */

export const GET_MESSAGE_FRIEND_LIST = 'GET_MESSAGE_FRIEND_LIST'
export const getMessageFriendListTypes = createActionTypes(GET_MESSAGE_FRIEND_LIST)

export const getMessageFriendList = id => (dispatch, getState) => {
  const userId = id || findUserId(getState()) || getUserId()

  dispatch({
    type: GET_MESSAGE_FRIEND_LIST,
    api: {
      url: `${API_ROOT}/messages/recipients`,
      method: 'GET',
      params: { user_id: userId },
    },
  })
}

reducers = {
  ...reducers,
  [getMessageFriendListTypes.LOADING]: state => ({
    ...state,
    friendListLoading: true,
    friendListError: false,
  }),
  [getMessageFriendListTypes.SUCCESS]: (state, { data }) => ({
    ...state,
    friendListLoading: false,
    friendListError: false,
    friends: data,
  }),
  [getMessageFriendListTypes.ERROR]: (state, { error }) => ({
    ...state,
    friendListLoading: false,
    friendListError: error,
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
export const findFriendList = state => findState(state).friends
export const findFriendListLoading = state => findState(state).friendListLoading
export const findFriendListError = state => findState(state).findFriendListError
