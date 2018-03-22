import find from 'lodash/find'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import isEmpty from 'lodash/isEmpty'

import build from '../../../../store/build'
import { saveStep as onBoardingAPISaveStep } from '../../../../api/onboarding'

import {
  SET_VALUE,
  SET_STEP,
  GO_TO_STEP,
  GO_TO_STEP_SUCCESS,
  GO_TO_STEP_FAILED,
  SAVE_STEP,
  SAVE_STEP_SUCCESS,
  SAVE_STEP_FAILED,
  CHECK_STEPS_COMPLETE,
} from './actions'


// Initial State
const INITIAL_STATE = {
  saving: false,
  savingError: false,
  steps: [
    {
      forceAllow: true,
      step: '1',
      nextStep: '2',
      complete: false,
      needsComplete: true,
      title: 'Contact Information',
      sidebar: {
        title: 'Sign Up Today',
        subTitle: 'Professionals',
        description: 'and learn how to qualify for your free scrubs!',
        svg: 'shirt',
        order: ['subTitle', 'title', 'hr', 'description', 'svg'],
      },
      fields: [
        {
          fields: [
            {
              name: 'first_name',
              label: 'First Name',
              type: 'input',
              required: true,
            },
            {
              name: 'last_name',
              label: 'Last Name',
              type: 'input',
              required: true,
            },
          ],
        },
        {
          name: 'email',
          label: 'Email Address',
          type: 'input',
          formType: 'email',
          required: true,
        },
        {
          name: 'password',
          label: 'Password',
          type: 'input',
          formType: 'password',
          required: true,
        },
        {
          name: 'verify_password',
          label: 'Verify Password',
          type: 'input',
          formType: 'password',
          required: true,
        },
      ],
    },
    {
      step: '2',
      nextStep: '3',
      complete: false,
      needsComplete: true,
      title: 'Address Information',
      sidebar: {
        title: 'DayHire &tm;',
        description: 'Never depend on an early morning phone call again. DayHire  is a location based, on-demand hiring alternative to calling a temp agency.',
        svg: 'mobile',
        order: ['svg', 'title', 'description'],
      },
      fields: [
        {
          name: 'street',
          label: 'Street Address',
          type: 'input',
          required: true,
        },
        {
          name: 'state',
          label: 'State',
          type: 'input',
          required: true,
        },
        {
          name: 'city',
          label: 'City',
          type: 'input',
          required: true,
        },
        {
          name: 'postal_code',
          label: 'Postal Code',
          type: 'input',
          formType: 'number',
          required: true,
        },
      ],
    },
    {
      step: '3',
      nextStep: 'complete',
      complete: false,
      needsComplete: true,
      title: 'Profession Information',
      sidebar: {
        title: 'Work When you Want',
        titleSubLarge: 'Make What you Need',
        description: 'Temping with StaffingDog is flexible and rewarding, helping dental professionals meet their career and financial goals.',
        svg: 'desktop_search',
        order: ['svg', 'title', 'subTitleLarge', 'description'],
      },
      fields: [
        {
          name: 'profession',
          label: 'Profession',
          type: 'dropdown',
          required: true,
          options: [
            { value: 'Dental Hygienist' },
            { value: 'Dental Assistant' },
            { value: 'Dentist' },
            { value: 'Front Office' },
            { value: 'Office Manager' },
            { value: 'Anesthesiologist' },
            { value: 'Other' },
          ],
        },
        {
          name: 'speciality',
          label: 'Speciality',
          type: 'dropdown',
          options: [
            { value: 'Oral Surgery' },
            { value: 'Perio' },
            { value: 'Orthodontics' },
            { value: 'Other' },
          ],
        },
        {
          name: 'availability',
          label: 'Availability',
          type: 'dropdown',
          options: [
            { value: 'All' },
            { value: 'Temporary' },
            { value: 'Full Time' },
            { value: 'Part Time' },
          ],
        },
      ],
    },
    {
      step: 'complete',
      complete: false,
      needsComplete: false,
      title: 'Setup Complete',
    },
  ],
  values: {},
}

// Reducer Methods
const reducers = {
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
  [CHECK_STEPS_COMPLETE]: state => ({
    ...state,
    steps: map(state.steps, step => ({
      ...step,
      complete: reduce(step.fields, (p, c) => {
        return c.required && isEmpty(state.values[c.name])
          ? false
          : p
      }, true),
    })),
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
export const dispatchActions = {
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
}

dispatchActions.saveStepAPIFailed = (step, res) =>
  da.saveStepFailed({
    error: res && res.data && res.data.message
      ? res.data.message
      : 'There was an error attempting to save the step.',
    step,
  })

const da = dispatchActions

/*
 * Prop Actions
 * Mapped to dispatch, getState
 * imported to containers
*/

export const setValue = (name, value) => (dispatch) => {
  dispatch(da.setValue(name, value))

  return Promise.resolve(dispatch(da.checkStepsComplete()))
}

export const setStep = step => dispatch =>
  Promise.resolve(dispatch(da.setStep(step)))

export const saveStep = ({
  step,
  onSuccess = false,
  onFail = false,
}) => (dispatch, getState) => {
  dispatch(da.saveStep(step))

  return onBoardingAPISaveStep({
    step,
    values: getState.values,
  })
    .then((res) => {
      if (res && res.data && res.data.success) {
        dispatch(da.saveStepSuccess({
          step,
          data: res.data,
        }))

        if (onSuccess) onSuccess()
      } else {
        dispatch(da.saveStepApiFail(res, step))

        if (onFail) onFail()
      }
    })
}

export const goToStep = ({ currentStep, nextStep, history }) => (dispatch, getState) => {
  dispatch(da.goToStep(nextStep))

  const state = getState()
  const steps = findSteps(state)
  const step = currentStep ? find(steps, s => s.step === currentStep) : false

  if (step && nextStep === step.nextStep) {
    // check if current step is complete
    if (step.needsComplete && !step.complete) {
      return Promise.resolve(
        dispatch(da.goToStepFailed({
          error: 'You must complete the current step before moving onto the next step.',
          nextStep,
        })),
      )
    }

    dispatch(da.goToStepSuccess(nextStep))

    history.push(`/step/${nextStep}`)

    // save current step
    return saveStep({
      step: step.step,
    })(dispatch, getState)
  }

  // we are trying to jump to another step
  // lets save and go to the correct step

  return new Promise((resolve) => {
    setTimeout(() => {
      dispatch(da.goToStepSuccess(nextStep))
      resolve(history.push(`/step/${nextStep}`))
    }, 500)
  })
}

export default build(reducers, INITIAL_STATE)

export const findState = state => state.steps
export const findSteps = state => findState(state).steps
export const findSavingStep = state => findState(state).savingStep
export const findSavingStepValue = state => findState(state).savingStepValue
export const findLoadingNextStep = state => findState(state).loadingNextSteps
export const findLoadingNextStepValue = state => findState(state).loadingNextStepValue
export const findError = state => findState(state).error
export const findStepValues = state => findState(state).values
export const findLoading = () => false // findLoadingNextStep(state) || findSavingStep(state)
