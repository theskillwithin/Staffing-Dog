import React from 'react'
import classnames from 'classnames'

import init from '../../utils/init'
import Logo from '../../components/logo'
import Icon from '../../components/icon'
import Card from '../../components/card'

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
          <li className={theme.navItem}><a className={theme.navItemLink} href="/jobs/suggested"><span><Icon use="lightbulb_outline" />Suggested Jobs</span></a></li>
          <li className={theme.navItem}><a className={theme.navItemLink} href="/alerts/jobs"><span><Icon use="notifications" /> Job Alerts</span></a></li>
          <li className={theme.navItem}><a className={theme.navItemLink} href="/messages"><span><Icon use="chat_bubble_outline" /> Messages</span></a></li>
          <li className={theme.navItem}><a className={theme.navItemLink} href="/schedule"><span><Icon use="date_range" /> Job Schedule</span></a></li>
        </ul>

        <div className={theme.user}>
          <div className={theme.userInner}>
            <Icon use="person" /> Mellisa Gutierrez
          </div>
        </div>
      </div>
    </header>

    <div className={theme.appContent}>
      <div className={classnames(theme.pageContent, theme.columns)}>
        <div className={theme.column}>
          <Card
            title="To Do List"
            icon="list"
          >
            <p>Body Goes Here</p>
          </Card>

          <Card
            title="Testing Title Prop"
            icon="chat"
          >
            <p>Body Goes Here</p>
          </Card>

          <Card
            title="Suggested Jobs"
            icon="lightbulb_outline"
          >
            <p>Body Goes Here</p>
          </Card>
        </div>

        <div className={theme.column}>
          <Card
            icon="date_range"
            title="Testing Title Prop"
          >
            <p>Job Schedule</p>
          </Card>

          <Card
            icon="star_border"
            title="Reviews"
          >
            <p>Body Goes Here</p>
          </Card>
        </div>
      </div>
    </div>
  </div>
)

init(App)
