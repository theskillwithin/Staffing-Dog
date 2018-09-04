import React from 'react'
import { Route, Link } from 'react-router-dom'
import { object } from 'prop-types'
import loadable from 'loadable-components'
import classnames from 'classnames'
import { setHtmlClass, removeHtmlClass } from '@sdog/utils/document'
import Logo from '@component/logo'
import Icon from '@component/icon'
import Contact from '@scene/app/contact'

import theme from './theme.css'
import './styles.css'

const DashboardScene = loadable(() =>
  import(/* webpackChunkName: "dashboard" */ '@sdog/scenes/dashboard'),
)
const SearchScene = loadable(() =>
  import(/* webpackChunkName: "search" */ '@sdog/scenes/search'),
)
const SettingsScene = loadable(() =>
  import(/* webpackChunkName: "settings" */ '@sdog/scenes/settings'),
)

class App extends React.Component {
  componentDidMount() {
    setHtmlClass('html-app')
  }

  componentWillUnmount() {
    removeHtmlClass('html-app')
  }

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

            <Contact />
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
