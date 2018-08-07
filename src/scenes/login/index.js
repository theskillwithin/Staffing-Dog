import React from 'react'
import { setTitle, setHtmlClass, removeHtmlClass } from '@sdog/utils/document'
import Contact from '@scene/app/contact'
import Logo from '@component/logo'
import { TabBar, Tab } from '@component/tab_bar'
import Input from '@component/input'
import Button from '@component/button'

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

  submit = () => {
    // const type = this.state.activeTabIndex === 0 ? 'Professional' : 'Provider'
    // this.props.submit(this.state.form, type)
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

            <form className={theme.form} onSubmit={this.submit}>
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
              <Button primary round type="submit">
                Sign In
              </Button>
              <a href="/forgot-password" className={theme.forgot}>
                Forgot Password?
              </a>
              <div className={theme.signup}>
                <a href="/signup">Don’t have an account? Sign Up</a>
              </div>
            </form>
          </div>
        </div>
        <div className={theme.bottom}>
          <a href="/">Find a Job</a> <a href="/">Post a Job</a> <a href="/">Legal</a>
        </div>
      </div>
    </div>
  )
}

export default Login
