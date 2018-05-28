import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import loadable from 'loadable-components'

import createStore from '@store'

import reducers from '@store/reducers'

import { interceptAuth, auth } from '@api'

const Onboarding = loadable(() =>
  import(/* webpackChunkName: "onboarding" */ '@scene/onboarding'),
)
const App = loadable(() => import(/* webpackChunkName: "app" */ '@scene/app'))

interceptAuth()

const token = auth.getToken()
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
