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
  findContactLoading,
  findContactError,
  findContactSuccess,
  sendContactForm,
} from '../../store/contact'
import appTheme from '../app/theme.css'

import theme from './theme.css'

const ResetPassword = ({ submit, isLoading, error, success }) => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  useHtmlClass('html-support')
  useDocumentTitle('Support')

  const onSubmit = e => {
    e.preventDefault()
    const data = { email, message }
    submit(data)
  }

  return (
    <div className={appTheme.pageContent}>
      <Toaster>{error}</Toaster>
      {success && <Toaster type="success">Your message has been sent</Toaster>}

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
                value={message}
                onChange={setMessage}
                textarea
                maxLength={5000}
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
  success: bool,
  error: oneOfType([string, array, bool]).isRequired,
}

const mapStateToProps = state => ({
  isLoading: findContactLoading(state),
  error: findContactError(state),
  success: findContactSuccess(state),
})

export default withRouter(
  connect(
    mapStateToProps,
    { submit: sendContactForm },
  )(ResetPassword),
)
