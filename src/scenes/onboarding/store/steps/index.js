import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import build from '@store/build'
import reduxRegister from '@store/register'
import { updateProfile } from '@api/user'

import { professional, practice } from './fields'

export const BASE = '@SD/OB/STEPS'
export const SET_VALUE = `${BASE}_SET_VALUE`
export const SET_STEP = `${BASE}_SET_STEP`
export const SET_TYPE = `${BASE}_SET_TYPE`
export const GO_TO_STEP = `${BASE}_GO_TO_STEP`
export const GO_TO_STEP_SUCCESS = `${GO_TO_STEP}_SUCCESS`
export const GO_TO_STEP_FAILED = `${GO_TO_STEP}_FAILED`
export const SAVE_STEP = `${BASE}_SAVE_STEP`
export const SAVE_STEP_SUCCESS = `${SAVE_STEP}_SUCCESS`
export const SAVE_STEP_FAILED = `${SAVE_STEP}_FAILED`
export const CHECK_STEPS_COMPLETE = `${BASE}_CHECK_STEPS_COMPLETE`

// Initial State
export const INITIAL_STATE = {
  saving: false,
  savingError: false,
  steps: {
    professional,
    practice,
  },
  type: 'professional',
  values: {},
}

// Reducer Methods
export const reducers = {
  [SET_VALUE]: (state, payload) => ({
    ...state,
    values: {
      ...state.values,
      [payload.name]: payload.value,
    },
  }),
  [SET_STEP]: (state, payload) => ({
    ...state,
    currentStep: payload.step,
  }),
  [SET_TYPE]: (state, payload) => ({
    ...state,
    type: payload.type,
  }),
  [CHECK_STEPS_COMPLETE]: state => ({
    ...state,
    steps: {
      ...state.steps,
      [state.type]: state.steps[state.stepType].map(step => ({
        ...step,
        complete: step.fields.reduce((p, c) => {
          return c.required && isEmpty(state.values[c.name]) ? false : p
        }, true),
      })),
    },
  }),
  [GO_TO_STEP]: (state, payload) => ({
    ...state,
    loadingNextStep: true,
    loadingNextStepValue: payload.step,
    error: false,
  }),
  [GO_TO_STEP_SUCCESS]: state => ({
    ...state,
    loadingNextStep: false,
    loadingNextStepValue: false,
    error: false,
  }),
  [GO_TO_STEP_FAILED]: (state, payload) => ({
    ...state,
    loadingNextStep: false,
    loadingNextStepValue: false,
    error: payload.error,
  }),
  [SAVE_STEP]: (state, payload) => ({
    ...state,
    // savingStep: true,
    savingStepValue: payload.step,
    error: false,
  }),
  [SAVE_STEP_SUCCESS]: (state, payload) => ({
    ...state,
    // savingStep: false,
    savingStepValue: payload.step,
    error: false,
  }),
  [SAVE_STEP_SUCCESS]: (state, payload) => ({
    ...state,
    // savingStep: false,
    savingStepValue: false,
    error: payload.error,
  }),
}

// Actions Creators
export const actions = {
  setValue: (name, value) => ({
    type: SET_VALUE,
    payload: { name, value },
  }),
  checkStepsComplete: () => ({
    type: CHECK_STEPS_COMPLETE,
  }),
  goToStep: nextStep => ({
    type: GO_TO_STEP,
    payload: { nextStep },
  }),
  goToStepSuccess: nextStep => ({
    type: GO_TO_STEP_SUCCESS,
    payload: { nextStep },
  }),
  goToStepFailed: ({ error, nextStep }) => ({
    type: GO_TO_STEP_FAILED,
    payload: { nextStep, error },
  }),
  setStep: step => ({
    type: SET_STEP,
    payload: { step },
  }),
  saveStep: step => ({
    type: SAVE_STEP,
    payload: { step },
  }),
  saveStepSuccess: ({ step, data }) => ({
    type: SAVE_STEP_SUCCESS,
    payload: { step, data },
  }),
  saveStepFailed: ({ step, error }) => ({
    type: SAVE_STEP_FAILED,
    payload: { step, error },
  }),
  setType: type => ({
    type: SET_TYPE,
    payload: { type },
  }),
  saveStepAPIFailed: (nextStep, res) => ({
    type: GO_TO_STEP_FAILED,
    payload: {
      error:
        res && res.data && res.data.message
          ? res.data.message
          : 'There was an error attempting to save the step.',
      nextStep,
    },
  }),
}

/*
 * Prop Actions
 * Mapped to dispatch, getState
 * imported to containers
*/

export const setValue = (name, value) => dispatch => {
  dispatch(actions.setValue(name, value))

  return Promise.resolve(dispatch(actions.checkStepsComplete()))
}

export const setStep = step => dispatch =>
  Promise.resolve(dispatch(actions.setStep(step)))

export const saveStep = ({ step, onSuccess = false, onFail = false }) => (
  dispatch,
  getState,
) => {
  dispatch(actions.saveStep(step))

  return updateProfile({
    step,
    values: getState.values,
  }).then(res => {
    if (res && res.data && res.data.success) {
      dispatch(
        actions.saveStepSuccess({
          step,
          data: res.data,
        }),
      )

      if (onSuccess) onSuccess()
    } else {
      dispatch(actions.saveStepApiFail(res, step))

      if (onFail) onFail()
    }
  })
}

export const goToStep = ({ currentStep, nextStep, history }) => (dispatch, getState) => {
  dispatch(actions.goToStep(nextStep))

  const state = getState()
  const steps = findSteps(state)
  const type = findType(state)
  const step = currentStep ? find(steps, s => s.step === currentStep) : false

  if (step && nextStep === step.nextStep) {
    // check if current step is complete
    if (step.needsComplete && !step.complete) {
      return Promise.resolve(
        dispatch(
          actions.goToStepFailed({
            error: 'You must complete the current step before moving onto the next step.',
            nextStep,
          }),
        ),
      )
    }

    dispatch(actions.goToStepSuccess(nextStep, type))
    history.push(`/onboarding/${type}/step/${nextStep}`)

    // save current step
    return saveStep({ step: step.step })(dispatch, getState)
  }

  // we are trying to jump to another step
  // lets save and go to the correct step

  return new Promise(resolve => {
    dispatch(actions.goToStepSuccess(nextStep, type))
    resolve(history.push(`/onboarding/${type}/step/${nextStep}`))
  })
}

export const setType = type => dispatch => {
  return new Promise(resolve => {
    resolve(dispatch(actions.setType(type)))
  })
}

export const store = build(reducers, INITIAL_STATE, true)

reduxRegister.register('steps', store)

export default store

export const findState = state => state.steps
export const findType = state => findState(state).type
export const findSteps = state => findState(state).steps[findType(state)] || []
export const findSavingStep = state => findState(state).savingStep
export const findSavingStepValue = state => findState(state).savingStepValue
export const findLoadingNextStep = state => findState(state).loadingNextSteps
export const findLoadingNextStepValue = state => findState(state).loadingNextStepValue
export const findError = state => findState(state).error
export const findStepValues = state => findState(state).values
export const findLoading = () => false // findLoadingNextStep(state) || findSavingStep(state)
