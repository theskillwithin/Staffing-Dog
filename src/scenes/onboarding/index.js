import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { findLoading, findError } from './store/steps'
import Onboarding from './Onboarding'


console.log('connect to onBoarding')
export default withRouter(connect(
  state => ({
    loading: findLoading(state),
    error: findError(state),
  }),
)(Onboarding))
