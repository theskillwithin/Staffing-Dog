import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import createStore from '@sdog/store'
import reducers from '@sdog/store/reducers'
import {
  getToken,
  getFingerprint,
  setFingerprint,
  removeAllAuth,
} from '@sdog/store/storage'

import createFingerprint from './utils/fingerprint'
import Spinner from './components/spinner'
import AuthRoute from './components/AuthRoute'

import './fonts/index.css'

const OnboardingScene = React.lazy(() => import('@sdog/scenes/onboarding'))
const App = React.lazy(() => import('@sdog/scenes/app'))
const LoginScene = React.lazy(() => import('@sdog/scenes/login'))

const fingerprint = getFingerprint() || createFingerprint()
setFingerprint(fingerprint)

const storeData = {
  user: {
    auth: {
      token: getToken(),
      fingerprint,
    },
  },
}

const store = createStore(storeData, reducers)

render(
  <Provider store={store}>
    <Router>
      <React.Suspense fallback={<Spinner />}>
        <Switch>
          <Route
            path="/logout"
            render={({ history }) => {
              removeAllAuth()
              history.push('/login')
            }}
          />
          <Route path="/onboarding" component={OnboardingScene} />
          <Route path="/login" component={LoginScene} />
          <AuthRoute path="/" component={App} to="/login" />
        </Switch>
      </React.Suspense>
    </Router>
  </Provider>,
  document.getElementById('app'),
)
