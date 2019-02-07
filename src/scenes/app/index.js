import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { object, func } from 'prop-types'
import { setHtmlClass, removeHtmlClass } from '@sdog/utils/document'
import Logo from '@sdog/components/logo'
import MainMenu from '@sdog/scenes/app/menu'
import Contact from '@sdog/components/contact'
import Spinner from '@sdog/components/spinner'
import { getUserProfile } from '@sdog/store/user'

import theme from './theme.css'
import './styles.css'

const DashboardScene = React.lazy(() => import('@sdog/scenes/dashboard'))
const SearchScene = React.lazy(() => import('@sdog/scenes/search'))
const SettingsScene = React.lazy(() => import('@sdog/scenes/settings'))

class App extends React.Component {
  componentDidMount() {
    setHtmlClass('html-app')
    this.props.getUserProfile()
  }

  componentWillUnmount() {
    removeHtmlClass('html-app')
  }

  render() {
    return (
      <div className={theme.app}>
        <header className={theme.appHeader}>
          <div className={theme.appHeaderInner}>
            <div className={theme.logo}>
              <Logo />
            </div>

            <MainMenu location={this.props.location} />

            <div className={theme.contact}>
              <Contact />
            </div>
          </div>
        </header>

        <div className={theme.appContent}>
          <React.Suspense fallback={<Spinner />}>
            <Route path="/" component={DashboardScene} exact />
            <Route path="/settings" component={SettingsScene} />
            <Route path="/search" component={SearchScene} />
          </React.Suspense>
        </div>
      </div>
    )
  }
}

App.propTypes = {
  location: object.isRequired,
  getUserProfile: func.isRequired,
}

export const mapActionsToProps = { getUserProfile }

export default withRouter(
  connect(
    null,
    mapActionsToProps,
  )(App),
)
