import React from 'react'
import { setTitle, setHtmlClass, removeHtmlClass } from '@sdog/utils/document'
import Contact from '@scene/app/contact'
import Logo from '@component/logo'
import { TabBar, Tab } from '@component/tab_bar'
import Input from '@component/input'

import appTheme from '../app/theme.css'

import theme from './theme.css'

class Login extends React.Component {
  state = {
    activeTabIndex: 0,
    form: {
      email: '',
      password: '',
    },
  }

  componentDidMount() {
    setTitle('Login')
    setHtmlClass('html-login')
  }

  componentWillUnmount() {
    removeHtmlClass('html-login')
  }

  handleChangeTab = tab => {
    this.setState({ activeTabIndex: tab })
  }

  handleChange = (label, value) => {
    this.setState(state => ({ form: { ...state.form, [label]: value } }))
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
              onChange={tab => this.handleChangeTab(tab)}
              underline={false}
              left={false}
              exact={false}
            >
              <Tab>Dental Professional</Tab>
              <Tab>Dental Provider</Tab>
            </TabBar>

            {this.state.activeTabIndex === 0 && (
              <div className={theme.inputRow}>
                <Input
                  label="Email"
                  value={this.state.form.email}
                  onChange={value => this.handleChange('email', value)}
                />
                <Input
                  label="Password"
                  value={this.state.form.password}
                  onChange={value => this.handleChange('password', value)}
                />
              </div>
            )}
            {this.state.activeTabIndex === 1 && (
              <div className={theme.inputRow}>
                <Input
                  label="Email"
                  value={this.state.form.email}
                  onChange={value => this.handleChange('email', value)}
                />
                <Input
                  label="Password"
                  value={this.state.form.password}
                  onChange={value => this.handleChange('password', value)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
