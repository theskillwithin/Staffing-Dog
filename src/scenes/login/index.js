import React from 'react'
import { setTitle, setHtmlClass, removeHtmlClass } from '@sdog/utils/document'
import Contact from '@scene/app/contact'
import Logo from '@component/logo'
import { TabBar, Tab } from '@component/tab_bar'

import appTheme from '../app/theme.css'

import theme from './theme.css'

class Login extends React.Component {
  state = {
    activeTabIndex: 0,
  }

  componentDidMount() {
    setTitle('Login')
    setHtmlClass('html-login')
  }

  componentWillUnmount() {
    removeHtmlClass('html-login')
  }

  handleChange = tab => {
    this.setState({ activeTabIndex: tab })
  }

  render = () => (
    <div className={appTheme.pageContent}>
      <header className={theme.header}>
        <Contact />
      </header>
      <div className={theme.signinContainer}>
        <div className={theme.logo}>
          <Logo />
        </div>
        <div className={theme.signin}>
          <h2>Sign In</h2>
          <div>
            <TabBar
              activeTabIndex={this.state.activeTabIndex}
              onChange={tab => this.handleChange(tab)}
              underline={false}
              left={false}
              exact={false}
            >
              <Tab>Dental Professional</Tab>
              <Tab>Dental Provider</Tab>
            </TabBar>

            {this.state.activeTabIndex === 0 && <h1>Hello</h1>}
            {this.state.activeTabIndex === 1 && <h1>World</h1>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
