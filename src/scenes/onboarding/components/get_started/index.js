import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { setStep, findType } from '../../store/steps'

import GetStarted from './GetStarted'


export default withRouter(connect(
  state => ({ type: findType(state) }),
  { setStep },
)(GetStarted))
