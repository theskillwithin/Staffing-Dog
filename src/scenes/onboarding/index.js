import React, { useEffect } from 'react'
import { string, shape, func, bool, array, oneOfType } from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import {
  getUserProfile as getUserProfileAction,
  findRegisterError,
  clearRegisterUserError as clearRegisterUserErrorAction,
} from '@sdog/store/user'
import { useHtmlClass, useDocumentTitle } from '@sdog/utils/document'

import { findError, findLoading, clearError as clearErrorAction } from './store/steps'
import RootScene from './scenes/Root'
import TypeScene from './scenes/Type'
import StepScene from './scenes/Step'
import CompleteScene from './scenes/Complete'
import { Layout } from './components/layout'

const Onboarding = ({
  match,
  getUserProfile,
  location,
  clearRegisterUserError,
  clearError,
  registerError,
  error,
  loading,
}) => {
  useHtmlClass('html-onboarding')
  useDocumentTitle('Onboarding')

  useEffect(() => {
    getUserProfile()
  }, [])

  useEffect(
    () => {
      clearError()
      clearRegisterUserError()
    },
    [location.pathname],
  )

  return (
    <Layout error={registerError || error} loading={loading}>
      <Switch>
        <Route exact path={match.url} component={RootScene} />

        <Route
          exact
          path={`${match.url}/:type(professional|practice)`}
          component={TypeScene}
        />

        <Route
          path={`${match.url}/:type(professional|practice)/step/:step(complete)`}
          component={CompleteScene}
        />

        <Route
          path={`${match.url}/:type(professional|practice)/step/:step`}
          component={StepScene}
        />

        <Redirect to={match.url} />
      </Switch>
    </Layout>
  )
}

Onboarding.propTypes = {
  getUserProfile: func.isRequired,
  match: shape({
    url: string.isRequired,
  }).isRequired,
  location: shape({ pathname: string }).isRequired,
  clearError: func.isRequired,
  clearRegisterUserError: func.isRequired,
  registerError: oneOfType([bool, string, array]),
  error: oneOfType([bool, string, array]),
  loading: bool.isRequired,
}

Onboarding.defaultProps = {
  registerError: false,
  error: false,
}

export const mapStateToProps = state => ({
  registerError: findRegisterError(state),
  error: findError(state),
  loading: findLoading(state),
})
export const mapActionsToProps = {
  getUserProfile: getUserProfileAction,
  clearError: clearErrorAction,
  clearRegisterUserError: clearRegisterUserErrorAction,
}

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Onboarding)
