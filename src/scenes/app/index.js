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
              <li className={theme.navItem}><Link className={theme.navItemLink} to="/onboarding"><span><Icon primary use="lightbulb_outline" /> Onboarding</span></Link></li>
              <li className={theme.navItem}><Link className={theme.navItemLink} to="/onboarding/professional"><span><Icon primary use="notifications" /> Professional Onboarding</span></Link></li>
              <li className={theme.navItem}><Link className={theme.navItemLink} to="/onboarding/practice"><span><Icon primary use="chat_bubble_outline" /> Practice Onboarding</span></Link></li>
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
