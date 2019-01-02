import * as jobsApi from '@api/jobs'

import { buildStore, reduxRegister } from '../tools'

export const BASE = '@SD/JOBS'
export const FETCH = `${BASE}_FETCH`
export const FETCH_EVENTS = `${FETCH}_EVENTS`
export const FETCH_EVENTS_SUCCESS = `${FETCH_EVENTS}_SUCCESS`
export const FETCH_EVENTS_ERROR = `${FETCH_EVENTS}_ERROR`

export const actions = {
  fetchScheduledEvents: () => ({ type: FETCH_EVENTS }),
  fetchScheduledEventsSuccess: events => ({
    type: FETCH_EVENTS_SUCCESS,
    payload: { events },
  }),
  fetchScheduledEventsError: error => ({
    type: FETCH_EVENTS_ERROR,
    payload: { error },
  }),
}

export const getScheduledEvents = () => dispatch => {
  dispatch(actions.fetchScheduledEvents())

  return jobsApi.getEvents
    .send()
    .then(({ data }) => dispatch(actions.fetchScheduledEventsSuccess(data.events)))
    .catch(error =>
      dispatch(actions.fetchScheduledEventsError(error.message || error || 'error')),
    )
}

export const INITIAL_STATE = {
  events: [],
  scheduledEvents: [],
  loading: true,
  error: false,
}

export const reducers = {
  [FETCH_EVENTS]: state => ({ ...state, loading: true, error: false }),
  [FETCH_EVENTS_SUCCESS]: (state, payload) => ({
    ...state,
    scheduledEvents: payload.events,
    loading: false,
    error: false,
  }),
  [FETCH_EVENTS_ERROR]: (state, payload) => ({
    ...state,
    loading: false,
    errror: payload.error,
  }),
}

const reducer = buildStore(reducers, INITIAL_STATE)

reduxRegister.register('jobs', reducer)

export default reducer

export const findState = state => state.jobs
export const findScheduledEvents = state => findState(state).scheduledEvents
export const findLoading = state => findState(state).loading
export const findError = state => findState(state).error
