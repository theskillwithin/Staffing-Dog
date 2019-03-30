import React, { useState, useEffect } from 'react'
import { bool, func, string, array, oneOfType, shape } from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { useHtmlClass, useDocumentTitle } from '@sdog/utils/document'
import Toaster from '@sdog/components/toaster'
import Spinner from '@sdog/components/spinner'
import Logo from '@sdog/components/logo'
import Input from '@sdog/components/input'
import Button from '@sdog/components/button'

import {
  findResetLoading,
  findResetError,
  findResetValidateLoading,
  findResetValidateError,
  submitResetPasswordEmail,
  validateResetPasswordEmail,
} from '../../store/user'
import appTheme from '../app/theme.css'

import theme from './theme.css'

const ResetPassword = ({
  history,
  submit,
  isLoading,
  loadingPage,
  error,
  match: { anchor, token },
  validate,
}) => {
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setpasswordConfirmation] = useState('')

  useHtmlClass('html-reset-password')
  useDocumentTitle('Reset Password')

  useEffect(() => void validate({ anchor, token }), [])

  const onSubmit = e => {
    e.preventDefault()
    const data = { password, password_confirmation: passwordConfirmation }
    submit({ anchor, token, data, history })
  }

  return (
    <div className={appTheme.pageContent}>
      <Toaster>{error}</Toaster>

      <div className={theme.resetContainer}>
        <div className={theme.logo}>
          <Logo width="63px" largeTxt />
        </div>

        <div className={theme.reset}>
          <h2>Reset Password</h2>

          {loadingPage ? (
            <div className={theme.loading}>
              <Spinner />
            </div>
          ) : (
            <div>
              <form className={theme.form} onSubmit={onSubmit}>
                <Input
                  className={theme.input}
                  label="New Password"
                  value={password}
                  onChange={setPassword}
                  type="password"
                />

                <Input
                  className={theme.input}
                  label="Verify New Password"
                  value={passwordConfirmation}
                  onChange={setpasswordConfirmation}
                  type="password"
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
                  {isLoading ? 'Loading' : 'Update my password'}
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

ResetPassword.propTypes = {
  submit: func.isRequired,
  validate: func.isRequired,
  history: shape({ push: func.isRequired }).isRequired,
  match: shape({ params: shape({ anchor: string, token: string }) }).isRequired,
  isLoading: bool,
  loadingPage: bool,
  error: oneOfType([string, array, bool]).isRequired,
}

const mapStateToProps = state => ({
  isLoading: findResetLoading(state),
  error: findResetValidateError(state) || findResetError(state),
  loadingPage: findResetValidateLoading(state),
})

export default withRouter(
  connect(
    mapStateToProps,
    { submit: submitResetPasswordEmail, validate: validateResetPasswordEmail },
  )(ResetPassword),
)
