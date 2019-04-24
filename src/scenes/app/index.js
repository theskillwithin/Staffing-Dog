import React, { useEffect } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { object, func, shape } from 'prop-types'
import { IS_PROD } from '@sdog/utils/env'
import { useHtmlClass } from '@sdog/utils/document'
import get from 'lodash/get'
import Logo from '@sdog/components/logo'
import MainMenu from '@sdog/scenes/app/menu'
import UserMenu from '@sdog/components/user_menu'
import Spinner from '@sdog/components/spinner'
import { getUserProfile as getUserProfileAction, findUserProfile } from '@sdog/store/user'

import theme from './theme.css'
import './styles.css'

const DashboardScene = React.lazy(() => import('@sdog/scenes/dashboard'))
const JobsScene = React.lazy(() => import('@sdog/scenes/jobs'))
const SettingsScene = React.lazy(() => import('@sdog/scenes/settings'))
const JobPostingsScene = React.lazy(() => import('@sdog/scenes/job-postings'))
const ProfesionalsScene = React.lazy(() => import('@sdog/scenes/professionals'))

const App = ({ getUserProfile, location, history, userProfile }) => {
  if (IS_PROD) {
    window.location = '/landing'
    return null
  }

  const userOnboardingStatus = get(userProfile, 'user.onboarding_status', false)

  useHtmlClass('html-app')
  useEffect(() => void getUserProfile(), [])

  useEffect(
    () => {
      if ('incomplete' === userOnboardingStatus) {
        history.push(`/onboarding/${get(userProfile, 'user.type')}/step/1`)
      }
    },
    [userOnboardingStatus],
  )

  const planTier = get(userProfile, 'meta.summary.plan_tier', false)

  return (
    <div className={theme.app}>
      <header className={theme.appHeader}>
        <div className={theme.appHeaderInner}>
          <div className={theme.logo}>
            <Logo hideTextOnMobile />
          </div>

          <MainMenu location={location} />

          <div className={theme.userMenu}>
            <UserMenu />
          </div>
        </div>
      </header>

      <div className={theme.appContent}>
        <React.Suspense fallback={<Spinner />}>
          <Route path="/" component={DashboardScene} exact />
          <Route path="/settings" component={SettingsScene} />
          <Route path="/jobs" component={JobsScene} />
          <Route path="/job-postings" component={JobPostingsScene} />
          {planTier && planTier !== 'day_hire' ? (
            <Route path="/professionals" component={ProfesionalsScene} />
          ) : null}
        </React.Suspense>
      </div>
    </div>
  )
}

App.propTypes = {
  location: object.isRequired,
  getUserProfile: func.isRequired,
  userProfile: shape({ user: object }).isRequired,
  history: shape({ push: func.isRequired }).isRequired,
}

export const mapStateToProps = state => ({
  userProfile: findUserProfile(state),
})

export const mapActionsToProps = { getUserProfile: getUserProfileAction }

export default withRouter(
  connect(
    mapStateToProps,
    mapActionsToProps,
  )(App),
)
