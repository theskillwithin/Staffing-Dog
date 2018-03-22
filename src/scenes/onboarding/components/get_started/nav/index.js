import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { findSteps, goToStep } from '../../../store/steps'

import Nav from './Nav'


export default withRouter(
  connect(
    state => ({
      steps: findSteps(state),
    }),
    { goToStep },
  )(Nav),
)
