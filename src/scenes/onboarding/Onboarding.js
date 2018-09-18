import React from 'react'
import { string, shape } from 'prop-types'
import { Route, Redirect, Switch } from 'react-router-dom'
import { setHtmlClass, removeHtmlClass } from '@sdog/utils/document'

import Layout from './components/layout'

class Onboarding extends React.Component {
  componentDidMount() {
    setHtmlClass('html-onboarding')
  }

  componentWillUnmount() {
    removeHtmlClass('html-onboarding')
  }

  render() {
    const { match } = this.props

    return (
      <Switch>
        <Redirect exact from={match.url} to={`${match.url}/professional`} />
        <Route path={`${match.url}/:type`} component={Layout} />
      </Switch>
    )
  }
}

Onboarding.propTypes = {
  match: shape({
    url: string.isRequired,
  }).isRequired,
}

export default Onboarding
