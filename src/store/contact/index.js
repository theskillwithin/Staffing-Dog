import { API_ROOT } from '@sdog/utils/api'
import get from 'lodash/get'

import { createActionTypes, reduxRegister, buildStore } from '../tools'

export const INITIAL_STATE = {
  loading: false,
  error: false,
  success: false,
}

let reducers = {}

/**
 * Send Contact Form
 */

export const SEND_CONTACT_FORM = 'SEND_CONTACT_FORM'
export const getUserContactTypes = createActionTypes(SEND_CONTACT_FORM)

export const sendContactForm = ({ email, message }) => dispatch => {
  const source = '7364617070'

  dispatch({
    type: SEND_CONTACT_FORM,
    api: {
      url: `${API_ROOT}/tmp/contact_us`,
      method: 'POST',
      params: { email, message, source },
    },
  })
}

reducers = {
  ...reducers,
  [getUserContactTypes.LOADING]: state => ({
    ...state,
    loading: true,
    error: false,
    success: false,
  }),
  [getUserContactTypes.SUCCESS]: state => ({
    ...state,
    loading: false,
    error: false,
    success: true,
  }),
  [getUserContactTypes.ERROR]: (state, { error }) => ({
    ...state,
    loading: false,
    success: false,
    error: get(error, 'response.data.message', 'Unkown error has occured'),
  }),
}

/**
 * Create Store
 */
export const reducer = buildStore(reducers, INITIAL_STATE)

reduxRegister.register('contact', reducer)

/**
 * Find Store
 */
export const findState = state => state.contact
export const findContactLoading = state => findState(state).loading
export const findContactError = state => findState(state).error
export const findContactSuccess = state => findState(state).success
