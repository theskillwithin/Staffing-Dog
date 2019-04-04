import React, { useEffect } from 'react'
import { string, shape, func, bool, array, oneOfType, object } from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import get from 'lodash/get'
import indexOf from 'lodash/indexOf'
import {
  getUserProfile as getUserProfileAction,
  findUserProfile,
  findRegisterError,
  clearRegisterUserError as clearRegisterUserErrorAction,
  findToken,
} from '@sdog/store/user'
import { useHtmlClass, useDocumentTitle } from '@sdog/utils/document'
import Spinner from '@sdog/components/spinner'

import { findError, findLoading, clearError as clearErrorAction } from './store/steps'
import RootScene from './scenes/Root'
import TypeScene from './scenes/Type'
import StepScene from './scenes/Step'
import CompleteScene from './scenes/Complete'
import { Layout } from './components/layout'

const Onboarding = ({
  match,
  getUserProfile,
  userProfile,
  location,
  history,
  clearRegisterUserError,
  clearError,
  registerError,
  error,
  loading,
  token,
}) => {
  const routeIsRoot = location.pathname === match.url
  const userOnboardingStatus = get(userProfile, 'user.onboarding_status', false)
  const userType = get(userProfile, 'user.type', false)

  useEffect(() => {
    if (userProfile.id) {
      getUserProfile()
    }
  }, [])

  // Redirect user to correct path based on userType
  useEffect(() => {
    if (userType) {
      const regexForType = get(location.pathname.split('/'), '[2]', false)

      if (routeIsRoot && token) {
        history.replace(`${match.url}/${userType}/step/2`)
      } else if (regexForType && userType && regexForType !== userType) {
        history.replace(location.pathname.replace(regexForType, userType))
      }
    }
  })

  // If user has alrady completed the onboarding process, send them to the app
  useEffect(
    () => {
      if (
        userOnboardingStatus &&
        indexOf(['pending', 'complete'], userOnboardingStatus) !== -1
      ) {
        history.push('/')
      }
    },
    [userOnboardingStatus],
  )

  useHtmlClass('html-onboarding')
  useDocumentTitle('Onboarding')

  useEffect(
    () => {
      clearError()
      clearRegisterUserError()
    },
    [location.pathname],
  )

  if ((routeIsRoot && token) || (userProfile.loading && !userOnboardingStatus)) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    )
  }

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
  history: shape({ push: func }).isRequired,
  clearError: func.isRequired,
  clearRegisterUserError: func.isRequired,
  registerError: oneOfType([bool, string, array]),
  error: oneOfType([bool, string, array]),
  loading: bool.isRequired,
  userProfile: object,
  token: oneOfType([bool, string]).isRequired,
}

Onboarding.defaultProps = {
  registerError: false,
  error: false,
  userProfile: {},
}

export const mapStateToProps = state => ({
  registerError: findRegisterError(state),
  error: findError(state),
  loading: findLoading(state),
  userProfile: findUserProfile(state),
  token: findToken(state),
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
