import React, { useState } from 'react'
import { connect } from 'react-redux'
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
import { bool, func, string } from 'prop-types'
import Button from '@sdog/components/button'
import Input from '@sdog/components/input'
import Toaster from '@sdog/components/toaster'
import clsx from 'clsx'

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
        onClick={() => submit()}
        loading={loading}
        red={!verified && !success}
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
  token: null,
  anchor: null,
  validateLoading: false,
  validateError: false,
  validateSuccess: false,
}

PhoneVerified.propTypes = {
  verified: bool.isRequired,
  submit: func.isRequired,
  submitValidatePhone: func.isRequired,
  loading: bool,
  error: bool,
  success: bool,
  token: string,
  anchor: string,
  validateLoading: bool,
  validateError: bool,
  validateSuccess: bool,
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
