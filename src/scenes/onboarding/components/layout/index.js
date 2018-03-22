import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  findLoading,
  findError,
  findCurrentStep,
  findShowSidebar,
} from '../../store/steps'

import Layout from './Layout'


export default withRouter(connect(
  state => ({
    loading: findLoading(state),
    error: findError(state),
    currentStep: findCurrentStep(state),
    showSidebar: findShowSidebar(state),
  }),
)(Layout))
