import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { setStep } from '../../store/steps'

import GetStarted from './GetStarted'


export default withRouter(
  connect(null, { setStep })(GetStarted),
)
