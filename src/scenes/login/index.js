import React, { useState, useEffect } from 'react'
import { bool, func, string, array, oneOfType, shape } from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { useDocumentTitle, useHtmlClass } from '@sdog/utils/document'
import Toaster from '@sdog/components/toaster'
import Logo from '@sdog/components/logo'
import Input from '@sdog/components/input'
import Button from '@sdog/components/button'
import Arrow from '@sdog/components/svg/Arrow'
import { IS_DEV, IS_STAGE } from '@sdog/utils/env'

import {
  login as loginAction,
  findUserAuth,
  findForgotSuccess,
  displayedForgotPasswordClearSuccess,
  findResetSuccess,
  displayedResetPasswordClearSuccess,
  findToken,
} from '../../store/user'
import appTheme from '../app/theme.css'

import theme from './theme.css'

const Login = ({
  history,
  login,
  isLoading,
  error,
  success,
  clearPWSuccess,
  clearResetSuccess,
  token,
}) => {
  const [email, setEmail] = useState(IS_DEV || IS_STAGE ? 'romelu@lukaku.com' : '')
  const [password, setPassword] = useState(IS_DEV || IS_STAGE ? 'Password1234$' : '')

  useDocumentTitle('Login')
  useHtmlClass('html-login')

  useEffect(() => () => {
    if (token) {
      history.push('/')
    }
    clearPWSuccess()
    clearResetSuccess()
  })

  const onSubmit = e => {
    e.preventDefault()
    login({ email, password, history })
  }

  return (
    <div className={appTheme.pageContent}>
      <Toaster>{error}</Toaster>
      {!error && <Toaster type="success">{success}</Toaster>}

      <div className={theme.signinContainer}>
        <div className={theme.logo}>
          <Logo width="63px" largeTxt />
        </div>

        <div className={theme.signin}>
          <h2>Sign In</h2>

          <div>
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
  clearPWSuccess: func.isRequired,
  clearResetSuccess: func.isRequired,
  history: shape({ push: func.isRequired }).isRequired,
  isLoading: bool,
  error: oneOfType([string, array, bool]).isRequired,
  success: oneOfType([string, array, bool]).isRequired,
  token: oneOfType([bool, string]).isRequired,
}

const mapStateToProps = state => ({
  isLoading: findUserAuth(state).loading,
  error: findUserAuth(state).error,
  success: findForgotSuccess(state) || findResetSuccess(state),
  token: findToken(state),
})

const mapActionsToProps = {
  login: loginAction,
  clearPWSuccess: displayedForgotPasswordClearSuccess,
  clearResetSuccess: displayedResetPasswordClearSuccess,
}

export default withRouter(
  connect(
    mapStateToProps,
    mapActionsToProps,
  )(Login),
)
