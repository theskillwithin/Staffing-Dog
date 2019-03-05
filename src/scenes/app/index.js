import React, { useEffect } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { object, func } from 'prop-types'
import { setHtmlClass, removeHtmlClass } from '@sdog/utils/document'
import Logo from '@sdog/components/logo'
import MainMenu from '@sdog/scenes/app/menu'
import DashFooter from '@sdog/scenes/app/footer'
import UserMenu from '@sdog/components/user_menu'
import Spinner from '@sdog/components/spinner'
import { getUserProfile as getUserProfileAction } from '@sdog/store/user'

import theme from './theme.css'
import './styles.css'

const DashboardScene = React.lazy(() => import('@sdog/scenes/dashboard'))
const SearchScene = React.lazy(() => import('@sdog/scenes/search'))
const SettingsScene = React.lazy(() => import('@sdog/scenes/settings'))

const App = ({ getUserProfile, location }) => {
  useEffect(() => {
    setHtmlClass('html-app')
    getUserProfile()

    return removeHtmlClass('html-app')
  }, [])

  return (
    <div className={theme.app}>
      <header className={theme.appHeader}>
        <div className={theme.appHeaderInner}>
          <div className={theme.logo}>
            <Logo hideTextOnMobile />
          </div>

          <MainMenu location={location} />

          <div className={theme.userMenu}>
            <UserMenu />
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
      <DashFooter />
    </div>
  )
}

App.propTypes = {
  location: object.isRequired,
  getUserProfile: func.isRequired,
}

export const mapActionsToProps = { getUserProfile: getUserProfileAction }

export default withRouter(
  connect(
    null,
    mapActionsToProps,
  )(App),
)
