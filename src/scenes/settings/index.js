import React from 'react'
import classnames from 'classnames'
import { TabBar, Tab } from 'rmwc/Tabs'
import Card from '@component/card'

import theme from '../app/theme.css'

import Header from './components/header'


class Settings extends React.Component {
  state = {
    activeTabIndex: 0,
  }

  render() {
    return (
      <div className={classnames(theme.pageContent)}>
        <Card type="large">
          <Header />
          <TabBar
            activeTabIndex={this.state.activeTabIndex}
            onChange={evt => this.setState({ activeTabIndex: evt.target.value })}
          >
            <Tab>About Me</Tab>
            <Tab>My Resume</Tab>
            <Tab>References</Tab>
            <Tab>Notifications</Tab>
            <Tab>Security</Tab>
          </TabBar>

          {this.state.activeTabIndex === 0 && <h1>About Me</h1>}
          {this.state.activeTabIndex === 1 && <h1>My Resume</h1>}
          {this.state.activeTabIndex === 2 && <h1>References</h1>}
          {this.state.activeTabIndex === 3 && <h1>Notifications</h1>}
          {this.state.activeTabIndex === 4 && <h1>Security</h1>}
        </Card>
      </div>
    )
  }
}

export default Settings
