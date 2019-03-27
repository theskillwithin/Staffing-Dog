import React, { useState } from 'react'
import { bool, func, string, array, oneOfType, shape } from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { useDocumentTitle, useHtmlClass } from '@sdog/utils/document'
import Contact from '@sdog/components/contact'
import Toaster from '@sdog/components/toaster'
import Logo from '@sdog/components/logo'
import Input from '@sdog/components/input'
import Button from '@sdog/components/button'

import {
  findForgotLoading,
  findForgotError,
  submitForgotPasswordEmail,
} from '../../store/user'
import appTheme from '../app/theme.css'

import theme from './theme.css'

const ForgotPassword = ({ history, submit, isLoading, error }) => {
  const [email, setEmail] = useState('')

  useHtmlClass('html-forgot-password')
  useDocumentTitle('Forgot Password')

  const onSubmit = e => {
    e.preventDefault()
    submit({ email, history })
  }

  return (
    <div className={appTheme.pageContent}>
      <Toaster>{error}</Toaster>

      <header className={theme.header}>
        <Contact />
      </header>

      <div className={theme.forgotContainer}>
        <div className={theme.logo}>
          <Logo width="63px" largeTxt />
        </div>

        <div className={theme.forgot}>
          <h2>Reset Password</h2>

          <div>
            <form className={theme.form} onSubmit={onSubmit}>
              <Input
                className={theme.input}
                label="Email Address"
                value={email}
                onChange={setEmail}
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
                {isLoading ? 'Loading' : 'Reset my password'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

ForgotPassword.propTypes = {
  submit: func.isRequired,
  history: shape({ push: func.isRequired }).isRequired,
  isLoading: bool,
  error: oneOfType([string, array, bool]).isRequired,
}

const mapStateToProps = state => ({
  isLoading: findForgotLoading(state),
  error: findForgotError(state),
})

export default withRouter(
  connect(
    mapStateToProps,
    { submit: submitForgotPasswordEmail },
  )(ForgotPassword),
)
