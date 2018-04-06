import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { setStep, findStepType } from '../../store/steps'

import GetStarted from './GetStarted'


export default withRouter(
  connect(
    state => ({
      stepType: findStepType(state),
    }),
    { setStep },
  )(GetStarted),
)
