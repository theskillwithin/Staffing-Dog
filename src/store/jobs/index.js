import buildStore from '@store/build'
import reduxRegister from '@store/register'
import jobsApi from '@api/jobs'

export const BASE = '@SD/JOBS'
export const FETCH = `${BASE}_FETCH`
export const FETCH_SCHEDULED_EVENTS = `${FETCH}_SCHEDULED_EVENTS`
export const FETCH_SCHEDULED_EVENTS_SUCCESS = `${FETCH_SCHEDULED_EVENTS}_SUCCESS`
export const FETCH_SCHEDULED_EVENTS_ERROR = `${FETCH_SCHEDULED_EVENTS}_ERROR`

export const actions = {
  fetchScheduledEvents: () => ({ type: FETCH_SCHEDULED_EVENTS }),
  fetchScheduledEventsSuccess: events => ({
    type: FETCH_SCHEDULED_EVENTS_SUCCESS,
    payload: { events },
  }),
  fetchScheduledEventsError: error => ({
    type: FETCH_SCHEDULED_EVENTS_ERROR,
    paylaod: { error },
  }),
}

export const getScheduledEvents = () => dispatch => {
  dispatch(actions.fetchScheduledEvents())

  return jobsApi
    .getScheduledEvents()
    .then(({ events }) => dispatch(actions.fetchScheduledEventsSuccess(events)))
    .catch(error => dispatch(actions.fetchScheduledEventsError(error)))
}

export const INITIAL_STATE = {
  events: [],
  scheduledEvents: [],
  loading: true,
  error: false,
}

export const reducers = {
  [FETCH_SCHEDULED_EVENTS]: state => ({ ...state, loading: true, error: false }),
  [FETCH_SCHEDULED_EVENTS_SUCCESS]: (state, payload) => ({
    ...state,
    scheduledEvents: payload.events,
    loading: false,
    error: false,
  }),
  [FETCH_SCHEDULED_EVENTS_ERROR]: (state, payload) => ({
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
