import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import loadable from 'loadable-components'
import createStore from '@sdog/store'
import reducers from '@sdog/store/reducers'
import { interceptAuth } from '@sdog/api/intercepts'
import { getToken } from '@sdog/api/auth'

const Onboarding = loadable(() =>
  import(/* webpackChunkName: "onboarding" */ '@sdog/scenes/onboarding'),
)
const App = loadable(() => import(/* webpackChunkName: "app" */ '@sdog/scenes/app'))

interceptAuth()

if (process.env.MOCK_DATA) {
  require('@sdog/api/mock') // eslint-disable-line
}

const token = getToken()
const storeData = token ? { auth: { token } } : { auth: { token: 'test' } }

const store = createStore(storeData, reducers)

render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/onboarding" component={Onboarding} />
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app'),
)
