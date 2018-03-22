import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  findLoading,
  findError,
} from '../../store/steps'

import Layout from './Layout'


export default withRouter(connect(
  state => ({
    loading: findLoading(state),
    error: findError(state),
  }),
)(Layout))
