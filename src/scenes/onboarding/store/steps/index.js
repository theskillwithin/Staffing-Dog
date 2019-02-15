import find from 'lodash/find'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import reduce from 'lodash/reduce'
import filter from 'lodash/filter'
import build from '@sdog/store/build'
import {
  registerUser,
  updateRegisterUser,
  findToken,
  findUserProfile,
  userRegisterTypes,
  userRegisterUpdateTypes,
  userGetProfileTypes,
  findUserId,
} from '@sdog/store/user'
import reduxRegister from '@sdog/store/register'

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
  error: false,
  errorFields: false,
}

// take data from api and format for the onboarding redux store
export const formatDataFromApi = (apiData, values, type = INITIAL_STATE.type) => ({
  street: get(apiData, 'addresses.street', values.street),
  state: get(apiData, 'addresses.state', values.state),
  city: get(apiData, 'addresses.city', values.city),
  zip: get(apiData, 'addresses.zip', values.zip),
  ...('professional' === type
    ? {
        profession: get(apiData, 'meta.summary.profession.type', values.profession),
        specialty: get(apiData, 'meta.summary.profession.specialty', values.specialty),
        availability: get(apiData, 'meta.summary.capacity', values.availability),
      }
    : {
        practice_name: get(apiData, 'meta.summary.practice_name', values.practice_name),
        practice_type: get(apiData, 'meta.summary.practice_type', values.practice_type),
        practice_first_name: get(
          apiData,
          'meta.summary.practice_first_name',
          values.practice_first_name,
        ),
        practice_last_name: get(
          apiData,
          'meta.summary.practice_last_name',
          values.practice_last_name,
        ),
        practice_email: get(
          apiData,
          'meta.summary.practice_email',
          values.practice_email,
        ),
      }),
})

export const formatDataFromOnboardingForRegister = (
  values = {},
  type = INITIAL_STATE.type,
) => ({
  first_name: values.first_name,
  last_name: values.last_name,
  email: values.email,
  password: values.password,
  password_confirmation: values.password_confirmation,
  type,
})

// format data from redux to use for api
export const formatDataFromOnboarding = (values, profile, type = INITIAL_STATE.type) => ({
  addresses: {
    ...(profile.addresses || {}),
    ...(values.street ? { line_1: values.street } : {}),
    ...(values.state ? { state: values.state } : {}),
    ...(values.city ? { city: values.city } : {}),
    ...(values.zip ? { zip: values.zip } : {}),
  },
  meta: {
    ...(profile.meta || {}),
    summary: {
      ...get(profile, 'meta.summary', {}),
      ...('professional' === type
        ? {
            profession: {
              ...get(profile, 'meta.summary.profession', {}),
              ...(values.profession ? { type: values.profession } : {}),
              ...(values.specialty ? { specialty: values.specialty } : {}),
            },
            capacity: {
              ...get(profile, 'meta.summary.capacity', {}),
              ...(values.availability ? { availability: values.availability } : {}),
            },
          }
        : {
            ...(values.practice_name ? { practice_name: values.practice_name } : {}),
            ...(values.practice_type ? { practice_type: values.practice_type } : {}),
            ...(values.practice_first_name
              ? { contact_first_name: values.practice_first_name }
              : {}),
            ...(values.practice_last_name
              ? { contact_last_name: values.practice_last_name }
              : {}),
            ...(values.practice_email ? { contact_email: values.practice_email } : {}),
          }),
    },
  },
})

export const areStepsComplete = (step, values) =>
  (step.fields || []).reduce((previousIsComplete, currentStep) => {
    if (currentStep.fields && currentStep.fields.length) {
      return areStepsComplete(currentStep, values)
    }

    return currentStep.required && isEmpty(values[currentStep.name])
      ? false
      : previousIsComplete
  }, true)

