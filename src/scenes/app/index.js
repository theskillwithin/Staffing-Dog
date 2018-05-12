import React from 'react'
import { Route } from 'react-router-dom'

import init from '../../utils/init'
import Logo from '../../components/logo'
import Icon from '../../components/icon'
import DashboardScene from '../dashboard'
import SearchScene from '../search'
import SettingsScene from '../settings'

import theme from './theme.css'


const App = () => (
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
          <li className={theme.navItem}><a className={theme.navItemLink} href="/jobs/suggested"><span><Icon primary use="lightbulb_outline" />Suggested Jobs</span></a></li>
          <li className={theme.navItem}><a className={theme.navItemLink} href="/alerts/jobs"><span><Icon primary use="notifications" /> Job Alerts</span></a></li>
          <li className={theme.navItem}><a className={theme.navItemLink} href="/messages"><span><Icon primary use="chat_bubble_outline" /> Messages</span></a></li>
          <li className={theme.navItem}><a className={theme.navItemLink} href="/schedule"><span><Icon primary use="date_range" /> Job Schedule</span></a></li>
        </ul>

        <div className={theme.user}>
          <div className={theme.userInner}>
            <Icon use="person" /> Mellisa Gutierrez
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

init(App)
