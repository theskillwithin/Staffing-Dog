import buildStore from '@store/build'
import reduxRegister from '@store/register'
import * as userApi from '@api/user'

export const BASE = '@SD/USER'
export const FETCH = `${BASE}_FETCH`
export const FETCH_SCHEDULE = `${FETCH}_SCHEDULE`
export const FETCH_SCHEDULE_SUCCESS = `${FETCH_SCHEDULE}_SUCCESS`
export const FETCH_SCHEDULE_ERROR = `${FETCH_SCHEDULE}_ERROR`

export const actions = {
  fetchSchedule: () => ({ type: FETCH_SCHEDULE }),
  fetchScheduleSuccess: events => ({
    type: FETCH_SCHEDULE_SUCCESS,
    payload: { events },
  }),
  fetchScheduleError: error => ({
    type: FETCH_SCHEDULE_ERROR,
    payload: { error },
  }),
}

export const getSchedule = date => dispatch => {
  dispatch(actions.fetchSchedule())

  return userApi.getSchedule
    .send(date)
    .then(({ data }) => dispatch(actions.fetchScheduleSuccess(data.events)))
    .catch(error =>
      dispatch(actions.fetchScheduleError(error.message || error || 'error')),
    )
}

export const INITIAL_STATE = {
  schedule: {
    events: [],
    loading: true,
    error: false,
  },
}

export const reducers = {
  [FETCH_SCHEDULE]: state => ({ ...state, loading: true, error: false }),
  [FETCH_SCHEDULE_SUCCESS]: (state, payload) => ({
    ...state,
    schedule: {
      ...state.schedule,
      events: payload.events,
      loading: false,
      error: false,
    },
  }),
  [FETCH_SCHEDULE_ERROR]: (state, payload) => ({
    ...state,
    schedule: {
      ...state.schedule,
      loading: false,
      errror: payload.error,
    },
  }),
}

const reducer = buildStore(reducers, INITIAL_STATE)

reduxRegister.register('user', reducer)

export default reducer

export const findState = state => state.user
export const findSchedule = state => findState(state).schedule
export const findScheduleEvents = state => findSchedule(state).events
export const findScheduleLoading = state => findSchedule(state).loading
export const findScheduleError = state => findSchedule(state).error
