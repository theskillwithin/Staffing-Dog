import React from 'react'
import { connect } from 'react-redux'
import {
  requestValidateEmail,
  findValidateEmailRequestLoading,
  findValidateEmailRequestError,
  findValidateEmailRequestSuccess,
} from '@sdog/store/user'
import { bool, func } from 'prop-types'
import Button from '@sdog/components/button'
import clsx from 'clsx'

import theme from './theme.css'

const EmailVerified = ({ verified, submit, loading, success }) => (
  <Button
    className={clsx(theme.verify, verified && theme.verified)}
    onClick={() => submit()}
    loading={loading}
  >
    {loading ? '' : success ? 'Email Sent' : verified ? 'Email Verified' : 'Verify Email'}
  </Button>
)

EmailVerified.defaultProps = {
  loading: false,
  error: false,
  success: false,
}

EmailVerified.propTypes = {
  verified: bool.isRequired,
  submit: func.isRequired,
  loading: bool,
  error: bool,
  success: bool,
}

const mapState = state => ({
  loading: findValidateEmailRequestLoading(state),
  error: findValidateEmailRequestError(state),
  success: findValidateEmailRequestSuccess(state),
})

export default connect(
  mapState,
  { submit: requestValidateEmail },
)(EmailVerified)
