import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import get from 'lodash/get'

import { findLoading, findError, setType } from '../../store/steps'
import { findRegisterError } from '../../../../store/user'

import Layout from './Layout'

export default withRouter(
  connect(
    state => ({
      loading: findLoading(state),
      error: findError(state),
      findRegisterError: get(findRegisterError(state), 'response.data.error', false),
    }),
    { setType },
  )(Layout),
)
