import React from 'react'
import { string, shape, func } from 'prop-types'
import { connect } from 'react-redux'
// import { Route, Redirect, Switch } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'

import { setHtmlClass, removeHtmlClass } from '../../utils/document'
import { getUserProfile } from '../../store/user'

import Layout from './components/layout'

class Onboarding extends React.Component {
  static propTypes = {
    getUserProfile: func.isRequired,
    match: shape({
      url: string.isRequired,
    }).isRequired,
  }

  componentDidMount() {
    setHtmlClass('html-onboarding')
    this.props.getUserProfile()
  }

  componentWillUnmount() {
    removeHtmlClass('html-onboarding')
  }

  render() {
    const { match } = this.props

    return (
      <Switch>
        {/* <Redirect exact from={match.url} to={`${match.url}/professional`} /> */}
        <Route path={`${match.url}/:type`} component={Layout} />
        <Route path="/onboarding" component={Layout} />
      </Switch>
    )
  }
}

export const mapActionsToProps = { getUserProfile }

export default connect(
  null,
  mapActionsToProps,
)(Onboarding)
