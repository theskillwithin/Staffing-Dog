import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { setStep, findSteps, goToStep, setType } from '../../store/steps'

import GetStarted from './GetStarted'

export default withRouter(
  connect(
    state => ({ steps: findSteps(state) }),
    { setStep, goToStep, setType },
  )(GetStarted),
)
