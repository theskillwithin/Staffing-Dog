import React from 'react'
import { Route, Link } from 'react-router-dom'
import { object } from 'prop-types'
import classnames from 'classnames'
import Logo from '@component/logo'
import Icon from '@component/icon'
import DashboardScene from '@scene/dashboard'
import SearchScene from '@scene/search'
import SettingsScene from '@scene/settings'

import theme from './theme.css'
import './styles.css'

// TODO: keep as class, we will have class methods soon
class App extends React.Component {
  isActive(page) {
    const { pathname } = this.props.location
    return page.test(pathname)
  }

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
                <Link
                  className={classnames(
                    theme.navItemLink,
                    this.isActive(/^\/$/) && theme.active,
                  )}
                  to="/"
                >
                  Dashboard
                </Link>
              </li>
              <li className={theme.navItem}>
                <Link
                  className={classnames(
                    theme.navItemLink,
                    this.isActive(/search/) && theme.active,
                  )}
                  to="/search"
                >
                  Job Search
                </Link>
              </li>
              <li className={theme.navItem}>
                <Link
                  className={classnames(
                    theme.navItemLink,
                    this.isActive(/settings/) && theme.active,
                  )}
                  to="/settings"
                >
                  My Profile
                </Link>
              </li>
            </ul>

            <div className={theme.contact}>
              <div className={theme.contactInner}>
                <Link to="/contact">
                  <Icon use="chat_bubble_open" /> Contact Us
                </Link>
              </div>
              <div className={theme.contactActive}>
                <div className={theme.contactActiveInner}>
                  <a href="/test">
                    <Icon use="headset_mic" />(385) 707-0156
                  </a>
                  <a href="/test">
                    <Icon use="send" />Email Us
                  </a>
                  <a href="/test">
                    <Icon use="chat" />Live Chat
                  </a>
                </div>
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

App.propTypes = {
  location: object.isRequired,
}

export default App
