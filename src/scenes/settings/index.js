import React from 'react'
import classnames from 'classnames'
import { setTitle } from '@util/document'
import Tabs from '@component/tab_bar'
import Card from '@component/card'

import appTheme from '../app/theme.css'

import Header from './components/header'
import AboutMe from './components/about_me'
// import theme from './theme.css'

class Settings extends React.Component {
  state = {
    activeTabIndex: 0,
  }

  componentDidMount() {
    setTitle('Settings')
  }

  render() {
    return (
      <div className={classnames(appTheme.pageContent)}>
        <Card type="large">
          <Header />
          <Tabs
            activeTabIndex={this.state.activeTabIndex}
            onSelect={tab => this.setState({ activeTabIndex: tab })}
            underline
            left
            exactWidthTab
            settingsTabs
          >
            <div>About Me</div>
            <div>References</div>
            <div>Notifications</div>
            <div>Security</div>
          </Tabs>

          {this.state.activeTabIndex === 0 && <AboutMe />}
          {this.state.activeTabIndex === 2 && <h1>References</h1>}
          {this.state.activeTabIndex === 3 && <h1>Notifications</h1>}
          {this.state.activeTabIndex === 4 && <h1>Security</h1>}
        </Card>
      </div>
    )
  }
}

export default Settings
