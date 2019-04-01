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
  findResetValidateError,
  submitResetPasswordEmail,
} from '../../store/user'
import appTheme from '../app/theme.css'

import theme from './theme.css'

const ResetPassword = ({
  history,
  submit,
  isLoading,
  error,
  match: { anchor, token },
  success,
}) => {
  useHtmlClass('html-email-confirmation')
  useDocumentTitle('Reset Password')

  useEffect(() => void submit({ anchor, token, history }), [])

  return (
    <div className={appTheme.pageContent}>
      <Toaster>{error}</Toaster>

      <div className={theme.resetContainer}>
        <div className={theme.logo}>
          <Logo width="63px" largeTxt />
        </div>

        <div className={theme.reset}>
          <h2>Email Confirmation</h2>

          {isLoading ? (
            <div className={theme.loading}>
              <Spinner />
            </div>
          ) : (
            <div>
              {success ? (<h3>Email has been verified...</h3>)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

ResetPassword.propTypes = {
  submit: func.isRequired,
  history: shape({ push: func.isRequired }).isRequired,
  match: shape({ params: shape({ anchor: string, token: string }) }).isRequired,
  isLoading: bool,
  error: oneOfType([string, array, bool]).isRequired,
}

const mapStateToProps = state => ({
  isLoading: findResetLoading(state),
  error: findResetValidateError(state) || findResetError(state),
})

export default withRouter(
  connect(
    mapStateToProps,
    { submit: submitResetPasswordEmail  },
  )(ResetPassword),
)
