import React from 'react'
import { func, shape } from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setTitle, setHtmlClass, removeHtmlClass } from '@sdog/utils/document'
import Contact from '@sdog/components/contact'
import Logo from '@sdog/components/logo'
import Tabs from '@sdog/components/tab_bar'
import Input from '@sdog/components/input'
import Button from '@sdog/components/button'
import Arrow from '@sdog/components/svg/Arrow'
import { IS_DEV, IS_STAGE } from '@sdog/utils/env'

import { login, setToken } from '../../store/user'
import appTheme from '../app/theme.css'

import theme from './theme.css'

class Login extends React.Component {
  static propTypes = {
    login: func.isRequired,
    setToken: func.isRequired,
    history: shape({ push: func.isRequired }).isRequired,
  }

  state = {
    activeTabIndex: 0,
    form: {
      email: IS_DEV || IS_STAGE ? 'romelu@lukaku.com' : '',
      password: IS_DEV || IS_STAGE ? 'password1' : '',
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

  submit = e => {
    e.preventDefault()
    const {
      state: {
        form: { email, password },
      },
      props: { history },
    } = this

    this.props.login({ email, password, history })
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
                type="password"
                thumbprint
              />
              <Button primary round type="submit" size="medium" onClick={() => {}}>
                Sign In
              </Button>
            </form>
            <div className={theme.underForm}>
              <a href="/forgot-password" className={theme.forgot}>
                Forgot Password?
              </a>
              <div className={theme.signup}>
                <Link to="/onboarding">
                  Don’t have an account? Sign Up{' '}
                  <span className={theme.signupMobile}>
                    <Arrow color="white" />
                  </span>
                </Link>
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

const mapActionsToProps = { login, setToken }

export default withRouter(
  connect(
    null,
    mapActionsToProps,
  )(Login),
)
