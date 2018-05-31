import React from 'react'
import { Route, Link } from 'react-router-dom'
import Logo from '@component/logo'
import Icon from '@component/icon'
import DashboardScene from '@scene/dashboard'
import SearchScene from '@scene/search'
import SettingsScene from '@scene/settings'

import theme from './theme.css'
import './styles.css'

// TODO: keep as class, we will have class methods soon
class App extends React.Component {
  render() {
    return (
      <div className={theme.app}>
        <header className={theme.appHeader}>
          <div className={theme.appHeaderInner}>
            <div className={theme.menuTrigger}>
              <Icon use="menu" />
            </div>

            <div className={theme.logo}>
              <Logo />
            </div>

            <ul className={theme.nav}>
              <li className={theme.navItem}>
                <Link className={theme.navItemLink} to="/onboarding/professional">
                  Professional Onboarding
                </Link>
              </li>
              <li className={theme.navItem}>
                <Link className={theme.navItemLink} to="/onboarding/practice">
                  Practice Onboarding
                </Link>
              </li>
            </ul>

            <div className={theme.user}>
              <div className={theme.userInner}>
                <Link to="/profile">
                  <Icon use="person" /> Mellisa Gutierrez
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className={theme.appContent}>
          <Route path="/" component={DashboardScene} exact />
          <Route path="/settings" component={SettingsScene} />
          <Route path="/search" component={SearchScene} />
        </div>
      </div>
    )
  }
}

export default App
