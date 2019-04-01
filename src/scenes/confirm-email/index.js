import React, { useEffect } from 'react'
import { bool, func, string, array, oneOfType, shape } from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { useHtmlClass, useDocumentTitle } from '@sdog/utils/document'
import Toaster from '@sdog/components/toaster'
import Spinner from '@sdog/components/spinner'
import Logo from '@sdog/components/logo'
import Button from '@sdog/components/button'
import Alert from '@sdog/components/alert'
import Arrow from '@sdog/components/svg/Arrow'

import {
  findValidateEmailLoading,
  findValidateEmailError,
  findValidateEmailSuccess,
  validateEmail,
} from '../../store/user'
import appTheme from '../app/theme.css'

import theme from './theme.css'

const EmailConfirmation = ({
  submit,
  isLoading,
  error,
  success,
  match: {
    params: { anchor, token },
  },
}) => {
  useHtmlClass('html-email-confirmation')
  useDocumentTitle('Email Confirmation')

  useEffect(() => void submit({ anchor, token }), [])

  return (
    <div className={appTheme.pageContent}>
      <Toaster>{error}</Toaster>

      <div className={theme.emailConfirmationContainer}>
        <div className={theme.logo}>
          <Logo width="63px" largeTxt />
        </div>

        <div className={theme.emailConfirmation}>
          <h2>Email Confirmation</h2>

          {isLoading ? (
            <div className={theme.loading}>
              <Spinner />
            </div>
          ) : (
            <div>
              {success && (
                <div className={theme.success}>
                  <Alert success>Email has been verified!</Alert>
                  <Button to="/login" size="medium">
                    Login{' '}
                    <span>
                      <Arrow small color="white" />
                    </span>
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

EmailConfirmation.propTypes = {
  submit: func.isRequired,
  match: shape({ params: shape({ anchor: string, token: string }) }).isRequired,
  isLoading: bool,
  error: oneOfType([string, array, bool]).isRequired,
  success: oneOfType([string, array, bool]).isRequired,
}

const mapStateToProps = state => ({
  isLoading: findValidateEmailLoading(state),
  error: findValidateEmailError(state),
  success: findValidateEmailSuccess(state),
})

export default withRouter(
  connect(
    mapStateToProps,
    { submit: validateEmail },
  )(EmailConfirmation),
)
