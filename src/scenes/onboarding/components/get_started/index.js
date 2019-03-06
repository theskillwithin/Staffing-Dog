import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { setStep, findType, findSteps, goToStep, setType } from '../../store/steps'

import GetStarted from './GetStarted'

export default withRouter(
  connect(
    state => ({ type: findType(state), steps: findSteps(state) }),
    { setStep, goToStep, setType },
  )(GetStarted),
)
