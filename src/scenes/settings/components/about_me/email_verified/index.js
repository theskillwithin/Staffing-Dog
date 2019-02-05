import React from 'react'
import { bool } from 'prop-types'
import clsx from 'clsx'

import theme from './theme.css'

const EmailVerified = ({ verified }) => (
  <span className={clsx(theme.verify, verified && theme.verified)}>
    Email Verified
  </span>
)

EmailVerified.propTypes = {
  verified: bool.isRequired,
}

export default EmailVerified
