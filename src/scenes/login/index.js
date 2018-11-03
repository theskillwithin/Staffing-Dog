import React from 'react'
import { setTitle, setHtmlClass, removeHtmlClass } from '@sdog/utils/document'
import Contact from '@scene/app/contact'
import Logo from '@component/logo'
import Tabs from '@component/tab_bar'
import Input from '@component/input'
import Button from '@component/button'
import Arrow from '@component/svg/Arrow'

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
            <Tabs
              activeTabIndex={this.state.activeTabIndex}
              onSelect={tab => this.handleChangeTab(tab)}
            >
              <div>Dental Professional</div>
              <div>Dental Provider</div>
            </Tabs>

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
            </form>
            <div className={theme.underForm}>
              <a href="/forgot-password" className={theme.forgot}>
                Forgot Password?
              </a>
              <div className={theme.signup}>
                <a href="/signup">
                  Don’t have an account? Sign Up{' '}
                  <span className={theme.signupMobile}>
                    <Arrow color="white" />
                  </span>
                </a>
              </div>
            </div>
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
