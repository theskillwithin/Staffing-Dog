import React from 'react'
import { bool } from 'prop-types'
import classnames from 'classnames'

import theme from './theme.css'


const EmailVerified = ({ verified }) => (
  <span className={classnames(theme.verify, verified && theme.verified)}>
    Email Verified
  </span>
)

EmailVerified.propTypes = {
  verified: bool.isRequired,
}

export default EmailVerified
