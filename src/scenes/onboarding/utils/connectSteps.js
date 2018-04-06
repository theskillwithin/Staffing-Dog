import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  findSteps,
  findStepType,
  findSavingStep,
  findSavingStepValue,
  findLoadingNextStep,
  findLoadingNextStepValue,
  findLoading,
  findError,
  findStepValues,
  setValue,
  goToStep,
  setStep,
} from '../store/steps'


export default Component => withRouter(connect(
  state => ({
    steps: findSteps(state),
    stepType: findStepType(state),
    savingStep: findSavingStep(state),
    savingStepValue: findSavingStepValue(state),
    loadingNextStep: findLoadingNextStep(state),
    loadingNextStepValue: findLoadingNextStepValue(state),
    error: findError(state),
    loading: findLoading(state),
    stepValues: findStepValues(state),
  }),
  { setValue, goToStep, setStep },
)(Component))
