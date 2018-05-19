import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import Logo from '../../components/logo'
import Icon from '../../components/icon'
import DashboardScene from '../dashboard'
import SearchScene from '../search'
import SettingsScene from '../settings'

import theme from './theme.css'
import './styles.css'


class App extends Component {
  componentDidMount() {
    document.title = 'Staffing Dog - Main Application'
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
              <li className={theme.navItem}><Link className={theme.navItemLink} to="/jobs/suggested"><span><Icon primary use="lightbulb_outline" />Suggested Jobs</span></Link></li>
              <li className={theme.navItem}><Link className={theme.navItemLink} to="/alerts/jobs"><span><Icon primary use="notifications" /> Job Alerts</span></Link></li>
              <li className={theme.navItem}><Link className={theme.navItemLink} to="/messages"><span><Icon primary use="chat_bubble_outline" /> Messages</span></Link></li>
              <li className={theme.navItem}><Link className={theme.navItemLink} to="/schedule"><span><Icon primary use="date_range" /> Job Schedule</span></Link></li>
            </ul>

            <div className={theme.user}>
              <div className={theme.userInner}>
                <Link to="/onboarding">
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