// Reducer That is Shared between two dispatched actions
const updateStepValuesFromRegister = (state, { data }) => ({
  ...state,
  values: {
    ...state.values,
    ...data,
  },
})

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
      [state.type]: state.steps[state.type].map(step => ({
        ...step,
        complete: areStepsComplete(step, state.values),
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
    errorFields: payload.errorFields,
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
  [SAVE_STEP_FAILED]: (state, payload) => ({
    ...state,
    // savingStep: false,
    savingStepValue: false,
    error: payload.error,
  }),
  // When Updating the user, we want to make sure to update the steps data as well
  [userRegisterTypes.SUCCESS]: updateStepValuesFromRegister,
  [userRegisterUpdateTypes.SUCCESS]: updateStepValuesFromRegister,
  [userGetProfileTypes.SUCCESS]: (state, { data }) => ({
    ...state,
    values: {
      ...state.values,
      ...formatDataFromApi(data, state.values, state.type),
      first_name: get(data, 'user.first_name', state.values.first_name),
      last_name: get(data, 'user.last_name', state.values.last_name),
      email: get(data, 'user.email', state.values.email),
    },
    steps: {
      ...state.steps,
      [state.type]: state.steps[state.type].map(step => ({
        ...step,
        ...(step.step === '1' // Allows us to skip step 1 since we have already created the user
          ? {
              needsComplete: false,
              complete: true,
            }
          : {}),
      })),
    },
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
  goToStepFailed: ({ error, nextStep, errorFields }) => ({
    type: GO_TO_STEP_FAILED,
    payload: { nextStep, error, errorFields },
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

  const onApiSuccess = res => {
    dispatch(
      actions.saveStepSuccess({
        step,
        data: formatDataFromApi(
          res.data,
          findStepValues(getState()),
          findType(getState()),
        ),
      }),
    )

    if (onSuccess) onSuccess()
  }

  const onApiError = res => {
    dispatch(actions.saveStepAPIFailed(step, res))

    if (onFail) onFail()
  }

  const isInitialRegister = !findToken(getState())
  const apiCall = isInitialRegister ? registerUser : updateRegisterUser
  const data = isInitialRegister
    ? formatDataFromOnboardingForRegister(
        findStepValues(getState()),
        findType(getState()),
      )
    : formatDataFromOnboarding(
        findStepValues(getState()),
        findUserProfile(getState()),
        findType(getState()),
      )

  const id = isInitialRegister ? null : findUserId(getState())

  dispatch(
    apiCall({
      data,
      id,
      onSuccess: onApiSuccess,
      onError: onApiError,
    }),
  )
}

export const goToStep = ({ currentStep, nextStep, history }) => (dispatch, getState) => {
  dispatch(actions.goToStep(nextStep))

  const state = getState()
  const steps = findSteps(state)
  const type = findType(state)
  const step = currentStep ? find(steps, s => s.step === currentStep) : false
  const { values } = state.steps

  const getSteps = stepArray => {
    if (stepArray && stepArray.fields) {
      return reduce(
        stepArray.fields,
        (all, field) => {
          if (field.fields) {
            return [...all, ...getSteps(field)]
          }
          return [...all, field]
        },
        [],
      )
    }
    return false
  }

  if (step && nextStep === step.nextStep) {
    // check validation
    // check required validation
    const requireds = filter(getSteps(step), { required: true })
    const isRequired = requireds
      .map(
        required =>
          !(values[required.name] && values[required.name].length > 0) && required.name,
      )
      .filter(Boolean)

    if (isRequired && isRequired.length) {
      return Promise.resolve(
        dispatch(
          actions.goToStepFailed({
            error: 'You must complete the required fields.',
            errorFields: isRequired,
            nextStep,
          }),
        ),
      )
    }

    // check validation types

    const isInvalid = (name, validation) => {
      if (validation === 'email') {
        return !/@/.test(values[name]) && 'not a valid email!'
      }
      return false
    }

    const validations = filter(
      getSteps(step),
      s => s.validation && s.validation.length,
    ).map(validation => ({
      name: validation.name,
      invalid: isInvalid(validation.name, validation.validation),
    }))

    const invalids = filter(validations, validation => validation.invalid)

    if (invalids && invalids.length) {
      return Promise.resolve(
        dispatch(
          actions.goToStepFailed({
            error: invalids.map(invalid => invalid.invalid),
            errorFields: invalids.map(invalid => invalid.name),
            nextStep,
          }),
        ),
      )
    }

    // check if current step is complete
    if (
      (step.needsComplete && step.needsCompleteIfToken && findToken(getState())) ||
      (step.needsComplete && !step.complete)
    ) {
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
export const findErrorFields = state => findState(state).errorFields
export const findStepValues = state => findState(state).values
export const findLoading = () => false // findLoadingNextStep(state) || findSavingStep(state)
