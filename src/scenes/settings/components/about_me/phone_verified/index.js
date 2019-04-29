import React, { useState } from 'react'
import { bool, func, string, oneOfType, object } from 'prop-types'
import { connect } from 'react-redux'
import clsx from 'clsx'

import {
  requestValidatePhone,
  findValidatePhoneRequestLoading,
  findValidatePhoneRequestError,
  findValidatePhoneRequestSuccess,
  findValidatePhoneRequestToken,
  findValidatePhoneRequestAnchor,
  findValidatePhoneLoading,
  findValidatePhoneError,
  findValidatePhoneSuccess,
  validatePhone,
} from '@sdog/store/user'
import Button from '@sdog/components/button'
import Input from '@sdog/components/input'
import Toaster from '@sdog/components/toaster'

import theme from './theme.css'

const PhoneVerified = ({
  verified,
  submit,
  loading,
  success,
  validateLoading,
  validateSuccess,
  token,
  anchor,
  submitValidatePhone,
  error,
  validateError,
  updateProfileData,
}) => {
  const [verify, setVerify] = useState('S-')

  const code = parseInt(verify.split('-')[1], 10)

  if (validateSuccess) {
    return (
      <Button className={theme.phoneIsVerified} green>
        Success
      </Button>
    )
  }

  if (success) {
    return (
      <div className={theme.sent}>
        <Input value={verify} onChange={value => setVerify(value)} label="Text Code" />
        <Button
          onClick={() => submitValidatePhone({ token, anchor, code })}
          loading={validateLoading}
          type="button"
        >
          {validateLoading ? '' : 'Send Code'}
        </Button>
        {!validateSuccess && <Toaster type="error">{validateError}</Toaster>}
      </div>
    )
  }

  return (
    <>
      <Button
        className={clsx(theme.verify, verified && theme.verified)}
        onClick={() => submit({ updateProfileData })}
        loading={loading}
        red={!verified && !success}
        type="button"
      >
        {loading
          ? ''
          : success
          ? 'Text Sent'
          : verified
          ? 'Phone Verified'
          : 'Verify Phone #'}
      </Button>

      {!success && <Toaster type="error">{error}</Toaster>}
    </>
  )
}

PhoneVerified.defaultProps = {
  loading: false,
  error: false,
  success: false,
  token: false,
  anchor: false,
  validateLoading: false,
  validateError: false,
  validateSuccess: false,
  updateProfileData: false,
}

PhoneVerified.propTypes = {
  verified: bool.isRequired,
  submit: func.isRequired,
  submitValidatePhone: func.isRequired,
  loading: bool,
  error: bool,
  success: bool,
  token: oneOfType([string, bool]),
  anchor: oneOfType([string, bool]),
  validateLoading: bool,
  validateError: bool,
  validateSuccess: oneOfType([bool, string]),
  updateProfileData: oneOfType([bool, object]),
}

const mapState = state => ({
  loading: findValidatePhoneRequestLoading(state),
  error: findValidatePhoneRequestError(state),
  success: findValidatePhoneRequestSuccess(state),
  token: findValidatePhoneRequestToken(state),
  anchor: findValidatePhoneRequestAnchor(state),
  validateLoading: findValidatePhoneLoading(state),
  validateError: findValidatePhoneError(state),
  validateSuccess: findValidatePhoneSuccess(state),
})

export default connect(
  mapState,
  { submit: requestValidatePhone, submitValidatePhone: validatePhone },
)(PhoneVerified)
