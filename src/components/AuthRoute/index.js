import React from 'react'
import { string, bool, oneOfType, func, node } from 'prop-types'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { findToken } from '../../store/user'

const AuthRoute = ({ token = false, to, component: Component, ...props }) => (
  <Route
    {...props}
    render={renderProps =>
      token ? <Component {...renderProps} /> : <Redirect to={to} />
    }
  />
)

AuthRoute.propTypes = {
  token: oneOfType([string, bool]).isRequired,
  to: string.isRequired,
  component: oneOfType([func, node]).isRequired,
}

export const mapStateToProps = state => ({ token: findToken(state) })

export default withRouter(connect(mapStateToProps)(AuthRoute))
