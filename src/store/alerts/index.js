import { buildStore, reduxRegister } from '../tools'

export const INITIAL_STATE = {
  global: [],
}

let reducers = {}

/**
 * Add Global Alert
 */
export const SHOW_GLOBAL_ALERT = 'SHOW_GLOBAL_ALERT'
export const CLEAR_GLOBAL_ALERT = 'CLEAR_GLOBAL_ALERT'
export const CLEAR_GLOBAL_ALERTS = 'CLEAR_GLOBAL_ALERTS'

export const showGlobalAlert = ({ message, type, id }) => ({
  type: SHOW_GLOBAL_ALERT,
  payload: { message, type, id: id || new Date().getTime() },
})

export const clearGlobalAlert = id => ({
  type: CLEAR_GLOBAL_ALERT,
  payload: { id },
})

export const clearGlobalAlerts = () => ({
  type: CLEAR_GLOBAL_ALERTS,
})

reducers = {
  ...reducers,
  [SHOW_GLOBAL_ALERT]: (state, { message, type, id }) => ({
    ...state,
    global: [...state.global, { message, type, id }],
  }),
  [CLEAR_GLOBAL_ALERT]: (state, { id }) => ({
    ...state,
    global: id
      ? state.global.reduce(
          (listOfAlerts, alert) => [...listOfAlerts, ...(alert.id === id ? [] : [alert])],
          [],
        )
      : state.global,
  }),
  [CLEAR_GLOBAL_ALERTS]: state => ({
    ...state,
    global: [],
  }),
}

/**
 * Create Store
 */
export const reducer = buildStore(reducers, INITIAL_STATE)
reduxRegister.register('alerts', reducer)

/**
 * Find Store
 */
export const findState = state => state.alerts
export const findGlobalAlerts = state => findState(state).global
