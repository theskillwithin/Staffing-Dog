import React from 'react'
import { bool, string, oneOfType, func, node, oneOf } from 'prop-types'
import classnames from 'classnames'

import './styles.css'
import theme from './theme.css'

const Button = ({
  primary,
  secondary,
  round,
  short,
  className,
  onClick,
  disabled,
  children,
  type,
  ...props
}) => (
  /* eslint-disable react/button-has-type */
  <button
    className={classnames(
      theme.button,
      round && theme.round,
      short && theme.short,
      className && className,
    )}
    onClick={onClick}
    type={type}
    {...props}
  >
    {children}
  </button>
)

/* eslint-enable */

// theme={secondary ? 'secondary-bg' : ''}
// unelevated={primary || secondary}

Button.defaultProps = {
  type: 'submit',
  primary: true,
  secondary: false,
  round: false,
  short: false,
  className: false,
  disabled: false,
}

Button.propTypes = {
  onClick: func.isRequired,
  primary: bool,
  secondary: bool,
  round: bool,
  short: bool,
  className: oneOfType([string, bool]),
  children: oneOfType([string, node]),
  disabled: bool,
  type: oneOf(['button', 'submit', 'reset']),
}

export default Button
