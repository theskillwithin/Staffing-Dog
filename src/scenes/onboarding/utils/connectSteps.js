import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  findSteps,
  findSavingStep,
  findSavingStepValue,
  findLoadingNextStep,
  findLoadingNextStepValue,
  findLoading,
  findError,
  findStepValues,
  findType,
  setValue,
  goToStep,
  setStep,
} from '../store/steps'


export default Component => withRouter(connect(
  state => ({
    steps: findSteps(state),
    savingStep: findSavingStep(state),
    savingStepValue: findSavingStepValue(state),
    loadingNextStep: findLoadingNextStep(state),
    loadingNextStepValue: findLoadingNextStepValue(state),
    error: findError(state),
    loading: findLoading(state),
    stepValues: findStepValues(state),
    type: findType(state),
  }),
  { setValue, goToStep, setStep },
)(Component))
