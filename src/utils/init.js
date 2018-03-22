import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import createStore from '../store'
import defaultReducers from '../store/reducers'
import { interceptAuth, auth } from '../api'


const buildScene = (Scene, store = {}) => (
  <Provider store={store}>
    <Router>
      <Scene />
    </Router>
  </Provider>
)

export default (Scene, reducers, id = 'app', initialStoreData = {}) => {
  interceptAuth()

  const token = auth.getToken()
  const storeData = token ? { auth: { token } } : {}

  render(
    buildScene(
      Scene,
      createStore(
        { ...initialStoreData, ...storeData },
        { ...defaultReducers, ...reducers },
      ),
    ),
    document.getElementById(id),
  )
}
