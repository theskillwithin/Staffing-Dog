import React, { useState } from 'react'
import { bool, func, string, array, oneOfType } from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { useHtmlClass, useDocumentTitle } from '@sdog/utils/document'
import Toaster from '@sdog/components/toaster'
import Logo from '@sdog/components/logo'
import Input from '@sdog/components/input'
import Button from '@sdog/components/button'

import {
  findResetLoading,
  findResetError,
  findResetValidateError,
  submitResetPasswordEmail,
  validateResetPasswordEmail,
} from '../../store/user'
import appTheme from '../app/theme.css'

import theme from './theme.css'

const ResetPassword = ({ submit, isLoading, error }) => {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  useHtmlClass('html-support')
  useDocumentTitle('Support')

  const onSubmit = e => {
    e.preventDefault()
    const data = { email, msg }
    submit(data)
  }

  return (
    <div className={appTheme.pageContent}>
      <Toaster>{error}</Toaster>

      <div className={theme.supportContainer}>
        <div className={theme.logo}>
          <Logo width="63px" largeTxt />
        </div>

        <div className={theme.support}>
          <h2>Contact Us</h2>

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
                label="Message"
                value={msg}
                onChange={setMsg}
                textarea
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
                {isLoading ? 'Loading' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

ResetPassword.propTypes = {
  submit: func.isRequired,
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
    { submit: submitResetPasswordEmail, validate: validateResetPasswordEmail },
  )(ResetPassword),
)
