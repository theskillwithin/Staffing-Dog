import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import loadable from 'loadable-components'
import createStore from '@sdog/store'
import reducers from '@sdog/store/reducers'

import { getToken, getFingerprint, setFingerprint } from './store/storage'
import createFingerprint from './utils/fingerprint'
import AuthRoute from './components/AuthRoute'

import './fonts/index.css'

const OnboardingScene = loadable(() =>
  import(/* webpackChunkName: "onboarding" */ '@sdog/scenes/onboarding'),
)

const App = loadable(() => import(/* webpackChunkName: "app" */ '@sdog/scenes/app'))

const LoginScene = loadable(() =>
  import(/* webpackChunkName: "login" */ '@sdog/scenes/login'),
)

// if (process.env.MOCK_DATA) {
//   require('@sdog/api/mock') // eslint-disable-line
// }

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
      <Switch>
        <Route path="/onboarding" component={OnboardingScene} />
        <Route path="/login" component={LoginScene} />
        <AuthRoute path="/" component={App} to="/login" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app'),
)
