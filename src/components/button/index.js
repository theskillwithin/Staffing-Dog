import React from 'react'
import { bool, string, oneOfType, func, node, oneOf } from 'prop-types'
import classnames from 'classnames'

import theme from './theme.css'

const Button = ({
  primary,
  secondary,
  round,
  short,
  className,
  onClick,
  disabled,
  loading,
  children,
  type,
  size,
  ...props
}) => (
  // eslint-disable-next-line react/button-has-type
  <button
    className={classnames(
      theme.button,
      round && theme.round,
      short && theme.short,
      primary && theme.primary,
      secondary && theme.secondary,
      className && className,
      size && theme[size],
    )}
    onClick={onClick}
    type={type}
    disabled={disabled || loading}
    {...props}
  >
    {children}
  </button>
)

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
  loading: false,
  size: 'mediumSmall',
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
  loading: bool,
  size: oneOf(['small', 'mediumSmall', 'medium', 'large']),
}

export default Button
