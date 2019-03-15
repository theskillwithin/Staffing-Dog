import React, { useState, useEffect } from 'react'
import { bool, func, string, array, oneOfType, shape } from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setTitle, setHtmlClass, removeHtmlClass } from '@sdog/utils/document'
import Contact from '@sdog/components/contact'
import TopError from '@sdog/components/top_error'
import Logo from '@sdog/components/logo'
import Tabs from '@sdog/components/tab_bar'
import Input from '@sdog/components/input'
import Button from '@sdog/components/button'
import Arrow from '@sdog/components/svg/Arrow'
import { IS_DEV, IS_STAGE } from '@sdog/utils/env'

import { login as loginAction, findUserAuth } from '../../store/user'
import appTheme from '../app/theme.css'

import theme from './theme.css'

const Login = ({ history, login, isLoading, error }) => {
  const [tabIndex, setTabIndex] = useState(0)
  const [email, setEmail] = useState(IS_DEV || IS_STAGE ? 'romelu@lukaku.com' : '')
  const [password, setPassword] = useState(IS_DEV || IS_STAGE ? 'Password1234$' : '')

  useEffect(() => {
    setTitle('Login')
    setHtmlClass('html-login')

    return () => removeHtmlClass('html-login')
  }, [])

  const onSubmit = e => {
    e.preventDefault()
    login({ email, password, history })
  }

  return (
    <div className={appTheme.pageContent}>
      <TopError>{error}</TopError>

      <header className={theme.header}>
        <Contact />
      </header>

      <div className={theme.signinContainer}>
        <div className={theme.logo}>
          <Logo width="63px" largeTxt />
        </div>

        <div className={theme.signin}>
          <h2>Sign In</h2>

          <div>
            <Tabs activeTabIndex={tabIndex} onSelect={setTabIndex}>
              <div>Dental Professional</div>
              <div>Dental Provider</div>
            </Tabs>

            <form className={theme.form} onSubmit={onSubmit}>
              <Input
                className={theme.input}
                label="Email"
                value={email}
                onChange={setEmail}
              />

              <Input
                className={theme.input}
                label="Password"
                value={password}
                onChange={setPassword}
                type="password"
                thumbprint
              />

              <Button
                className={theme.button}
                loading={isLoading}
                disabled={isLoading}
                primary
                round
                type="submit"
                size="medium"
              >
                {isLoading ? 'Authenticating' : 'Sign In'}
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
      </div>
    </div>
  )
}

Login.propTypes = {
  login: func.isRequired,
  history: shape({ push: func.isRequired }).isRequired,
  isLoading: bool,
  error: oneOfType([string, array, bool]).isRequired,
}

const mapStateToProps = state => ({
  isLoading: findUserAuth(state).loading,
  error: findUserAuth(state).error,
})

const mapActionsToProps = { login: loginAction }

export default withRouter(
  connect(
    mapStateToProps,
    mapActionsToProps,
  )(Login),
)
