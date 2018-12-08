import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { findToken } from '../../store/user'

const AuthRoute = ({ token, to, component: Component, ...props }) => (
  <Route
    {...props}
    render={renderProps =>
      token ? <Component {...renderProps} /> : <Redirect to={to} />
    }
  />
)

export const mapStateToProps = state => ({ token: findToken(state) })

export default withRouter(connect(mapStateToProps)(AuthRoute))
