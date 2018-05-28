import React from 'react'
import { string, shape } from 'prop-types'
import { Route, Redirect, Switch } from 'react-router-dom'

import Layout from './components/layout'

const Onboarding = ({ match }) => (
  <Switch>
    <Redirect exact from={match.url} to={`${match.url}/professional`} />
    <Route path={`${match.url}/:type`} component={Layout} />
  </Switch>
)

Onboarding.propTypes = {
  match: shape({
    url: string.isRequired,
  }).isRequired,
}

export default Onboarding
