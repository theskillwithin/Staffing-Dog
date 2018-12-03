import { API_ROOT } from '../../api'
import { buildStore, reduxRegister, createActionTypes } from '../index'

export const INITIAL_STATE = {
  auth: {
    loading: true,
    error: false,
    token: false,
    fingerprint: false,
  },
  schedule: {
    events: [],
    loading: true,
    error: false,
  },
}

let reducers = {}

export const USER_LOGIN = 'USER_LOGIN'
export const userLoginTypes = createActionTypes(USER_LOGIN)

export const login = ({ email, password }) => ({
  type: USER_LOGIN,
  api: {
    url: `${API_ROOT}/login`,
    type: 'POST',
    data: { email, password },
  },
})

reducers = {
  ...reducers,
  [userLoginTypes.LOADING]: state => ({
    ...state,
    auth: { ...state.auth, loading: true, error: false },
  }),
  [userLoginTypes.ERROR]: state => ({
    ...state,
    auth: { ...state.auth, loading: false, error: true },
  }),
  [userLoginTypes.SUCCESS]: state => ({
    ...state,
    auth: { ...state.auth, loading: true, error: false },
  }),
}

export const USER_GET_SCHEDULE = 'USER_GET_SCHEDULE'
export const userGetScheduleTypes = createActionTypes(USER_GET_SCHEDULE)

export const getSchedule = date => ({
  type: USER_GET_SCHEDULE,
  api: {
    url: `${API_ROOT}/schedule`,
    type: 'POST',
    data: { date },
  },
})

reducers = {
  ...reducers,
  [userGetScheduleTypes.LOADING]: state => ({
    ...state,
    schedule: { ...state.schedule, loading: true, error: false },
  }),
  [userGetScheduleTypes.ERROR]: state => ({
    ...state,
    schedule: { ...state.schedule, loading: false, error: true },
  }),
  [userGetScheduleTypes.SUCCESS]: state => ({
    ...state,
    schedule: { ...state.schedule, loading: false, error: true },
  }),
}

export const reducer = buildStore(reducers, INITIAL_STATE)

reduxRegister.register('user', reducer)

export const findState = state => state.user
export const findSchedule = state => findState(state).schedule
export const findScheduleEvents = state => findSchedule(state).events
export const findScheduleLoading = state => findSchedule(state).loading
export const findScheduleError = state => findSchedule(state).error

export default reducer
