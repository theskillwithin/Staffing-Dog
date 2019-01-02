import * as messagesApi from '@sdog/api/messages'

import { buildStore, reduxRegister } from '../tools'

export const BASE = '@SD/MESSAGES'
export const FETCH = `${BASE}_FETCH`
export const FETCH_THREADS = `${FETCH}_THREADS`
export const FETCH_THREADS_SUCCESS = `${FETCH_THREADS}_SUCCESS`
export const FETCH_THREADS_ERROR = `${FETCH_THREADS}_ERROR`
export const FETCH_MESSAGES = `${FETCH}_MESSAGES`
export const FETCH_MESSAGES_SUCCESS = `${FETCH_MESSAGES}_SUCCESS`
export const FETCH_MESSAGES_ERROR = `${FETCH_MESSAGES}_ERROR`

export const actions = {
  fetchThreads: () => ({ type: FETCH_THREADS }),
  fetchThreadsSuccess: threads => ({
    type: FETCH_THREADS_SUCCESS,
    payload: { threads },
  }),
  fetchThreadsError: error => ({
    type: FETCH_THREADS_ERROR,
    payload: { error },
  }),
}

export const getThreads = () => dispatch => {
  dispatch(actions.fetchThreads())

  return messagesApi.getMessages
    .send()
    .then(({ data }) => dispatch(actions.fetchThreadsSuccess(data.threads)))
    .catch(error => dispatch(actions.fetchThreadsError(error)))
}

export const INITIAL_STATE = {
  threads: [],
  loading: true,
  error: false,
}

export const reducers = {
  [FETCH_THREADS]: state => ({ ...state, loading: true, error: false }),
  [FETCH_THREADS_SUCCESS]: (state, payload) => ({
    ...state,
    threads: payload.threads,
    loading: false,
    error: false,
  }),
  [FETCH_THREADS_ERROR]: (state, payload) => ({
    ...state,
    loading: false,
    error: payload.error,
  }),
}

const reducer = buildStore(reducers, INITIAL_STATE)

reduxRegister.register('messages', reducer)

export default reducer

export const findState = state => state.messages
export const findThreads = state => findState(state).threads
export const findThreadsError = state => findState(state).error
export const findThreadsLoading = state => findState(state).loading
