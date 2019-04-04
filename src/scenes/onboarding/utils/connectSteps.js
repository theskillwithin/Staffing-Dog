import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { findToken } from '@sdog/store/user'

import {
  findSteps,
  findSavingStep,
  findSavingStepValue,
  findLoadingNextStep,
  findLoadingNextStepValue,
  findLoading,
  findError,
  findErrorFields,
  findStepValues,
  findType,
  setValue,
  goToStep,
  setStep,
  blurInvalid,
} from '../store/steps'

export default Component =>
  withRouter(
    connect(
      state => ({
        steps: findSteps(state),
        savingStep: findSavingStep(state),
        savingStepValue: findSavingStepValue(state),
        loadingNextStep: findLoadingNextStep(state),
        loadingNextStepValue: findLoadingNextStepValue(state),
        error: findError(state),
        errorFields: findErrorFields(state),
        loading: findLoading(state),
        stepValues: findStepValues(state),
        type: findType(state),
        token: findToken(state),
      }),
      { setValue, goToStep, setStep, blurInvalid },
    )(Component),
  )
