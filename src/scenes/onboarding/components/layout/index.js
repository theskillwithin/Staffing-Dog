import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { findLoading, findError, setType } from '../../store/steps'

import Layout from './Layout'

export default withRouter(
  connect(
    state => ({
      loading: findLoading(state),
      error: findError(state),
    }),
    { setType },
  )(Layout),
)
