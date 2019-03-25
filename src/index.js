import React from 'react'
import { render } from 'react-dom'
import * as Sentry from '@sentry/browser'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import createStore from '@sdog/store'
import reducers from '@sdog/store/reducers'
import { INITIAL_STATE as USER_INITIAL_STATE } from '@sdog/store/user'
import { getToken, getFingerprint, setFingerprint } from '@sdog/store/storage'
import Footer from '@sdog/components/footer'

import createFingerprint from './utils/fingerprint'
import Spinner from './components/spinner'
import AuthRoute from './components/AuthRoute'
import ErrorBoundry from './components/error_boundry'

import './fonts/index.css'

Sentry.init({
  dsn: 'https://e7a4ea4c993e4619afcfc16dd9fe6b06@sentry.io/200333',
  environment: process.env.ENV,
})

const OnboardingScene = React.lazy(() => import('@sdog/scenes/onboarding'))
const App = React.lazy(() => import('@sdog/scenes/app'))
const LoginScene = React.lazy(() => import('@sdog/scenes/login'))
const LogoutScene = React.lazy(() => import('@sdog/scenes/logout'))
const ForgotPWScene = React.lazy(() => import('@sdog/scenes/forgot-password'))
const ResetPWScene = React.lazy(() => import('@sdog/scenes/reset-password'))
const LandingScene = React.lazy(() => import('@sdog/scenes/landing'))

const fingerprint = getFingerprint() || createFingerprint()
setFingerprint(fingerprint)

const storeData = {
  user: {
    ...USER_INITIAL_STATE,
    auth: {
      ...USER_INITIAL_STATE.auth,
      token: getToken(),
      fingerprint,
    },
  },
}

const store = createStore(storeData, reducers)

render(
  <Provider store={store}>
    <Router>
      <ErrorBoundry hideFallback>
        <React.Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/logout" component={LogoutScene} />
            <Route
              path="/onboarding/professional/step/complete"
              component={LandingScene}
            />
            <Route path="/onboarding" component={OnboardingScene} />
            <Route path="/login" component={LoginScene} />
            <Route path="/landing" component={LandingScene} />
            <Route path="/forgot-password" component={ForgotPWScene} />
            <Route path="/reset-password/:anchor/:token" component={ResetPWScene} />
            <AuthRoute path="/" component={App} to="/login" />
          </Switch>
        </React.Suspense>
      </ErrorBoundry>
    </Router>
    <Footer />
  </Provider>,
  document.getElementById('app'),
)
