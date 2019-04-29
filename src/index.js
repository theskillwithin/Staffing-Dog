import React from 'react'
import { render } from 'react-dom'
import * as Sentry from '@sentry/browser'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import qs from 'qs'
import Cookies from 'js-cookie'
import changeFavicon from 'utils/local-favicon'

import createStore from '@sdog/store'
import reducers from '@sdog/store/reducers'
import { INITIAL_STATE as USER_INITIAL_STATE } from '@sdog/store/user'
import { getToken, getFingerprint, setFingerprint, getUserId } from '@sdog/store/storage'
import Footer from '@sdog/components/footer'
import { IS_DEV, GA_CODE } from '@sdog/utils/env'
import { RouteTracker } from '@sdog/components/GoogleAnalytics'

import createFingerprint from './utils/fingerprint'
import Spinner from './components/spinner'
import AuthRoute from './components/AuthRoute'
import ErrorBoundry from './components/error_boundry'

import './fonts/index.css'

Sentry.init({
  dsn: 'https://e7a4ea4c993e4619afcfc16dd9fe6b06@sentry.io/200333',
  environment: process.env.ENV,
})

const params = qs.parse((window.location.search || '').substr(1))

if (!Cookies.get('sdPromo') && params.promo) {
  Cookies.set('sdPromo', params.promo)
}

const OnboardingScene = React.lazy(() => import('@sdog/scenes/onboarding'))
const App = React.lazy(() => import('@sdog/scenes/app'))
const LoginScene = React.lazy(() => import('@sdog/scenes/login'))
const LogoutScene = React.lazy(() => import('@sdog/scenes/logout'))
const ForgotPWScene = React.lazy(() => import('@sdog/scenes/forgot-password'))
const ResetPWScene = React.lazy(() => import('@sdog/scenes/reset-password'))
const EmailConfirmationScene = React.lazy(() => import('@sdog/scenes/confirm-email'))
const LandingScene = React.lazy(() => import('@sdog/scenes/landing'))
const SupportScene = React.lazy(() => import('@sdog/scenes/support'))
const PrivacyScene = React.lazy(() => import('@sdog/scenes/privacy'))
const TermsScene = React.lazy(() => import('@sdog/scenes/terms'))

const fingerprint = getFingerprint() || createFingerprint()
setFingerprint(fingerprint)

if (IS_DEV) {
  changeFavicon()
}

const storeData = {
  user: {
    ...USER_INITIAL_STATE,
    profile: {
      ...USER_INITIAL_STATE.profile,
      id: getUserId(),
    },
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
      <RouteTracker code={GA_CODE} />

      <ErrorBoundry hideFallback>
        <React.Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/logout" component={LogoutScene} />
            {/* --- TMP OVERRIDE --- */}
            <Route
              path="/onboarding/:type(professional|practice)/step/complete"
              component={LandingScene}
            />
            {/* --- end TMP OVERRIDE --- */}
            <Route path="/onboarding" component={OnboardingScene} />
            <Route path="/login" component={LoginScene} />
            <Route path="/landing" component={LandingScene} />
            <Route path="/privacy" component={PrivacyScene} />
            <Route path="/terms" component={TermsScene} />
            <Route path="/forgot-password" component={ForgotPWScene} />
            <Route path="/reset-password/:anchor/:token" component={ResetPWScene} />
            <Route
              path="/confirm-email/:anchor/:token"
              component={EmailConfirmationScene}
            />
            <Route path="/support" component={SupportScene} />
            <AuthRoute path="/" component={App} to="/login" />
          </Switch>
        </React.Suspense>
        <Footer />
      </ErrorBoundry>
    </Router>
  </Provider>,
  document.getElementById('app'),
)
